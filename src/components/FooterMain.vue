<template>
  <footer class="footer footer-center bg-primary text-base-100 rounded p-10">
    <nav class="grid grid-flow-col gap-4">
      <button
        @click="controleTela?.move('containerAbout')"
        class="link link-hover"
      >
        About
      </button>
      <button class="link link-hover">Exemple</button>
      <button class="link link-hover">Exemple</button>
    </nav>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a target="_blank" href="https://github.com/joao-carmassi">
          <img
            loading="lazy"
            class="w-8"
            src="/assets/imgs/icons/github.svg"
            alt=""
          />
        </a>
        <a target="_blank" href="https://www.instagram.com/joao_carmassi/">
          <img
            loading="lazy"
            class="w-8"
            src="/assets/imgs/icons/instagram.svg"
            alt=""
          />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/joao-carmassi/">
          <img
            loading="lazy"
            class="w-8"
            src="/assets/imgs/icons/linkedin.svg"
            alt=""
          />
        </a>
      </div>
    </nav>
    <aside>
      <p>Copyright © 2024 - All right reserved</p>
    </aside>
  </footer>
</template>

<script lang="ts">
import { MoveTela } from "@/util/moveTela";

export default {
  data() {
    return {
      corNav: "",
      controleTela: null as MoveTela | null,
    };
  },
  created() {
    this.controleTela = new MoveTela();
  },
};
</script>
