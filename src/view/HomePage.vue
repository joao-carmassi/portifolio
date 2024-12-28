<template>
  <header>
    <NavMain />
  </header>
  <main>
    <HeroHomepage />
    <FatosAleatorios />
    <FundoColorido id="containerAbout">
      <AboutMe />
    </FundoColorido>
    <RepsGraph />
    <FormEmail id="containerFormEmail" />
    <MapaHomepage />
  </main>
  <FooterMain />
  <ModalResEmail />
</template>

<script lang="ts">
import HeroHomepage from "../components/HeroHomepage.vue";
import FatosAleatorios from "../components/FatosAleatorios.vue";
import MapaHomepage from "../components/MapaHomepage.vue";
import FundoColorido from "../components/FundoColorido.vue";
import AboutMe from "../components/AboutMe.vue";
import FormEmail from "../components/FormEmail.vue";
import { aplicaAnimacoes } from "../util/aplicaAnimacoes";
import RepsGraph from "@/components/RepsGraph.vue";
import ModalResEmail from "@/components/ModalResEmail.vue";
import NavMain from "../components/NavMain.vue";
import FooterMain from "../components/FooterMain.vue";

export default {
  components: {
    NavMain,
    HeroHomepage,
    FatosAleatorios,
    MapaHomepage,
    FundoColorido,
    AboutMe,
    FormEmail,
    RepsGraph,
    ModalResEmail,
    FooterMain,
  },

  mounted() {
    aplicaAnimacoes();
  },
};
</script>

<style>
html {
  overflow-x: hidden;
}

.textShadow {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}
</style>
