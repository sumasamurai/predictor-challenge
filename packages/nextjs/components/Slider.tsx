import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useScaffoldEventSubscriber, useScaffoldEventHistory, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { ISlide, Slide } from "./Slide";

export const Slider = () => {
  const [slides, setSlides] = useState<Array<number | ISlide>>([]);
  const [addedEpochs, setAddedEpochs] = useState<number[]>([]);

  useEffect(() => {
    new Swiper(".swiper", {
      modules: [Navigation],
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      initialSlide: slides.length - 1,
      slidesPerView: 2,
    });
  }, [slides]);

  // Function to transform event data into an array of rounds
  const extractRoundData = (events: any) => {
    return events.map((event: { args: { round: ISlide; }; }) => {
      const { round } = event.args;
      // Transform event data into a round object with all values as numbers
      return {
        epoch: Number(round?.epoch),
        openPrice: Number(round?.openPrice),
        closePrice: Number(round?.closePrice),
        longAmount: Number(round?.longAmount),
        shortAmount: Number(round?.shortAmount),
        totalAmount: Number(round?.totalAmount),
        rewardAmount: Number(round?.rewardAmount),
        startTimestamp: Number(round?.startTimestamp),
        closeTimestamp: Number(round?.closeTimestamp),
        lockTimestamp: Number(round?.lockTimestamp),
      };
    });
  };

  const {
    data: events,
    isLoading: isLoading,
    error: error,
  } = useScaffoldEventHistory({
    contractName: "PredictorGame",
    eventName: "CloseRound",
    fromBlock: 31231n,
    blockData: false,
    receiptData: false,
  });

  useEffect(() => {
    if (!isLoading && !error && events) {
      const getRounds = events.map(event => event.args).reverse().slice(-4);
      if (Array.isArray(getRounds)) {
        const mutableSlides = getRounds.map((event) => {
          // Extract properties from the event arguments
          const {
            round,
          } = event;

          const formattedSlide: ISlide = {
            epoch: Number(round?.epoch),
            openPrice: Number(round?.openPrice),
            closePrice: Number(round?.closePrice),
            longAmount: Number(round?.longAmount),
            shortAmount: Number(round?.shortAmount),
            totalAmount: Number(round?.totalAmount),
            rewardAmount: Number(round?.rewardAmount),
            startTimestamp: Number(round?.startTimestamp),
            closeTimestamp: Number(round?.closeTimestamp),
            lockTimestamp: Number(round?.lockTimestamp),
          };

          return formattedSlide;
        });

        setSlides(prevSlides => {
          const newSlides = [...mutableSlides];

          return newSlides;
        });

        setAddedEpochs((prevEpochs) => [...prevEpochs, ...mutableSlides.map((round) => round.epoch)]);
      }
    }
  }, [isLoading, error]);

  // Fetch the history of CloseRound events
  const { data: startRoundEvents, isLoading: isLoadingStartRound, error: errorStartRound } = useScaffoldEventHistory({
    contractName: "PredictorGame",
    eventName: "StartRound",
    fromBlock: 0n, // Starting from block 0
    blockData: true,
    receiptData: false,
  });

  // Use a useEffect to process StartRound events and update state
  useEffect(() => {
    if (!isLoadingStartRound && !errorStartRound && startRoundEvents) {
      // Transform StartRound events into an array of rounds with all values as numbers
      const startRoundRounds = extractRoundData(startRoundEvents);

      // Filter out only the StartRound events that haven't been added based on the epoch
      const newStartRoundRounds = startRoundRounds.filter((round: ISlide) => !addedEpochs.includes(round.epoch));

      // Update the state using a callback to avoid re-renders
      setSlides((prevSlides) => {
        // Combine the new StartRound rounds with the existing rounds and sort them by epoch in ascending order
        const updatedSlides = [...prevSlides, ...newStartRoundRounds].sort((a, b) => a.epoch - b.epoch);

        // Keep only the latest 4 rounds and remove older ones
        while (updatedSlides.length > 4) {
          updatedSlides.shift(); // Remove the oldest round
        }

        return updatedSlides;
      });

      // Update the list of added epochs
      setAddedEpochs((prevEpochs) => [...prevEpochs, ...newStartRoundRounds.map((round: ISlide) => round.epoch)]);
    }
  }, [isLoadingStartRound, errorStartRound]);

  useScaffoldEventSubscriber({
    contractName: "PredictorGame",
    eventName: "StartRound",
    listener: logs => {
      logs.map(log => {
        const { round } = log.args;
        console.log("StartRound", round);

        setSlides(prevSlides => {
          const newSlides = [...prevSlides];
          newSlides.push({
            epoch: Number(round?.epoch),
            openPrice: Number(round?.openPrice),
            closePrice: Number(round?.closePrice),
            longAmount: Number(round?.longAmount),
            shortAmount: Number(round?.shortAmount),
            totalAmount: Number(round?.totalAmount),
            rewardAmount: Number(round?.rewardAmount),
            startTimestamp: Number(round?.startTimestamp),
            closeTimestamp: Number(round?.closeTimestamp),
            lockTimestamp: Number(round?.lockTimestamp),
          });

          return newSlides;
        });
      });
    },
  });

  useScaffoldEventSubscriber({
    contractName: "PredictorGame",
    eventName: "CloseRound",
    listener: logs => {
      logs.map(log => {
        const {
          round,
        } = log.args;
        console.log("useScaffoldEventSubscriber CloseRound", log.args);
        setSlides((prevSlides) => {
          const updatedSlides = [...prevSlides];
          const closedRound = prevSlides.find(slide => slide?.epoch == Number(round?.epoch));
          console.log("closedRound", closedRound);
          if (typeof closedRound === "object") {
            closedRound.epoch = Number(round?.epoch);
            closedRound.openPrice = Number(round?.openPrice);
            closedRound.closePrice = Number(round?.closePrice);
            closedRound.longAmount = Number(round?.longAmount);
            closedRound.shortAmount = Number(round?.shortAmount);
            closedRound.totalAmount = Number(round?.totalAmount);
            closedRound.rewardAmount = Number(round?.rewardAmount);
            closedRound.startTimestamp = Number(round?.startTimestamp);
            closedRound.closeTimestamp = Number(round?.closeTimestamp);
            closedRound.lockTimestamp = Number(round?.lockTimestamp);
          }
          return updatedSlides;
        });
      });

    },
  });

  return (
    <div className="swiper w-full h-full">
      <div className="swiper-wrapper">
        {slides.map((slide, index) =>
          typeof slide === "object" ? (
            <Slide key={index} className={`${index === Array.from(slides.keys()).length - 1 ? 'last-slide' : ''
              }`} {...slide} />
          ) : (
            <div key={index}>Incorrect data for this slide.</div>
          )
        )}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};
