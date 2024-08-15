"use client";
"use strict";
import { useEffect, useState } from "react";
import CheapestFromCard from "../reusable/CheapestFromCard";
const cheapestFrom = () => {
  const [suggestions, setSuggestions] = useState(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch("/api/cheapestfrom?from=MAD");
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
      setSuggestions(data);
    };

    fetchSuggestions();
  }, []);

  if (!suggestions) {
    return <div>Loading</div>;
  }

  const SUGGESTIONS = suggestions.map((city, index) => {
    return (
      <CheapestFromCard
        image={city.image}
        from={city.from}
        to={city.to}
        price={city.price}
        key={city.image}
      />
    );
  });

  return (
    <div className="py-[32px] flex flex-col gap-[32px]">
      <div className="">
        <div className="h5 text-black">الأرخص من مدينتك</div>
      </div>
      <div className="flex gap-[24px]">{SUGGESTIONS}</div>
    </div>
  );
};

export default cheapestFrom;
