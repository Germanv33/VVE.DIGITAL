import React, { useContext, useEffect, useState } from "react";
import "./MainPageStyle.sass";
import TopHeader from "../../components/header/header";
import { observer } from "mobx-react-lite";
import main1 from "../../assets/img/main/main.svg";
import { Helmet } from "react-helmet";

const MainPage = () => {
  return (
    <main className="full_container">
      <div>
        <img src={main1} alt="some lines" className="hero__img" />
      </div>
      <TopHeader />
      <div className="main_container">
        <section className="hero">
          <div className="left">
            <h1>
              Мы знаем почему <br /> вы <span>здесь</span>
            </h1>
            <button>Смотреть</button>
          </div>
          <div className="right">
            <div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default observer(MainPage);
