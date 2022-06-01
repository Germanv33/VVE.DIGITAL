import { observer } from "mobx-react";
import { Component, useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/header/header";
import "./profile.sass";
import we from "../../assets/img/signin/we.svg";
import line from "../../assets/img/main/Sparator.svg";
import sword from "../../assets/img//profile/sword.svg";
import store from "../../stores/mainStore";
import profile_background from "../../assets/img/profile/Frame.png";
import { useNavigate } from "react-router";
import { ProjectCardComponent } from "../../components/profile/projectCard";
import CreationModal from "../../components/modal/ProjectCreationModal/CreationModal";

import { Link } from "react-router-dom";
import { find_worker_info } from "../../utils/AxiosQueries/workerQueries";
import ProjectModal from "../../components/modal/ProjectModal/ProjectModal";

const WorkerProfile = () => {
  const userStore = store.userStore;
  const projectStore = store.projectStore;
  const devStore = store.devStore;
  const navigate = useNavigate();

  const onClickHandler = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (userStore.role == "customer") {
      navigate("/profile");
    } else {
      find_worker_info(onClickHandler);
    }
  }, []);

  //  Worker's profile html
  const workerProfile = (
    <main id="wrapper" className="full_container">
      <ProjectModal />
      <CreationModal />
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
            <span>Это страница с вашими рабочими проектами</span>

            {!(userStore.team_id == null) ? (
              <Link to={`devs/${userStore.team_id}`} target="_blank">
                <a>Команда</a>
              </Link>
            ) : (
              <span>Не состоит в команде</span>
            )}
          </div>
        </div>
        <div className="project__container">
          <div className="projects__title">
            <img src={sword} alt="aqord picture" />
            <span>ПРОЕКТЫ</span>
          </div>

          <div className="projects__wrapper">
            {projectStore.Projects.map((project) => {
              if (true) {
                return (
                  <ProjectCardComponent
                    onClick={(e) => {
                      projectStore.ProjectModalIsOpen = true;
                    }}
                    key={project.id}
                    name={project.name}
                    date={String(
                      projectStore.ProjectMeetings.find(
                        (meeting) => meeting.project_id == project.id
                      )?.date
                    ).slice(0, 10)}
                    team={String(
                      devStore.Teams.find(
                        (team) => team.id == project.dev_team_id
                      )?.name
                    ).slice(0, 10)}
                    status_color={project.status_color}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
  //  Worker's profile RC
  class WorkerProfile extends Component<any, any> {
    render() {
      return workerProfile;
    }
  }

  return <WorkerProfile />;
};

export default observer(WorkerProfile);
