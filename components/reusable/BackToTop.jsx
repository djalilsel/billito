"use client";
import arrowCircleUp from "@/public/assets/icons/outline/arrow-circle-up.svg";

const BackToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center gap-[16px] text-gray-8 body-sm">
      <img
        src={arrowCircleUp.src}
        alt="arrow up"
        onClick={handleScrollToTop}
        className="cursor-pointer"
      />
      <div>العودة الى الاعلى</div>
    </div>
  );
};
export default BackToTop;
