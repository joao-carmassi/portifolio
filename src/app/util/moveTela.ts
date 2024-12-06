export class MoveTela {
  heroHomepage() {
    document
      .getElementById("heroHomePage")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

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
