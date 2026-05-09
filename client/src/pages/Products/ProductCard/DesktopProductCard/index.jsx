import React from "react";
import { useNavigate } from "react-router-dom";
import { colorMap } from "../../../../data/colorMap";

export default function DesktopProductCard({
  variantIds,
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


    // const colorItems = () => {
    //   if (!variantIds || variantIds.length === 0) return null;
    //   const renderColors = variantIds.map((vr, index) => {
    //     return (
    //       <div
    //         key={index}
    //         title={vr.value}
    //         className={`w-2 h-2 rounded-full ring ring-gray-300`}
    //         style={{ background: [vr.value]  }}
    //       ></div>
    //     );
    //   });
    //   return renderColors;
    // };

      const colorItems = () => {
        if (!variantIds || variantIds.length === 0) return null;
        const renderColors = variantIds.map((vr, index) => {
          return (
            <div
              key={index}
              title={vr.value}
              className={`w-2 h-2 rounded-full ring ring-gray-300`}
              style={{ background: colorMap[vr.value] || [vr.value] }}
            ></div>
          );
        });
        return renderColors;
      };
  return (
    //product card
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

      {/* product variant color */}
      <div className="absolute top-6 left-5 flex flex-col gap-1">
        {colorItems()}
      </div>

      {/* product information */}
      <div className="mt-4 px-2">
        <h2 className="font-samim text-sm sm:text-[16px] md:text-sm  xl:text-[14px] text-gray-800 font-bold lg:h-12 h-10">
          {title.split(" ").length > 14
            ? `${title.split(" ").slice(0, 14).join(" ")}...`
            : title}
        </h2>
        <p className="font-samim text-sm font-medium sm:mt-3 md:mt-2 lg:mt-0 xl:mt-3 text-left">
          {avgRating} ⭐
        </p>

        <div className="w-full flex flex-row-reverse justify-between items-center mt-2">
          {discountPercent > 0 ? (
            <span className="font-samim text-[14px] font-bold sm:mt-2 lg:mt-0 xl:mt-4">
              {formattedPrice(priceAfterDiscount)}{" "}<span className="text-[10px]">تومان</span>
            </span>
          ) : price > 0 ? (
            <span className="font-samim text-[14px] font-bold sm:mt-2  lg:mt-0 xl:mt-4">
              {formattedPrice(price)}{" "}<span className="text-[10px]">تومان</span>
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
  );
}

// import React from 'react'

// export default function DesktopProductCard() {
//   return (
//     <div></div>
//   )
// }
