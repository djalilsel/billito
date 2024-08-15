"use client";
import Input from "./reusable/Input";
import Button from "./Button";
import { useState } from "react";
const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  return (
    <div className="border border-gray-2 rounded-[8px] px-[24px] py-[32px] flex flex-col gap-[64px]">
      <div className="pb-[16px] text-gray-7 border-b border-gray-3 w-fit h4">
        البحث عن التذاكر
      </div>
      <div className="flex justify-between gap-[64px]">
        <div className="flex flex-col gap-[32px] body-xl text-gray-6 w-[400px]">
          <Input
            placeholder="الاسم"
            size={"h-[48px]"}
            value={data.name}
            setValue={(value) => setData({ ...data, name: value })}
          />
          <Input
            placeholder="البريد الإلكتروني"
            size={"h-[48px]"}
            value={data.email}
            setValue={(value) => setData({ ...data, email: value })}
          />
          <Input
            placeholder="الموضوع"
            size={"h-[48px]"}
            value={data.topic}
            setValue={(value) => setData({ ...data, topic: value })}
          />
        </div>
        <div className="flex flex-col gap-[32px] w-[400px]">
          <Input
            placeholder="البحث"
            size={"h-[200px]"}
            placeholder_place={"items-end"}
            value={data.message}
            setValue={(value) => setData({ ...data, message: value })}
            type="textarea"
          />
          <Button
            color={"bg-main"}
            text={"أرسل رسالة"}
            size={"h-[56px]"}
            text_color={"text-white"}
            style={"justify-center body-lg"}
          />
        </div>
      </div>
    </div>
  );
};
export default Contact;
