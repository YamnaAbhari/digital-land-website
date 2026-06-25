import React, { useEffect, useState } from "react";
import FetchData from "../../Utils/FetchData";
import MainSlider from "./MainSlider";
import DiscountProduct from "./DiscountProduct";
import CategorySection from "./CategorySection";
import PopularBrands from "./PopularBrands";

export default function Home() {
  return(
  <>
  <MainSlider/>
  <DiscountProduct/>
  <CategorySection/>
  <PopularBrands/>
  </>
  )
}






