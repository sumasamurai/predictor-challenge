import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useScaffoldEventSubscriber, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import {ISlide, Slide} from "./Slide";

export const Slider = () => {
    const [slides, setSlides] = useState<Array<number | ISlide>>([]);

    useEffect(() => {
        new Swiper(".swiper", {
            modules: [Navigation],
            direction: "horizontal",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            initialSlide: slides.length - 1,
        });
    }, [slides]);

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
            const getRounds = events.map(event => event.args).reverse().slice(-3);
            if (Array.isArray(getRounds)) {
                const mutableSlides = getRounds.map((event) => {
                    // Extract properties from the event arguments
                    const {
                        epoch,
                        openPrice,
                        closePrice,
                        longAmount,
                        shortAmount,
                    } = event;

                    const formattedSlide: ISlide = {
                        epoch: Number(epoch),
                        openPrice: Number(openPrice),
                        closePrice: Number(closePrice),
                        longAmount: Number(longAmount),
                        shortAmount: Number(shortAmount),
                    };

                    return formattedSlide;
                });

                setSlides(mutableSlides);
            }
        }

    }, [isLoading, error]);

    useScaffoldEventSubscriber({
        contractName: "PredictorGame",
        eventName: "StartRound",
        listener: logs => {
            logs.map(log => {
                const lastSlide = slides[slides.length - 1];
                const epoch = log.args.epoch !== undefined ? Number(log.args.epoch) : 0;
                const openPrice = typeof lastSlide === "object" ? Number(lastSlide.openPrice) : 0;

                setSlides(prevSlides => {
                    const newSlides = [...prevSlides];
                    newSlides.push({
                        epoch,
                        openPrice,
                        closePrice: 0,
                        longAmount: 0,
                        shortAmount: 0,
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
                    epoch,
                    openPrice,
                    closePrice,
                    longAmount,
                    shortAmount,
                } = log.args;

                setSlides((prevSlides) => {
                    const updatedSlides = [...prevSlides];
                    if (updatedSlides.length > 0) {
                        const lastSlide = updatedSlides[updatedSlides.length - 1];

                        if (typeof lastSlide === "object") {
                            lastSlide.epoch = epoch !== undefined ? Number(epoch) : 0;
                            lastSlide.openPrice = openPrice !== undefined ? Number(openPrice) : 0;
                            lastSlide.closePrice = closePrice !== undefined ? Number(closePrice) : 0;
                            lastSlide.longAmount = longAmount !== undefined ? Number(longAmount) : 0;
                            lastSlide.shortAmount = shortAmount !== undefined ? Number(shortAmount) : 0;
                        }
                    }

                    return updatedSlides;
                });
            });

        },
    });

    return (
        <div>
            <div className="swiper w-3/4 h-96">
                <div className="swiper-wrapper">
                    {slides.map((slide, index) =>
                        typeof slide === "object" ? (
                            <Slide key={index} {...slide} />
                        ) : (
                            <div key={index}>Incorrect data for this slide.</div>
                        )
                    )}
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    );
};
