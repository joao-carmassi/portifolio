import type { IFatos } from "../interface/iFatos";

const API_KEY = "https://uselessfacts.jsph.pl/api/v2/facts/random";

export default function baixaFatos(): Promise<IFatos> {
  return fetch(API_KEY)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      data.text = `"${data.text}"`;
      return data;
    })
    .catch((error) => {
      console.error(`Erro ao baixar dados da api. ${error}`);
    });
}
