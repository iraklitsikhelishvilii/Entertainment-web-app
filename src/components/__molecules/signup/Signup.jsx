import React, { useState } from "react";

function Signup({ SignUpClick, setsignup }) {
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

  return (
    <div className="w-[400px]  bg-[#161D2F] rounded-[20px] p-[32px]">
      <h1 className="text-[32px] font-[400] text-[#fff]">Sign Up</h1>
      <form onSubmit={Submit} action="">
        <div className=" relative mt-[40px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={email}
            onChange={TakeEmail}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Email address"
            type="text"
          />
          {signuperror && (
            <p className="text-[13px] font-[400] text-[#FC4747] absolute top-0 right-0">
              {signuperrormessage}
            </p>
          )}
        </div>
        <div className=" relative mt-[24px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={password}
            onChange={TakePassword}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Password"
            type="text"
          />
          {signuperror2 && (
            <p className="text-[13px] font-[400] text-[#FC4747] absolute top-0 right-0">
              {signuperrormessage2}
            </p>
          )}
        </div>
        <div className=" relative mt-[24px] pl-[16px] h-[37px] w-full border-b-solid border-b-[1px] border-b-[#5A698F]">
          <input
            value={repeatpassword}
            onChange={TakeRepeatPassword}
            className="w-[300px] text-[15px] font-[400] text-[#FFF] outline-none"
            placeholder="Repeat password"
            type="text"
          />
          {signuperror3 && (
            <p className="text-[13px] font-[400] text-[#FC4747] absolute top-0 right-0">
              {signuperrormessage3}
            </p>
          )}
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
