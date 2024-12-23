import enviaDadosForm from "@/service/SEnviaForm";

export class formEmail {
  private form;
  private inputNome;
  private inputEmail;
  private inputPhone;
  private inputText;

  constructor() {
    this.form = document.getElementById("formEmail") as HTMLFormElement;
    this.inputNome = this.form.querySelector("#inputNome") as HTMLInputElement;
    this.inputEmail = this.form.querySelector(
      "#inputEmail"
    ) as HTMLInputElement;
    this.inputPhone = this.form.querySelector(
      "#inputPhone"
    ) as HTMLInputElement;
    this.inputText = this.form.querySelector(
      "#inputMensage"
    ) as HTMLInputElement;

    this.capturaDadosForm();
  }

  private capturaDadosForm() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dados = {
        access_key: "e25d109e-87c5-431e-9bd5-89f4b0792f09",
        nome: this.inputNome.value,
        email: this.inputEmail.value,
        phone: this.inputPhone.value,
        message: this.inputText.value,
      };
      enviaDadosForm(dados);
      this.limpaForm();
    });
  }

  limpaForm() {
    this.form.reset();
  }
}
