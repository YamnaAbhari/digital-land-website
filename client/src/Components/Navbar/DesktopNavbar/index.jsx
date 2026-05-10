import React, { use, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import FetchData from "../../../Utils/FetchData";
import { NoScroll } from "../../../Utils/NoScroll";

export default function DesktopNavbar() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [searchInp, setSearchInp] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  const cartLength=useSelector(state=>state.cart.items).length

  useEffect(() => {
    (async () => {
      if (searchInp.length < 3) return;
      setLoading(true);
      const result = await FetchData(`search?q=${searchInp}`);
      setLoading(false);
      if (!result.success) {
        setSearchResult("notFound");
      } else {
        setSearchResult(result.data);
      }
    })();
  }, [searchInp]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".searchInp")) {
        setSearchInp("");
        setSearchResult(null);
      }
    });
  }, []);

  useEffect(() => {
    NoScroll(searchResult);
  }, [searchResult]);

  const categoryItems = searchResult?.categories?.map((item) => (
    <div
      key={item._id}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() =>
        navigate(`/products/${item._id}/${item.title.replaceAll(" ", "-")}`)
      }
    >
      <img
        src={import.meta.env.VITE_BASE_FILE + item.image}
        className="w-10 h-10 rounded-md object-cover"
      />
      <span className="text-sm font-medium text-gray-700">{item.title}</span>
    </div>
  ));

  const productsItems = searchResult?.products?.map((item) => (
    <div
      key={item._id}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
      onClick={() =>
        navigate(
          `/product-details/${item._id}/${item.title.replaceAll(" ", "-")}`,
        )
      }
    >
      <img
        src={import.meta.env.VITE_BASE_FILE + item.images[0]}
        className="w-10 h-10 rounded-md object-cover"
      />
      <span className="text-sm font-medium text-gray-700">{item.title}</span>
    </div>
  ));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const SCROLL_DOWN_THRESHOLD_PX = 50;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > SCROLL_DOWN_THRESHOLD_PX
      ) {
        setIsSubNavVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsSubNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <nav className=" fixed top-0 left-0 right-0 z-40 w-full h-17 bg-white flex items-center justify-between px-5">
        <div className="flex">
          <div>
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-samim font-extrabold bg-linear-to-r from-indigo-500 to-teal-500 bg-clip-text text-transparent"
            >
              دیجیتال لند
            </Link>
          </div>

         {/* search */}
          <div className="relative px-4 w-150 searchBox">
            <div>
              <input
                type="text"
                value={searchInp}
                onChange={(e) => setSearchInp(e.target.value)}
                placeholder="جستجو در دیجیتال لند"
                className="w-150 bg-[#f0f0f1] h-11 rounded-full pr-10 pl-4 placeholder:text-[15px] outline-0 focus:ring-1 focus:ring-gray-300 transition-all font-samim"
              />
            </div>

            {/* search results */}
            {searchInp && (
              <div className="absolute top-12 w-full bg-white border border-gray-200 shadow-xl rounded-xl p-3 max-h-72 overflow-y-auto animate-fadeIn search-box">
                {searchInp.length >= 3 && !searchResult && loading && (
                  <p className="text-center text-gray-400 py-2 text-sm font-samim font-medium">
                    در حال جستجو...
                  </p>
                )}

                {categoryItems?.length > 0 && (
                  <div className="flex flex-col w-full gap-3 mt-4">
                    <h3 className="text-sm text-gray-800 font-samim font-medium">
                      دسته بندی
                    </h3>
                    <div className="flex flex-col gap-2">{categoryItems}</div>
                  </div>
                )}

                {productsItems?.length > 0 && (
                  <div className="flex flex-col w-full gap-3 mt-4">
                    <h3 className="text-sm text-gray-800 font-samim font-medium">
                      محصولات
                    </h3>
                    <div className="flex flex-col gap-2">{productsItems}</div>
                  </div>
                )}

                {searchResult === "notFound" && (
                  <p className="text-center text-gray-400 py-2 text-sm font-samim font-medium">
                    نتیجه ای یافت نشد
                  </p>
                )}
              </div>
            )}

            <div className="absolute top-1/2 -translate-y-1/2 px-4">
              <BiSearch className="text-xl text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse items-center gap-5">
          {/* <div> */}
            {/* Cart Icon */}
            <div onClick={()=>{navigate('/cart')}} className="relative">
            {cartLength!==0 && <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded-full">{cartLength}</span>}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 cursor-pointer"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z"
                />
              </svg>
              </div>
            </div>
          {/* </div> */}

          {/* Login & Register Button */}
          {token ? (
            <Link
              to={"/profile"}
              className="text-gray-700  text-xl transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 "
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="h-10 flex flex-row items-center gap-2 px-4 rounded-md  ring-1 ring-gray-300 cursor-pointer"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-700"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 15h-2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v2h2V7a4 4 0 00-4-4H6a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-2zm6-4H9.414l2.293-2.293-1.414-1.414-4 4a1 1 0 000 1.414l4 4 1.414-1.414L9.414 13H22v-2z"
                  />
                </svg>
              </div>
              <p className="font-samim font-bold text-[14px]">ورود | ثبت نام</p>
            </button>
          )}
        </div>
      </nav>

      {/* Sub Navbar */}
      <nav
        className={`fixed left-0 right-0  z-30 ${isSubNavVisible ? "top-17" : "top-0"} bg-white border-b border-b-gray-200 w-full h-10 transition-all duration-300 ease-in-out`}
      >
        <div className="max-w-7xl  h-full flex items-center ">
          <MegaMenu />

          <div className="ml-auto flex">
            <div
              className="group relative mr-6 font-samim cursor-pointer py-2"
              onClick={() => {
                navigate("/");
              }}
            >
              <h2 className="">خانه</h2>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-700 transition-all duration-300 group-hover:w-full "></span>
            </div>

            <div
              className="group relative mr-6 font-samim group cursor-pointer py-2"
              onClick={() => navigate("/products/all/all-category")}
            >
              <h2 className="">همه محصولات</h2>
              <span className=" absolute bottom-0 left-0 w-0 h-0.5 bg-teal-700 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div className="group relative mr-6 font-samim group cursor-pointer py-2">
              <h2 className="">درباره ما</h2>
              <span className=" absolute bottom-0 left-0 w-0 h-0.5 bg-teal-700 transition-all duration-300 group-hover:w-full"></span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
