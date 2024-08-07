import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import Bg from "../assets/Bg.svg";
import Ui from "../assets/Avatar.svg";
import GG from "../assets/GG.svg";
// import Script from "../assets/Script";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Signin() {
  let [counter, setCounter] = useState(3);
  let nav = useNavigate();
  let avatar = useRef("");
  const [img, setImage] = useState("https://picsum.photos/200/300");
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  if (users == null) {
    users = [];
  }
  console.log(users);
  function helper() {
    avatar.current.value = img;
  }

  const [abled, setAbled] = useState(false);
  let name = useRef("");
  let email = useRef("");
  let password = useRef("");

  //

  function countValid(e) {
    counter++;
    console.log(counter);
  }

  //

  //
  function clicked(event) {
    if (
      name.current.value == "" ||
      email.current.value == "" ||
      password.current.value == "" ||
      avatar.current.value == ""
    ) {
      alert("please fill in all inputs");
      return;
    }

    if (name.current.value.length <= 3) {
      alert("name is too short name must be more than three characters");
      return;
    }
    let isValid = true;
    users.forEach((element) => {
      if (element.email == email.current.value) {
        isValid = false;
      }
    });
    if (isValid == false) {
      alert("email has alerady used");
    }

    if (
      email.current.value.includes("@") ||
      email.current.value.includes(Number)
    ) {
    } else {
      alert("please corect your email");
      return false;
    }

    setAbled(true);
    fetch(`https://api.escuelajs.co/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        avatar: avatar.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          return;
        } else {
          if (localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            users.push({
              name: name.current.value,
              email: email.current.value,
              password: password.current.value,
              books: [],
            });
            localStorage.setItem("users", JSON.stringify(users));
          } else {
            let users = [];
            users.push({
              name: name.current.value,
              email: email.current.value,
              password: password.current.value,
              books: [],
            });
            localStorage.setItem("users", JSON.stringify(users));
          }

          alert("succes");
        }
        console.log(data);
        console.log(counter);
        nav("/login");
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
            <img src={img} alt="" />
            <input
              onClick={helper}
              ref={avatar}
              className="ava"
              type="text"
              name=""
              id=""
              placeholder="laction of avatar"
            />
          </div>
          <h1 className="heading">Nice to see you new user</h1>
          <form action="">
            <div>
              <p>Email</p>
              <input
                ref={email}
                type="email"
                placeholder="Email or phone number"
              />
            </div>
            <div>
              <p>Name</p>
              <input ref={name} type="text" placeholder="Enter your name" />
            </div>
            <div>
              <p>Password</p>
              <input
                ref={password}
                type="password"
                placeholder="Enter password"
              />
            </div>
          </form>
          <div className="bottom"></div>
          <button className="sign-btn" disabled={abled} onClick={clicked}>
            Sign up
          </button>
          <button className="sign-btn google">
            <img src={GG} alt="" />
            Or sign up with Google
          </button>
          <p className="acc">
            Dont have an account?<Link to="/login">Sign in now</Link>
          </p>
        </div>
      </div>
      {/* <script src="../assets/Script.js"></script> */}

      {/* <Script /> */}
    </>
  );
}

export default Signin;
{
  /* <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary Mui-checked css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase"><input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" aria-label="Switch demo" checked=""><span class="MuiSwitch-thumb css-jsexje-MuiSwitch-thumb"></span><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></span> */
}
