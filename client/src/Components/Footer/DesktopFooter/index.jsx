import React from "react";
import footerSvg1 from "../../../assets/svg/footerSvg1.svg";
import footerSvg2 from "../../../assets/svg/footerSvg2.svg";
import footerSvg3 from "../../../assets/svg/footerSvg3.svg";
import footerSvg4 from "../../../assets/svg/footerSvg4.svg";
import { Link } from "react-router-dom";
import { footerData } from "../../../data/FooterData";
import BaleIcon from "../../../assets/svg/BaleIcon";
import InstagramIcon from "../../../assets/svg/InstagrmIcon";
import LinkedInIcon from "../../../assets/svg/LinkdinIcon";
import TwitterIcon from "../../../assets/svg/TwitterIcon";

export default function DesktopFooter() {
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

  const footerItems = footerData.map((item) => {
    return (
      <div
        key={item.id}
        className={`flex flex-col gap-2.5 font-samim`}
      >
        <div
          className=" flex flex-row justify-between items-center  cursor-pointer"
        >
          <h2 className="font-semibold text-gray-800 text-[14px]">
            {item.name}
          </h2>
        </div>

        <ul className="flex flex-col gap-1.5">
          {item.items.map((it, index) => {
            return (
              <li key={index} className="text-sm text-gray-600 font-medium">
                <a href="#">{it}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  return (
    <div className=" bg-gray-100/40 pb-20 pt-5 px-6">
      <Link className="text-2xl font-samim font-extrabold bg-linear-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent">
        دیجیتال لند
      </Link>

      <div className="flex w-full justify-between px-30 gap-2.5  mt-6 mb-2">
        {footerSvg.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center gap-2">
              <img
                src={item.image}
                alt={item.alt}
                className="w-13.5 h-13.5 md:w-15 md:h-15"
              ></img>
              <span className="font-samim text-[10px] sm:text-sm font-medium text-gray-500 text-center">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-start gap-40 px-30 mt-10">
        
        {footerItems}
       
         {/* contact us */}
        <div className="flex flex-col gap-2">
          <h2 className="font-samim text-lg text-gray-500 font-semibold">
            ارتباط با ما
          </h2>
          <div className="flex gap-3 mt-3">
            <a className="cursor-pointer">
              <BaleIcon color={"#a1a3a8"} />
            </a>
            <a className="cursor-pointer">
              <InstagramIcon color={"#a1a3a8"} />
            </a>
            <a className="cursor-pointer">
              <LinkedInIcon color={"#a1a3a8"} />
            </a>
            <a className="cursor-pointer">
              <TwitterIcon color={"#a1a3a8"} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
