import React, { useContext, useEffect, useState } from "react";
import "./LoginPageStyle.sass";
import TopHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { observer } from "mobx-react-lite";
import we from "../../assets/img/signin/we.svg";
import email from "../../assets/img/signin/email.svg";
import password from "../../assets/img/signin/password.svg";
import MyInput from "../../components/ui/input/input";
import { MyCheckbox } from "../../components/ui/checkbox/checkbox";
import { NavLink } from "react-router-dom";
import line from "../../assets/img/main/Sparator.svg";

const Login = () => {
  const [checked, setCheck] = useState(false);

  const checkChange = () => {
    setCheck(!checked);
  };

  return (
    <main id="wrapper" className="full_container">
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />
      <div className="login_container">
        <form id="form" action="submit" method="post">
          <h1>LOG IN</h1>
          <h2>Login to manage your account</h2>
          <div className="input__handler">
            <MyInput
              id="email"
              inputType="text"
              svg={email}
              placeholderValue="Your email"
              padding="0"
              margin=" 0px 0px 15px 0px"
            />
            <MyInput
              id="password"
              inputType="password"
              svg={password}
              placeholderValue="Password"
              padding="0"
              margin="0"
            />
          </div>
          <MyCheckbox
            name="checkbox"
            id="checkbox"
            onChanges={checkChange}
            label_title="Remember me"
          />
          <button className="signin__button" type="submit">
            Sign In
          </button>
          <span className="toregister">
            Don't have an account ?
            <NavLink to="/signup">
              <a> Sign up</a>
            </NavLink>
          </span>
        </form>
      </div>
      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
};

export default observer(Login);
