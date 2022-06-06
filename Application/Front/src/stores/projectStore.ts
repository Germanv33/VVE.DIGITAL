import { makeAutoObservable, observable } from "mobx";

export interface IProject {
  id: number;
  customer_id: number;
  name: string;
  cost: number | null;
  dev_team_id: number;
  status_color: string;
}

export interface IProjectMeetings {
  id: number;
  project_id: number;
  created_by: number;
  date: string;
  status: string;
}

export interface ITech {
  technology: string;
  completeness: number;
}

export class projectStore {
  // Profile arrays
  Projects: IProject[] = [];
  ProjectMeetings: IProjectMeetings[] = [];

  // Modal Arrays
  ModalTechnologies: ITech[] = [];
  ModalMeetings: IProjectMeetings[] = [];

  CreationModalIsOpen: boolean = false;
  ProjectModalIsOpen: boolean = false;
  IsNeedToUpdate: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  addProject(props: IProject) {
    this.Projects.push(props);
  }
  addProjectMeetings(props: IProjectMeetings) {
    this.ProjectMeetings.push(props);
  }
  addModalTechnology(props: ITech) {
    var index = this.ModalTechnologies.indexOf(props, 0);
    if (!(index > -1)) {
      this.ModalTechnologies.push(props);
    }
  }
  addModalMeeting(props: IProjectMeetings) {
    var index = this.ModalMeetings.indexOf(props, 0);
    if (!(index > -1)) {
      this.ModalMeetings.push(props);
    }
  }
}

export default new projectStore();
