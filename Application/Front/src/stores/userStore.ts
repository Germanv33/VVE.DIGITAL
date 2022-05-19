import axios from "axios";
import { makeAutoObservable, observable } from "mobx";
import { fetchToken } from "../utils/auth";

export class UserStore {
  role: string = "customer";
  token: string | null = "";
  email: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UserStore();
