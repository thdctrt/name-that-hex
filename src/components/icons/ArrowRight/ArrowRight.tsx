import React from "react";

interface ArrowRightProps {
  strokeColor: string;
  width?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ strokeColor, width }) => {
  return (
    <svg
      width="160"
      height="40"
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 20H151" stroke={strokeColor || "black"} strokeWidth="8" />
      <path
        d="M137 3.5L153.5 20L137.5 36"
        stroke={strokeColor || "black"}
        strokeWidth="8"
      />
    </svg>
  );
};

export default ArrowRight;
