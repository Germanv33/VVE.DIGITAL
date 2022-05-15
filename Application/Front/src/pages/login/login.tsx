import React, { Component, FC, useContext, useEffect, useState } from "react";
import "./LoginPageStyle.sass";
import TopHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { observer } from "mobx-react-lite";
import we from "../../assets/img/signin/we.svg";
import email_svg from "../../assets/img/signin/email.svg";
import password_svg from "../../assets/img/signin/password.svg";
import MyInput from "../../components/ui/input/input";
import { MyCheckbox } from "../../components/ui/checkbox/checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import line from "../../assets/img/main/Sparator.svg";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, useField } from "formik";
import { setToken } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const signin = (password: string, username: string) => {
    // make api call to our backend. we'll leave thisfor later
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("password", password);
    const login_data = {
      username: "email@mysite.com",
      password: "changethis",
    };
    const headers = {
      headers: {
        "access-control-allow-credentials": "true",
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://localhost:8081/api/v1/auth/login",
        "username=" + username + "&password=" + password
      )
      .then(function (response) {
        console.log(response.data.token);
        if (response.status === 200) {
          console.log("Login Successful");
          if (response.data.access_token.access_token) {
            setToken(response.data.access_token.access_token);
            console.log(response.data.access_token.access_token);
            navigate("/profile");
          }
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  //   useEffect(() => {
  //     const subscription = 234;
  //   }, []);

  const login_validate = Yup.object({
    checkbox: Yup.bool(),
    email: Yup.string()
      .email()
      .min(5, "email must be at least 5 charaters")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const login_form = (
    <Formik
      initialValues={{
        email: "",
        password: "",
        checkbox: false,
      }}
      validationSchema={login_validate}
      onSubmit={(values) => {
        signin(values.password, values.email);
        console.log(values);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          handleSubmit,
        } = props;
        return (
          <form id="form" onSubmit={handleSubmit} action="submit" method="post">
            <h1>LOG IN</h1>
            <h2>Login to manage your account</h2>
            <div className="input__handler">
              <MyInput
                value={values.email}
                className={`email__input ${
                  touched.email && errors.email && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                inputType="text"
                svg={email_svg}
                placeholderValue="Your email"
                padding="0"
                margin={
                  touched.email && errors.email ? "0px" : "0px 0px 15px 0px"
                }
              />
              {touched.email && errors.email && (
                <p className={"error"}> {errors.email}</p>
              )}
              <MyInput
                value={values.password}
                className={`password__input ${
                  touched.password && errors.password && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                inputType="password"
                svg={password_svg}
                placeholderValue="Password"
                padding="0"
                margin=" 0px"
              />
              {touched.password && errors.password && (
                <p className={"error"}> {errors.password}</p>
              )}
            </div>
            <MyCheckbox
              name="checkbox"
              id="checkbox"
              //   onChanges={checkChange}
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
        );
      }}
    </Formik>
  );

  class LoginForm extends Component<any, any> {
    render() {
      return login_form;
    }
  }

  return (
    <main id="wrapper" className="full_container">
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />
      <div className="login_container">
        <LoginForm />
      </div>
      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
};

export default observer(Login);
