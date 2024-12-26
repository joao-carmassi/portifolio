import { ControlerModal } from "@/controller/CModalEmail";
import type { IDadosForm } from "@/interface/IDadosForm";
import axios from "axios";

const API_KEY = "https://api.web3forms.com/submit";

export default async function enviaDadosForm(dados: IDadosForm) {
  const CModal = new ControlerModal();
  try {
    await axios.post(API_KEY, dados);
    CModal.populaModalEnviado();
  } catch (err) {
    CModal.populaModalError(`${err}`);
  }
}
