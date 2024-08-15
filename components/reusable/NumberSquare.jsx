"use client";
import React, { forwardRef, useState } from "react";
const Input = forwardRef(({ size, value, setValue, onEnter }, ref) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue.replace(/\D/g, "").slice(-1));
    if (inputValue !== "") {
      onEnter();
    }
  };
  return (
    <div className="relative text-gray-8 focus-within:text-main">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        ref={ref}
        className={`w-full ${size} px-[24px] flex items-center w-full body-xl border border-gray-3 rounded-[4px] hover:shadow-sm focus:outline-none focus:ring-0 focus:border-main text-center`}
        style={{
          direction: "ltr",
        }}
      />
    </div>
  );
});
export default Input;
