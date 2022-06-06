import { observer } from "mobx-react";
import { Component, useEffect, useMemo, useState } from "react";
import Footer from "../../components/footer/footer";
import TopHeader from "../../components/header/header";
import "./profile.sass";
import we from "../../assets/img/signin/we.svg";
import line from "../../assets/img/main/Sparator.svg";
import sword from "../../assets/img/profile/sword.svg";
import loading_gif from "../../assets/img/profile/loading.gif";
import store from "../../stores/mainStore";
import profile_background from "../../assets/img/profile/Frame.png";
import { useNavigate } from "react-router";
import { ProjectCardComponent } from "../../components/profile/projectCard";

import {
  find_info,
  find_projects,
  get_role,
} from "../../utils/AxiosQueries/customerQueries";
import ProjectModal from "../../components/modal/ProjectModal/ProjectModal";
import CreationModal from "../../components/modal/ProjectCreationModal/CreationModal";

const Profile = () => {
  const userStore = store.userStore;
  const projectStore = store.projectStore;
  const devStore = store.devStore;
  const navigate = useNavigate();

  const [currentProjectModal, setCurrentProjectModal] = useState(0);
  const [firstupdate, setfirstupdate] = useState(true);

  const onClickHandler = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    get_role();
    if (userStore.role == "worker") {
      navigate("/worker/profile");
    } else {
      userStore.in_process = true;
      find_info(onClickHandler);
      setfirstupdate(false);
    }
  }, []);

  useEffect(() => {
    if (!firstupdate) {
      userStore.in_process = true;
      find_projects();
    }
  }, [projectStore.IsNeedToUpdate]);

  //   Customer's profile html
  const customersProfile = (
    <main id="wrapper" className="full_container">
      <ProjectModal project_id={currentProjectModal} />
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
            <span>Это ваша страница проектов</span>
            <button
              onClick={() => {
                projectStore.CreationModalIsOpen = true;
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

          {!userStore.in_process ? (
            <div className="projects__wrapper">
              {projectStore.Projects.map((project) => {
                if (true) {
                  return (
                    <ProjectCardComponent
                      onClick={(e) => {
                        projectStore.ProjectModalIsOpen = true;
                        setCurrentProjectModal(project.id);
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
          ) : (
            <div className="gif__wrapper">
              <img
                src={loading_gif}
                alt="loading gif"
                className="loading_gif"
              />
            </div>
          )}
        </div>
      </div>

      <div id="project" className="saparator">
        <img src={line} alt="line" className="line" />
      </div>
      <Footer />
    </main>
  );
  //   Customer's profile RC
  class CustomersProfile extends Component<any, any> {
    render() {
      return customersProfile;
    }
  }

  // Check fo role

  return <CustomersProfile />;
};

export default observer(Profile);
