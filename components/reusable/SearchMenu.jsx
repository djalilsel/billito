import React from "react";
import SearchMenuItem from "./SearchMenuItem";

const SearchMenu = ({ items, reff, setter }) => {
  const ITEMS = items.map((item, index) => {
    if (index == items.length - 1) {
      return (
        <SearchMenuItem
          key={item.name}
          city={item.name}
          country={item.city}
          setter={setter}
        />
      );
    }
    return (
      <SearchMenuItem
        key={item.name}
        city={item.name}
        country={item.city}
        setter={setter}
        style={{ borderBottom: "1px solid #ededed" }}
      />
    );
  });
  return (
    <div
      ref={reff}
      className="absolute top-[48px] right-0 w-[250px] rounded-[8px] px-[24px] py-[32px] flex flex-col gap-[10px] bg-white z-20 hidden border border-gray-3 "
    >
      {ITEMS}
    </div>
  );
};

export default SearchMenu;
