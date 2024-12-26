import type { Ireps } from "@/interface/IRepsGithub";
import axios from "axios";

const URL_API = "https://api.github.com/users/joao-carmassi/repos";
let reps = [] as Ireps[];

export default function baixaRepsGithub(): Promise<{ [key: string]: number }> {
  return axios.get(URL_API).then((res) => {
    reps = res.data;
    const linguagens = reps.map((rep) => rep.language);
    const contagem = linguagens.reduce((acc, lang) => {
      if (lang in acc) {
        acc[lang]++;
      } else {
        acc[lang] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });
    return contagem;
  });
}
