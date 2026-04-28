import React, { useEffect, useState } from "react";
import FetchData from "../../../Utils/FetchData";
import notify from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import useFormFields from "../../../Hooks/useFormFields";
import usePasswordVisibility from "../../../Hooks/usePasswordVisibility";
import { BiArrowBack } from "react-icons/bi";

export default function ForgetPass({ handlePage }) {

  // handle Inputs
  const [fields, handleChange] = useFormFields({
    phoneNumber: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { phoneNumber, newPassword, confirmNewPassword } = fields;

  //handle Password Visibility
  const [passVisibility, handlePassVisibility] = usePasswordVisibility({
    newPassword: false,
    confirmNewPassword: false,
  });

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);



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

    if (!phoneNumber.trim()) {
      notify("error", "Please enter your phone number.");
      setLoading(false);
      return;
    }

    if (!code.trim()) {
      notify("error", "Please enter the verification code.");
      setLoading(false);
      return;
    }

    if (!newPassword.trim()) {
      notify("error", "Please enter a new password.");
      setLoading(false);
      return;
    }

    if (!confirmNewPassword.trim()) {
      notify("error", "Please Confirm a new password.");
      setLoading(false);
      return;
    }

    const result = await FetchData("auth/forget-password", {
      meyhod: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ phoneNumber, code, newPassword }),
    });
    if (!result.success) {
      notify("error", error.message);
      setLoading(false);
      return;
    }
    notify("success", error.message);
    setLoading(false);
    handlePage("firstStep");
  };

  const resendCode = async () => {
    const result = await FetchData("auth/resend-code", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    notify(result.success ? "success" : "error", result.message);
    setTimer(120);
    setResendDisabled(true);
    setCode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center max-w-md w-full rounded-xl  bg-white space-y-6 p-8 font-samim ring-1 ring-gray-200 shadow-md "
      >
        <div className="flex flex-row-reverse justify-between items-center w-full mt-4 mb-8">
          <span
            onClick={() => {
              handlePage("firstStep");
            }}
            className="text-teal-700 font-medium cursor-pointer hover:text-teal-600 transition-all"
          >
            <BiArrowBack className="text-[22px]"/>
          </span>
          <h1 className="font-bold text-2xl">تغییر رمز عبور</h1>
        </div>
        <div className="space-y-4 w-full">

          <div className="flex flex-col gap-2.5">
            <p className="text-[13px] ">برای تغییر رمز عبور، شماره موبایل خود را وارد کنید.</p>
          <input
            type="text"
            autoComplete="tel"
            value={fields.phoneNumber}
            name="phoneNumber"
            onChange={handleChange}
            className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm"
          ></input>
          </div>

          <div className="flex flex-row-reverse items-center justify-between gap-4 w-full">
            <OTPInput
              value={code}
              onChange={setCode}
              numInputs={6}
              containerStyle={{
    direction: "ltr",
    display: "flex",
    justifyContent: "space-between",
    
   
  }}
              inputStyle="w-[12%]!  h-7 sm:w-[12%]! sm:h-9 text-center text-[14px] sm:text-[16px] font-semibold rounded-lg  ring-1 ring-gray-400 focus:ring-teal-700 outline-none transition-all select-none! user-select-none!"
              isInputNum={true}
              renderInput={(props) => <input {...props} style={{direction: "ltr"}}/>}
            />

            <button
              type="button"
              onClick={resendCode}
              disabled={resendDisabled || !phoneNumber.trim()}
              className={`flex-2 px-3.5 py-1.5 rounded-lg font-medium text-[12px] ${resendDisabled || !phoneNumber.trim() ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-teal-50 text-teal-600 hover:text-teal-700 cursor-pointer"} whitespace-nowrap`}
            >
              {resendDisabled ? `${formatTimer(timer)}` : "ارسال کد"}
            </button>
          </div>

<div className="mt-5">
  <p className="text-[13px] mb-2.5">رمز عبور جدید</p>
          <div className="relative">
            <input
              type={passVisibility.newPassword ? "text" : "password"}
              value={fields.newPassword}
              name="newPassword"
              onChange={handleChange}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm "
            ></input>
          

              <button
              type="button"
              onClick={() => handlePassVisibility('newPassword')}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.newPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
          </div>

<div className="mt-5">
  <p className="text-[13px] mb-2.5">تکرار رمز عبور جدید</p>
          <div className="relative">
            <input
              type={passVisibility.confirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              name="confirmNewPassword"
              onChange={handleChange}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm"
            ></input>

            <button
              type="button"
              onClick={() => handlePassVisibility("confirmNewPassword")}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.confirmNewPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !code ||
              !phoneNumber ||
              !newPassword ||
              newPassword !== confirmNewPassword
            }
            className={`w-full h-11 bg-teal-700  text-white font-medium rounded-lg text-sm disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-4 ${loading || !code ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} cursor-pointer`}
          >
            {loading ? "تغییر رمز عبور..." : "تغییر رمز عبور"}
          </button>
        </div>
      </form>
    </div>
  );
}
