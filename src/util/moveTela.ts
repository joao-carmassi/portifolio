export default function moveTela(seletor: string) {
  document
    .getElementById(seletor)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}
