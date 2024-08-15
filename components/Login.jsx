"use client";
import { logos } from "@/public/assets";
import Button from "@/components/Button";
import Input from "@/components//reusable/Input";
import { useEffect, useRef, useState, useTransition } from "react";
import NumberSquare from "@/components/reusable/NumberSquare";
import clock from "@/public/assets/icons/outline/clock.svg";
import Snackbar from "./reusable/Snackbar";
import { auth } from "@/lib/firebaseConfig";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { useAuth } from "./AuthProvider";

const Login = ({ setLogin }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(user ? 3 : 1);
  const [data, setData] = useState({ phone: "", terms: false });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [userName, setUserName] = useState("");

  const setInputValue = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  const handleEnter = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleNotif = (setValue, value) => {
    setValue(value);
    setTimeout(() => {
      setValue("");
    }, 4000);
  };

  const verifyOtp = async (mergedOtp) => {
    startTransition(async () => {
      if (!confirmationResult) {
        setError("حدث خطأ ما، يرجى إعادة المحاولة");
        return;
      }
      try {
        await confirmationResult.confirm(mergedOtp);
        handleNotif((value) => setSuccess(value), "تم تسجيل الدخول بنجاح");
        if (user && !user.displayName) {
          setStep(3);
        } else {
          setLogin(false);
        }
      } catch (err) {
        console.error(err);
        if (err.code === "auth/invalid-verification-code") {
          handleNotif((value) => setError(value), "رمز التحقق غير صحيح");
        } else {
          setError("حدث خطأ أثناء تسجيل الدخول");
        }
      }
    });
  };

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  useEffect(() => {
    const mergedOtp = otp.join("");
    if (mergedOtp.length === 6) {
      verifyOtp(mergedOtp.toString());
    }
  }, [otp]);

  const handleOtp = async (e) => {
    e?.preventDefault();
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        setError("حدث خطأ ما، يرجى إعادة المحاولة");
      }
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          data.phone,
          recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);

        handleNotif((value) => setSuccess(value), "تم إرسال رمز التحقق");
        setStep(2);
        setOtp(["", "", "", "", "", ""]);
      } catch (err) {
        console.error(err);
        if (err.code === "auth/invalid-phone-number") {
          handleNotif((value) => setError(value), "رقم الهاتف غير صحيح");
        } else if (err.code === "auth/too-many-requests") {
          handleNotif(
            (value) => setError(value),
            "لقد قمت بإرسال الرمز مرات عديدة، يرجى المحاولة لاحقا"
          );
        } else {
          setError("حدث خطأ أثناء إرسال رمز التحقق");
        }
      }
    });
  };

  const handleNameUpdate = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log("updated");
      setSuccess("تم تحديث الاسم بنجاح");
      setLogin(false);
    });
  };
  return (
    <div
      id="login-container"
      className="absolute top-0 left-0 w-full h-full bg-[#00000070] z-[20]"
      onClick={() => setLogin(false)}
    >
      <div
        className="w-[600px] p-[32px]  flex flex-col items-center justify-center gap-[40px]  rounded-[8px] bg-white absolute top-1/2 transform translate-x-[50%] translate-y-[-50%] right-1/2 z-30"
        id="login"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={logos.MBlue.src} alt="billito" className="w-fit" />
        <div className="text-gray-8 h7">
          {step === 1
            ? " تسجيل الدخول / إنشاء حساب"
            : "التحقق من رقم الهاتف المحمول"}
        </div>
        {step === 1 && (
          <>
            <div className="flex flex-col gap-[12px] self-start w-full">
              <div className="text-gray-7 body-sm">
                سيتم إرسال رمز التحقق إلى رقم الهاتف الذي قمت بإدخاله.
              </div>
              <Input
                size={"h-[48px]"}
                placeholder={"رقم الهاتف"}
                value={data.phone}
                setValue={(value) => setData({ ...data, phone: value })}
              />
            </div>

            <div className="flex flex-col gap-[16px] self-start w-full">
              <div className="flex gap-[12px] items-center body-md text-gray-7">
                <input
                  type="checkbox"
                  id="customCheckbox"
                  className="hidden peer"
                  checked={data.terms}
                  onChange={(e) =>
                    setData({ ...data, terms: e.target.checked })
                  }
                />
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
                  <span className="text-main cursor-pointer">
                    قواعد بيليتو.
                  </span>
                </span>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-[16px] self-start w-full">
              <div className="text-gray-7 body-sm">
                سيتم إرسال رمز التحقق إلى{" "}
                <span style={{ direction: "ltr" }}>{data.phone}</span>.
              </div>
              <div
                className="flex justify-between gap-[24px] items-center"
                style={{ direction: "ltr" }}
              >
                {otp.map((value, index) => {
                  return (
                    <NumberSquare
                      size={"h-[48px]"}
                      key={index}
                      value={otp[index]}
                      setValue={(value) => setInputValue(index, value)}
                      onEnter={() => handleEnter(index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  );
                })}
              </div>
              <div className="body-sm flex justify-between items-center">
                <div className="flex items-center gap-[8px]">
                  <img src={clock.src} />
                  <span>1:59 لتلقي الرمز مرة أخرى</span>
                </div>
                <div
                  className="text-main cursor-pointer"
                  onClick={() => setStep(1)}
                >
                  تعديل رقم الهاتف
                </div>
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-[16px] self-start w-full">
              <div className="text-gray-7 body-sm">يرجى إدخال اسمك الكامل</div>
              <Input
                size={"h-[48px]"}
                placeholder={"الاسم الكامل"}
                value={userName}
                setValue={(value) => setUserName(value)}
              />
            </div>
          </>
        )}
        {step === 1 && (
          <Button
            text={isPending ? "جاري ارسال الرمز..." : "تأكيد والمتابعة"}
            color={
              data.phone && data.terms && !isPending ? "bg-main" : "bg-gray-2"
            }
            text_color={
              data.phone && data.terms && !isPending
                ? "text-white"
                : "text-gray-5"
            }
            slider={false}
            style={
              !data.phone || !data.terms || isPending
                ? "w-full flex justify-center cursor-not-allowed"
                : "w-full flex justify-center"
            }
            action={async (e) => {
              handleOtp(e);
            }}
            disabled={!data.phone || !data.terms || isPending}
          />
        )}
        {step === 2 && (
          <Button
            text={isPending ? "جاري التحقق..." : "تسجيل الدخول"}
            color={
              otp.filter((value) => value !== "").length === 6 || !isPending
                ? "bg-main"
                : "bg-gray-2"
            }
            text_color={
              otp.filter((value) => value !== "").length === 6 || !isPending
                ? "text-white"
                : "text-gray-5"
            }
            slider={false}
            style={
              otp.filter((value) => value !== "").length === 6 || !isPending
                ? "w-full flex justify-center"
                : "w-full flex justify-center cursor-not-allowed"
            }
            action={() => verifyOtp(otp.join(""))}
            disabled={
              !(otp.filter((value) => value !== "").length === 6) || isPending
            }
          />
        )}
        {step === 3 && (
          <Button
            text={isPending ? "جاري التحميل..." : "تأكيد"}
            color={!userName || isPending ? "bg-gray-2" : "bg-main"}
            text_color={!userName || isPending ? "text-gray-5" : "text-white"}
            slider={false}
            style={
              !userName || isPending
                ? "w-full flex justify-center cursor-not-allowed"
                : "w-full flex justify-center"
            }
            action={() => handleNameUpdate(userName)}
            disabled={!userName || isPending}
          />
        )}
      </div>
      <div id="recaptcha-container" className="bg-black" />
      <div className="absolute top-3/4 left-1/2 translate-x-[-50%]">
        {success && (
          <Snackbar text={success} type={"success"} setDisplay={setSuccess} />
        )}
        {error && (
          <Snackbar text={error} type={"error"} setDisplay={setError} />
        )}
      </div>
    </div>
  );
};
export default Login;
