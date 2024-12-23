import { ControlerModal } from "@/controller/CModalEmail";
import type { IDadosForm } from "@/interface/IDadosForm";
import axios from "axios";

export default async function enviaDadosForm(dados: IDadosForm) {
  const CModal = new ControlerModal();
  try {
    await axios.post("https://api.web3forms.com/submit", dados);
    CModal.populaModalEnviado();
  } catch (err) {
    CModal.populaModalError(`${err}`);
  }
}
