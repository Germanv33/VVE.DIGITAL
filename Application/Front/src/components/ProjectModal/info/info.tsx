import { random } from "animejs";
import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import { Pie } from "recharts/types/polar/Pie";
import store from "../../../stores/mainStore";
import { get_technologies_list } from "../../../utils/AxiosQueries/customerQueries";
import Pies from "../../ui/circle/circle";
import "./info.sass";

interface MeetingsI {
  project_id: number;
}

const Info = ({ project_id }: MeetingsI) => {
  const projectStore = store.projectStore;
  const devStore = store.devStore;
  const userStore = store.userStore;

  const [first, setfirst] = useState(true);

  const project = projectStore.Projects.find(
    (project) => project.id == project_id
  );

  useEffect(() => {
    if (first) {
      projectStore.ModalTechnologies = [];
      setfirst(false);
    }
    userStore.modal_in_process = true;
    get_technologies_list(project_id);
  }, []);
  if (userStore.role == "customer") {
    return (
      <>
        <div className="project_info">
          <div className="main_info">
            <p>
              {" "}
              <span>Project: </span> {project?.name}
            </p>
            <p>
              {" "}
              <span>Current Cost: </span> {project?.cost}
            </p>
            <p>
              <span>Devs: </span>
              {
                devStore.Teams.find((team) => team.id == project?.dev_team_id)
                  ?.name
              }
            </p>
          </div>

          <p className="tech__title"> Techologies </p>

          {!userStore.modal_in_process ? (
            <div className="tech_circles">
              {projectStore.ModalTechnologies.map((technology, index) => {
                return (
                  <div className="circle__card">
                    <span key={index} className="technology__span">
                      {technology.technology}
                    </span>
                    <Pies
                      percentage={technology.completeness * 100}
                      colour={"hsl(0, 0%, 0%)"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="project_info">
          <div className="main_info">
            <p>
              {" "}
              <span>Project: </span> {project?.name}
            </p>
            <p>
              {" "}
              <span>Current Cost: </span> {project?.cost}
            </p>
            <p>
              <span>Devs: </span>
              {
                devStore.Teams.find((team) => team.id == project?.dev_team_id)
                  ?.name
              }
            </p>
          </div>

          <p className="tech__title"> Techologies </p>

          {!userStore.modal_in_process ? (
            <div className="tech_circles">
              {projectStore.ModalTechnologies.map((technology, index) => {
                return (
                  <div className="circle__card">
                    <span key={index} className="technology__span">
                      {technology.technology}
                    </span>
                    <Pies
                      percentage={technology.completeness * 100}
                      colour={"hsl(0, 0%, 0%)"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </>
    );
  }
};

export default observer(Info);
function rand(arg0: number) {
  throw new Error("Function not implemented.");
}
