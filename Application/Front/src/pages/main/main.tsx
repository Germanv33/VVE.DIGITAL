import React, { useContext, useEffect, useState } from "react";
import "./MainPageStyle.sass";
import TopHeader from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { observer } from "mobx-react-lite";
import main1 from "../../assets/img/main/main.svg";
import main2 from "../../assets/img/main/main2.svg";
import line from "../../assets/img/main/Sparator.svg";
import Letterize from "letterizejs";
import anime from "animejs";

const MainPage = () => {
  const test = new Letterize({
    targets: ".animate-me",
  });

  const animation = anime.timeline({
    targets: test.listAll,
    delay: anime.stagger(100, {
      grid: [test.list[0].length, test.list.length],
      from: "center",
    }),
    loop: true,
  });

  animation
    .add({ scale: 0.5 })
    .add({ letterSpacing: "10px" })
    .add({ scale: 1 })
    .add({ letterSpacing: "6px" });
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
            <a href="#project">
              <button>Смотреть</button>
            </a>
          </div>
          <div className="right">
            <div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
              <div className="animate-me">vve.digital vve.digital</div>
            </div>
          </div>
        </section>

        <div id="project" className="saparator">
          <img src={line} alt="line" className="line" />
        </div>

        <section className="project">
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
