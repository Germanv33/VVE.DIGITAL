import { makeAutoObservable, observable } from "mobx";
import { projectStore } from "./projectStore";
import { UserStore } from "./userStore";

class MainStore {
  userStore: UserStore;
  projectStore: projectStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.projectStore = new projectStore();
  }
}

const store = new MainStore();
export default store;
