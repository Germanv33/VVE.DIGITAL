import { makeAutoObservable, observable } from "mobx";

export interface IProject {
  id: number;
  customer_id: number;
  name: string;
  cost: number | null;
  dev_team_id: number;
  status_color: string;
}

export class projectStore {
  Projects: IProject[] = [];
  ModalIsOpen: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  addProject(props: IProject) {
    this.Projects.push(props);
  }
}

export default new projectStore();
