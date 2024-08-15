"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import call from "@/public/assets/icons/outline/call.svg";
import Button from "@/components/Button.jsx";
import userIcon from "@/public/assets/icons/outline/user.svg";
import { logos } from "@/public/assets";
import ArrowDown from "@/public/assets/icons/outline/arrow-down-1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Login from "./Login";
import { useAuth } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import userBold from "@/public/assets/icons/bold/user.svg";
import arrowLeft from "@/public/assets/icons/outline/arrow-left-2.svg";
import emptyWalletAdd from "@/public/assets/icons/outline/empty-wallet-add.svg";
import shoppingBag from "@/public/assets/icons/outline/shopping-bag.svg";
import loginIcon from "@/public/assets/icons/outline/login.svg";
import add from "@/public/assets/icons/outline/add.svg";

const handleActive = (main, insurance, vols, other, steps, help, pathname) => {
  let things = [main, insurance, vols, other, steps, help];
  things[0].current.classList.remove("text-main", "border-b-2", "border-main");
  things[1].current.classList.remove("text-main", "border-b-2", "border-main");
  things[2].current.classList.remove("text-main", "border-b-2", "border-main");
  things[3].current.classList.remove("text-main", "border-b-2", "border-main");
  things[4].current?.classList.remove("text-main", "border-b-2", "border-main");
  things[5].current?.classList.remove("text-main", "border-b-2", "border-main");
  things[5].current?.classList.remove("text-main", "border-b-2", "border-main");
  let active = null;
  if (pathname === "/") {
    active = main;
  }
  if (pathname === "/vols") {
    active = vols;
  }
  if (pathname === "/insurance") {
    active = insurance;
  }
  if (pathname === "/help") {
    active = other;
    help.current?.classList.add("text-main");
  }

  if (pathname === "/steps") {
    active = other;
    steps.current?.classList.add("text-main");
  }
  active?.current.classList.add("border-b-2", "border-main", "text-main");
  active?.current.querySelector("img")?.classList.remove("text-gray-7");
  active?.current.querySelector("img")?.classList.add("text-main");
};

const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { user } = useAuth();

  const pathname = usePathname();
  const main = useRef(null);
  const insurance = useRef(null);
  const vols = useRef(null);
  const other = useRef(null);
  const help = useRef(null);
  const steps = useRef(null);

  useEffect(() => {
    handleActive(main, insurance, vols, other, steps, help, pathname);
    setUserMenu(false);
  }, [pathname, dropdown]);
  useEffect(() => {
    if (login) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [login]);

  useEffect(() => {
    if (user && !user.displayName) {
      setLogin(true);
    }
  }, [user]);

  return (
    <div className="px-[200px] py-[30px] flex justify-between items-center border border-gray-1 ">
      {login && <Login setLogin={setLogin} />}
      <div className="flex gap-[200px]">
        <Link href={"/"} className="cursor-pointer">
          <img src={logos.LBlue.src} alt="logo" />
        </Link>
        <div className="flex gap-[48px] items-center text-gray-7 body-xl">
          <Link ref={main} className={`cursor-pointer `} href={"/"}>
            الصفحة الرئيسية
          </Link>
          <Link
            ref={insurance}
            href={"/insurance"}
            className={`cursor-pointer`}
          >
            تأمين الرحلات
          </Link>
          <Link ref={vols} href={"/vols"} className="cursor-pointer ">
            رحلاتي
          </Link>
          <div
            className="relative "
            onMouseEnter={() => setDropdown(true)}
            onClick={() => setDropdown(!dropdown)}
            onMouseLeave={() => setDropdown(false)}
          >
            <div ref={other} className={`flex gap-[8px] cursor-pointer`}>
              أخرى
              <img
                src={ArrowDown.src}
                alt="arrow-down"
                className="icon-filter text-gray-7"
              />
            </div>
            {dropdown && (
              <ul
                className="absolute top-[34px] right-0 flex flex-col gap-[8px] py-[8px] rounded-[8px] text-gray-7 body-xl bg-white z-10 border border-gray-1"
                onMouseEnter={() => setDropdown(true)}
              >
                <Link
                  ref={steps}
                  href={"/steps"}
                  className="hover:bg-gray-1 text-nowrap flex items-center justify-center px-2 cursor-pointer"
                >
                  خطوات شراء تذكرة
                </Link>
                <Link
                  href={"/help?page=aboutus"}
                  className="hover:bg-gray-1 text-nowrap flex items-center justify-center px-2 cursor-pointer"
                >
                  معلومات عنا
                </Link>
                <Link
                  href={"/help?page=contactus"}
                  className="hover:bg-gray-1 text-nowrap flex items-center justify-center px-2 cursor-pointer"
                >
                  اتصل بنا
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-[36px]">
        <div className="flex gap-[8px] items-center body-xl text-gray-7">
          <span>+٣١٢ ٩٩٧ ٢٠٩ ٣٢٥</span>
          <span>دعم</span>
          <img src={call.src} alt="call" />
        </div>
        {!user && (
          <Button
            size={40}
            color={"bg-main"}
            text={"تسجيل الدخول"}
            text_color={"text-white"}
            icon={userIcon}
            slider={false}
            action={() => setLogin(!login)}
          />
        )}
        {user && (
          <div className="relative">
            <Button
              size={40}
              color={"bg-main"}
              text={user.displayName}
              text_color={"text-white"}
              slider={true}
              icon={userIcon}
              action={() => setUserMenu(!userMenu)}
            />
            {userMenu && (
              <div className="absolute shadow-md z-[20] rounded-[8px] p-[24px] flex flex-col gap-[8px] bg-white min-w-[250px]">
                <div className="pb-[8px] border-b border-gray-2 flex flex-col gap-[17px]">
                  <div className="cursor-pointer flex justify-between items-center ">
                    <Link
                      href={"/account/profile"}
                      className="flex gap-[5px] items-center body-md text-gray-8"
                      onClick={() => setUserMenu(false)}
                    >
                      <img
                        src={userBold.src}
                        alt="user"
                        className="w-[28px] h-[28px] p-[6px] bg-tint-1 rounded-full"
                      />
                      {user.displayName}
                    </Link>
                    <img
                      src={arrowLeft.src}
                      alt="arrow-left"
                      className="w-[16px] h-[16px]"
                    />
                  </div>
                  <Link
                    href={"/account/wallet"}
                    className="cursor-pointer flex justify-between"
                    onClick={() => setUserMenu(false)}
                  >
                    <div className="flex gap-[5px] items-center body-md text-gray-8">
                      <img
                        src={emptyWalletAdd.src}
                        alt="user"
                        className="w-[16px] h-[16px]"
                      />
                      المحفظة
                    </div>
                    <div className="flex items-center gap-[4px] caption-sm text-main">
                      <img
                        src={add.src}
                        alt="add"
                        className="w-[16px] h-[16px]"
                      />
                      10000 د.ج
                    </div>
                  </Link>
                  <Link
                    href={"/account/travels"}
                    className="flex gap-[5px] items-center cursor-pointer body-md text-gray-8"
                    onClick={() => setUserMenu(false)}
                  >
                    <img
                      src={shoppingBag.src}
                      alt="user"
                      className="w-[16px] h-[16px]"
                    />
                    رحلاتي
                  </Link>
                </div>
                <div
                  className="flex gap-[8px] text-E-light1 items-center body-md cursor-pointer"
                  onClick={() => {
                    signOut(auth);
                    setUserMenu(false);
                  }}
                >
                  <img
                    src={loginIcon.src}
                    alt="login"
                    className="w-[16px] h-[16px]"
                  />
                  تسجيل الخروج
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
