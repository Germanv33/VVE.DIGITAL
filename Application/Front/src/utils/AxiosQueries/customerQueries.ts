import axios from "axios";
import { Iteam } from "../../stores/devStore";
import { IProject } from "../../stores/projectStore";
import { IProjectMeetings } from "../../stores/projectStore";
import { fetchToken, setToken } from "../auth";
import store from "../../stores/mainStore";

const devStore = store.devStore;
const projectStore = store.projectStore;
const userStore = store.userStore;

export async function find_info(navigate: any) {
  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };

  await axios
    .get("http://localhost:8081/api/v1/customers/token", (config = config))
    .then(function async(response) {
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
      //   userStore.token = null;
      //   setToken(null);
      //   navigate("/");
      setToken(null);
      userStore.token = null;
      userStore.fullName = "Your Fullname";
      userStore.email = "";
      devStore.Teams = [];
      projectStore.Projects = [];
      projectStore.ProjectMeetings = [];
      userStore.team_id = null;
      navigate("/");
      console.log(error, "error");
    })
    .then(async function () {
      await find_projects();
    });
}

export const find_projects = async () => {
  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get(
      "http://localhost:8081/api/v1/user_projects/" + userStore.id,
      (config = config)
    )
    .then(async function (response) {
      console.log(" project query results:");

      if (response.status === 200) {
        console.log("Query Successful");
        if (!(response.data === [])) {
          const projects: IProject[] = response.data;
          projectStore.Projects = projects;
          var project: IProject;
          for (project of projects) {
            await dev_team_info(project.dev_team_id);
            await get_meeting_info(project.id);
          }
          projectStore.Projects = projects;
          console.log(projectStore.Projects);
          userStore.in_process = false;
          userStore.modal_in_process = false;
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");
      userStore.in_process = false;
      userStore.modal_in_process = false;
    });
};

export const dev_team_info = async (id: number) => {
  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get("http://localhost:8081/api/v1/dev_team/" + id, (config = config))
    .then(function (response) {
      if (response.status === 200) {
        console.log("Query Successful");
        if (!(response.data === {}) && !(response.data === null)) {
          const dev_team: Iteam = response.data;
          devStore.addTeam(dev_team);
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");
    });
};

export const get_meeting_info = async (project_id: number) => {
  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get(
      "http://localhost:8081/api/v1/meeting/project_last/" + project_id,
      (config = config)
    )
    .then(function (response) {
      if (response.status === 200) {
        console.log("Query Successful");
        if (!(response.data === []) && !(response.data === null)) {
          const meetingsList = response.data;
          var meeting: IProjectMeetings;
          for (meeting of meetingsList) {
            projectStore.addProjectMeetings(meeting);
          }
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");

      userStore.modal_in_process = false;
      userStore.in_process = false;
    });
};

export const get_role = async () => {
  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get("http://localhost:8081/api/v1/auth/role/", (config = config))
    .then(function (response) {
      if (response.status === 200) {
        console.log("Query Successful");
        if (!(response.data === null)) {
          userStore.role = response.data;
        } else {
          userStore.role = "";
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");
    });
};

// Modal Project Requests

export const get_technologies_list = async (project_id: number) => {
  interface TechObject {
    technology: string;
    completeness: number;
  }

  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get(
      "http://localhost:8081/api/v1/project_technologies/" + project_id,
      (config = config)
    )
    .then(function (response) {
      if (response.status === 200) {
        console.log("Query Successful");
        if (!(response.data === []) && !(response.data === null)) {
          const technologiesList = response.data;
          var tech: TechObject;
          for (tech of technologiesList) {
            projectStore.addModalTechnology({
              technology: tech.technology,
              completeness: tech.completeness,
            });
          }
          userStore.in_process = false;
          userStore.modal_in_process = false;
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");
      userStore.in_process = false;
      userStore.modal_in_process = false;
    });
};

export const get_meeting_list = async (project_id: number) => {
  interface TechObject {
    technology: string;
  }

  let config = {
    headers: {
      Authorization: "BEARER " + fetchToken(),
    },
  };
  await axios
    .get(
      "http://localhost:8081/api/v1/meeting/project_last/" + project_id,
      (config = config)
    )
    .then(function (response) {
      if (response.status === 200) {
        console.log("Query Successful");

        if (!(response.data === []) && !(response.data === null)) {
          const meetingsList = response.data;
          var meeting: IProjectMeetings;
          for (meeting of meetingsList) {
            projectStore.addModalMeeting(meeting);
          }
        }
      }
    })
    .catch(function (error) {
      console.log("Invalid");
      projectStore.Projects = [];
      console.log(error, "error");
      userStore.in_process = false;
      userStore.modal_in_process = false;
    });
};
