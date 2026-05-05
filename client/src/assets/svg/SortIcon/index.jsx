



import React from "react";

const SortIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    style={{ fill: color }}
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 15.793L3.707 13.5l-1.414 1.414 4 4a1 1 0 001.414 0l4-4-1.414-1.414L8 15.793V5H6v10.793zM22 5H10v2h12V5zm0 4H12v2h10V9zm0 4h-8v2h8v-2zm-6 4h6v2h-6v-2z"
    />
  </svg>
);

export default SortIcon;