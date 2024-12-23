import type { IFatos } from "../interface/IFatos";

const API_KEY = "https://uselessfacts.jsph.pl/api/v2/facts/random";

import axios from "axios";
export default function baixaFatos(): Promise<IFatos> {
  return axios
    .get(API_KEY)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }
      return res.data;
    })
    .then((data) => {
      data.text = `"${data.text}"`;
      return data;
    })
    .catch((error) => {
      console.error(`Erro ao baixar dados da api. ${error}`);
    });
}
