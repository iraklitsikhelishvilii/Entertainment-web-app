import React from "react";
import Fav_unclicked_icon from "../../__atoms/fav_unclicked_icon/Fav_unclicked_icon";

function Film_div({
  id,
  FavClick,
  info,
  favourites,
  dot_img,
  tv_icon,
  movie_icon,
  GoVisible,
  Hide,
  visibleItem,
  play_icon,
}) {
  return (
    <div
      onMouseEnter={() => GoVisible(id)}
      onMouseLeave={() => Hide()}
      key={id}
      className="flex flex-col gap-[8px] relative"
    >
      <div
        onClick={() => {
          FavClick(info);
        }}
        className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer z-1  "
      >
        <Fav_unclicked_icon
          isBookmarked={favourites.some((fav) => fav.title === info.title)}
        />
      </div>

      <div>
        <img
          className="rounded-[8px] h-[180px] w-[280px] max-[800px]:w-[220px] max-[800px]:h-[140px] max-[530px]:w-[164px] max-[530px]:h-[110px]"
          src={info.thumbnail.regular.medium}
          alt=""
        />
        {visibleItem === id && (
          <div className="rounded-[8px] w-[100%] h-[180px] bg-[#00000080] flex items-center justify-center absolute top-0  max-[800px]:h-[140px]  max-[530px]:h-[110px]">
            <div className=" cursor-pointer bg-white/25  py-[9px] gap-[19px] rounded-[28px] pl-[9px] pr-[24px] flex items-center justify-center max-[530px]:gap-[10px]">
              <img
                className="max-[530px]:h-[24px] max-[530px]:w-[24px]"
                src={play_icon}
                alt=""
              />
              <p className="text-[18px]  font-[400] text-[#fff] max-[530px]:text-[15px]">
                Play
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex gap-[8px] items-center">
          <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
            {info.year}
          </p>
          <img src={dot_img} alt="" />
          <div className="flex items-center justify-center gap-[6px]">
            <img
              className="w-[12px] h-[12px]"
              src={`${info.category === "TV Series" ? tv_icon : movie_icon}`}
              alt=""
            />
            <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
              {info.category}
            </p>
          </div>
          <img src={dot_img} alt="" />
          <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
            {info.rating}
          </p>
        </div>
        <h1 className="text-[18px] font-[400] text-[#fff]">{info.title}</h1>
      </div>
    </div>
  );
}

export default Film_div;
