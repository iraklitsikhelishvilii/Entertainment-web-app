import React, { useEffect, useState } from "react";
import movie_img from "../../../../public/assets/logo.svg";
import serch_icon from "../../../../public/assets/icon-search.svg";
import Slider from "../../__molecules/slider/Slider";
import Data from "../../../Data.json";
import Signup from "../../__molecules/signup/Signup";
import Login from "../../__molecules/login/Login";
import Menu_div from "../../__molecules/menu_div/Menu_div";
import dot_img from "../../../../public/assets/dot.svg";
import movie_icon from "../../../../public/assets/icon-nav-movies.svg";
import tv_icon from "../../../../public/assets/icon-nav-tv-series.svg";
import Fav_unclicked_icon from "../../__atoms/fav_unclicked_icon/Fav_unclicked_icon";
import play_icon from "../../../assets/images/Shape.svg";

function Main() {
  const [signup, setsignup] = useState(false);
  const SignUpClick = () => {
    setsignup(!signup);
  };
  const [info, setinfo] = useState([]);
  const [email, setemail] = useState("");
  const TakeEmail = (e) => {
    setemail(e.target.value);
  };
  const [password, setpassword] = useState("");
  const TakePassword = (e) => {
    setpassword(e.target.value);
  };
  const [repeatpassword, setrepeatpassword] = useState("");
  const TakeRepeatPassword = (e) => {
    setrepeatpassword(e.target.value);
  };
  const ValidEmail = /^[a-zA-Z0-9._:%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const ValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const [signuperror, setsignuperror] = useState(false);
  const [signuperror2, setsignuperror2] = useState(false);
  const [signuperror3, setsignuperror3] = useState(false);
  const [signuperrormessage, setsignuperrormessage] = useState("");
  const [signuperrormessage2, setsignuperrormessage2] = useState("");
  const [signuperrormessage3, setsignuperrormessage3] = useState("");
  const Submit = (e) => {
    e.preventDefault();

    setsignuperror(false);
    setsignuperror2(false);
    setsignuperror3(false);
    setsignuperrormessage("");
    setsignuperrormessage2("");
    setsignuperrormessage3("");

    if (!ValidEmail.test(email)) {
      setsignuperror(true);
      setsignuperrormessage("Invalid email");
    }

    if (!ValidPassword.test(password)) {
      setsignuperror2(true);
      setsignuperrormessage2("Invalid password");
    }

    if (password !== repeatpassword || repeatpassword === "") {
      setsignuperror3(true);
      setsignuperrormessage3("Passwords do not match");
    }
    const alreadyregistered = JSON.parse(localStorage.getItem("user")) || [];

    if (alreadyregistered.find((user) => user.email === email)) {
      setsignuperror(true);
      setsignuperrormessage("Email is already registered");

      return;
    }
    if (
      ValidEmail.test(email) &&
      ValidPassword.test(password) &&
      password === repeatpassword
    ) {
      const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
      const updatedInfo = [...storedUsers, { email, password }];
      setinfo(updatedInfo);
      localStorage.setItem("user", JSON.stringify(updatedInfo));
      setemail("");
      setpassword("");
      setrepeatpassword("");
      setsignup(false);
    }
  };

  const [loginemail, setloginemail] = useState("");
  const TakeLoginEmail = (e) => {
    setloginemail(e.target.value);
  };
  const [loginpassword, setloginpassword] = useState("");
  const TakeLoginPassword = (e) => {
    setloginpassword(e.target.value);
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
  const [signinerror, setsigninerror] = useState(false);
  const [signinerrormessage, setsigninerrormessage] = useState("");
  const [signinerror2, setsigninerror2] = useState(false);
  const [signinerrormessage2, setsigninerrormessage2] = useState("");
  const LoginSubmit = (e) => {
    e.preventDefault();
    setsigninerror(false);
    setsigninerror2(false);
    setsigninerrormessage("");
    setsigninerrormessage2("");

    if (!ValidEmail.test(loginemail)) {
      setsigninerror(true);
      setsigninerrormessage("Invalid email format");
      return;
    }

    if (!ValidPassword.test(loginpassword)) {
      setsigninerror2(true);
      setsigninerrormessage2("Invalid password format");
      return;
    }

    const users = JSON.parse(localStorage.getItem("user")) || [];

    const user = users.find(
      (user) => user.email === loginemail && user.password === loginpassword
    );

    if (user) {
      localStorage.setItem("login", "yes");
      setcontent(true);
    } else {
      const emailNotFound = users.every((user) => user.email !== loginemail);
      const passwordIncorrect = users.some(
        (user) => user.email === loginemail && user.password !== loginpassword
      );

      if (emailNotFound) {
        setsigninerror(true);
        setsigninerrormessage("Email is not registered");
      }

      if (passwordIncorrect) {
        setsigninerror2(true);
        setsigninerrormessage2("Incorrect password");
      }
    }
  };

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
  console.log(favourites);

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

  return (
    <div
      className={`w-[100%]  overflow-x-hidden relative justify-center  h-[100vh] bg-[#10141E] flex ${
        content ? " pl-[32px] py-[32px]" : "   items-center  "
      }`}
    >
      {content ? (
        <div className="flex justify-between w-[100%]  ">
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
          <div className=" overflow-y-auto w-[100%]  items-center flex flex-col pl-[32px]">
            <div className=" w-[100%] max-w-[1300px] flex gap-[24px] items-start">
              <img src={serch_icon} alt="" />
              <input
                value={searchvalue}
                onChange={TakeSearchValue}
                placeholder=" Search for movies or TV series"
                className="text-[24px] font-[400] text-[#fff] outline-none"
              />
            </div>
            {result.length > 0 ? (
              <>
                <div className="mt-[40px] w-[100%] flex flex-col gap-[25px] max-w-[1300px]">
                  <h1 className="text-[32px] text-[#fff] font-[400]">
                    {` Found ${result.length} results for ‘${searchvalue}’`}
                  </h1>
                  <div
                    className={`${
                      result.length > 4
                        ? "max-w-[1300px] flex flex-wrap gap-[40px]  "
                        : "w-[100%] flex flex-wrap gap-[40px]"
                    }`}
                  >
                    {result.map((info, key) => (
                      <div
                        key={key}
                        className=" flex flex-col gap-[8px] relative "
                      >
                        <div
                          onClick={() => FavClick(info)}
                          className="w-[32px] h-[32px] flex items-center justify-center  absolute top-[16px] right-[16px] cursor-pointer"
                        >
                          <Fav_unclicked_icon
                            isBookmarked={favourites.some(
                              (fav) => fav.title === info.title
                            )}
                          />
                        </div>
                        <img
                          className=" rounded-[8px] w-[280px] "
                          src={info.thumbnail.regular.medium}
                          alt=""
                        />
                        <div className="flex flex-col">
                          <div className="flex gap-[8px]  items-center">
                            <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
                              {info.year}
                            </p>
                            <img src={dot_img} alt="" />
                            <div className="flex items-center justify-center gap-[6px]">
                              <img
                                className="w-[12px] h-[12px]"
                                src={`${
                                  info.category === "TV Series"
                                    ? tv_icon
                                    : movie_icon
                                }`}
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
                          <h1 className="text-[18px] font-[400] text-[#fff]">
                            {info.title}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {!tv && !movie && !fav && (
                  <div className="mt-[35px] h-[230px] flex flex-col gap-[25px] w-[100%] ">
                    <h1 className="text-[32px] text-[#fff] font-[400]">
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
                  } w-[100%] max-w-[1300px] flex flex-col gap-[25px] items-center`}
                >
                  <h1 className="text-[32px] text-[#fff] font-[400] self-start">
                    {heading}
                  </h1>
                  <div
                    className={`${
                      Info.length > 4
                        ? "max-w-[1300px] flex flex-wrap gap-[40px]  "
                        : "w-[100%] flex flex-wrap gap-[40px]"
                    }`}
                  >
                    {Info.map((info, key) => (
                      <div
                        onMouseEnter={() => GoVisible(key)}
                        onMouseLeave={() => Hide()}
                        key={key}
                        className="flex flex-col gap-[8px] relative"
                      >
                        <div
                          onClick={() => {
                            FavClick(info);
                          }}
                          className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer z-1  "
                        >
                          <Fav_unclicked_icon
                            isBookmarked={favourites.some(
                              (fav) => fav.title === info.title
                            )}
                          />
                        </div>

                        <div>
                          <img
                            className="rounded-[8px] h-[180px] w-[280px]"
                            src={info.thumbnail.regular.medium}
                            alt=""
                          />
                          {visibleItem === key && (
                            <div className="rounded-[8px] w-[100%] h-[180px] bg-[#00000080] flex items-center justify-center absolute top-0">
                              <div className=" cursor-pointer bg-white/25  py-[9px] gap-[19px] rounded-[28px] pl-[9px] pr-[24px] flex items-center justify-center">
                                <img src={play_icon} alt="" />
                                <p className="text-[18px]  font-[400] text-[#fff]">
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
                                src={`${
                                  info.category === "TV Series"
                                    ? tv_icon
                                    : movie_icon
                                }`}
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
                          <h1 className="text-[18px] font-[400] text-[#fff]">
                            {info.title}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                  {fav && (
                    <div className="max-w-[1300px] w-[100%] mt-[50px] flex flex-col ">
                      <h1 className="text-[32px] text-[#fff] font-[400] self-start">
                        Bookmarked TV Series
                      </h1>
                      <div
                        className={`  ${
                          BookmarkedTVSeries.length > 4
                            ? "max-w-[1300px] flex flex-wrap gap-[40px] "
                            : "w-[100%] flex flex-wrap gap-[40px] r"
                        }`}
                      >
                        {BookmarkedTVSeries.map((info, key) => (
                          <div
                            key={key}
                            className="flex flex-col gap-[8px] relative"
                          >
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
                              className="rounded-[8px] w-[280px]"
                              src={info.thumbnail.regular.medium}
                              alt=""
                            />
                            <div className="flex flex-col">
                              <div className="flex gap-[8px] items-center">
                                <p className="font-[400] text-[13px] text-[#fff] opacity-[0.75]">
                                  {info.year}
                                </p>
                                <img src={dot_img} alt="" />
                                <div className="flex items-center justify-center gap-[6px]">
                                  <img
                                    className="w-[12px] h-[12px]"
                                    src={`${
                                      info.category === "TV Series"
                                        ? tv_icon
                                        : movie_icon
                                    }`}
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
                              <h1 className="text-[18px] font-[400] text-[#fff]">
                                {info.title}
                              </h1>
                            </div>
                          </div>
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
            <Signup
              Submit={Submit}
              email={email}
              TakeEmail={TakeEmail}
              password={password}
              TakePassword={TakePassword}
              repeatpassword={repeatpassword}
              TakeRepeatPassword={TakeRepeatPassword}
              SignUpClick={SignUpClick}
              signuperror={signuperror}
              signuperrormessage={signuperrormessage}
              signuperror2={signuperror2}
              signuperrormessage2={signuperrormessage2}
              signuperrormessage3={signuperrormessage3}
              signuperror3={signuperror3}
            />
          ) : (
            <Login
              LoginSubmit={LoginSubmit}
              TakeLoginEmail={TakeLoginEmail}
              loginemail={loginemail}
              loginpassword={loginpassword}
              TakeLoginPassword={TakeLoginPassword}
              SignUpClick={SignUpClick}
              signinerror={signinerror}
              signinerrormessage={signinerrormessage}
              signinerror2={signinerror2}
              signinerrormessage2={signinerrormessage2}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
