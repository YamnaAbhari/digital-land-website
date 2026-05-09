import React from "react";
import FetchData from "../../../Utils/FetchData";
import notify from "../../../Utils/Notify";
import { BsBack } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

export default function FirstStep({
  handlePage,
  phoneNumber,
  handlePhoneNumber,
}) {
  const navigate = useNavigate();

  // back to previous page
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      notify("error", "Please enter your phone number.");
      return;
    }
    const result = await FetchData("auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });
    if (!result.success) {
      notify("error", result.message);
      return;
    }
    notify("success", result.message);
    handlePage(result.data.passwordExist ? "password" : "otp");
  };
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  max-w-md w-full rounded-xl py-8 sm:px-8 px-4 bg-white space-y-8 font-samim ring-1 ring-gray-200 shadow-md"
      >
        <div
          onClick={handleBack}
          className="flex justify-end my-4 cursor-pointer"
        >
          <BiArrowBack className="text-[22px] " />
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-2xl font-bold ">ورود | ثبت نام</h1>
          <p className=" text-gray-700 text-[14px]">
            برای ادامه، شماره تلفن خود را وارد کنید.
          </p>
        </div>
        <div className=" space-y-4 w-full">
          <input
            id="phoneNumber"
            type="tel"
            autoComplete="tel"
            required
            value={phoneNumber}
            onChange={(e) => handlePhoneNumber(e.target.value)}
            className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm text-right"
          ></input>
          <button
            type="submit"
            className="w-full h-11 bg-teal-700  text-white font-medium rounded-lg text-sm cursor-pointer hover:bg-teal-600 transition-all "
          >
            ورود
          </button>
        </div>
        <span
          onClick={() => handlePage("forgetPass")}
          className="text-teal-700 cursor-pointer text-center font-semibold text-[12px]"
        >
          رمز عبور را فراموش کرده اید؟
        </span>
      </form>
    </div>
  );
}
