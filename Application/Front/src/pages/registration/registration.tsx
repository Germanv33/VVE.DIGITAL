import { Component, useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import store from "../../stores/mainStore";
import axios from "axios";

import InfoModal from "../../components/modal/infoModal/InfoModal";

const Registration = () => {
  const navigate = useNavigate();
  const userStore = store.userStore;

  const register = (password: string, username: string, fullname: string) => {
    axios
      .post("http://localhost:8081/api/v1/auth/register", {
        email: username,
        password: password,
        fullname: fullname,
      })
      .then(function (response) {
        console.log(response.data.token);
        if (response.status === 200) {
          console.log("Register Successful");
          navigate("/signin");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        userStore.Modalinfo = String(error.message);
        userStore.userModalisOpen = true;
      });
  };

  const reg_validate = Yup.object({
    checkbox: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),

    fullname: Yup.string()

      .min(9, "fullname must be at least 5 charaters")
      .required("Fullname is required"),

    email: Yup.string()
      .email()
      .min(5, "email must be at least 5 charaters")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const register_form = (
    <Formik
      initialValues={{
        fullname: "",
        email: "",
        password: "",
        checkbox: false,
      }}
      validationSchema={reg_validate}
      onSubmit={(values) => {
        console.log(values);
        register(values.password, values.email, values.fullname);
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
          <form action="submit" onSubmit={handleSubmit} method="post">
            <h1>Create your account</h1>
            <h2>Account to manage your projects</h2>
            <div className="input__handler">
              <MyInput
                value={values.fullname}
                className={`fullname__input ${
                  touched.email && errors.email && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                id="fullname"
                inputType="text"
                svg={fullname}
                placeholderValue="Jacky Jonson"
                padding="0"
                margin={
                  touched.fullname && errors.fullname
                    ? "0px"
                    : "0px 0px 15px 0px"
                }
              />
              {touched.fullname && errors.fullname && (
                <p className={"error"}> {errors.fullname}</p>
              )}
              <MyInput
                value={values.email}
                className={`email__input ${
                  touched.email && errors.email && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                inputType="text"
                svg={email}
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
                svg={password}
                placeholderValue="Password"
                padding="0"
                margin="0"
              />
              {touched.password && errors.password && (
                <p className={"error"}> {errors.password}</p>
              )}
            </div>

            <MyCheckbox
              name="checkbox"
              id="checkbox"
              //   onChanges={checkChange}
              label_title="I agree to the Terms & Conditions"
            />

            <button
              disabled={errors.password || errors.email ? true : false}
              className="signin__button"
              type="submit"
            >
              Create my account
            </button>

            <span className="tologin">
              Already have an account ?
              <NavLink to="/signin">
                <a> Sign in</a>
              </NavLink>
            </span>
          </form>
        );
      }}
    </Formik>
  );

  class RegForm extends Component<any, any> {
    render() {
      return register_form;
    }
  }

  return (
    <main className="full_container">
      <InfoModal />
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />
      <div className="register_container">
        <RegForm />
      </div>
      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
};

export default observer(Registration);
