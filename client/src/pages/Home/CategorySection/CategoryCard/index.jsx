import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, title, image }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-4 cursor-pointer"
      onClick={() => {
        navigate(`/categories/${id}/${title.replaceAll(" ", "-")}`);
      }}
    >
      {image ? (
        <div className=" lg:w-28 lg:h-28 sm:w-24 sm:h-24 w-22 h-22 flex justify-center items-center bg-gray-200 rounded-full">
        <img src={import.meta.env.VITE_BASE_FILE + image} className="w-[70%] h-[70%]  object-cover" alt={title}></img>
        </div>
      ) : (
        <div className="bg-gray-200  lg:w-28 lg:h-28 sm:w-24 sm:h-24 w-22 h-22 flex justify-center items-center rounded-full font-samim text-[12px] text-gray-700 font-medium">
          بدون تصویر
        </div>
      )}

      <h2 className="font-samim text-[14px] text-gray-600 font-bold">{title}</h2>
    </div>
  );
}
