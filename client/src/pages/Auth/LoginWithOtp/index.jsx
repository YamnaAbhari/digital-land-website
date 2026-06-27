import React, { useEffect, useState } from "react";
import FetchData from "../../../Utils/FetchData";
import notify from "../../../Utils/Notify";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/AuthSlice";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Arrow from "../../../assets/svg/Arrow";

export default function LoginWithOtp({ handlePage, phoneNumber }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Timer Effect: counts down when resendDisabled is true
  useEffect(() => {
    let countDown;
    if (resendDisabled && timer > 0) {
      countDown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer == 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(countDown);
  }, [resendDisabled, timer]);

  // format timer as mm:ss
  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await FetchData("auth/login-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, code }),
    });
    if (!result.success) {
      notify("error", result.message);
      setCode("");
      setLoading(false);
      return;
    }
    notify("success", result.message);
    dispatch(login(result.data));
    setLoading(false);
  };

  const resendCode = async () => {
    const result = await FetchData("auth/resend-code", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    notify(result.success ? "success" : "error", result.message);
    setCode("");
    setResendDisabled(true);
    setTimer(120);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-md w-full rounded-xl   bg-white space-y-6  p-8 font-samim ring-1 ring-gray-200 shadow-md"
      >
        <div
          onClick={() => navigate(-1)}
          className="flex justify-end w-full my-4 cursor-pointer"
        >
          <BiArrowBack className="text-[22px] " />
        </div>
        <div className="flex flex-col justify-end w-full space-y-3">
          <h1 className="text-2xl font-bold">کد تایید را وارد کنید</h1>
          <p className="font-light text-sm">
            کد تایید برای شماره{" "}
            <span className="font-medium text-[14px]">{phoneNumber}</span> ارسال
            گردید.
          </p>
        </div>

        <div className="space-y-6 w-full">
          {/* readonly input */}
          <input
            type="text"
            readOnly
            value={phoneNumber}
            className="w-full h-11 ring-1 bg-gray-100 ring-gray-300 placeholder-gray-500 rounded-lg  px-3 text-sm outline-0 cursor-not-allowed"
          ></input>

          <OTPInput
            value={code}
            onChange={setCode}
            numInputs={6}
            containerStyle={{
              direction: "ltr",
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle="w-[12%]! h-10 sm:w-[12%]! sm:h-11 text-center text-[14px] sm:text-[16px] font-semibold rounded-lg  ring-1 ring-gray-400 focus:ring-teal-700 outline-none transition-all select-none! user-select-none!"
            isInputNum={true}
            shouldAutoFocus={true}
            renderSeparator={<span></span>}
            renderInput={(props) => (
              <input {...props} style={{ userSelect: "none" }} />
            )}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !code}
          className={`w-full h-11 bg-teal-700  text-white font-medium rounded-lg text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${loading || !code ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} cursor-pointer`}
        >
          {loading ? "..." : "تایید"}
        </button>

        <div
          onClick={() => handlePage("password")}
          className="flex w-full justify-start items-center pr-2 cursor-pointer"
        >
          <div className="flex items-center">
            <h3 className="text-sm text-teal-600 font-bold leading-none">
              ورود با رمز عبور
            </h3>
            <Arrow className="text-teal-600 inline-block" />
          </div>
        </div>

        {/* Resend Code Section */}
        <div className="text-center space-y-1">
          <button
            type="button"
            onClick={resendCode}
            disabled={resendDisabled}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-[12px] mb-1.5 ${resendDisabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-teal-50 text-teal-600 hover:text-teal-700 cursor-pointer"}`}
          >
            ارسال کد
          </button>
          {resendDisabled && (
            <span className="block text-gray-600 font-medium text-[12px]">
              {formatTimer(timer)} مانده تا دریافت مجدد کد
            </span>
          )}
        </div>

        <p className="text-sm text-gray-900">
          شماره تلفن اشتباه است؟
          <span
            onClick={() => handlePage("firstStep")}
            className="mr-1 text-teal-500 cursor-pointer hover:text-teal-500 font-medium"
          >
            ویرایش شماره تلفن
          </span>
        </p>
      </form>
    </div>
  );
}
