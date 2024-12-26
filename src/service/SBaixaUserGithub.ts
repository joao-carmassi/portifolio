import type IUserGithub from "@/interface/IUserGithub";
import axios from "axios";

const API_KEY = "https://api.github.com/users/joao-carmassi";

export default function baixaUserGithub(): Promise<IUserGithub> {
  return axios.get(API_KEY).then((res) => {
    return res.data;
  });
}
