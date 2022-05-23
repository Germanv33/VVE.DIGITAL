import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/header/header";
import "./profile.sass";
import we from "../../assets/img/signin/we.svg";
import line from "../../assets/img/main/Sparator.svg";
import sword from "../../assets/img//profile/sword.svg";
import store from "../../stores/mainStore";
import profile_background from "../../assets/img/profile/Frame.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../../utils/auth";
import { ProjectCardComponent } from "../../components/profile/projectCard";
import { IProject } from "../../stores/projectStore";
import ProjectModal from "../../components/modal/ProjectModal";

const Profile = () => {
  const userStore = store.userStore;
  const projectStore = store.projectStore;
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
            userStore.id = response.data.id;
            console.log(response.data);
            console.log("id: " + userStore.id);
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
      })
      .then(function () {
        find_projects();
      });
  };

  const find_projects = () => {
    let config = {
      headers: {
        Authorization: "BEARER " + fetchToken(),
      },
    };
    axios
      .get(
        "http://localhost:8081/api/v1/user_projects/" + userStore.id,
        (config = config)
      )
      .then(function (response) {
        console.log(" project query results:");

        if (response.status === 200) {
          console.log("Query Successful");
          if (!(response.data === [])) {
            const projects: IProject[] = response.data;
            projectStore.Projects = projects;
            console.log(projectStore.Projects);
          }
        }
      })
      .catch(function (error) {
        console.log("Invalid");
        projectStore.Projects = [];
        console.log(error, "error");
      });
  };

  useEffect(() => {
    // if (!(fetchToken() === null)) {
    find_info();
    // }

    // find_projects();
  }, []);

  return (
    <main id="wrapper" className="full_container">
      <ProjectModal />
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
            <span>Это ваша страница проектов</span>
            <button
              onClick={() => {
                projectStore.ModalIsOpen = true;
              }}
            >
              Создать новый проект
            </button>
          </div>
        </div>
        <div className="project__container">
          <div className="projects__title">
            <img src={sword} alt="aqord picture" />
            <span>ПРОЕКТЫ</span>
          </div>

          <div className="projects__wrapper">
            {projectStore.Projects.map((project) => (
              <ProjectCardComponent
                key={project.id}
                name={project.name}
                date="20.05.2022"
                team="Dev_Team"
                status_color={project.status_color}
              />
            ))}
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
