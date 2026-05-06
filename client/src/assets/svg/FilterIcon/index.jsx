import React from 'react';

const FilterIcon = ({ width = 24, height = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M5.17 6a3.001 3.001 0 005.66 0H22V4H10.83a3.001 3.001 0 00-5.66 0H2v2h3.17zM9 5a1 1 0 11-2 0 1 1 0 012 0zm7 10a3.001 3.001 0 01-2.83-2H2v-2h11.17a3.001 3.001 0 015.66 0H22v2h-3.17A3.001 3.001 0 0116 15zm1-3a1 1 0 11-2 0 1 1 0 012 0zM5.17 18H2v2h3.17a3.001 3.001 0 005.66 0H22v-2H10.83a3.001 3.001 0 00-5.66 0zM9 19a1 1 0 11-2 0 1 1 0 012 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default FilterIcon;
