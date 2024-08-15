"use client";
import React from "react";
import closeSquare from "@/public/assets/icons/outline/close-square.svg";

const HistoryItem = ({ item, deleteHistoryItem }) => {
  return (
    <div className="h-[40px] px-[16px] flex gap-[16px] items-center justify-center rounded-[8px] border border-gray-3 text-gray-7 caption-lg ">
      <img
        src={closeSquare.src}
        alt="close"
        className="icon-filter text-gray-7"
        onClick={() => deleteHistoryItem(item)}
      />
      <span className="text-nowrap">
        {item.from} الى {item.to}
      </span>
    </div>
  );
};

export default HistoryItem;
