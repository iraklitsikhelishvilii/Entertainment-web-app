import React from "react";
import Desktop_icon from "../desktop_icon/Desktop_icon";
import Movie_icon from "../movie_icon/Movie_icon";
import Tv_icon from "../tv_icon/Tv_icon";
import Fav_icon from "../fav_icon/Fav_icon";

function Menu_icons_div({
  Allclick,
  all,
  MvieFilter,
  movie,
  tv,
  Tvclick,
  MenuFavClick,
  fav,
  classname,
}) {
  return (
    <div className={classname}>
      <button onClick={Allclick} className="cursor-pointer w-[20px] h-[20px] ">
        <Desktop_icon all={all} />
      </button>
      <button
        onClick={MvieFilter}
        className="cursor-pointer w-[20px] h-[20px] "
      >
        <Movie_icon movie={movie} />
      </button>

      <button className="cursor-pointer w-[20px] h-[20px] " onClick={Tvclick}>
        <Tv_icon tv={tv} />
      </button>
      <button
        className="w-[20px] h-[20px] cursor-pointer "
        onClick={MenuFavClick}
      >
        <Fav_icon fav={fav} />
      </button>
    </div>
  );
}

export default Menu_icons_div;
