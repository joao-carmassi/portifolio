<template>
  <HeroHomepage />
  <FatosAleatorios />
  <FundoColorido id="containerAbout">
    <AboutMe />
  </FundoColorido>
  <RepsGraph />
  <FormEmail id="containerFormEmail" />
  <MapaHomepage />
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

export default {
  components: {
    HeroHomepage,
    FatosAleatorios,
    MapaHomepage,
    FundoColorido,
    AboutMe,
    FormEmail,
    RepsGraph,
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
