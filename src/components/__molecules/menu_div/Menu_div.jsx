import React from "react";
import fav_icon from "../../../../public/assets/icon-nav-bookmark.svg";
import profile_icon from "../../../../public/assets/image-avatar.png";
import movie_img from "../../../../public/assets/logo.svg";
import Tv_icon from "../../__atoms/tv_icon/Tv_icon";
import Desktop_icon from "../../__atoms/desktop_icon/Desktop_icon";
import Movie_icon from "../../__atoms/movie_icon/Movie_icon";
import Fav_icon from "../../__atoms/fav_icon/Fav_icon";
function Menu_div({
  MvieFilter,
  Tvclick,
  Allclick,
  MenuFavClick,
  tv,
  all,
  movie,
  fav,
}) {
  const Reload = () => {
    window.location.reload();
  };
  return (
    <div className="flex-col py-[32px] flex items-center justify-between min-w-[96px]   bg-[#161D2F] rounded-[20px] ">
      <div className="flex flex-col gap-[74px] items-center justify-center">
        <button className=" cursor-pointer" onClick={Reload}>
          <img src={movie_img} alt="" />
        </button>
        <div className="flex flex-col gap-[40px] items-center justify-center">
          <button
            onClick={Allclick}
            className="cursor-pointer w-[20px] h-[20px]"
          >
            <Desktop_icon all={all} />
          </button>
          <button
            onClick={MvieFilter}
            className="cursor-pointer w-[20px] h-[20px]"
          >
            <Movie_icon movie={movie} />
          </button>

          <button
            className="cursor-pointer w-[20px] h-[20px]"
            onClick={Tvclick}
          >
            <Tv_icon tv={tv} />
          </button>
          <button
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={MenuFavClick}
          >
            <Fav_icon fav={fav} />
          </button>
        </div>
      </div>
      <img className="w-[40px] h-[40px]" src={profile_icon} alt="" />
    </div>
  );
}

export default Menu_div;
