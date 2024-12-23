<template>
  <dialog id="modalRes" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <h3 id="titulo" class="text-lg font-bold">Hello!</h3>
      <p id="conteudo" class="py-4">
        Press ESC key or click the button below to close
      </p>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="modal?.fechaModal"
            id="btn"
            type="button"
            class="btn text-base-100"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts">
import { ControlerModal } from "@/controller/CModalEmail";

export default {
  data() {
    return {
      modal: null as ControlerModal | null,
    };
  },
  mounted() {
    this.modal = new ControlerModal();
  },
};
</script>
