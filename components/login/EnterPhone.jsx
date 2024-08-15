import { logos } from "@/public/assets";
import Button from "@/components/Button";
import Input from "@/components//reusable/Input";
const EnterPhone = ({ setPhone, phone, setStep }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[40px] ">
      <img src={logos.MBlue.src} alt="billito" className="w-fit" />
      <div className="text-gray-8 h7">تسجيل الدخول / إنشاء حساب</div>
      <div className="flex flex-col gap-[16px] self-start w-full">
        <div className="text-gray-7 body-sm">
          سيتم إرسال رمز التحقق إلى رقم الجوال الذي قمت بإدخاله.
        </div>
        <Input size={"h-[48px]"} placeholder={"رقم الجوال"} />
      </div>
      <div className="flex flex-col gap-[16px] self-start w-full">
        <div className="flex gap-[12px] items-center body-md text-gray-7">
          <input type="checkbox" id="customCheckbox" className="hidden peer" />
          <label
            htmlFor="customCheckbox"
            className="w-[24px] h-[24px] border border-gray-4 rounded-[8px] bg-white peer-checked:bg-main peer-checked:border-main hover:bg-gray-4 hover:border-gray-6 cursor-pointer flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden peer-checked:block w-full h-full fill-current text-white"
            >
              <path
                d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
                fill="white"
                transform="scale(1.25) translate(-2 -2)"
              />
            </svg>
          </label>
          <span>
            بتسجيل الدخول، فإنني أوافق على{" "}
            <span className="text-main cursor-pointer">قواعد بيليتو.</span>
          </span>
        </div>
        <Button
          text={"تأكيد والمتابعة"}
          color={"bg-gray-2"}
          text_color={"text-gray-5"}
          slider={false}
          style={"w-full flex justify-center"}
        />
      </div>
    </div>
  );
};
export default EnterPhone;
