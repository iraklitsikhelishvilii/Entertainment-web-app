import React, { useState } from "react";
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
import unclicked_fav from "../../../../public/assets/unclickedfav.svg";
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

  const Submit = (e) => {
    e.preventDefault();
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
    } else {
      alert("ara");
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
  const [content, setcontent] = useState(true);
  const LoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("user"));
    const user = users.find(
      (user) => user.email === loginemail && user.password === loginpassword
    );
    if (user) {
      setcontent(true);
    } else {
      alert("ara");
    }
  };
  const [movie, setmovie] = useState(false);
  const movies = Data.filter((item) => item.category === "Movie");
  const MvieFilter = () => {
    setmovie(true);
    settv(false);
    setall(false);
    setfav(false);
  };
  const [tv, settv] = useState(false);
  const TvSeries = Data.filter((item) => item.category === "TV Series");
  const Tvclick = () => {
    settv(true);
    setmovie(false);
    setall(false);
    setfav(false);
  };
  const [all, setall] = useState(false);
  const Allclick = () => {
    setall(true);
    settv(false);
    setmovie(false);
    setfav(false);
  };

  const [fav, setfav] = useState(false);
  const FavClick = () => {
    const newarray = Data.forEach((item) => {
      return [...item, (item.isBookmarked = !item.isBookmarked)];
    });
  };

  const favourites = Data.filter((info) => info.isBookmarked);
  const MenuFavClick = () => {
    setfav(true);
    setall(false);
    settv(false);
    setmovie(false);
  };
  let Info = Data;
  if (movie) {
    Info = movies;
  } else if (tv) {
    Info = TvSeries;
  } else if (all) {
    Info = Data;
  } else if (fav) {
    Info = favourites;
  }
  const [searchvalue, setsearchvalue] = useState("");
  const [result, setresult] = useState([]);
  const TakeSearchValue = (e) => {
    setsearchvalue(e.target.value);
  };
  const SearchClick = (e) => {
    e.preventDefault();
    let Searched = Data.filter((item) => item.title.includes(searchvalue));
    setresult(Searched);
    console.log(Searched);
  };
  let heading = "Recommended for you";
  if (tv) {
    heading = "TV Series";
  } else if (movie) {
    heading = "Movies";
  } else if (fav) {
    heading = "Bookmarked Movies";
  }
  return (
    <div
      className={`w-[100%] justify-between overflow-x-hidden relative  h-[100vh] bg-[#10141E] flex ${
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
          />
          <div className=" overflow-y-auto w-[100%]  items-center flex flex-col pl-[32px]">
            <form
              onSubmit={SearchClick}
              className="w-[1300px] flex gap-[24px] items-start"
            >
              <img src={serch_icon} alt="" />
              <input
                value={searchvalue}
                onChange={TakeSearchValue}
                placeholder=" Search for movies or TV series"
                className="text-[24px] font-[400] text-[#fff] outline-none"
              />
            </form>
            {result.length > 0 ? (
              <>
                <div className="mt-[40px] w-[100%] flex flex-col gap-[25px]">
                  <h1 className="text-[32px] text-[#fff] font-[400]">
                    {` Found ${result.length} results for ‘${searchvalue}’`}
                  </h1>
                  <div
                    className={`  ${
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
                        <img
                          onClick={FavClick}
                          className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer"
                          src={unclicked_fav}
                          alt=""
                        />
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
                  <div className="mt-[35px] flex flex-col gap-[25px]">
                    <h1 className="text-[32px] text-[#fff] font-[400]">
                      Trending
                    </h1>
                    <Slider FavClick={FavClick} />
                  </div>
                )}
                <div className="mt-[40px] w-[100%] flex flex-col gap-[25px]">
                  <h1 className="text-[32px] text-[#fff] font-[400]">
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
                        key={key}
                        className=" flex flex-col gap-[8px] relative "
                      >
                        <img
                          onClick={FavClick}
                          className="w-[32px] absolute top-[16px] right-[16px] cursor-pointer"
                          src={unclicked_fav}
                          alt=""
                        />
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
              SignUpClick={Signup}
            />
          ) : (
            <Login
              LoginSubmit={LoginSubmit}
              TakeLoginEmail={TakeLoginEmail}
              loginemail={loginemail}
              loginpassword={loginpassword}
              TakeLoginPassword={TakeLoginPassword}
              SignUpClick={SignUpClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
