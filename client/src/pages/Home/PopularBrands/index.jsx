import React, { useEffect, useState } from "react";
import FetchData from "../../../Utils/FetchData";
import Loading from "../../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import popularBrands from "../../../assets/icons/popularBrands-icon.png"

const popularIds = [
  "69e013f58f57ca432e3b3420",
  "69e013f58f57ca432e3b3421",
  "69e013f58f57ca432e3b3422",
  "69e013f58f57ca432e3b3423",
  "69e0013f58f57ca432e3b3424",
  "69e013f58f57ca432e3b3425",
  "69e013f58f57ca432e3b3426",
  "69e013f58f57ca432e3b3428",
];

export default function PopularBrands() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await FetchData("brands");
        if (res.data) {
          setBrands(res.data);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    })();
  }, []);

  const popularBrands = brands
    .filter((item) => popularIds.includes(item._id))
    .map((item) => (
      <SwiperSlide
        key={item._id}
        onClick={() =>
          navigate(`/brand/${item._id}/${item.title.replaceAll(" ", "-")}`)
        }
        style={{ width: "150px", height: "150px" }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-300 transition">
          <img
            src={import.meta.env.VITE_BASE_FILE + item.image}
            alt={item.title}
            className="object-contain"
          />
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="gap-4 bg-gray-100 rounded-lg py-4 xl:w-fit mx-auto mt-10 mb-20">
      <div className="flex justify-center items-center gap-1 my-2">
        <img src="src\assets\icons\popularBrands-icon.png" alt="star" className="w-6 h-6"></img>
        <h3 className="font-samim text-xl text-center font-bold opacity-80">محبوب ترین برندها</h3>
      </div>
      <div className="flex items-center justify-center mt-4 xl:pl-0 pl-5 pr-5">
        <Swiper
          className="w-fit max-w-full"
          modules={Navigation}
          spaceBetween={20}
          slidesPerView={"auto"}
        >
          {popularBrands}
        </Swiper>
      </div>
    </div>
  );
}
