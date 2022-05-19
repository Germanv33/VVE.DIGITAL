import { makeAutoObservable, observable } from "mobx";
import { tokenStore } from "./tokenStore";
import { UserStore } from "./userStore";

class MainStore {
  userStore: UserStore;
  tokenStore: tokenStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.tokenStore = new tokenStore();
  }
}

const store = new MainStore();
export default store;
