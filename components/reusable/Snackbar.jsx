import closeCircle from "@/public/assets/icons/outline/close-circle.svg";
const Snackbar = ({ type, text, setDisplay }) => {
  const handleclick = (e) => {
    e.stopPropagation();
    setDisplay(false);
  };
  const styling =
    type === "success"
      ? "bg-S-light2 text-success"
      : type === "error"
      ? "bg-E-light2 text-error"
      : "bg-gray-1 text-gray-8";
  return (
    <div
      className={`px-[24px] py-[8px] w-fit rounded-[8px] border border-gray-6 overline-lg ${styling} relative`}
      onClick={handleclick}
    >
      {text}
      <img
        src={closeCircle.src}
        className="absolute right-1 top-1 w-[16px] h-[16px] cursor-pointer"
      />
    </div>
  );
};
export default Snackbar;
