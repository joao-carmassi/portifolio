import baixaRepsGithub from "@/service/SBaixaRepsGithub";
import { Chart, registerables, LinearScale, CategoryScale } from "chart.js";

Chart.register(...registerables, LinearScale, CategoryScale);

const linguistURL =
  "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json";

async function buscaCores() {
  const response = await fetch(linguistURL);
  return await response.json();
}

// Função para criar o gráfico
export default async function criaGrafico() {
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;

  const reps = await baixaRepsGithub();

  delete reps.null;

  const nomes = Object.keys(reps);
  const valores = Object.values(reps);

  const coresLinguagens = await buscaCores();
  const cores = nomes.map((nome) => coresLinguagens[nome]?.color || "#000000");

  const data = {
    labels: nomes,
    datasets: [
      {
        label: "Languages",
        data: valores,
        backgroundColor: cores,
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar" as const,
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(ctx, config);
}
