import React from "react";
import serch_icon from "../../../../public/assets/icon-search.svg";
function Search_box({ searchvalue, TakeSearchValue }) {
  return (
    <div className=" w-[100%] max-w-[1300px] flex gap-[24px] items-center max-[530px]:gap-[16px]">
      <img
        className="max-[530px]:h-[24px] max-[530px]:w-[24px]"
        src={serch_icon}
        alt=""
      />
      <input
        value={searchvalue}
        onChange={TakeSearchValue}
        placeholder=" Search for movies or TV series"
        className="text-[24px] font-[400] text-[#fff] outline-none max-[530px]:text-[16px]"
      />
    </div>
  );
}

export default Search_box;
