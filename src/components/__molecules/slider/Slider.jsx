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
import unclicked_fav from "../../../../public/assets/unclickedfav.svg";
import { FreeMode, Pagination } from "swiper/modules";

export default function App({ FavClick }) {
  const trendingitems = Data.filter((item) => item.isTrending);
  return (
    <>
      <Swiper
        slidesPerView={2.5}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {trendingitems.map((info, key) => (
          <SwiperSlide key={key} className={` w-[470px]`}>
            <img
              onClick={FavClick}
              className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer"
              src={unclicked_fav}
              alt=""
            />
            <img src={info.thumbnail.trending.large} alt="" />
            <div className="flex justify-end items-start absolute bottom-[24px] left-[24px] flex-col">
              <div className="flex gap-[8px]  items-center">
                <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
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
                  <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
                    {info.category}
                  </p>
                </div>
                <img className="w-[3px] h-[3px]" src={dot_img} alt="" />
                <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
                  {info.rating}
                </p>
              </div>
              <h1 className="text-[18px] font-[400] text-[#fff]">
                {info.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
