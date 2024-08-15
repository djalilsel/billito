import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { NextResponse } from "next/server";
import { phoneAuth } from "@/lib/db";

export async function GET(request) {
  const handleOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(phoneAuth, "recaptcha", {});
      const confirmation = signInWithPhoneNumber(
        phoneAuth,
        "+213799902325",
        recaptcha
      );
      console.log(confirmation);
    } catch (err) {
      console.log(err);
    }
  };
  handleOtp();
  return NextResponse.json({ message: "Hello World" });
}
