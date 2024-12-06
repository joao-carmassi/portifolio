import ScrollReveal from "scrollreveal";

export function aplicaAnimacoes() {
  // Configurações para o formulário
  const animationsScrollForm = {
    distance: "20%",
    origin: "left",
    duration: 1000,
    viewFactor: 0.25,
  };
  ScrollReveal().reveal("#animacaoScrollForm", animationsScrollForm);

  // Configurações para a seção "about"
  const animacaoScrollAbout = {
    distance: "20%",
    origin: "bottom",
    duration: 1000,
    viewFactor: 0.25,
  };
  ScrollReveal().reveal("#animacaoScrollAbout", animacaoScrollAbout);
}
