"use client";
import addSquare from "@/public/assets/icons/bold/add-square.svg";
import minusSquare from "@/public/assets/icons/bold/minus-square.svg";

const PersonsNbrMenu = ({
  passengers,
  setPassengers,
  title,
  description,
  min,
  max,
}) => {
  const handleChange = (operation) => {
    if (operation === "plus") {
      setPassengers(passengers + 1);
    } else {
      if (passengers > 0) {
        setPassengers(passengers - 1);
      }
    }
  };
  return (
    <div className="rounded-[8px] bg-white z-10 p-[24px] flex flex-col gap-[16px] min-w-[340px]  text-gray-8">
      <div className="flex justify-between items-center ">
        <div className="flex-1 body-md">{title}</div>
        <div className="flex-1 text-nowrap body-sm">({description})</div>
        <div className="flex-1 flex gap-[16px] items-center">
          <button disabled={min} onClick={() => handleChange("minus")}>
            <img src={minusSquare.src} className="text-gray-7 icon-filter" />
          </button>
          <div className="h5">{passengers}</div>
          <button
            disabled={max}
            onClick={() => handleChange("plus")}
            className="disabled:text-gray-7 icon-filter"
          >
            <img src={addSquare.src} className="text-gray-7 icon-filter" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonsNbrMenu;
