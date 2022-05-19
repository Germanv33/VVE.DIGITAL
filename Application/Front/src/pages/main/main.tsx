import React, { useContext, useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./MainPageStyle.sass";
import TopHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { observer } from "mobx-react-lite";
import main1 from "../../assets/img/main/main.svg";
import main2 from "../../assets/img/main/main2.svg";
import line from "../../assets/img/main/Sparator.svg";
import store from "../../stores/mainStore";
import { AnimText } from "../../components/ui/animText/animText";

const MainPage = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

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
            <Link
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="project"
            >
              <a>
                <button>Смотреть</button>
              </a>
            </Link>
          </div>
          <div className="right">
            <AnimText />
          </div>
        </section>

        <div className="saparator">
          <img src={line} alt="line" className="line" />
        </div>

        <section id="project" className="project">
          <div className="img_container">
            <img src={main2} alt="second lines" />
          </div>

          <div className="hero__div">
            <h1>
              За лучшим проектом <br />
              вашей жизни?
            </h1>
            <button>Создать</button>
          </div>

          <div className="info">
            <div className="company">
              <h1>VVE.DIGITAL</h1>
              <span>We born Inc</span>
            </div>

            <h1 className="digital">digital-агенство</h1>
          </div>
        </section>

        <div className="saparator">
          <img src={line} alt="line" className="line" />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default observer(MainPage);
