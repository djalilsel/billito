import React from "react";
import location from "@/public/assets/icons/outline/location.svg";

const SearchMenuItem = ({ city, country, setter, style }) => {
  return (
    <div
      className="flex gap-[16px] w-full justify-between items-center py-[8px] bg-white"
      onClick={() => setter(`${city}, ${country}`)}
      style={style}
    >
      <div className="flex items-start gap-[12px]">
        <img src={location.src} alt="location" />
        <div>
          <span className="body-md text-gray-8 text-nowrap">{city}</span>
          <br />
          <span className="caption-sm text-gray-8">{country}</span>
        </div>
      </div>
      <div className="caption-sm text-gray-7 text-nowrap">جميع المطارات</div>
    </div>
  );
};

export default SearchMenuItem;
