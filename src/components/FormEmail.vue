<template>
  <section class="bg-base-200">
    <div
      id="animacaoScrollForm"
      class="p-8 py-10 flex flex-col md:min-h-screen md:flex-row-reverse md:gap-20"
    >
      <div class="text-center w-full lg:text-left flex flex-col justify-center">
        <h2 class="text-4xl font-bold">Contact me!</h2>
        <p class="py-5 md:w-4/5">
          I’d love to hear from you! Whether you have a question, a project in
          mind, or just want to connect, feel free to reach out. I’m always open
          to new opportunities and collaborations.
        </p>
      </div>
      <div
        id="animacaoScrollForm"
        class="w-full flex items-center md:justify-end"
      >
        <div class="card bg-base-100 h-fit w-full max-w-sm shrink-0 shadow-2xl">
          <form id="formEmail" class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Nome</span>
              </label>
              <input
                id="inputNome"
                type="text"
                placeholder="nome"
                class="input input-bordered focus:outline-primary focus:border-primary"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                id="inputEmail"
                type="email"
                placeholder="email"
                class="input input-bordered focus:outline-primary focus:border-primary"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Phone</span>
              </label>
              <input
                id="inputPhone"
                type="text"
                placeholder="phone"
                class="input input-bordered focus:outline-primary focus:border-primary"
                required
              />
            </div>
            <div class="label">
              <span class="label-text">Mensage</span>
            </div>
            <textarea
              id="inputMensage"
              class="textarea focus:outline-primary focus:border-primary textarea-bordered h-24"
              placeholder="mensage"
            ></textarea>
            <div class="form-control flex-row gap-2 mt-6">
              <button class="btn w-1/2 btn-primary text-base-100">
                Submit
              </button>
              <button
                @click="formEmail?.limpaForm"
                type="button"
                id="btnLimpar"
                class="btn w-1/2 border-primary hover:btn-primary hover:text-base-100 border-1 bg-transparent text-primary"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { formEmail } from "@/app/controller/cForm";

export default {
  data() {
    return {
      formEmail: null as formEmail | null,
    };
  },
  mounted() {
    this.formEmail = new formEmail();
  },
};
</script>
