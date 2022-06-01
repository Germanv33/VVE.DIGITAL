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
import { useNavigate, useParams } from "react-router";
import { ProjectCardComponent } from "../../components/profile/projectCard";
import ProjectModal from "../../components/modal/ProjectCreationModal/CreationModal";
import {
  dev_team_info,
  find_info,
  get_role,
} from "../../utils/AxiosQueries/customerQueries";

const TeamPage = () => {
  const userStore = store.userStore;
  const projectStore = store.projectStore;
  const devStore = store.devStore;

  const props = useParams();
  const team_id = props.team_id;

  useEffect(() => {
    // find_team_info(team_id);
    dev_team_info(Number(team_id));
  }, []);

  //   Customer's profile html
  const customersProfile = (
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
            <h1>
              {String(
                devStore.Teams.find((team) => team.id == Number(team_id))?.name
              )}
            </h1>
            <span>
              {String(
                devStore.Teams.find((team) => team.id == Number(team_id))
                  ?.description
              )}
            </span>
          </div>
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

export default observer(TeamPage);
