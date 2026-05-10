import React, { useState } from "react";
import { Link } from "react-router-dom";
import footerSvg1 from "../../../assets/svg/footerSvg1.svg";
import footerSvg2 from "../../../assets/svg/footerSvg2.svg";
import footerSvg3 from "../../../assets/svg/footerSvg3.svg";
import footerSvg4 from "../../../assets/svg/footerSvg4.svg";
import { footerData } from "../../../data/FooterData";
import BaleIcon from "../../../assets/svg/BaleIcon";
import InstagramIcon from "../../../assets/svg/InstagrmIcon";
import LinkedInIcon from "../../../assets/svg/LinkdinIcon";
import TwitterIcon from "../../../assets/svg/TwitterIcon";

export default function MobileFooter() {
  const [openFooterData, setOpenFooterData] = useState([]);
  const handleOpen = (dataId) => {
    setOpenFooterData((prev) => {
      return prev.includes(dataId)
        ? prev.filter((id) => id !== dataId)
        : [...prev, dataId];
    });
  };

  const footerSvg = [
    {
      id: 1,
      title: "۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ",
      image: footerSvg1,
      alt: "Footer Icon 1",
    },
    {
      id: 2,
      title: "اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس",
      image: footerSvg2,
      alt: "Footer Icon 2",
    },
    {
      id: 3,
      title: "ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ",
      image: footerSvg3,
      alt: "Footer Icon 3",
    },
    {
      id: 4,
      title: "هفت روز ضمانت بازگشت کالا",
      image: footerSvg4,
      alt: "Footer Icon 4",
    },
  ];
  const footerItems = footerData.map((item, index) => {
    const isOpen = openFooterData.includes(item.id);
    return (
      <div
        key={item.id}
        className={`flex flex-col gap-2.5 w-full px-3 border-b ${index == 0 ? "border-t border-gray-200" : ""} border-gray-200 py-5 font-samim`}
      >
        <div
          onClick={() => handleOpen(item.id)}
          className="w-full flex flex-row justify-between items-center  cursor-pointer"
        >
          <h2 className="font-semibold text-gray-800 text-[14px]">
            {item.name}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {isOpen && (
          <ul className="flex flex-col gap-1.5">
            {item.items.map((it,index) => {
              return (
                <li key={index} className="text-sm text-gray-600 font-medium">
                  <a href="#">{it}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  });
  return (
    <div className=" bg-gray-100/40 pb-20 pt-5 px-3">
      <Link className="text-2xl font-samim font-extrabold bg-linear-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
        دیجیتال لند
      </Link>

      <div className="flex w-full justify-between gap-2.5 mt-6 mb-2">
        {footerSvg.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center gap-2">
              <img src={item.image} alt={item.alt} className="w-13.5 h-13.5 md:w-15 md:h-15"></img>
              <span className="font-samim text-[10px] sm:text-sm font-medium text-gray-500 text-center">{item.title}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5">{footerItems}</div>

      {/* contact us */}
      <div className="flex flex-col gap-2">
        <h2 className="font-samim text-lg text-gray-500 font-semibold">ارتباط با ما</h2>
      <div className="flex gap-3 mt-6">
       <a className="cursor-pointer"> <BaleIcon color={'#a1a3a8'}/> </a>
        <a className="cursor-pointer"> <InstagramIcon color={'#a1a3a8'}/></a>
       <a className="cursor-pointer"> <LinkedInIcon color={'#a1a3a8'}/> </a>
       <a className="cursor-pointer"> <TwitterIcon color={'#a1a3a8'}/> </a>
      </div>
      </div>

    </div>
  );
}
