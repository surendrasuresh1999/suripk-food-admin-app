import React from "react";
import nodataImg from "../assets/No data-pana (3).svg";

const NodataFound = ({ subTitle }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 pt-10">
      <img
        src={nodataImg}
        alt="no-data-img"
        className="h-44 object-cover object-center sm:h-64"
      />
      <h1 className="text-18size font-bold text-gray-900 dark:text-white sm:text-22size">
        No data found
      </h1>
      <p className="text-16size font-medium tracking-wide text-gray-500 dark:text-white">
        {subTitle}
      </p>
    </div>
  );
};

export default NodataFound;
