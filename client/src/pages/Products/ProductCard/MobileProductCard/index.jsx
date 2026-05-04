import React from "react";
import { useNavigate } from "react-router-dom";
import { colorMap } from "../../../../data/colorMap";

export default function MobileProductCard({
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
    <div
      onClick={() => {
        navigate(`/product-details/${id}/${title.replace(" ", "-")}`);
      }}
      className=" "
    >
      <div className="flex items-center justify-center gap-2 h-47.5 w-full border-b border-gray-200 py-3 px-3">
        {/* image and color items */}
        <div className="flex flex-col items-center justify-center gap-1  ">
          <img
            src={import.meta.env.VITE_BASE_FILE + image}
            alt={title}
            className="w-50 h-35"
          ></img>
          <div className="flex gap-1 ">{colorItems()}</div>
        </div>

<div className="w-full flex h-full items-end mb-2">
        <div className="w-full">
          <h2 className="font-samim text-sm sm:text-[16px]  text-gray-800 font-bold">
            {title}
          </h2>
          <p className="font-samim text-sm font-medium mt-4 text-left">
            {avgRating} ⭐
          </p>

          <div className="w-full flex flex-row-reverse justify-between items-center mt-2">
            {discountPercent > 0 ? (
              <span className="font-samim text-[14px] font-bold ">
                {formattedPrice(priceAfterDiscount)}{" "}
                <span className="text-[10px]">تومان</span>
              </span>
            ) : price > 0 ? (
              <span className="font-samim text-[14px] font-bold ">
                {formattedPrice(price)}{" "}
                <span className="text-[10px]">تومان</span>
              </span>
            ) : (
              <span className="font-samim text-[14px] font-bold ">
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
      </div>
    </div>






  );
}
