import cardPos from "@/public/assets/icons/bulk/card-pos.svg";
import headphone from "@/public/assets/icons/bulk/headphone.svg";
import globalSearch from "@/public/assets/icons/bulk/global-search.svg";
import monitorMobbile from "@/public/assets/icons/bulk/monitor-mobbile.svg";
const data = [
  { title: "سهولة الوصول وراحة تامة", image: monitorMobbile },
  { title: "استجابة على مدار الساعة", image: headphone },
  { title: "خدمات متاحة عبر الإنترنت", image: globalSearch },
  { title: "أدنى أسعار لشراء التذاكر", image: cardPos },
];

const Advantages = () => {
  const advantages = data.map((advantage, index) => {
    return (
      <div key={index} className="flex flex-col items-center gap-[32px] ">
        <div className="w-[96px] h-[96px] rounded-[24px] bg-white border border-tint-5 flex items-center justify-center px-[16px]">
          <img src={advantage.image.src} alt="advantage" className="w-full" />
        </div>
        <div className="text-shade-4 h5">{advantage.title}</div>
      </div>
    );
  });
  return (
    <div className="bg-tint-1 py-[32px] flex justify-center gap-[110px] h5">
      {advantages}
    </div>
  );
};
export default Advantages;
