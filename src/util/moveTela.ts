export class MoveTela {
  move(seletor: string) {
    document
      .getElementById(seletor)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
