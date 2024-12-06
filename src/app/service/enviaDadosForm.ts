import { ControlerModal } from "../controller/cModalEmail";

const access_key = "e25d109e-87c5-431e-9bd5-89f4b0792f09";

export default function enviaDadosForm(data: object) {
  const modal = new ControlerModal();

  return fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ access_key, ...data }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
      }
      modal.populaModalEnviado();
    })
    .catch((error) => {
      console.error(error);
      modal.populaModalError(error);
    });
}
