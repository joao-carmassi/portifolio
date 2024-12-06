export class MoveTela {
  contactMe() {
    document
      .getElementById("containerFormEmail")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  about() {
    document
      .getElementById("containerAbout")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
