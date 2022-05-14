import React, { useContext, useEffect, useState } from "react";
import "./RegisterPageStyle.sass";
import TopHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { observer } from "mobx-react-lite";
import line from "../../assets/img/main/Sparator.svg";
import we from "../../assets/img/signin/we.svg";
import email from "../../assets/img/signin/email.svg";
import password from "../../assets/img/signin/password.svg";
import fullname from "../../assets/img/signin/fullname.svg";
import MyInput from "../../components/ui/input/input";
import { MyCheckbox } from "../../components/ui/checkbox/checkbox";
import { NavLink } from "react-router-dom";

const Registration = () => {
  const [checked, setCheck] = useState(false);

  const checkChange = () => {
    setCheck(!checked);
  };

  return (
    <main className="full_container">
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />
      <div className="register_container">
        <form action="submit" method="post">
          <h1>Create your account</h1>
          <h2>Account to manage your projects</h2>
          <div className="input__handler">
            <MyInput
              id="fullname"
              inputType="text"
              svg={fullname}
              placeholderValue="Jacky Jonson"
              padding="0"
              margin="0"
            />

            <MyInput
              id="email"
              inputType="text"
              svg={email}
              placeholderValue="Your email"
              padding="0"
              margin=" 15px 0px 15px 0px"
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
            label_title="I agree to the Terms & Conditions"
          />

          <button className="signin__button" type="submit">
            Create my account
          </button>

          <span className="tologin">
            Already have an account ?
            <NavLink to="/signin">
              <a> Sign in</a>
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

export default observer(Registration);
