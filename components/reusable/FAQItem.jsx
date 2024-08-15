"use client";
import arrowDown from "@/public/assets/icons/outline/arrow-down-1.svg";
import arrowUp from "@/public/assets/icons/outline/arrow-up-2.svg";
import { useEffect, useRef, useState } from "react";
const FAQItem = ({ title, description, style }) => {
  const [extended, setExtended] = useState(false);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const arrowDownRef = useRef(null);
  const arrowUpRef = useRef(null);
  useEffect(() => {
    if (extended) {
      descriptionRef.current.classList.remove("description-hidden");
      titleRef.current.classList.add("text-main", "h6");
      titleRef.current.classList.remove("text-gray-8", "h7");
      arrowDownRef.current.classList.add("hidden");
      arrowUpRef.current.classList.remove("hidden");
      descriptionRef.current.classList.add(
        "description-visible",
        "transition-all"
      );
    } else {
      descriptionRef.current.classList.remove(
        "description-visible",
        "transition-all"
      );
      titleRef.current.classList.remove("text-main", "h6");
      titleRef.current.classList.add("text-gray-8", "h7");
      arrowDownRef.current.classList.remove("hidden");
      arrowUpRef.current.classList.add("hidden");
      descriptionRef.current.classList.add("description-hidden");
    }
  }, [extended]);
  return (
    <div
      key={title}
      style={style}
      className="px-[16px] py-[16px]  border border-gray-2 flex flex-col gap-[8px] relative cursor-default"
      onClick={() => setExtended(!extended)}
    >
      <div
        ref={titleRef}
        className=" text-gray-8 h7 flex justify-between z-10 transition-all"
      >
        <span>{title}</span>
        <img
          ref={arrowDownRef}
          src={arrowDown.src}
          alt="arrow down"
          className="cursor-pointer"
        />
        <img
          ref={arrowUpRef}
          src={arrowUp.src}
          alt="arrow down"
          className="cursor-pointer hidden"
        />
      </div>
      <div
        ref={descriptionRef}
        className="body-xl text-gray-6 px-[32px] description-hidden z-[5] transition-all"
      >
        {description}
      </div>
    </div>
  );
};
export default FAQItem;
