import React, { useState } from "react";
import FetchData from "../../../Utils/FetchData";
import notify from "../../../Utils/Notify";
import usePasswordVisibility from "../../../Hooks/usePasswordVisibility";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/AuthSlice";
import { BiArrowBack } from "react-icons/bi";
import Arrow from "../../../assets/svg/Arrow";

export default function LoginWithPass({ handlePage, phoneNumber }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passVisibility, handlePassVisibility] = usePasswordVisibility({
    password: false,
  });
 
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await FetchData("auth/login-password", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ phoneNumber, password }),
    });
    if (!result.success) {
      notify("error", result.message);
      setLoading(false);
      return;
    }
    notify("success", result.message);
    setLoading(false);
    dispatch(login(result.data))
  };

  const resendCode = async () => {
  const result = await FetchData("auth/resend-code", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ phoneNumber }),
  });

  notify(result.success ? "success" : "error", result.message);
    handlePage('otp');
  
};
 
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-md w-full rounded-xl   bg-white space-y-6 p-8 font-samim ring-1 ring-gray-200 shadow-md"
      >
        <div onClick={()=>navigate(-1)} className="w-full flex justify-end my-2 cursor-pointer"><BiArrowBack className="text-[22px]"/></div>
        <div className="w-full  justify-end mb-8">
          <h1 className="text-2xl font-bold">ورود با رمز عبور</h1>
        </div>

        <div className="space-y-4 w-full">
          {/* readonly input */}
          <input
            type="text"
            readOnly
            value={phoneNumber}
            className="w-full h-11 ring-1 bg-gray-100 ring-gray-300 placeholder-gray-500 rounded-lg  px-3 text-sm outline-0 cursor-not-allowed"
          ></input>

          {/* Password input  */}
          <div>
            <p className="text-[13px] mb-2.5">رمز عبور را وارد کنید</p>
          <div className="relative">
            <input
              type={passVisibility.password ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm"
            ></input>

            <button
              type="button"
              onClick={() => handlePassVisibility("password")}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.password ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
        
          </div>
          </div>

        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className={`w-full h-11 bg-teal-700  text-white font-medium rounded-lg text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${loading || !password ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} cursor-pointer`}
        >
          {loading ? "..." : "تایید"}
        </button>
           
            {/* <span
          onClick={() => handlePage("otp")}
          className="text-teal-700 cursor-pointer text-center font-semibold text-[12px]"
        >
          ورود با رمز یک بار مصرف
        </span>

         <span
          onClick={() => handlePage("forgetPass")}
          className="text-teal-700 cursor-pointer text-center font-semibold text-[12px]"
        >
          رمز عبور را فراموش کرده اید؟
        </span> */}

<div className="flex flex-col gap-2.5 w-full justify-start pr-2">
            <div
          onClick={resendCode}
          className="cursor-pointer"
        >
          <div className="flex items-center">
            <h3 className="text-sm text-teal-600 font-bold leading-none">
              ورود با رمز یک بار مصرف
            </h3>
            <Arrow className="text-teal-600 inline-block" />
          </div>
        </div>

          <div
          onClick={() => handlePage("forgetPass")}
          className="cursor-pointer"
        >
          <div className="flex items-center">
            <h3 className="text-sm text-teal-600 font-bold leading-none">
             فراموشی رمز عبور
            </h3>
            <Arrow className="text-teal-600 inline-block" />
          </div>
        </div>
        </div>

      </form>
    </div>
  );
}

