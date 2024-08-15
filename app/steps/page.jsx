import Hero from "@/components/main/Hero";
import searchNormal from "@/public/assets/icons/outline/search-normal-1.svg";
import airplane from "@/public/assets/icons/outline/airplane.svg";
import tickSquare from "@/public/assets/icons/outline/tick-square.svg";
import note from "@/public/assets/icons/outline/note-1.svg";
import cardPos from "@/public/assets/icons/outline/card-pos.svg";
import ticket2 from "@/public/assets/icons/outline/ticket-2.svg";

const steps = [
  {
    title: "البحث عن التذاكر",
    description:
      "في قسم البحث، أدخل نوع الرحلة ذهابًا وإيابًا ذهابًا وإيابًا، نقطة الانطلاق والوجهة، أدخل قسطيف المريخ وحدد عدد الركاب. اختيار الرحلة.",
    image: searchNormal,
  },
  {
    title: "اختيار الرحلة",
    description:
      "بناءً على المعلومات التي قمت بإدخالها، ستظهر نافذة تحتوي على قائمة الرحلات والأسعار. يمكنك التحقق من الرحلات الجوية المختلفة واختيار الرحلة بناءً على تفضيلاتك.",
    image: airplane,
  },
  {
    title: "اختيار المقعد",
    description:
      "بعد اختيار الرحلة يجب عليك اختيار المقعد بالمقاعد التي تريدها.",
    image: tickSquare,
  },
  {
    title: "معلومات الركاب",
    description:
      "في هذه المرحلة، عليك إدخال معلومات الركاب، وتشمل هذه المعلومات الاسم واللقب وتاريخ الميلاد ومعلومات الاتصال.",
    image: note,
  },
  {
    title: "اكد و ادفع",
    description:
      "في هذه المرحلة عليك أن تدفع ثمن التذكرة. يمكنك الدخول إلى بوابة الدفع ببطاقة مصرفية بها كلمة مرور ديناميكية، وبعد الدفع الناجح سيتم تأكيدك وإصدار تذكرة إلكترونية لك.",
    image: cardPos,
  },
  {
    title: "تلقي التذاكر",
    description:
      "بعد تأكيد الشراء، احصل على التذكرة من موقع إعادة الضبط أو قم بطباعتها.",
    image: ticket2,
  },
];
const page = () => {
  return (
    <div className="flex flex-col gap-[56px] pb-[56px]">
      <Hero />
      <h1 className="text-gray-8 h3 mx-[200px]">
        خطوات شراء تذاكر الطائرة عبر الإنترنت
      </h1>
      <div className="px-[200px] flex flex-col">
        {steps.map((step, index) => (
          <div
            key={index}
            className={
              index === steps.length - 1
                ? "flex flex-col gap-[8px] pr-[92px]"
                : "flex flex-col gap-[8px] pr-[92px] pb-[16px] border-r border-dashed border-gray-4 rounded-tr-md"
            }
          >
            <h3 className="step relative text-gray-8 h4 flex gap-[8px] items-center">
              <img src={step.image.src} style={{ filter: "brightness(0)" }} />
              {step.title}
            </h3>
            <span className="text-gray-6 body-xl">{step.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
