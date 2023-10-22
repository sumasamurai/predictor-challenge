import { use, useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Slide } from "./Slide";
import { RoundInfo, RoundData } from '../types/dataTypes'

const getWeiToEther = (wei: bigint): number => {
  const etherValue = Number(wei) / 1e18;
  return etherValue;
};

const extractRoundData = (round: RoundData) => {
  return {
    epoch: Number(round?.epoch),
    openPrice: getWeiToEther(round?.openPrice),
    closePrice: getWeiToEther(round?.closePrice),
    longAmount: getWeiToEther(round?.longAmount),
    shortAmount: getWeiToEther(round?.shortAmount),
    totalAmount: getWeiToEther(round?.totalAmount),
    rewardAmount: Number(round?.rewardAmount),
    startTimestamp: Number(round?.startTimestamp),
    closeTimestamp: Number(round?.closeTimestamp),
    lockTimestamp: Number(round?.lockTimestamp),
  };
}

export const Slider = () => {
  const [slides, setSlides] = useState<Array<RoundInfo>>([]);

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

  const { data: latestRounds } = useScaffoldContractRead({
    contractName: "PredictorGame",
    functionName: "getLatestRounds",
    args: [BigInt(4)],
  });

  useEffect(() => {
    if (Array.isArray(latestRounds)) {
      const extractedRounds = latestRounds.map(latestRound => extractRoundData(latestRound)).reverse();
      setSlides(extractedRounds);
    }
  }, [latestRounds])

  return (
    <div className="swiper w-full h-full">
      <div className="swiper-wrapper">
        {slides.map((slide, index) =>
          typeof slide === "object" ? (
            <Slide key={index} className={`
              ${index === Array.from(slides.keys()).length - 1 ? 'next-slide' : 'closed-slide'}
              ${index === Array.from(slides.keys()).length - 2 ? 'live-slide' : ''}
            `} {...slide} />
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
