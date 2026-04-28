import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center
     right-0 bottom-0 bg-white">
      <RotatingLines width={70} height={70} color="#919191" />
    </div>
  );
}
