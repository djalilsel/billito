"use client";
import History from "@/public/assets/icons/outline/history.svg";
import arrowRight from "@/public/assets/icons/outline/arrow-right-3.svg";
import arrowLeft from "@/public/assets/icons/outline/arrow-left-2.svg";
import HistoryItem from "../reusable/HistoryItem";
import { useRef, useState } from "react";
const searchHistory = [
  {
    from: "الرياض",
    to: "دبي",
  },
  {
    from: "الجزائر",
    to: "باريس",
  },
  {
    from: "القاهرة",
    to: "المدينة",
  },
  {
    from: "توكيو",
    to: "بكين",
  },
  {
    from: "بني عزيز",
    to: "القرية",
  },
];

const SearchHistory = () => {
  const [localHistory, setLocalHistory] = useState(searchHistory);
  const historyRef = useRef(null);

  const scrollLeft = () => {
    if (historyRef.current) {
      historyRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (historyRef.current) {
      historyRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const deleteHistory = () => {
    setLocalHistory(null);
  };
  const deleteHistoryItem = (historyItem) => {
    const newHistory = localHistory.filter((item, i) => item !== historyItem);
    if (newHistory.length == []) {
      setLocalHistory(null);
      return;
    }
    setLocalHistory(newHistory);
  };
  const HISTORY = localHistory?.map((item, index) => (
    <HistoryItem
      key={index}
      index={index}
      item={item}
      deleteHistoryItem={deleteHistoryItem}
    />
  ));
  return (
    <div
      className={`flex-col gap-[16px] py-[32px] ${
        localHistory ? "flex" : "hidden"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex gap-[16px] text-gray-8 body-lg items-center">
          <img src={History.src} alt="history" />
          سجل البحث
        </div>
        <div
          className="text-main body-lg cursor-pointer hover:text-shade-1"
          onClick={deleteHistory}
        >
          مسح الكل
        </div>
      </div>
      <div className="flex gap-[32px]">
        <img
          src={arrowRight.src}
          alt="arrow right"
          className="rounded-[8px] p-[7px]  border border-gray-3 cursor-pointer"
          onClick={scrollRight}
        />
        <div
          ref={historyRef}
          className="flex gap-[24px] overflow-scroll no-scrollbar flex-1"
        >
          {HISTORY}
        </div>
        <img
          src={arrowLeft.src}
          alt="arrow left"
          className="rounded-[8px] p-[7px] flex items-center justify-center border border-gray-3 cursor-pointer"
          onClick={scrollLeft}
        />
      </div>
    </div>
  );
};

export default SearchHistory;
