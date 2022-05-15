import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/header/header";
import "./profile.sass";
import we from "../../assets/img/signin/we.svg";
import line from "../../assets/img/main/Sparator.svg";

const Profile = () => {
  return (
    <main id="wrapper" className="full_container">
      <div id="we">
        <img src={we} alt="some lines" className="we__img" />
      </div>
      <TopHeader />
      <h1>PROFILE</h1>
      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
};

export default observer(Profile);
