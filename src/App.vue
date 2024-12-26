<template>
  <header>
    <NavMain />
  </header>
  <main>
    <RouterView />
  </main>
  <FooterMain />
  <ModalResEmail />
</template>

<!-- TODO: Baxar reps e fazer grafico -->
<!-- TODO: Baixar api e consumir -->

<script lang="ts">
import FooterMain from "./components/FooterMain.vue";
import ModalResEmail from "./components/ModalResEmail.vue";
import NavMain from "./components/NavMain.vue";

export default {
  components: {
    NavMain,
    FooterMain,
    ModalResEmail,
  },
};
</script>
