"use client";
import airplane from "@/public/assets/icons/outline/airplane.svg";

const NavItem = ({ text, reff, handleActive, icon, style }) => {
  return (
    <div
      ref={reff}
      className={`cursor-pointer text-gray-7 body-xl flex gap-[8px] items-center border-b-2 relative top-[2px] ${
        style ? style : ""
      } `}
      onClick={() => handleActive(reff)}
    >
      {icon && (
        <img
          src={airplane.src}
          alt="airplane"
          className="w-[24px] h-[24px] inline-block text-gray-7"
        />
      )}
      {text}
    </div>
  );
};

export default NavItem;
