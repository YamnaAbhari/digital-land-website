// import React from 'react'

// export default function ProductsFilters() {
//   return (
//     <div></div>
//   )
// }

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MobilePriceFilter from "../PriceFilter/MobilePriceFilter";
import { FiFilter } from "react-icons/fi";
import FilterIcon from "../../../assets/svg/FilterIcon";
import Arrow from "../../../assets/svg/Arrow";

export default function ProductsFilters({ openFilterBox }) {
  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView="auto">
        <SwiperSlide className="w-auto! ">
          <div className="flex gap-3">
            <button
              className={`flex items-center gap-1.5  py-1.5  font-samim text-sm text-gray-700 font-normal  cursor-pointer `}
            >
              <FilterIcon color="gray" width={18} height={18} />
              <span className="text-gray-900">فیلتر :</span>
            </button>

            <button
              onClick={openFilterBox}
              className={`flex items-center gap-1.5  py-1.5 px-3 border border-gray-200 rounded-full focus:outline-none focus:border-teal-600 whitespace-nowrap transition-all font-samim text-sm text-gray-700 font-normal  cursor-pointer `}
            >
              <span>محدوده قیمت</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-5 h-5 transition-transform duration-200 rotate-0 `}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* {isFilterBoxVisible && <MobilePriceFilter isFilterBoxVisible={isFilterBoxVisible} closeFilterBox={closeFilterBox}/>} */}
    </div>
  );
}
