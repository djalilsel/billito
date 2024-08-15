"use client";
import Contact from "@/components/Contact";
import Location from "@/components/Location";
import NavItem from "@/components/reusable/NavItem";
import { heroImg } from "@/public/assets";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();

  const aboutus = useRef(null);
  const contactus = useRef(null);
  const [active, setActive] = useState(
    searchParams.get("page") === "contactus" ? contactus : aboutus
  );

  useEffect(() => {
    aboutus.current.classList.remove("text-main", "border-main");
    contactus.current.classList.remove("text-main", "border-main");
    active.current.classList.remove("border-main", "border-white", "text-main");
    active.current.classList.add("border-main", "text-main");
  }, [active]);

  return (
    <div className="flex flex-col gap-[56px]">
      <div className="relative">
        <img
          src={heroImg.InsuranceWeb340homepage.src}
          alt="hero"
          className="w-full "
        />
        <div className="absolute w-full top-[20%] flex px-[260px] text-white hero">
          سافر معنا إلى طريق الراحة والسرعة والخدمة التي لا مثيل لها
        </div>
      </div>
      <div>
        <div className="mx-[200px] mb-[32px] flex text-gray-5 border-b-2 border-gray-2 w-fit">
          <NavItem
            text="معلومات عنا"
            reff={aboutus}
            handleActive={() => setActive(aboutus)}
            icon={false}
            style="px-[16px]"
          />
          <NavItem
            text="اتصل بنا"
            reff={contactus}
            handleActive={() => setActive(contactus)}
            icon={false}
            style="px-[16px]"
          />
        </div>
        {active === aboutus && (
          <div className="px-[200px] pb-[80px] flex flex-col gap-[32px]">
            <div className="body-xl text-gray-7">
              نحن في بيليتو نفخر بكوننا أحد رواد صناعة الطيران ونقدم خدمات فريدة
              لمسافرينا الأعزاء مع فريق من الخبراء المحترفين في مجال الطيران،
              ونوفر أفضل الظروف والخبرة لرحلاتكم.
            </div>
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-gray-8 h4 flex gap-[8px] items-center">
                  أهدافنا
                </h3>
                <span className="text-gray-6 body-xl">
                  هدفنا الرئيسي في Bilito هو تقديم خدمات عالية الجودة ومعيارية
                  على المستوى الدولي. من خلال التركيز على رضا عملائنا، نحاول
                  تحويل تجربة سفرك إلى تجربة فاخرة وغير معروفة. تتم بأفضل طريقة
                  ممكنة.
                </span>
              </div>
              <div className="flex flex-col gap-[8px]">
                <h3 className="text-gray-8 h4 flex gap-[8px] items-center">
                  خدماتنا
                </h3>
                <span className="text-gray-6 body-xl">
                  في بيليتو، أعددنا لك سلسلة من الخدمات المذهلة، بدءًا من الحجز
                  السريع والسهل عبر الإنترنت وحتى الرحلات المريحة والمرافق
                  الفاخرة على متن الطائرة. كل تفاصيل رحلتك تحت سيطرتنا. نحن
                  متواجدون أيضًا مع فريق الدعم لدينا لمساعدتك في أي مشاكل أو
                  أسئلة.
                </span>
              </div>
            </div>
            <div className="body-xl text-gray-8 mt-[32px]">
              شكرًا لاختيارك السفر مع بيليتو، نتطلع إلى خدمتك ونأمل أن نقدم لك
              تجربة سفر رائعة.
            </div>
          </div>
        )}
        {active === contactus && (
          <div className="flex flex-col gap-[48px] px-[300px] mb-[48px]">
            <div className="body-xl text-gray-8">
              نحن في Bilito Group نقدر دائمًا تعليقاتك واقتراحاتك وأسئلتك ونتطلع
              إلى مساعدتك.
            </div>
            <Location />
            <div className="body-xl text-gray-8">
              إذا كان لديك أي أسئلة أو كنت بحاجة إلى مساعدة، يرجى استخدام
              النموذج أدناه للاتصال بنا وسوف يقوم فريق الدعم لدينا بالرد عليك في
              أقرب وقت ممكن.
            </div>
            <Contact />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
