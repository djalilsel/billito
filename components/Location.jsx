"use client";
import location from "@/public/assets/icons/outline/location.svg";
import call from "@/public/assets/icons/outline/call.svg";
import sms from "@/public/assets/icons/outline/sms.svg";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";
const Location = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const setif = { lng: 5.40903129501835, lat: 36.19103001068777 };
  const [zoom] = useState(16);
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [setif.lng, setif.lat],
      zoom: zoom,
    });
    new maptilersdk.Marker({ color: "#FF0000" })
      .setLngLat([5.40903129501835, 36.19103001068777])
      .addTo(map.current);
  }, [setif.lng, setif.lat, zoom]);
  return (
    <div className="border border-gray-2 rounded-[8px] px-[24px] py-[32px] flex ">
      <div className="flex-1 flex flex-col gap-[64px]">
        <div className="pb-[16px] text-gray-7 border-b border-gray-3 w-fit h4">
          البحث عن التذاكر
        </div>
        <div className="flex flex-col gap-[32px] body-xl text-gray-6">
          <div className="flex gap-[8px]">
            <img src={location.src} />
            <span className="text-gray-8">العنوان: </span> المكتب الرئيسي في
            سطيف، بارك مول، الطابق 3.
          </div>
          <div className="flex gap-[8px]">
            <img src={call.src} />
            <span className="text-gray-8">رقم التواصل: </span>
            <span style={{ direction: "ltr" }}>(+213) 0553305383</span>
          </div>

          <div className="flex gap-[8px]">
            <img src={sms.src} />
            <span className="text-gray-8">البريد الإلكتروني:</span>
            <span style={{ direction: "ltr" }}>
              abdeldjalilselamnia@gmail.com
            </span>
          </div>
        </div>
      </div>
      <div
        ref={mapContainer}
        className="w-[430px] h-[330px] rounded-[4px] border border-gray-3"
      />
    </div>
  );
};
export default Location;
