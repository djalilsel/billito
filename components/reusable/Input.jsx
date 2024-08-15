"use client";
import React, { useEffect, useState } from "react";
const Input = ({
  size,
  placeholder,
  value,
  setValue,
  placeholder_place,
  type,
  setMenu,
  menuRef,
  menu,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [id, setId] = useState(Math.random().toString(36).substr(2, 9));
  const direction =
    value && value.length > 0 && value.charCodeAt(0) < 127 ? "ltr" : "rtl";

  useEffect(() => {
    console.log(isFocused);
    console.log(menuRef);
    if (isFocused) {
      setMenu(menuRef);
    } else {
      setMenu(null);
    }
  }, [menu, isFocused]);

  return (
    <div className="relative text-gray-8 focus-within:text-main">
      {type === "textarea" && (
        <textarea
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`resize-none w-full ${size} px-[24px] py-[24px] ${
            placeholder_place ? placeholder_place : "items-center"
          } caption-lg border border-gray-3 rounded-[8px] hover:shadow-sm focus:outline-none focus:ring-0 focus:border-main`}
          style={{
            direction: direction ? direction : "ltr",
          }}
        />
      )}
      {type !== "textarea" && (
        <input
          type={type ? type : "text"}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full ${size} px-[24px] py-[24px] ${
            placeholder_place ? placeholder_place : "items-center"
          } caption-lg border border-gray-3 rounded-[8px] hover:shadow-sm focus:outline-none focus:ring-0 focus:border-main`}
          style={{
            direction: direction ? direction : "ltr",
          }}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute right-4 ${
          placeholder_place ? "top-[24px]" : "top-1/2"
        } transform px-1 -translate-y-1/2 transition-transform duration-200 cursor-text caption-lg  ${
          isFocused || value ? "top-0 -translate-y-[150%] bg-white" : ""
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};
export default Input;
