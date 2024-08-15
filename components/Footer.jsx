import { socialIcons, logos, paymentIcons } from "@/public/assets";
import BackToTop from "./reusable/BackToTop";
import Link from "next/link";
const data = [
  {
    text: "Play store",
    icon: socialIcons.PsNoBg,
  },
  {
    text: "App store",
    icon: socialIcons.AsNoBg,
  },
];

const Footer = () => {
  const BUTTONS = data.map((item) => (
    <button
      key={item.text}
      className="flex items-center gap-[32px] rounded-[4px] h5 py-[8px] px-[16px] bg-shade-2 text-white h-full"
    >
      <span className="text-nowrap">{item.text}</span>
      <img src={item.icon.src} alt={item.text} />
    </button>
  ));
  return (
    <footer className="flex flex-col gap-[32px] py-[24px] px-[200px] bg-gray-1">
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-[8px] col-span-3">
          <div className="h5 text-gray-8">تطبيق بيليتو</div>
          <div className="body-xl text-gray-7">
            يمكنك الاستمتاع بسهولة وسرعة حجز تذاكر الطائرة، عن طريق تثبيت تطبيق
            بيليتو
          </div>
        </div>
        <div className="flex gap-[24px]">{BUTTONS}</div>
      </div>
      <hr />
      <div className="grid grid-cols-4">
        <div className="flex flex-col justify-between col-span-3">
          <div className="text-gray-7 body-xl flex flex-col gap-[32px]">
            <img src={logos.LBlue.src} className="w-fit" />
            <div>رقم هاتف الدعم: 021-32547698</div>
            <div>عنوان المكتب الرئيسي في سطيف، بارك مول، الطابق 3.</div>
          </div>
          <div className="flex flex-col gap-[8px] mr-[60px]">
            <div className="flex gap-[24px]">
              <img
                src={socialIcons.TeNoBg.src}
                alt="telegram"
                className="cursor-pointer"
              />
              <img
                src={socialIcons.LiNoBg.src}
                alt="linkedin"
                className="cursor-pointer"
              />
              <img
                src={socialIcons.YoNoBg.src}
                alt="youtube"
                className="cursor-pointer"
              />
              <img
                src={socialIcons.InNoBg.src}
                alt="instagram"
                className="cursor-pointer"
              />
              <img
                src={socialIcons.FbNoBg.src}
                alt="facebook"
                className="cursor-pointer"
              />
              <img
                src={socialIcons.TwNoBg.src}
                alt="twitter"
                className="cursor-pointer"
              />
            </div>
            <div className="body-lg text-link" style={{ direction: "ltr" }}>
              abdeldjalilselamnia@gmail.com
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="h5 text-gray-7 border-b border-gray-2 w-fit pb-[8px]">
            روابط مفيدة لبيليتو
          </div>
          <ul className="flex flex-col gap-[8px] text-gray-7 body-xl">
            <li className="cursor-pointer">معلومات عنا</li>
            <li className="cursor-pointer">اتصل بنا</li>
            <li className="cursor-pointer">إعادة التذكرة أو رد التذكرة</li>
            <Link href={"/steps"} className="cursor-pointer">
              دليل شراء التذاكر
            </Link>
            <li className="cursor-pointer">الأحكام والشروط</li>
          </ul>
          <div className="flex justify-end gap-[24px] mt-[8px]">
            <img
              src={paymentIcons.amazonPay.src}
              alt="twitter"
              className="w-[48px]"
            />
            <img
              src={paymentIcons.applePay.src}
              alt="facebook"
              className="w-[48px]"
            />
            <img
              src={paymentIcons.googlePay.src}
              alt="instagram"
              className="w-[48px]"
            />
            <img
              src={paymentIcons.payPal.src}
              alt="youtube"
              className="w-[48px]"
            />
            <img
              src={paymentIcons.stripe.src}
              alt="linkedin"
              className="w-[48px]"
            />
          </div>
        </div>
      </div>
      <hr />
      <BackToTop />
    </footer>
  );
};

export default Footer;
