<template>
  <section class="bg-base-100">
    <div
      class="w-full px-8 md:p-0 py-10 md:py-14 gap-3 flex flex-col justify-center items-center"
    >
      <h2 class="text-2xl text-primary md:text-3xl font-semibold">
        Did you know that:
      </h2>
      <p
        class="tooltip tooltip-primary tooltip-bottom md:w-1/2 text-center text-lg md:text-xl"
        data-tip="uselessfacts API"
      >
        {{ fato?.text }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import type { IFatos } from "@/interface/IFatos";
import baixaFatos from "@/service/SBaixaFatos";

export default {
  data() {
    return {
      fato: null as IFatos | null,
    };
  },
  async created() {
    this.fato = await baixaFatos();
  },
};
</script>
