import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchData from "../../../Utils/FetchData";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { handleResize } from "../../../Utils/handleResize";
import DiscountIcon from "../../../assets/svg/DiscountIcon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import DiscountSkeleton from "./DiscountSkeleton";

export default function Discountproduct() {
  const [discountProducts, setDiscountProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const swiperRef = useRef(null);


  useEffect(() => {
    (async () => {
      const result = await FetchData(
        "product-variants?sort=-discountPercent&limit=12&page=1&populate=productId,variantId",
      );
      setDiscountProducts(result.data || []);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    handleResize(setIsMobile, 764);
  }, []);


  const skeleton = Array.from({ length: 12 }).map((_, index) => (
    <SwiperSlide key={index} style={{ width: "160px", height: "256px" }}>
      <DiscountSkeleton />
    </SwiperSlide>
  ));



  const discountItems = discountProducts?.map((sl) => {
    return (
      <SwiperSlide key={sl._id} style={{ width: "160px", height: "256px" }}>
        <ProductCard
          image={sl.productId?.images[0]}
          title={sl.productId?.title}
          price={sl.price}
          priceAfterDiscount={sl.priceAfterDiscount}
          discountPercent={sl.discountPercent}
          id={sl?.productId._id}
          isMobileSize={isMobile}
        />
      </SwiperSlide>
    );
  });
  return (
    <div className=" lg:mx-10 mx-0 mt-22">
      {isLoading ? (
        <div className="w-full h-84 bg-gray-200/60 rounded-xl">
          <div className="relative mx-1.5 pt-15">
            <Swiper
              modules={Navigation}
              spaceBetween={8}
              slidesPerView={"auto"}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {skeleton}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="w-full  bg-gray-300/80 rounded-xl py-5 ">
          <div className="w-full flex justify-between items-center px-2">
            <div className="flex flex-row-reverse items-center gap-3 ">
              <h2
                className={`${isMobile ? "text-[22px]" : "text-[26px]"} font-sina text-teal-600`}
              >
                شگفت انگیز
              </h2>
              <DiscountIcon className="w-10 h-10" />
            </div>

            {/* see all discount products */}
            <div
              onClick={() => {
                navigate("/incredible-offers");
              }}
              className="flex items-center cursor-pointer"
            >
              <p className="text-sm  font-samim font-bold text-teal-600">
                مشاهده همه
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                className={`w-5 h-5 transition-transform duration-200 rotate-90 fill-teal-600`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Discount Slider */}
          <div className="relative ml-1.5">
            <Swiper
              modules={Navigation}
              spaceBetween={8}
              slidesPerView={"auto"}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {discountItems}
            </Swiper>

            {!isMobile && (
              <div>
                <button
                  onClick={() => {
                    swiperRef.current?.slidePrev();
                  }}
                  className="z-20 absolute top-1/2 translate-y-[-50%] right-3 bg-white border border-black/40 text-black p-3 rounded-full shadow-lg cursor-pointer"
                >
                  <BsChevronRight />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="z-20 absolute top-1/2 translate-y-[-50%] left-3 bg-white border border-black/40 text-black p-3 rounded-full shadow-lg cursor-pointer"
                >
                  <BsChevronLeft />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
