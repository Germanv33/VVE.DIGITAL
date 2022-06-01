import { makeAutoObservable, observable } from "mobx";
import { projectStore } from "./projectStore";
import { UserStore } from "./userStore";
import { devStore } from "./devStore";

class MainStore {
  userStore: UserStore;
  projectStore: projectStore;
  devStore: devStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.projectStore = new projectStore();
    this.devStore = new devStore();
  }
}

const store = new MainStore();
export default store;
