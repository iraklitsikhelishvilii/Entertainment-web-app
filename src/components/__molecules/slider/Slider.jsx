import React, { useRef, useState } from "react";
import Data from "../../../Data.json";
import { Swiper, SwiperSlide } from "swiper/react";
import dot_img from "../../../../public/assets/dot.svg";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import movie_icon from "../../../../public/assets/icon-nav-movies.svg";
import tv_icon from "../../../../public/assets/icon-nav-tv-series.svg";
import "../slider/styles.css";
import { FreeMode, Pagination } from "swiper/modules";
import Fav_unclicked_icon from "../../__atoms/fav_unclicked_icon/Fav_unclicked_icon";

export default function App({
  FavClick,
  slidervisible,
  play_icon,
  SetSliderVisible,
  HideSlider,
  favourites,
}) {
  const trendingitems = Data.filter((item) => item.isTrending);
  return (
    <>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={15}
        freeMode={true}
        loop={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{ 800: { slidesPerView: 2.5 }, 530: { spaceBetween: 30 } }}
      >
        {trendingitems.map((info, key) => (
          <SwiperSlide
            key={key}
            className={`h-[230px] w-[470px] rounded-[8px]`}
            onMouseEnter={() => SetSliderVisible(key)}
            onMouseLeave={HideSlider}
          >
            {slidervisible === key && (
              <div className=" w-[100%] h-[100%] bg-[#00000080] flex items-center justify-center absolute top-0">
                <div className=" cursor-pointer bg-white/25  py-[9px] gap-[19px] rounded-[28px] pl-[9px] pr-[24px] flex items-center justify-center">
                  <img src={play_icon} alt="" />
                  <p className="text-[18px]  font-[400] text-[#fff]">Play</p>
                </div>
              </div>
            )}
            <div
              onClick={() => FavClick(info)}
              className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer"
            >
              <Fav_unclicked_icon
                isBookmarked={favourites.some(
                  (fav) => fav.title === info.title
                )}
              />
            </div>
            <img
              className="w-[100%] h-[100%] "
              src={info.thumbnail.trending.large}
              alt=""
            />
            <div className="flex justify-end items-start absolute bottom-[24px] left-[24px] flex-col max-[530px]:bottom-[15px] max-[530px]:left-[15px] ">
              <div className="flex gap-[8px]  items-center">
                <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75] max-[530px]:text-[12px]">
                  {info.year}
                </p>
                <img className="w-[3px] h-[3px]" src={dot_img} alt="" />
                <div className="flex items-center justify-center gap-[6px]">
                  <img
                    className="w-[12px] h-[12px]"
                    src={`${
                      info.category === "TV Series" ? tv_icon : movie_icon
                    }`}
                    alt=""
                  />
                  <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75] max-[530px]:text-[12px]">
                    {info.category}
                  </p>
                </div>
                <img className="w-[3px] h-[3px]" src={dot_img} alt="" />
                <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75] max-[530px]:text-[12px]">
                  {info.rating}
                </p>
              </div>
              <h1 className="text-[18px] font-[400] text-[#fff] max-[530px]:text-[15px]">
                {info.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
