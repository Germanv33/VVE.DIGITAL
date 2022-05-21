import "./header.sass";
import logo from "../../assets/img/header/logo.svg";
import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import store from "../../stores/mainStore";
import { fetchToken, setToken } from "../../utils/auth";
import { observer } from "mobx-react";

export const TopHeader: FC = () => {
  const userStore = store.userStore;
  const pathname = window.location.pathname;
  //   const [isToken, setisToken] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    // setisToken(false);
    userStore.token = null;
    navigate("/");
  };

  useEffect(() => {}, [store]);

  return (
    <header className="full_header_container">
      <div className="header">
        <NavLink to="/" className="logo">
          <img src={logo}></img>
          <span>vve.digital</span>
        </NavLink>

        <div className="menu">
          <NavLink to="/" className="menu__link first">
            <span className={pathname === "/" ? "active" : ""}>Главная</span>
          </NavLink>

          <NavLink to="#" className="menu__link">
            <span className={pathname === "/about" ? "active" : ""}>О нас</span>
          </NavLink>

          <NavLink to="#" className="menu__link">
            <span className={pathname === "/team" ? "active" : ""}>
              Разработчики
            </span>
          </NavLink>

          <NavLink to="#" className="menu__link">
            <span className={pathname === "/review" ? "active" : ""}>
              Отзывы
            </span>
          </NavLink>
        </div>

        {fetchToken() === null ? (
          <div className="right_side">
            <NavLink to="#" className="project__btn">
              <span>Create Project</span>
            </NavLink>
            <NavLink to="/signin" className="signin__btn">
              <span>Sign In</span>
            </NavLink>
          </div>
        ) : (
          <div className="right_side">
            <NavLink to="#" className="project__btn">
              <span>Create Project</span>
            </NavLink>
            {pathname === "/profile" ? (
              <a onClick={logout} className="signin__btn">
                Logout
              </a>
            ) : (
              <NavLink to="/profile" className="signin__btn">
                <span>Profile </span>
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default observer(TopHeader);
