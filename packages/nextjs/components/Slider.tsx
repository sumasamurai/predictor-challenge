import { useEffect, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

export const Slider = () => {
  const [slides, setSlides] = useState([
    { id: 1, content: "Slide 1" },
    { id: 2, content: "Slide 2" },
    { id: 3, content: "Slide 3" },
    { id: 4, content: "Slide 4" },
  ]);

  useEffect(() => {
    new Swiper(".swiper", {
      modules: [Navigation],
      direction: "horizontal",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  const addNewSlide = () => {
    const newSlide = { id: slides.length + 1, content: `Slide ${slides.length + 1}` };
    setSlides([...slides, newSlide]);
  };

  return (
    <div>
      <div className="swiper w-3/4 h-96">
        <div className="swiper-wrapper">
          {slides.slice(-3).map(slide => (
            <div key={slide.id} className="swiper-slide text-center">
              <div className="h-full flex flex-col justify-center">
                <p className="text-4xl">{slide.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
      <div className="flex justify-center mt-10">
        <button className="btn btn-accent" onClick={addNewSlide}>
          Add New Slide
        </button>
      </div>
    </div>
  );
};
