import React from "react";
import desktop_img from "../../../../public/assets/icon-nav-home.svg";
import movie_icon from "../../../../public/assets/icon-nav-movies.svg";
import tv_icon from "../../../../public/assets/icon-nav-tv-series.svg";
import fav_icon from "../../../../public/assets/icon-nav-bookmark.svg";
import profile_icon from "../../../../public/assets/image-avatar.png";
import movie_img from "../../../../public/assets/logo.svg";
function Menu_div({ MvieFilter, Tvclick, Allclick, MenuFavClick }) {
  return (
    <div className="flex-col py-[32px] flex items-center justify-between min-w-[96px]   bg-[#161D2F] rounded-[20px] ">
      <div className="flex flex-col gap-[74px] items-center justify-center">
        <img src={movie_img} alt="" />
        <div className="flex flex-col gap-[40px] items-center justify-center">
          <img
            onClick={Allclick}
            className="cursor-pointer w-[20px] h-[20px]"
            src={desktop_img}
            alt=""
          />
          <img
            onClick={MvieFilter}
            className="cursor-pointer w-[20px] h-[20px]"
            src={movie_icon}
            alt=""
          />
          <img
            onClick={Tvclick}
            className="cursor-pointer w-[20px] h-[20px]"
            src={tv_icon}
            alt=""
          />
          <img
            onClick={MenuFavClick}
            className="w-[20px] h-[20px] cursor-pointer"
            src={fav_icon}
            alt=""
          />
        </div>
      </div>
      <img className="w-[40px] h-[40px]" src={profile_icon} alt="" />
    </div>
  );
}

export default Menu_div;
