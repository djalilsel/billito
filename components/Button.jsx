import arrowDown from "@/public/assets/icons/outline/arrow-down-1.svg";

const button = ({
  size,
  color,
  text,
  text_color,
  icon,
  slider,
  style,
  action,
  disabled,
}) => {
  let styleClasses = `h-[${size}px] px-[16px] py-[8px] flex gap-[16px] items-center ${color} ${text_color} button-sm`;
  styleClasses += style ? ` ${style}` : "";
  return (
    <button
      id="button"
      className={styleClasses}
      style={{
        borderRadius: size < 40 ? "4px" : "8px",
      }}
      disabled={disabled}
      onClick={action}
    >
      <div className="flex gap-[8px]">
        {icon && <img src={icon.src} className="white-filter" alt="icon" />}
        <span>{text}</span>
      </div>
      {slider && (
        <img src={arrowDown.src} alt="arrow-down" className="white-filter" />
      )}
    </button>
  );
};

export default button;
