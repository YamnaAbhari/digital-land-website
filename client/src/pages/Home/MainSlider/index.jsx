import React, { useEffect, useState, useRef } from "react";
import FetchData from "../../../Utils/FetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { handleResize } from "../../../Utils/handleResize";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import MainSliderSkeleton from "./MainSliderSkeleton";

export default function MainSlider() {
  const [slider, setSlider] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [navigationBtnVisibel, setNavigationBtnVisibel] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    (async () => {
      const result = await FetchData("sliders?page=1&limit=10");
      setSlider(result.data || []);
    })();
  }, []);

  useEffect(() => {
    handleResize(setIsMobile, 564);
  }, []);

  if (slider.length === 0) return <MainSliderSkeleton/>

  const sliderItems = slider.map((sl) => (
    <SwiperSlide key={sl._id} onClick={() => navigate(sl.href)}>
      <img
        src={
          isMobile
            ? import.meta.env.VITE_BASE_FILE + sl.image.mobile
            : import.meta.env.VITE_BASE_FILE + sl.image.desktop
        }
        alt={sl.title}
        className={`w-full h-full ${!isMobile ? "object-bottom-left" : ""}`}
      />
    </SwiperSlide>
  ));

  return (
    // swiper slide
    <div
      className={`relative w-full z-10  sm:my-25 lg:my-33 xl:my-35 my-23`}
      onMouseEnter={() => {
        setNavigationBtnVisibel(true);
      }}
      onMouseLeave={() => {
        setNavigationBtnVisibel(false);
      }}
    >
      <Swiper
        className={`w-full h-[22vh] sm:h-[36vh] lg:h-[42vh] `}
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {sliderItems}
      </Swiper>




      {/* custom navigation */}
      {navigationBtnVisibel && !isMobile && (
        <div
          className={`absolute bottom-8 right-10 z-20 flex gap-3`}
        >
          <button
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
            className="bg-black/60 text-white p-3 rounded-full shadow-lg cursor-pointer"
          >
            <BsChevronRight />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-black/60 text-white p-3 rounded-full shadow-lg cursor-pointer"
          >
            <BsChevronLeft />
          </button>
        </div>
      )}
    </div>
  );
}

