<template>
  <section class="relative">
    <ShapeDivider />
    <div class="header finisher-header w-full h-full">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import adicionaFundoColorido from "@/app/util/fundoColorido";
import ShapeDivider from "./ShapeDivider.vue";

export default {
  components: {
    ShapeDivider,
  },
  mounted() {
    adicionaFundoColorido();
  },
};
</script>
