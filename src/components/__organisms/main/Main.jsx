import React, { useEffect, useState } from "react";
import movie_img from "../../../../public/assets/logo.svg";
import Slider from "../../__molecules/slider/Slider";
import Data from "../../../Data.json";
import Signup from "../../__molecules/signup/Signup";
import Login from "../../__molecules/login/Login";
import Menu_div from "../../__molecules/menu_div/Menu_div";
import dot_img from "../../../../public/assets/dot.svg";
import movie_icon from "../../../../public/assets/icon-nav-movies.svg";
import tv_icon from "../../../../public/assets/icon-nav-tv-series.svg";
import play_icon from "../../../assets/images/Shape.svg";
import Search_box from "../../__atoms/search_box/Search_box";
import Film_div from "../../__molecules/film_div/Film_div";

function Main() {
  const [signup, setsignup] = useState(false);
  const SignUpClick = () => {
    setsignup(!signup);
  };

  const isalreadylogledin = localStorage.getItem("login");
  const [content, setcontent] = useState();
  useEffect(() => {
    if (isalreadylogledin) {
      setcontent(true);
    } else {
      setcontent(false);
    }
  }, []);

  const [movie, setmovie] = useState(false);
  const movies = Data.filter((item) => item.category === "Movie");
  const MvieFilter = () => {
    setmovie(true);
    settv(false);
    setall(false);
    setfav(false);
    setresult([]);
  };
  const [tv, settv] = useState(false);
  const TvSeries = Data.filter((item) => item.category === "TV Series");
  const Tvclick = () => {
    settv(true);
    setmovie(false);
    setall(false);
    setfav(false);
    setresult([]);
  };
  const [all, setall] = useState(false);
  const Allclick = () => {
    setall(true);
    settv(false);
    setmovie(false);
    setfav(false);
    setresult([]);
  };

  const [fav, setfav] = useState(false);
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("favs");
      const favouritesData = savedFavs ? JSON.parse(savedFavs) : [];
      setFavourites(favouritesData);
    } catch (error) {
      setFavourites([]);
    }
  }, []);
  const [favourites, setFavourites] = useState([]);

  const FavClick = (item) => {
    let updatedFavourites;
    const isFavourite = favourites.some((fav) => fav.title === item.title);
    if (!isFavourite) {
      updatedFavourites = [...favourites, { ...item, isBookmarked: true }];
    } else {
      updatedFavourites = favourites.filter((fav) => fav.title !== item.title);
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favs", JSON.stringify(updatedFavourites));
  };
  const bookmarkedmovies = favourites.filter(
    (item) => item.category === "Movie"
  );
  const BookmarkedTVSeries = favourites.filter(
    (item) => item.category === "TV Series"
  );
  const MenuFavClick = () => {
    setfav(true);
    setall(false);
    settv(false);
    setmovie(false);
    setresult([]);
  };
  let Info = Data;
  if (movie) {
    Info = movies;
  } else if (tv) {
    Info = TvSeries;
  } else if (all) {
    Info = Data;
  } else if (fav) {
    Info = favourites.length > 0 ? bookmarkedmovies : [];
  }
  const [searchvalue, setsearchvalue] = useState("");
  const [result, setresult] = useState([]);
  const TakeSearchValue = (e) => {
    const inputvalue = e.target.value.toLowerCase();
    setsearchvalue(inputvalue);

    let Searched = Data.filter((item) =>
      item.title.toLowerCase().includes(inputvalue)
    );
    setresult(Searched);
  };

  let heading = "Recommended for you";
  if (tv) {
    heading = "TV Series";
  } else if (movie) {
    heading = "Movies";
  } else if (fav) {
    heading = "Bookmarked Movies";
  }
  const [visibleItem, setVisibleItem] = useState(null);

  const GoVisible = (id) => {
    setVisibleItem(id);
  };

  const Hide = () => {
    setVisibleItem(null);
  };
  const [slidervisible, setslidervisible] = useState(null);
  const SetSliderVisible = (id) => {
    setslidervisible(id);
  };
  const HideSlider = () => {
    setslidervisible(null);
  };
  const [visibleItem2, setVisibleItem2] = useState(null);
  const Govisible2 = (id) => {
    setVisibleItem2(id);
  };
  const Hide2 = () => {
    setVisibleItem2(null);
  };

  return (
    <div
      className={`w-[100%]  overflow-x-hidden relative justify-center  h-[100vh] bg-[#10141E] flex ${
        content
          ? " pl-[32px] py-[32px] max-[800px]:pl-[25px] max-[530px]:pl-[0px] max-[530px]:pt-[0px]"
          : "   items-center  "
      }`}
    >
      {content ? (
        <div className="flex justify-between w-[100%] max-[800px]:flex-col max-[800px]:justify-start  ">
          <div className=" flex max-[800px]:w-[100%] max-[800px]:pr-[25px] max-[530px]:pr-[0px]">
            <Menu_div
              MvieFilter={MvieFilter}
              Tvclick={Tvclick}
              Allclick={Allclick}
              MenuFavClick={MenuFavClick}
              tv={tv}
              all={all}
              movie={movie}
              fav={fav}
            />
          </div>
          <div className=" overflow-y-auto w-[100%]  items-center flex flex-col pl-[32px] max-[800px]:mt-[34px] max-[800px]:pl-[0px] max-[530px]:mt-[26px] max-[530px]:pl-[16px]">
            <Search_box
              searchvalue={searchvalue}
              TakeSearchValue={TakeSearchValue}
            />
            {result.length > 0 ? (
              <>
                <div className="mt-[40px] w-[100%] flex flex-col gap-[25px] max-w-[1300px] max-[530px]:mt-[26px] max-[530px]:gap-[24px] ">
                  <h1 className="text-[32px] text-[#fff] font-[400] max-[530px]:text-[20px]">
                    {` Found ${result.length} results for ‘${searchvalue}’`}
                  </h1>
                  <div
                    className={`${
                      result.length > 4
                        ? "max-w-[1300px] flex flex-wrap gap-[40px] max-[800px]:gap-[30px] max-[530px]:gap-[15px] "
                        : "w-[100%] flex flex-wrap gap-[40px]  max-[800px]:gap-[30px] max-[530px]:gap-[15px]"
                    }`}
                  >
                    {result.map((info, key) => (
                      <Film_div
                        id={key}
                        FavClick={FavClick}
                        info={info}
                        favourites={favourites}
                        dot_img={dot_img}
                        tv_icon={tv_icon}
                        movie_icon={movie_icon}
                        GoVisible={GoVisible}
                        Hide={Hide}
                        visibleItem={visibleItem}
                        play_icon={play_icon}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {!tv && !movie && !fav && (
                  <div className="mt-[35px] h-[230px] flex flex-col gap-[25px] w-[100%] max-[530px]:mt-[25px] ">
                    <h1 className="text-[32px] text-[#fff] font-[400] max-[530px]:text-[20px]">
                      Trending
                    </h1>
                    <Slider
                      SetSliderVisible={SetSliderVisible}
                      play_icon={play_icon}
                      FavClick={FavClick}
                      slidervisible={slidervisible}
                      HideSlider={HideSlider}
                      favourites={favourites}
                    />
                  </div>
                )}
                <div
                  className={`${
                    !tv && !movie && !fav ? "mt-[100px]" : "mt-[40px]"
                  } w-[100%] max-w-[1300px] flex flex-col gap-[25px] items-center max-[530px]:mt-[26px] max-[530px]:gap-[16px]`}
                >
                  <h1 className="text-[32px] text-[#fff] font-[400] self-start  max-[530px]:text-[20px]">
                    {heading}
                  </h1>
                  <div
                    className={`${
                      Info.length > 4
                        ? "max-w-[1300px] flex flex-wrap gap-[40px] max-[800px]:gap-[30px] max-[530px]:gap-[15px] "
                        : "w-[100%] flex flex-wrap gap-[40px]  max-[800px]:gap-[30px] max-[530px]:gap-[15px]"
                    }`}
                  >
                    {Info.map((info, key) => (
                      <Film_div
                        id={key}
                        FavClick={FavClick}
                        info={info}
                        favourites={favourites}
                        dot_img={dot_img}
                        tv_icon={tv_icon}
                        movie_icon={movie_icon}
                        GoVisible={() => GoVisible(key)}
                        Hide={Hide}
                        visibleItem={visibleItem}
                        play_icon={play_icon}
                      />
                    ))}
                  </div>
                  {fav && (
                    <div className="max-w-[1300px] w-[100%] mt-[50px] flex flex-col gap-[40px] max-[530px]:mt-[24px] ">
                      <h1 className="text-[32px] text-[#fff] font-[400] self-start max-[530px]:text-[20px]">
                        Bookmarked TV Series
                      </h1>
                      <div
                        className={`  ${
                          BookmarkedTVSeries.length > 4
                            ? "max-w-[1300px] flex flex-wrap gap-[40px] max-[800px]:gap-[30px] max-[530px]:gap-[15px] "
                            : "w-[100%] flex flex-wrap gap-[40px]  max-[800px]:gap-[30px] max-[530px]:gap-[15px]"
                        }`}
                      >
                        {BookmarkedTVSeries.map((info, key) => (
                          <Film_div
                            id={key}
                            FavClick={FavClick}
                            info={info}
                            favourites={favourites}
                            dot_img={dot_img}
                            tv_icon={tv_icon}
                            movie_icon={movie_icon}
                            GoVisible={Govisible2}
                            Hide={Hide2}
                            visibleItem={visibleItem2}
                            play_icon={play_icon}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[80px]">
          <img src={movie_img} alt="" />
          {signup ? (
            <Signup SignUpClick={SignUpClick} setsignup={setsignup} />
          ) : (
            <Login
              SignUpClick={SignUpClick}
              setsignup={setsignup}
              setcontent={setcontent}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
