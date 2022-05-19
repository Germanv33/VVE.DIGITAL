import { makeAutoObservable, observable } from "mobx";

export class tokenStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new tokenStore();
