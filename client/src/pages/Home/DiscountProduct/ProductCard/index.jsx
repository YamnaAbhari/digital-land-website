import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  image,
  title,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
  isMobileSize,
}) {
  const navigate = useNavigate();
  const formattedPrice=(value)=>{return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  return (
    <div
      onClick={() => {
        navigate(`product-details/${id}/${title.replaceAll(" ", "-")}`);
      }}
      className={` w-40 p-2 bg-white my-2 mx-2 rounded-sm cursor-pointer`}
    >
      <img
        src={import.meta.env.VITE_BASE_FILE + image}
        alt={title}
        className={` h-32 mx-auto my-2`}
      ></img>
      <h2 className="text-[12px] font-samim font-normal">{title.split(' ').length>8? `${title.split(" ").slice(0, 7).join(" ")}...`:title}</h2>

      <div className="w-full flex flex-row-reverse justify-between items-center mt-2">
        {priceAfterDiscount > 0 ? (
          <span className="font-samim text-[12px] font-bold">
            {formattedPrice(priceAfterDiscount)}{' '}<span className="text-[10px]">تومان</span>
          </span>
        ) : (
          <span className="font-samim text-[16px] font-bold">{price}تومان</span>
        )}
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 bg-teal-600 text-[10px] font-samim text-white rounded-lg">
            {discountPercent}%
          </span>
        )}
      </div>

      {discountPercent > 0 && (
        <del className="text-[12px] text-gray-600 font-samim flex justify-end mt-1">{formattedPrice(price)}</del>
      )}
    </div>
  );
}
