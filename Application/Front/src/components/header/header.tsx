import "./header.sass";
import logo from "../../assets/img/header/logo.svg";
import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import store from "../../stores/mainStore";
import { fetchToken, setToken } from "../../utils/auth";
import { observer } from "mobx-react";

export const TopHeader: FC = () => {
  const userStore = store.userStore;
  const projectStore = store.projectStore;
  const pathname = window.location.pathname;
  //   const [isToken, setisToken] = useState(false);
  const navigate = useNavigate();
  const devStore = store.devStore;

  const logout = () => {
    setToken(null);

    userStore.token = null;
    userStore.fullName = "Your Fullname";
    userStore.email = "";
    devStore.Teams = [];
    projectStore.Projects = [];
    projectStore.ProjectMeetings = [];
    userStore.team_id = null;
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
            <NavLink to="/signin" className="project__btn">
              <span>Create Project</span>
            </NavLink>

            <NavLink to="/signin" className="signin__btn">
              <span>Sign In</span>
            </NavLink>
          </div>
        ) : (
          <div className="right_side">
            {userStore.role == "worker" ||
            userStore.role == "project_manager" ? (
              <NavLink to="#" className="project__btn">
                <button>
                  <span>Good Work</span>
                </button>
              </NavLink>
            ) : (
              <NavLink to="/profile" className="project__btn">
                <button
                  onClick={() => {
                    projectStore.CreationModalIsOpen = true;
                  }}
                >
                  <span>Create Project</span>
                </button>
              </NavLink>
            )}

            {pathname === "/profile" || pathname === "/worker/profile" ? (
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
