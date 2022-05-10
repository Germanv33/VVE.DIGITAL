import { makeAutoObservable, observable } from "mobx";

export class UserStore {
  loginModalIsOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UserStore();
