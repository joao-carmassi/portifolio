<template>
  <header>
    <NavMain />
  </header>
  <main class="overflow-hidden">
    <HeroHomepage />
    <FatosAleatorios />
    <FundoColorido id="containerAbout">
      <AboutMe />
    </FundoColorido>
    <FormEmail id="containerFormEmail" />
    <MapaHomepage />
  </main>
  <FooterMain />
  <ModalResEmail />
</template>

<script lang="ts">
import NavMain from "./components/NavMain.vue";
import HeroHomepage from "./components/HeroHomepage.vue";
import FooterMain from "./components/FooterMain.vue";
import FatosAleatorios from "./components/FatosAleatorios.vue";
import MapaHomepage from "./components/MapaHomepage.vue";
import FundoColorido from "./components/FundoColorido.vue";
import AboutMe from "./components/AboutMe.vue";
import FormEmail from "./components/FormEmail.vue";
import ModalResEmail from "./components/ModalResEmail.vue";
import { aplicaAnimacoes } from "./app/util/aplicaAnimacoes";

export default {
  components: {
    NavMain,
    HeroHomepage,
    FatosAleatorios,
    FooterMain,
    MapaHomepage,
    FundoColorido,
    AboutMe,
    FormEmail,
    ModalResEmail,
  },
  mounted() {
    aplicaAnimacoes();
  },
};
</script>

<!-- TODO: Arrumar
  melhorarInputs,
  validarForm,
-->

<style>
html {
  overflow-x: hidden;
}

.textShadow {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}
</style>
