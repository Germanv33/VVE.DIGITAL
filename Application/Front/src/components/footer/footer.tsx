import "./footer.sass";
import logo from "../../assets/img/footer/footer_logo.svg";
import inst from "../../assets/img/footer/Instagram.svg";
import back from "../../assets/img/footer/BG.png";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import store from "../../stores/mainStore";

export const Footer: FC = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="background__container">
          <img src={back} alt="footer's bg" />
        </div>

        <span className="footer__text">
          Создаем функциональные сайты <br />
          и креативные бренды.
          <br />
          Обратитесь к нам, мы будем рады помочь с дизайном и разработкой
        </span>

        <NavLink to="/worker/signin">
          <button>Разработчик?</button>
        </NavLink>

        <div className="footer__logo">
          <img src={logo} alt="logo" />
          <span>vve.digital</span>
        </div>

        <a>
          <img src={inst} alt="instagram_logo" className="inst__logo" />
        </a>

        <div className="footer__links">
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
          <a>Contact Us</a>
        </div>

        <div className="creditals">
          <span>
            © 2022 <br />
            vveDigital@gmail.com
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
