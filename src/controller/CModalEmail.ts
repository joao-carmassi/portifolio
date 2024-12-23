export class ControlerModal {
  private modal;
  private titulo;
  private conteudo;
  private btn;

  constructor() {
    this.modal = document.getElementById("modalRes") as HTMLDialogElement;
    console.log(this.modal);
    this.titulo = this.modal.querySelector("#titulo") as HTMLElement;
    this.conteudo = this.modal.querySelector("#conteudo") as HTMLElement;
    this.btn = this.modal.querySelector("#btn") as HTMLElement;
  }

  abreModal() {
    this.modal.showModal();
  }

  fechaModal() {
    this.modal.close();
    this.limpaModal();
  }

  populaModalEnviado() {
    this.titulo.textContent = `Email sent successfully`;
    this.conteudo.textContent =
      "Thank you for reaching out. Your submission has been successfully received. We will review it and get back to you as soon as possible.";
    this.abreModal();
    this.btn.classList.add("btn-success");
  }

  populaModalError(error: string) {
    this.titulo.textContent = `Error ${error}`;
    this.conteudo.textContent = "Error sending gmail, please try again later";
    this.abreModal();
    this.btn.classList.add("btn-error");
  }

  private limpaModal() {
    this.titulo.textContent = "";
    this.conteudo.textContent = "";
    this.btn.classList.remove("btn-error");
    this.btn.classList.remove("btn-success");
  }
}
