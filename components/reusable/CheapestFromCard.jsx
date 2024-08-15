import airplane from "@/public/assets/icons/bold/airplane.svg";

const CheapestFromCard = ({ image, from, to, price }) => {
  return (
    <div className="border border-gray-2 rounded-[4px] flex h-[105px] flex-1">
      <img src={image} alt="city" className="rounded-r-[4px] w-[105px]" />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 border-b border-gray-2 body-md px-[16px] flex gap-[8px] items-center justify-center w-full">
          <span className="text-main">{from}</span>
          <img
            src={airplane.src}
            alt="airplane"
            className="icon-filter text-gray-7 rotate-[-90deg]"
          />
          <span className="text-gray-9">{to}</span>
        </div>
        <div className="flex-1 w-full px-[16px] flex gap-[8px] justify-center items-center">
          <div className="caption-md text-gray-6 text-nowrap">
            السعر يبدا من:
          </div>
          <span className="body-md text-gray-9">{price}</span>
          <span className="caption-md text-gray-9">يورو</span>
        </div>
      </div>
    </div>
  );
};
export default CheapestFromCard;
