import axios from "axios";
import { makeAutoObservable, observable } from "mobx";
import { fetchToken } from "../utils/auth";

export class UserStore {
  role: string = "";
  token: string | null = "";
  email: string = "";
  id: number | null = null;
  fullName: string = "Your fullname";

  in_process: boolean = false;

  //   Workers vars
  team_id: number | null = null;

  //   Modals vars
  userModalisOpen: boolean = false;
  Modalinfo: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}

export default new UserStore();
