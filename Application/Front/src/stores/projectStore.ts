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
  project_id: number;
  created_by: number;
  date: string;
  status: string;
}

export class projectStore {
  Projects: IProject[] = [];
  ProjectMeetings: IProjectMeetings[] = [];
  CreationModalIsOpen: boolean = false;
  ProjectModalIsOpen: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  addProject(props: IProject) {
    this.Projects.push(props);
  }
  addProjectMeetings(props: IProjectMeetings) {
    this.ProjectMeetings.push(props);
  }
}

export default new projectStore();
