import React from "react";
import profile_icon from "../../../../public/assets/image-avatar.png";
import movie_img from "../../../../public/assets/logo.svg";
import Menu_icons_div from "../../__atoms/menu_icons_div/Menu_icons_div";
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
    <div className="flex-col py-[32px] flex items-center justify-between min-w-[96px]   bg-[#161D2F] rounded-[20px] max-[800px]:w-[100%] max-[800px]:flex-row max-[800px]:h-[72px] max-[800px]:px-[25px] max-[530px]:rounded-[0px] max-[530px]:h-[56px]">
      <div className="flex flex-col gap-[74px] items-center justify-center max-[800px]:flex-row">
        <button className=" cursor-pointer" onClick={Reload}>
          <img
            className="max-[530px]:h-[20px] max-[530px]:w-[25px]"
            src={movie_img}
            alt=""
          />
        </button>
        <Menu_icons_div
          Allclick={Allclick}
          all={all}
          MvieFilter={MvieFilter}
          movie={movie}
          tv={tv}
          Tvclick={Tvclick}
          MenuFavClick={MenuFavClick}
          fav={fav}
          classname={
            "flex flex-col gap-[40px] items-center justify-center max-[800px]:flex-row max-[800px]:hidden "
          }
        />
      </div>
      <Menu_icons_div
        Allclick={Allclick}
        all={all}
        MvieFilter={MvieFilter}
        movie={movie}
        tv={tv}
        Tvclick={Tvclick}
        MenuFavClick={MenuFavClick}
        fav={fav}
        classname={
          "flex flex-col gap-[40px] items-center justify-center max-[800px]:flex-row min-[800px]:hidden max-[530px]:gap-[20px]"
        }
      />
      <img
        c
        className="w-[40px] h-[40px] max-[800px]:w-[32px] max-[800px]:h-[32px] max-[530px]:w-[24px] max-[530px]:h-[24px]"
        src={profile_icon}
        alt=""
      />
    </div>
  );
}

export default Menu_div;
