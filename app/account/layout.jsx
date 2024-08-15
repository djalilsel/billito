"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import frame from "@/public/assets/icons/outline/frame-1.svg";
import airplane from "@/public/assets/icons/outline/airplane.svg";
import ticket from "@/public/assets/icons/outline/ticket.svg";
import wallet3 from "@/public/assets/icons/outline/wallet-3.svg";
import login from "@/public/assets/icons/outline/login.svg";
import galleryAdd from "@/public/assets/icons/outline/gallery-add.svg";
import { useAuth } from "@/components/AuthProvider";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const AccountLayout = ({ children }) => {
  const pathname = usePathname();
  const section = pathname.split("/")[2];
  const { user } = useAuth();
  const router = useRouter();
  if (!user) return router.push("/");
  console.log(user);

  const renderSection = () => {
    switch (section) {
      case "profile":
        return {
          title: "معلومات الحساب",
        };
      case "travels":
        return { title: "رحلاتي" };
      case "tickets":
        return { title: "تذاكر" };
      case "wallet":
        return { title: "المحفظة" };
      default:
        return { title: "Loading", extra: router.push("/account/profile") };
    }
  };
  const { title } = renderSection();

  const profile = useRef(null);
  const travels = useRef(null);
  const tickets = useRef(null);
  const wallet = useRef(null);

  const handleSelect = (active) => {
    profile.current.classList.add("hover:bg-gray-1", "text-gray-8");
    profile.current.classList.remove("bg-tint-1", "text-main");
    travels.current.classList.add("hover:bg-gray-1", "text-gray-8");
    travels.current.classList.remove("bg-tint-1", "text-main");
    tickets.current.classList.add("hover:bg-gray-1", "text-gray-8");
    tickets.current.classList.remove("bg-tint-1", "text-main");
    wallet.current.classList.add("hover:bg-gray-1", "text-gray-8");
    wallet.current.classList.remove("bg-tint-1", "text-main");

    active.current.classList.remove("hover:bg-gray-1", "text-gray-8");
    active.current.classList.add("bg-tint-1", "text-main");
  };

  useEffect(() => {
    switch (section) {
      case "profile":
        return handleSelect(profile);
      case "travels":
        return handleSelect(travels);
      case "tickets":
        return handleSelect(tickets);
      case "wallet":
        return handleSelect(wallet);
      default:
        return window.location.replace("/account/profile");
    }
  }, [section]);

  const handlePfpChange = async (url) => {
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    window.location.reload();
  };
  return (
    <div className="min-h-[calc(100vh-110px)] px-[200px] grid grid-cols-[300px_1fr] grid-rows-[auto_1fr] gap-x-[24px]">
      <div className="h-fit" />
      <div className="text-gray-8 h5 my-[32px] h-fit">{title}</div>
      <div className="w-full h-fit rounded-[8px] border border-gray-4 px-[16px] py-[32px] flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[16px] items-center">
          <div className="relative">
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
              }
              alt="profile-pic"
              className="w-[104px] h-[104px] rounded-full object-cover object-center border border-gray-4"
            />
            <img
              src={galleryAdd.src}
              alt="gallery-add"
              className="w-[32px] h-[32px] p-[6px] bg-white rounded-full absolute bottom-0 right-[8px] border border-gray-4 cursor-pointer"
              onClick={() => {
                const url = prompt("Enter the URL of the new profile picture");
                if (url) {
                  handlePfpChange(url);
                }
              }}
            />
          </div>
          <div className="flex flex-col items-center gap-[4px] text-gray-6">
            <div className="h6">{user.displayName}</div>
            <div className="body-sm" style={{ direction: "ltr" }}>
              {user.phoneNumber}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-[16px]">
          <Link
            ref={profile}
            href={"/account/profile"}
            className="flex gap-[5px] items-center body-md text-gray-8 cursor-pointer  px-[8px] hover:bg-gray-1 rounded-[4px] py-[4px]"
          >
            <img src={frame.src} alt="user" className="w-[16px] h-[16px]" />
            معلومات حساب المستخدم
          </Link>
          <Link
            ref={travels}
            href={"/account/travels"}
            className="flex gap-[5px] items-center body-md text-gray-8 cursor-pointer px-[8px] hover:bg-gray-1 rounded-[4px] py-[4px]"
          >
            <img src={airplane.src} alt="user" className="w-[16px] h-[16px]" />
            رحلاتي
          </Link>
          <Link
            ref={tickets}
            href={"/account/tickets"}
            className="flex gap-[5px] items-center cursor-pointer body-md text-gray-8 px-[8px] hover:bg-gray-1 rounded-[4px] py-[4px]"
          >
            <img src={ticket.src} alt="user" className="w-[16px] h-[16px]" />
            تذاكري
          </Link>
          <Link
            ref={wallet}
            href={"/account/wallet"}
            className="flex gap-[5px] items-center cursor-pointer body-md text-gray-8 px-[8px] hover:bg-gray-1 rounded-[4px] py-[4px]"
          >
            <img src={wallet3.src} alt="" className="w-[16px] h-[16px]" />
            محفظتي
          </Link>
          <div
            className="flex gap-[8px] text-E-light1 items-center body-md cursor-pointer px-[8px] hover:bg-E-light2  rounded-[4px] py-[4px]"
            onClick={() => {
              signOut(auth);
            }}
          >
            <img src={login.src} alt="login" className="w-[16px] h-[16px]" />
            تسجيل الخروج
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AccountLayout;
