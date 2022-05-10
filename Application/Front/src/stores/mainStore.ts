import { makeAutoObservable, observable } from "mobx";
import { ItemStore } from "./itemStore";
import { UserStore } from "./userStore";

class MainStore {
  userStore: UserStore;
  itemStore: ItemStore;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore();
    this.itemStore = new ItemStore();
  }
}

const store = new MainStore();
export default store;
