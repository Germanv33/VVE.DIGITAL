import { makeAutoObservable, observable } from "mobx";

export class ItemStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new ItemStore();
