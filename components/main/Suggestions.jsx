"use client";
import { useEffect, useState } from "react";

const Text = ({ title, city }) => {
  return (
    <div className="absolute right-[24px] bottom-[24px] text-white flex flex-col gap-[8px]">
      <h1 className="h5">{title}</h1>
      <button className="border border-white p-[8px] rounded-[8px] button-sm w-fit">
        شراء تذكرة الى {city}
      </button>
    </div>
  );
};

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch("/api/suggestions");
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
  const SUGGESTIONS = suggestions.map((suggestion, index) => {
    if (index === 3) {
      return null;
    }
    if (index <= 1) {
      return (
        <div
          key={index}
          className="bg-cover bg-center flex-1 h-[320px] rounded-[8px] relative "
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(1,8,70,0.87)), url(${suggestion.image})`,
          }}
        >
          <Text title={suggestion.title} city={suggestion.city} />
        </div>
      );
    }
    return (
      <div
        className="flex flex-col gap-[24px] justify-between h-[320px] flex-1"
        key={index}
      >
        <div
          className="bg-cover bg-center flex-1 h-full rounded-[8px] relative"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(1,8,70,0.87)), url(${suggestion.image})`,
          }}
        >
          <Text title={suggestion.title} city={suggestion.city} />
        </div>
        <div
          className="bg-cover bg-center flex-1 h-full rounded-[8px] relative"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0), rgba(1,8,70,0.87)), url(${
              suggestions[index + 1].image
            })`,
          }}
        >
          <Text
            title={suggestions[index + 1].title}
            city={suggestions[index + 1].city}
          />
        </div>
      </div>
    );
  });
  return (
    <div className="flex justify-between gap-[24px] py-[24px]">
      {SUGGESTIONS}
    </div>
  );
};

export default Suggestions;
