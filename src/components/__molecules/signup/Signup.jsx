import React from "react";

function Signup({
  Submit,
  email,
  TakeEmail,
  password,
  TakePassword,
  repeatpassword,
  TakeRepeatPassword,
  SignUpClick,
}) {
  return (
    <div className="w-[400px]  bg-[#161D2F] rounded-[20px] p-[32px]">
      <h1 className="text-[32px] font-[400] text-[#fff]">Sign Up</h1>
      <form onSubmit={Submit} action="">
        <div className="mt-[40px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={email}
            onChange={TakeEmail}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Email address"
            type="text"
          />
        </div>
        <div className="mt-[24px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={password}
            onChange={TakePassword}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Password"
            type="text"
          />
        </div>
        <div className="mt-[24px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={repeatpassword}
            onChange={TakeRepeatPassword}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Repeat password"
            type="text"
          />
        </div>
        <button className="mt-[40px] w-[100%] rounded-[6px] bg-[#FC4747] h-[48px] cursor-pointer text-[15px] font-[400] text-[#fff]">
          Create an account
        </button>
      </form>
      <div className="mt-[24px] w-[100%] flex justify-center items-center">
        <p className="text-[15px] text-[#fff] font-[400]">
          Already have an account?
          <span
            onClick={SignUpClick}
            className="text-[#FC4747] cursor-pointer ml-[8px]"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
