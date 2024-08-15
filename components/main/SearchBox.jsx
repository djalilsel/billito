"use client";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "../reusable/NavItem";
import arrow2 from "@/public/assets/icons/outline/arrow-2.svg";
import search_normal1 from "@/public/assets/icons/outline/search-normal-1.svg";
import SearchMenu from "../reusable/SearchMenu";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Calendar, DateRange } from "react-date-range";
import PersonsNbrMenu from "./PersonsNbrMenu";
import Input from "../reusable/Input";

// const fromItems = [
//   {
//     city: "القاهرة",
//     country: "مصر",
//   },
//   {
//     city: "الاسكندرية",
//     country: "مصر",
//   },
//   {
//     city: "الغردقة",
//     country: "مصر",
//   },
//   {
//     city: "سطيف",
//     country: "الجزائر",
//   },
// ];
const toItems = [
  {
    city: "القاهرة",
    country: "مصر",
  },
  {
    city: "الاسكندرية",
    country: "مصر",
  },
  {
    city: "الغردقة",
    country: "مصر",
  },
  {
    city: "سطيف",
    country: "الجزائر",
  },
];

const SearchBox = () => {
  const inner = useRef(null);
  const outer = useRef(null);
  const going = useRef(null);
  const returning = useRef(null);
  const twoways = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const passengersRef = useRef(null);
  const classRef = useRef(null);
  const economyRef = useRef(null);
  const buisnessRef = useRef(null);

  const [active, setActive] = React.useState(outer);
  const [ticketType, setTicketType] = React.useState(going);
  const [menu, setMenu] = React.useState(null);

  const [from, setFrom] = useState("");
  const [debouncedFrom, setDebouncedFrom] = useState(from);
  const [fromItems, setFromItems] = useState([]);
  const [to, setTo] = useState({ city: "", country: "" });
  const [date, setDate] = useState(
    ticketType == twoways
      ? {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        }
      : {
          startDate: new Date(),
          key: "selection",
        }
  );
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [classType, setClassType] = useState(null);

  useEffect(() => {
    inner.current.classList.remove("text-main", "border-main");
    outer.current.classList.remove("text-main", "border-main");
    active.current.classList.remove("border-main", "border-white", "text-main");
    active.current.classList.add("border-main", "text-main");
    active.current.querySelector("img").classList.remove("text-gray-5");
    active.current.querySelector("img").classList.add("text-main");
  }, [active]);

  useEffect(() => {
    going.current.classList.remove("text-main", "bg-main", "text-white");
    returning.current.classList.remove("text-main", "bg-main", "text-white");
    twoways.current.classList.remove("text-main", "bg-main", "text-white");
    ticketType.current.classList.remove(
      "border-main",
      "border-white",
      "text-main"
    );
    ticketType.current.classList.add("border-main", "bg-main", "text-white");
  }, [ticketType]);

  useEffect(() => {
    fromRef.current.classList.add("hidden");
    toRef.current.classList.add("hidden");
    dateRef.current.classList.add("hidden");
    passengersRef.current.classList.add("hidden");
    classRef.current.classList.add("hidden");
    if (menu) {
      menu.current.classList.remove("hidden");
    }
  }, [menu]);
  useEffect(() => {
    economyRef.current.classList.remove("border-main", "text-main");
    buisnessRef.current.classList.remove("border-main", "text-main");
    economyRef.current.classList.add("border-gray-8", "text-gray-8");
    buisnessRef.current.classList.add("border-gray-8", "text-gray-8");

    classType?.current.classList.remove("border-gray-8", "text-gray-8");
    classType?.current.classList.add("border-main", "text-main");
  }, [classType]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFrom(from);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [from]);

  useEffect(() => {
    if (!debouncedFrom) return;

    const fetchAirport = async () => {
      try {
        const res = await fetch(
          " http://localhost:3000/api/airports?keyword=" + debouncedFrom
        );
        const data = await res.json();
        if (data.message === "No airports found") {
          alert(data.message);
          return;
        }
        console.log(data.airports);
        setFromItems(data.airports);
        setMenu(fromRef);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAirport();
  }, [debouncedFrom]);

  return (
    <div className="h-[225px] w-full rounded-[8px] border border-gray-2  bg-white p-[24px] flex flex-col justify-between drop-shadow-md z-10">
      <div className="flex gap-[32px] text-gray-5 border-b-2 border-gray-2">
        <NavItem
          text="رحلة خارجية"
          reff={outer}
          handleActive={setActive}
          icon={true}
        />
        <NavItem
          text="رحلة داخلية"
          reff={inner}
          handleActive={setActive}
          icon={true}
        />
      </div>
      <div className="flex gap-[24px]">
        <div
          ref={going}
          className="rounded-[8px] px-[16px] py-[8px] border border-main text-shade-3 caption-md min-w-[100px] text-center cursor-pointer"
          onClick={() => {
            setTicketType(going);
            setDate({
              startDate: new Date(),
            });
          }}
        >
          ذهاب
        </div>
        <div
          ref={twoways}
          className="rounded-[8px] px-[16px] py-[8px] border border-main text-shade-3 caption-md min-w-[100px] text-center cursor-pointer"
          onClick={() => {
            setTicketType(twoways);
            setDate({
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            });
          }}
        >
          ذهاب و اياب
        </div>
        <div
          ref={returning}
          className="rounded-[8px] px-[16px] py-[8px] border border-main text-shade-3 caption-md min-w-[100px] text-center cursor-pointer"
          onClick={() => {
            setTicketType(returning);
            setDate({
              startDate: new Date(),
            });
          }}
        >
          اياب
        </div>
      </div>
      <div className="flex gap-[24px] justify-between">
        <div className="flex gap-[16px]">
          <div className="relative rounded-[8px] bg-white">
            <Input
              placeholder={"من"}
              size={"h-[48px] min-w-[180px]"}
              value={from}
              setValue={(value) => {
                setFrom(value);
              }}
              setMenu={(value) => {
                if (fromItems.length > 0) setMenu(value);
              }}
              menuRef={fromRef}
              menu={menu}
            />
            <SearchMenu
              items={fromItems}
              reff={fromRef}
              setter={(value) => {
                setFrom(value);
                setMenu(null);
              }}
            />
          </div>

          <img src={arrow2.src} alt="arrow2" />
          <div
            className="relative rounded-[8px] bg-white text-gray-8 border border-gray-3 caption-lg px-[24px] flex items-center min-w-[180px] min-h-[48px] cursor-pointer"
            onClick={() => {
              menu == toRef ? setMenu(null) : setMenu(toRef);
            }}
          >
            {to.city ? `${to.country}، ${to.city}` : "الى"}
            <SearchMenu items={toItems} reff={toRef} setter={setTo} />
          </div>
        </div>
        <div className="relative">
          <div
            className="rounded-[8px] bg-white text-gray-8 border border-gray-3 caption-lg px-[24px] flex items-center min-w-[180px] min-h-[48px] cursor-pointer"
            onClick={() => {
              menu == dateRef ? setMenu(null) : setMenu(dateRef);
            }}
          >
            {ticketType == twoways
              ? `${date.startDate.toDateString()}, ${date.endDate.toDateString()}`
              : `${date.startDate.toDateString()}`}
          </div>
          <div
            ref={dateRef}
            className="absolute top-[48px] right-0 hidden"
            style={{ direction: "ltr" }}
          >
            {ticketType == twoways && (
              <DateRange
                ranges={[date]}
                onChange={(ranges) => {
                  setDate(ranges.selection);
                  if (ranges.selection.startDate) {
                    setMenu(null);
                  }
                }}
                startDatePlaceholder="تاريخ الذهاب"
                endDatePlaceholder="تاريخ العودة"
                color="#1d91cc"
                minDate={new Date()}
              />
            )}
            {(ticketType == going || ticketType == returning) && (
              <Calendar
                date={date.startDate}
                onChange={(ranges) => {
                  setDate({ startDate: ranges });
                  setMenu(null);
                }}
                color="#1d91cc"
                minDate={new Date()}
              />
            )}
          </div>
        </div>
        <div className="relative">
          <div
            className="rounded-[8px] bg-white text-gray-8 border border-gray-3 caption-lg px-[24px] flex items-center min-w-[180px] min-h-[48px] cursor-pointer"
            onClick={() => {
              menu == passengersRef ? setMenu(null) : setMenu(passengersRef);
            }}
          >
            عدد المسافرين
          </div>
          <div
            ref={passengersRef}
            className="absolute top-[48px] right-0 hidden"
          >
            <PersonsNbrMenu
              passengers={passengers.adults}
              setPassengers={(number) => {
                setPassengers({ ...passengers, adults: number });
              }}
              title="البالغين"
              description="12 سنة فما فوق"
              min={passengers.adults == 1}
              max={
                passengers.adults + passengers.children + passengers.infants ==
                9
              }
            />
            <PersonsNbrMenu
              passengers={passengers.children}
              setPassengers={(number) => {
                setPassengers({ ...passengers, children: number });
              }}
              title="الأطفال"
              description="من 2 الى 12 سنة"
              min={passengers.children == 0}
              max={
                passengers.adults + passengers.children + passengers.infants ==
                9
              }
            />
            <PersonsNbrMenu
              passengers={passengers.infants}
              setPassengers={(number) => {
                setPassengers({ ...passengers, infants: number });
              }}
              title="الرضع"
              description="اقل من 2 سنة"
              min={passengers.infants == 0}
              max={
                passengers.adults + passengers.children + passengers.infants ==
                9
              }
            />
          </div>
        </div>
        <div
          className="relative rounded-[8px] bg-white text-gray-8 border border-gray-3 caption-lg px-[24px] flex items-center min-w-[180px] min-h-[48px] cursor-pointer"
          onClick={() => {
            menu == classRef ? setMenu(null) : setMenu(classRef);
          }}
        >
          {classType ? classType.current.textContent : "فئة الرحلة"}

          <div
            ref={classRef}
            className="absolute top-[48px] px-[24px] py-[16px] right-0 flex flex-col gap-[20px] bg-white items-center text-gray-8 body-md hidden shadow-md"
          >
            <div
              ref={economyRef}
              className="border-b border-gray-8 px-[24px] py-[16px] cursor-pointer w-full text-center border-main text-main"
              onClick={() => {
                classType == economyRef ? "" : setClassType(economyRef);
              }}
            >
              اقتصادية
            </div>
            <div
              ref={buisnessRef}
              className="border-b border-gray-8  px-[24px] py-[16px] cursor-pointer"
              onClick={() => {
                classType == buisnessRef ? "" : setClassType(buisnessRef);
              }}
            >
              رجال الأعمال
            </div>
          </div>
        </div>
        <div className="rounded-[8px] bg-main text-white border border-gray-3 button-sm px-[24px] flex items-center justify-center gap-[16px] min-w-[180px] min-h-[48px] cursor-pointer">
          <img src={search_normal1.src} alt="search_normal" />
          بحث
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
