import React from "react";
import { heroImg } from "@/public/assets";

const Hero = () => {
  return (
    <div className="relative">
      <img
        src={heroImg.FlightWeb340homepage.src}
        alt="hero"
        className="w-full"
      />
      <div className="absolute w-full top-[20%] flex px-[260px] text-white hero">
        الراحة والسرعة في <br />
        حجز تذكرتي مع بيليتو
      </div>
    </div>
  );
};

export default Hero;
