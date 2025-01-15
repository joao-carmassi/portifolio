import ScrollReveal from "scrollreveal";

export function aplicaAnimacoes() {
  const animacaoScrollAbout = {
    distance: "20%",
    origin: "bottom",
    duration: 1000,
    viewFactor: 0.25,
  };
  ScrollReveal().reveal("#animacaoScrollAbout", animacaoScrollAbout);
}
