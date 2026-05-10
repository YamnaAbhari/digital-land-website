import React, { useState } from "react";
import useFormFields from "../../Hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import FetchData from "../../Utils/FetchData";
import notify from "../../Utils/Notify";
import { updateUser } from "../../Store/AuthSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import usePasswordVisibility from "../../Hooks/usePasswordVisibility";

export default function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const [fields, handleChange, setFields] = useFormFields({
    fullName: user.fullName || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { fullName, oldPassword, newPassword, confirmPassword } = fields;
  const [userLoading, setUserLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const dispatch = useDispatch();
  const [passVisibility, handlePassVisibility] = usePasswordVisibility({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUserLoading(true);

    if (!fullName.trim()) {
      notify("error", "Please Enter Your Full Name");
      return;
    }

    const result = await FetchData(`users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fullName }),
    });

    if (!result.success) {
      notify("error", result.message);
      setUserLoading(false);
      return;
    }
    notify("success", result.message);
    dispatch(updateUser(result.data));
    setUserLoading(false);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPassLoading(true);

    const result = await FetchData("users/change-password", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!result.success) {
      notify("error", result.message);
      setPassLoading(false);
      setFields({
        ...fields,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    }
    notify("success", result.message);
    setPassLoading(false);
    setFields({
      ...fields,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  // console.log(token)
  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="flex flex-col items-center max-w-md w-full rounded-xl p-8  bg-white space-y-8 ring-1 ring-gray-200 shadow-md sm:mt-20">
        {/* update user section */}
        <h1 className="text-2xl font-bold">پروفایل</h1>
        <form
          onSubmit={handleUpdate}
          className="flex flex-col space-y-4 w-full font-samim"
        >
          {/* full name input */}
          <input
            type="text"
            value={fullName || user.fullName || ""}
            placeholder="Full Name"
            name="fullName"
            onChange={handleChange}
            className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm"
          ></input>

          <button
            disabled={userLoading}
            type="submit"
            className="w-full h-11 bg-teal-700  text-white font-medium  rounded-lg text-sm cursor-pointer hover:bg-teal-600 transition-all disabled:opacity-45"
          >
            {userLoading ? "بروزرسانی نام کاربری..." : "بروزرسانی نام کاربری"}
          </button>
        </form>

        {/* change password section */}
        <h1 className="text-2xl font-bold">تغییر رمز عبور</h1>

        <form
          onSubmit={changePassword}
          className="flex flex-col space-y-4 w-full"
        >
          {/* old password input */}
          <div className="relative">
            <input
              type={passVisibility.oldPassword ? "text" : "password"}
              value={oldPassword}
              name="oldPassword"
              placeholder="رمز عبور قبلی"
              onChange={handleChange}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm placeholder:text-[12px]"
            ></input>

            <button
              type="button"
              onClick={() => handlePassVisibility("oldPassword")}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.oldPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>


          {/* new password input */}
          <div className="relative">
            <input
              type={passVisibility.newPassword ? "text" : "password"}
              value={newPassword}
              name="newPassword"
              placeholder="رمز عبور جدید"
              onChange={handleChange}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm placeholder:text-[12px]"
            ></input>

            <button
              type="button"
              onClick={() => handlePassVisibility("newPassword")}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.newPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {/* confirm new password input */}
          <div className="relative">
            <input
              type={passVisibility.confirmPassword ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              placeholder="تکرار رمز عبور جدید"
              onChange={handleChange}
              className="w-full h-11 ring-1 ring-gray-300 placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-teal-700 transition-all outline-0 px-3 text-sm placeholder:text-[12px]"
            ></input>

            <button
              type="button"
              onClick={() => handlePassVisibility("confirmPassword")}
              className="absolute left-4 top-0 bottom-0 my-auto text-slate-500 cursor-pointer"
            >
              {passVisibility.confirmPassword ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />
              )}
            </button>
          </div>

          {/* change password button */}
          <button
            type="submit"
            disabled={
              passLoading ||
              !oldPassword ||
              !newPassword ||
              newPassword !== confirmPassword
            }
            className={`w-full h-11 bg-teal-700  text-white font-medium rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer  mt-4 ${passLoading ? "bg-teal-300 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"} cursor-pointer`}
          >
            {passLoading ? "تغییر رمز عبور..." : "تغییر رمز عبور"}
          </button>
        </form>
      </div>
    </div>
  );
}
