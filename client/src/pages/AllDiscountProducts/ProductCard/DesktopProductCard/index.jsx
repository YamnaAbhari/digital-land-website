import React from "react";
import { useNavigate } from "react-router-dom";

export default function DesktopProductCard({
  image,
  title,
  avgRating,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
}) {
  const navigate = useNavigate();
  const formattedPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div
      onClick={() => {
        navigate(`/product-details/${id}/${title.replace(" ", "-")}`);
      }}
      className="relative w-full h-112.5 rounded-lg shaow-lg border border-gray-200 px-2 py-4 cursor-pointer transition-all duration-200 ease-in-out hover:translate-z-px hover:z-1 hover:shadow-xl bg-white"
    >
      {/* product image */}
      <div className="sm:w-55 sm:h-55 md:w-60 md:h-60 lg:w-55 lg:h-55 xl:w-50 xl:h-50 mx-auto mt-8">
        <img
          src={import.meta.env.VITE_BASE_FILE + image}
          alt={title}
          className="w-full h-full"
        ></img>
      </div>

      {/* product information */}
      <div className="mt-4 px-2">
        <h2 className="font-samim text-sm sm:text-[16px] md:text-sm  xl:text-[14px] text-gray-800 font-bold lg:h-12 h-10">
          {title.split(" ").length > 14
            ? `${title.split(" ").slice(0, 14).join(" ")}...`
            : title}
        </h2>
       

        <div className="w-full flex flex-row-reverse justify-between items-center mt-2">
          {discountPercent > 0 ? (
            <span className="font-samim text-[14px] font-bold sm:mt-2 lg:mt-0 xl:mt-4">
              {formattedPrice(priceAfterDiscount)}{" "}
              <span className="text-[10px]">تومان</span>
            </span>
          ) : price > 0 ? (
            <span className="font-samim text-[14px] font-bold sm:mt-2  lg:mt-0 xl:mt-4">
              {formattedPrice(price)} <span className="text-[10px]">تومان</span>
            </span>
          ) : (
            <span className="font-samim text-[14px] font-bold sm:mt-2 lg:mt-0 xl:mt-4">
              ناموجود
            </span>
          )}
          {discountPercent > 0 && (
            <span className="w-10 h-5 py-0.5 flex items-center justify-center bg-teal-600 text-[12px] font-samim text-white rounded-[14px]">
              {discountPercent}%
            </span>
          )}
        </div>
        {discountPercent > 0 && (
          <del className="text-[12px] text-gray-600 font-samim flex justify-end mt-1">
            {formattedPrice(price)}
          </del>
        )}
      </div>
    </div>
    // <div
    //   onClick={() => {
    //     navigate(`product-details/${id}/${title.replaceAll(" ", "-")}`);
    //   }}
    //   className={` w-40 p-2 bg-white my-2 mx-2 rounded-sm cursor-pointer`}
    // >
    //   <img
    //     src={import.meta.env.VITE_BASE_FILE + image}
    //     alt={title}
    //     className={` h-32 mx-auto my-2`}
    //   ></img>
    //   <h2 className="text-[12px] font-samim font-normal">{title.split(' ').length>8? `${title.split(" ").slice(0, 7).join(" ")}...`:title}</h2>

    //   <div className="w-full flex flex-row-reverse justify-between items-center mt-2">
    //     {priceAfterDiscount > 0 ? (
    //       <span className="font-samim text-[12px] font-bold">
    //         {formattedPrice(priceAfterDiscount)}{' '}<span className="text-[10px]">تومان</span>
    //       </span>
    //     ) : (
    //       <span className="font-samim text-[12px] font-bold">{price}تومان</span>
    //     )}
    //     {discountPercent > 0 && (
    //       <span className="px-2 py-0.5 bg-teal-600 text-[10px] font-samim text-white rounded-lg">
    //         {discountPercent}%
    //       </span>
    //     )}
    //   </div>

    //   {discountPercent > 0 && (
    //     <del className="text-[12px] text-gray-600 font-samim flex justify-end mt-1">{formattedPrice(price)}</del>
    //   )}
    // </div>
  );
}
