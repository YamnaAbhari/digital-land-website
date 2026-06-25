import React, { useEffect, useState } from "react";
import MobileProductCard from "./MobileProductCard";
import DesktopProductCard from "./DesktopProductCard";
import { handleResize } from "../../../Utils/handleResize";

export default function ProductCard({
  image,
  title,
  price,
  priceAfterDiscount,
  discountPercent,
  id,
}) {
    const [isMobile,setIsMobile]=useState(window.innerWidth<640)
  
   useEffect(() => {
    handleResize(setIsMobile,640)
  }, []);
  return (
    <div>
      {isMobile ? (
        <MobileProductCard
          image={image}
          title={title}
          price={price}
          priceAfterDiscount={priceAfterDiscount}
          discountPercent={discountPercent}
          id={id}
        />
      ) : (
        <DesktopProductCard
          image={image}
          title={title}
          price={price}
          priceAfterDiscount={priceAfterDiscount}
          discountPercent={discountPercent}
          id={id}
        />
      )}
    </div>
  );
}
