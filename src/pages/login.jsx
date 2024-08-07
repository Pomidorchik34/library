import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import Bg from "../assets/Bg.svg";
import Ui from "../assets/Avatar.svg";
import GG from "../assets/GG.svg";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Login() {
  let nav = useNavigate();
  const [abled, setAbled] = useState(false);

  let email = useRef("");
  let password = useRef("");
  let isValid = true;
  function clicked(event) {
    if (email.current.value == "" || password.current.value == "") {
      alert("please fill in all inputs");
      return;
    }

    if (localStorage.getItem("users")) {
      let users = localStorage.getItem("users");
      users = JSON.parse(users);
      if (users.includes(email.current.value)) {
      } else {
        isValid = false;
      }
    } else {
      alert("Please sign up first you are not in the user list");
      isValid = false;
      nav("/signup");
    }

    console.log("works");
    if (
      email.current.value.includes("@") ||
      email.current.value.includes(Number)
    ) {
    } else {
      alert("please corect your email");
      return false;
    }

    setAbled(true);
    fetch(`https://api.escuelajs.co/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert(data.message);
          return;
        } else {
          alert("succes");
        }
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userEmail", email.current.value);
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAbled(false);
      });
  }

  return (
    <>
      <div className="container">
        <img src={Bg} alt="" />
        <div className="inputs">
          <div className="cont">
            <img src={Ui} alt="" />
            <h1>UI Unicorn</h1>
          </div>
          <h1 className="heading">Nice to see you again</h1>
          <form action="">
            <div>
              <p>Login</p>
              <input
                type="email"
                ref={email}
                placeholder="Email or phone number"
              />
            </div>
            <div>
              <p>Password</p>
              <input
                type="password"
                ref={password}
                placeholder="Enter password"
              />
            </div>
          </form>
          <div className="bottom">
            <label htmlFor="">
              <Switch {...label} defaultChecked />
              <p>Remeber me</p>
            </label>
            <Link>Frogot password?</Link>
          </div>
          <button disabled={abled} className="sign-btn" onClick={clicked}>
            Sign in
          </button>
          <button className="sign-btn google">
            <img src={GG} alt="" />
            Or sign in with Google
          </button>
          <p className="acc">
            Dont have an account?<Link to="/signup">Sign up now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
