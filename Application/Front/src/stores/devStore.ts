import { makeAutoObservable, observable } from "mobx";

export interface Iteam {
  id: number;
  name: string;
  description: string;
  img?: any;
}

export class devStore {
  Teams: Iteam[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTeam(props: Iteam) {
    this.Teams.push(props);
  }
}

export default new devStore();
