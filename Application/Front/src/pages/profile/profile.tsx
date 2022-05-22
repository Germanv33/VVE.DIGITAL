import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/header/header";
import "./profile.sass";
import we from "../../assets/img/signin/we.svg";
import line from "../../assets/img/main/Sparator.svg";
import store from "../../stores/mainStore";
import profile_background from "../../assets/img/profile/Frame.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../../utils/auth";

const Profile = () => {
  const userStore = store.userStore;
  const navigate = useNavigate();

  const find_info = () => {
    let config = {
      headers: {
        Authorization: "BEARER " + fetchToken(),
      },
    };
    axios
      .get("http://localhost:8081/api/v1/customers/token", (config = config))
      .then(function (response) {
        console.log("query results:");
        console.log("userstore token = " + userStore.token);
        if (response.status === 200) {
          console.log("Query Successful");
          if (response.data.email) {
            userStore.fullName = response.data.fullname;
            userStore.email = response.data.email;
            console.log("name: " + userStore.fullName);
            console.log("email: " + userStore.email);
          } else {
            console.log("Token invalid or not provided");
            console.log("name: " + userStore.fullName);
            console.log("email: " + userStore.email);
          }
        }
      })
      .catch(function (error) {
        console.log("Invalid");
        console.log(userStore.token);
        userStore.token = null;
        setToken(null);
        navigate("/");
        console.log(error, "error");
      });
  };

  useEffect(() => {
    console.log("token before: " + fetchToken());
    if (!(fetchToken() === null)) {
      find_info();
    }
  }, []);

  return (
    <main id="wrapper" className="full_container">
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />

      <div className="profile__container">
        <div className="profile__info">
          <div className="profile_image">
            <img src={profile_background} alt="background" />
          </div>
          <div className="text__info">
            <h1>{userStore.fullName}</h1>
            <button>Создать новый проект</button>
          </div>
        </div>
      </div>

      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
};

export default observer(Profile);
