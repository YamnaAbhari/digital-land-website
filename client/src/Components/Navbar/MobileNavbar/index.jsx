

import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function MobileNavbar({ onOpenSearch }) {
  const { token } = useSelector((state) => state.auth);
  const cartLength=useSelector(state=>state.cart.items).length
  const navigate = useNavigate();
 
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-17 flex justify-between items-center gap-2 bg-white px-3 z-40">
        <div className="relative w-full cursor-pointer" onClick={onOpenSearch}>
          <input
            type="text"
            readOnly={true}
            placeholder="جستجو در دیجیتال لند"
            className="w-full bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim " // pointer-events-none کلیک را غیرفعال می‌کند
          />
          <div className="absolute top-1/2 -translate-y-1/2 px-4">
            <BiSearch className="text-xl text-gray-500" />
          </div>
        </div>

         
         

        {/* all products */}
        <Link to={"/products/all/all-category"}>
          <div className="p-2 rounded-full bg-teal-700 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 stroke-2 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
              />
            </svg>
          </div>
        </Link>
      </nav>
      {/* Navigation bar for bottom part will be here */}
      <nav className="w-full z-49 h-14 fixed bottom-0 right-0 bg-white border border-t-gray-300">
        <div className="w-full h-full grid grid-cols-4 ">
          <a
          
            onClick={()=>{navigate('/')}}
            className="flex flex-col justify-center items-center py-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              className="stroke-2 stroke-mist-500"
            >
              <path d="M20 11.586v6.586a3 3 0 01-3 3H7a3 3 0 01-3-3v-6.586l-1.293 1.293-1.414-1.415L9.879 2.88a3 3 0 014.242 0l8.586 8.585-1.414 1.415L20 11.586z" />
            </svg>
            <h4 className="text-[12px] font-samim font-medium">خانه</h4>
          </a>

          <a
         
            
            className="flex flex-col justify-center items-center py-1 cursor-pointer"
            onClick={()=>{navigate('/category')}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="22"
              fill="currentColor"
              className=" opacity-60"
            >
              <path
                fillRule="evenodd"
                d="M10 2H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zM4 9V4h5v5H4zm17 4a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1h7zm-3.5-2a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM20 6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM6.5 22a4.5 4.5 0 110-9 4.5 4.5 0 010 9zM9 17.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm6 2.5v-5h5v5h-5z"
                clipRule="evenodd"
              />
            </svg>

            <h4 className="text-[12px] font-samim font-medium">دسته بندی</h4>
          </a>

          <a
          
            onClick={()=>{navigate('/cart')}}
            className="flex flex-col justify-center items-center py-1 cursor-pointer"
          >
            <div className="relative">
              {cartLength!==0 && <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded-full">{cartLength}</span>}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 24"
              className="w-6 h-6 cursor-pointer text-gray-500"
              fill="currentColor"
              
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z"
              />
            </svg>
            </div>
            <h4 className="text-[12px] font-samim font-medium">سبد خرید</h4>
          </a>

            {token ? (
         
          <Link to={'/profile'} className="flex flex-col justify-center items-center py-1 cursor-pointer h-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-500" 
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="text-[12px] font-samim font-medium">پروفایل</h4>
          </Link>
        ) : (
       
          <Link to={'/auth'} className="flex flex-col justify-center items-center py-1 cursor-pointer h-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-500" 
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="text-[12px] font-samim font-medium">ورود</h4>
          </Link>
        )}
          

          
        </div>
      </nav>
    </div>
  );
}



         