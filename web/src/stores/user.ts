import axios from "axios";
import { makeAutoObservable } from "mobx";
import { User } from "../contexts/AuthContext";

class UserStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  data: User | null = null;

  setUser(user: User | null) {
    this.data = user;
  }

  async logout() {
    await axios.post("/api/logout");
    window.location.href = "/login";
  }
}

export default UserStore;
