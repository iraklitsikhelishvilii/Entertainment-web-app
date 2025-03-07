import React, { useState } from "react";

function Login({ SignUpClick, setcontent }) {
  const [loginemail, setloginemail] = useState("");
  const TakeLoginEmail = (e) => {
    setloginemail(e.target.value);
  };
  const [loginpassword, setloginpassword] = useState("");
  const TakeLoginPassword = (e) => {
    setloginpassword(e.target.value);
  };

  const ValidEmail = /^[a-zA-Z0-9._:%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const ValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
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

  return (
    <div className="w-[400px] h-[373px] bg-[#161D2F] rounded-[20px] p-[32px]">
      <h1 className="text-[32px] font-[400] text-[#fff]">Login</h1>
      <form onSubmit={LoginSubmit} action="">
        <div className="relative mt-[40px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            onChange={TakeLoginEmail}
            value={loginemail}
            className="  w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Email address"
            type="text"
          />
          {signinerror && (
            <p className="text-[13px] font-[400] text-[#FC4747] absolute top-0 right-0">
              {signinerrormessage}
            </p>
          )}
        </div>
        <div className=" relative mt-[24px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={loginpassword}
            onChange={TakeLoginPassword}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Password"
            type="text"
          />
          {signinerror2 && (
            <p className="text-[13px] font-[400] text-[#FC4747] absolute top-0 right-0">
              {signinerrormessage2}
            </p>
          )}
        </div>
        <button className="mt-[40px] w-[100%] rounded-[6px] bg-[#FC4747] h-[48px] cursor-pointer text-[15px] font-[400] text-[#fff]">
          Login to your account
        </button>
      </form>
      <div className="mt-[24px] w-[100%] flex justify-center items-center ">
        <p className="text-[15px] text-[#fff] font-[400]">
          Don’t have an account?{" "}
          <span
            onClick={SignUpClick}
            className="text-[#FC4747] cursor-pointer ml-[8px]"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
