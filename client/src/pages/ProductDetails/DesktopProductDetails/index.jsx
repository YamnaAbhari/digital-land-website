

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FetchData from "../../../Utils/FetchData";
import Loading from "../../../Components/Loading";
import { colorMap, colorMapById, colorNameById } from "../../../data/colorMap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../Store/CartSlice";
import { BiPlus, BiTrash } from "react-icons/bi";
// import Loading from "../../../Components/Loading";



export default function DesktopProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productVariant, setProductVariant] = useState();
  const [currentImage, setCurrenImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const formattedPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await FetchData(`products/${id}`);
      const productRes = res?.data[0];
      setProduct(productRes);
      setLoading(false);
      productRes?.productVariantIds?.forEach((item) => {
        if (item._id.toString() == id.toString()) {
          setProductVariant(item);
        }
      });

      if (!productVariant && productRes?.productVariantIds?.length) {
        setProductVariant(productRes?.productVariantIds[0]);
      }
      //  console.log(productRes)
    })();
  }, [id]);

  const imgItems = product?.images?.map((image, index) => {
    return (
      <button
        key={index}
        onClick={() => {
          setCurrenImage(index);
        }}
        className=" xl:w-25 xl:h-25 w-20 h-20 rounded-xl overflow-hidden border  border-gray-200 transition transform shrink-0 cursor-pointer"
      >
        <img
          src={import.meta.env.VITE_BASE_FILE + image}
          alt="تصویر یافت نشد"
          className=" border-gray-200"
        ></img>
      </button>
    );
  });


  // color variant
  const productVariantItems = product?.productVariantIds?.map((prv) => {
    const bgColor = colorMapById[prv.variantId] || "#cccccc";
    const isSelected = productVariant?._id == prv._id;

    return (
      <div
        key={prv._id}
        onClick={() => setProductVariant(prv)}
        className={`
          w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-200 
          ${isSelected ? "border-teal-200 shadow-md ring-2 ring-indigo-100" : "border border-gray-300 hover:scale-105"}
        `}
        style={{ backgroundColor: bgColor }}
      />
    );
  });

  const selectedVariantData = product?.productVariantIds?.map((vrData) => {
    if (productVariant?._id !== vrData?._id) {
      return null;
    }

    const cartQuantity =
      items?.find((item) => item?._id == vrData._id)?.cartQuantity || 0;

    return (
      <div key={vrData?._id} className="flex flex-col gap-2 mt-3.5">
        {vrData?.discountPercent > 0 && (
          <div className="flex justify-end gap-2">
            <del className="font-samim text-sm text-gray-600 font-medium">
              {" "}
              {formattedPrice(vrData?.price)}{" "}
            </del>

            <span className="w-10 h-5 py-0.5 flex items-center justify-center bg-teal-600 text-[12px] font-samim text-white rounded-[14px]">
              {vrData?.discountPercent}%
            </span>
          </div>
        )}

        {vrData?.discountPercent > 0 ? (
          <h2 className="flex w-full gap-0.5 justify-end items-center font-samim text-lg font-bold text-gray-700">
            {formattedPrice(vrData?.priceAfterDiscount)}
            <span className="text-sm font-samim ">تومان</span>
          </h2>
        ) : vrData?.price > 0 ? (
          <h2 className="flex w-full gap-0.5 justify-end items-center font-samim text-lg font-bold text-gray-700">
            {formattedPrice(vrData?.price)}
            <span className="text-sm font-samim ">تومان</span>
          </h2>
        ) : (
          <h2>ناموجود</h2>
        )}

        {cartQuantity == 0 ? (
          <button
            className="w-74.75 h-12 rounded-lg bg-teal-600 text-white font-samim font-medium cursor-pointer"
            onClick={() => {
              dispatch(addToCart({ ...vrData, productId: product }));
            }}
          >
            افزودن به سبد خرید
          </button>
        ) : (
          <div className="flex gap-3 items-center">
            <div className="flex gap-3  items-center justify-center w-25.5 h-11 rounded-lg border border-gray-300 mt-2">
              <button
                onClick={() => {
                  dispatch(addToCart({ ...vrData, productId: product }));
                }}
                disabled={cartQuantity == vrData.quantity}
                className="text-[20px] text-teal-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <BiPlus />
              </button>
              <span className="font-samim font-bold text-gray-600">{cartQuantity}</span>

              <button
                className="text-[18px] text-teal-600 cursor-pointer "
                onClick={() => {
                  dispatch(removeFromCart(vrData?._id));
                }}
              >
                <BiTrash />
              </button>
            </div>
            <p
              onClick={() => navigate("/cart")}
              className="font-samim text-sm font-bold cursor-pointer text-teal-600"
            >
              مشاهده سبد خرید
            </p>
          </div>
        )}
      </div>
    );
  });

  const informationItems = product?.information.map((item, index) => {
    return (
      <div
        key={index}
        className="flex flex-col justify-center gap-1 w-full xl:h-15.5 h-17 rounded-lg bg-gray-200/70 px-3"
      >
        <h2 className="font-samim font-bold text-gray-600 text-[12px]">
          {item?.key}
        </h2>
        <p className="font-samim font-bold text-gray-800 text-[13px]">
          {item?.value}
        </p>
      </div>
    );
  });

  if (!product) return <Loading />;
  return (
    <div className="flex justify-start mx-15">
    <div className="mt-45 mb-20 px-4 w-full flex gap-5">
      {/* product images */}
      <div>
        <div className=" flex flex-col items-center gap-4">
          <img
            src={import.meta.env.VITE_BASE_FILE + product?.images[currentImage]}
            className="xl:w-150 w-100 "
          ></img>
          <div className="flex gap-2">{imgItems}</div>
        </div>
      </div>

      {/* product information */}
      <div className="w-full flex flex-col gap-4 ">
        {/* title */}
        <div className="flex flex-col gap-2 ">
          <h3 className="font-bold font-samim text-[16px] text-teal-600">{`${product?.brandId?.title} / ${product?.categoryId.title}`}</h3>
          <h2 className="font-bold font-samim text-[18px] text-gray-700">
            {product?.title}
          </h2>
        </div>

        <div className="xl:w-[75%] w-[90%]">
          {/* products variant */}

          <div className="border-t border-gray-300">
            <div className="mt-4">
              <h3 className="text-[18px] font-bold font-samim">
                ⭐ {product?.avgRating}{" "}
                <span className="font-samim text-gray-500 font-bold text-[14px]">{`( امتیاز ${product?.ratingCount} خریدار )`}</span>
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex mt-3 ">
                <h2 className="font-samim font-semibold text-[16px] text-gray-600">
                  رنگ:
                </h2>
                {product?.productVariantIds?.map((vr) => {
                  const isSelected = productVariant?._id == vr?._id;
                  return (
                    <div key={vr?._id}>
                      <span className="font-samim font-semibold text-[16px] text-gray-600">
                        {isSelected && colorNameById[vr.variantId]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className=" flex flex-wrap gap-2">{productVariantItems}</div>

              <div className="flex justify-end">{selectedVariantData}</div>
            </div>
            
            <div className="flex flex-col gap-3 mt-8">
              <h2 className="font-samim text-lg font-semibold">ویژگی ها</h2>
            <div className="grid lg:grid-cols-3 grid-cols-2  gap-2 ">
              {informationItems}
            </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <h2 className="font-samim text-lg font-semibold">معرفی</h2>
              <p className="font-samim text-sm text-gray-500 font-semibold">{product?.description}</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
    </div>
  );
}










// ۱. پیدا کردن واریانت انتخاب شده
// const selectedVariant = product?.productVariantIds?.find(
//   (vrData) => vrData._id === productVariant?._id
// );

// // ۲. اگر واریانتی پیدا شد، رندر کن، اگر نه چیزی نشون نده
// const productVariants = selectedVariant ? (
//   <div key={selectedVariant._id} className="flex flex-col gap-2">
//     {/* نمایش تخفیف */}
//     {selectedVariant?.discountPercent > 0 && (
//       <div className="flex justify-end gap-2">
//         <span className="w-10 h-5 py-0.5 flex items-center justify-center bg-teal-600 text-[12px] font-samim text-white rounded-[14px]">
//           {selectedVariant?.discountPercent}%
//         </span>
//         <del> {formattedPrice(selectedVariant.price)} </del>
//       </div>
//     )}

//     {/* نمایش قیمت نهایی */}
//     {selectedVariant?.discountPercent > 0 ? (
//       <h2>
//         {formattedPrice(selectedVariant.priceAfterDiscount)}
//         <span>تومان</span>
//       </h2>
//     ) : selectedVariant?.price > 0 ? (
//       <h2>
//         {formattedPrice(selectedVariant.price)}
//         <span>تومان</span>
//       </h2>
//     ) : (
//       <h2>ناموجود</h2>
//     )}
//   </div>
// ) : null; // اگر واریانتی انتخاب نشده، null برگردون

// ۲. بخش جدول مشخصات (تغییر اصلی اینجاست)
// فقط واریانتی که انتخاب شده رو برمی‌گردونیم
// const selectedVariantData = product?.productVariantIds?.find(
//   (e) => e._id === productVariant?._id
// );

// const productVariants = selectedVariantData
//   ? [
//       // اگر واریانتی انتخاب شده، یک آرایه با یک آیتم برمی‌گردونیم
//       (() => {
//         const e = selectedVariantData;
//         const cartQuantity = items?.find((item) => item._id === e._id)?.cartQuantity || 0;

//         return (
//           <div
//             key={e._id}
//             className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs sm:text-sm px-3 py-2 rounded-xl border border-indigo-500 bg-indigo-50 shadow-sm"
//           >
//             <p className="text-gray-700">
//               Qty: <span className="font-medium">{e.quantity}</span>
//             </p>
//             <p className="text-gray-700">
//               Price: <span className="font-medium">{e.price}</span>
//             </p>
//             <p className="text-gray-700">
//               Off: <span className="font-medium">{e.discountPercent}%</span>
//             </p>
//             <p className="text-emerald-600 font-semibold">
//               Final: {e.priceAfterDiscount}
//             </p>
//             <p className="text-gray-500">Sold: {e.boughtCount}</p>

//             {cartQuantity === 0 ? (
//               <button
//                 disabled={cartQuantity === e.quantity}
//                 className="bg-blue-400 disabled:opacity-20 text-white rounded-lg px-3 py-2 hover:bg-blue-500 transition"
//                 onClick={() => dispatch(addToCart({ ...e, productId: product }))}
//               >
//                 Add
//               </button>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <button
//                   className="bg-red-400 text-white rounded-lg px-2 py-1 hover:bg-red-500 transition"
//                   onClick={() => dispatch(removeFromCart(e._id))}
//                 >
//                   -
//                 </button>
//                 <span className="font-medium">{cartQuantity}</span>
//                 <button
//                   disabled={cartQuantity === e.quantity}
//                   className="bg-green-400 disabled:opacity-20 text-white rounded-lg px-2 py-1 hover:bg-green-500 transition"
//                   onClick={() => dispatch(addToCart({ ...e, productId: product }))}
//                 >
//                   +
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       })()
//     ]
//   : [];
