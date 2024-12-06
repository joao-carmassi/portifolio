<template>
  <nav
    :class="corNav"
    class="fixed px-6 duration-700 delay-300 z-50 navbar bg-base-100 text-primary"
  >
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu text-primary bg-base-100 menu-sm dropdown-content rounded-box z-[1] mt-6 w-52 p-2 shadow-md font-semibold"
        >
          <li>
            <button @click="controleTela?.about" class="p-3 text-base">
              About
            </button>
          </li>
          <li><button class="p-3 text-base">Exemple</button></li>
          <li><button class="p-3 text-base">Exemple</button></li>
        </ul>
      </div>
      <img
        class="h-14 aspect-square rounded-full"
        src="/assets/imgs/icons/icon-preto.png"
        alt=""
      />
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 text-base font-semibold">
        <li><button @click="controleTela?.about">About</button></li>
        <li><button>Exemple</button></li>
        <li><button>Exemple</button></li>
      </ul>
    </div>
    <div class="navbar-end">
      <button
        @click="controleTela?.contactMe"
        class="btn border-2 min-h-11 h-11 px-8 rounded-none text-sm hover:border-primary hover:text-base-100 hover:bg-primary text-primary border-primary bg-base-100"
      >
        Contact
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { MoveTela } from "@/app/util/moveTela";

export default {
  data() {
    return {
      corNav: "",
      controleTela: null as MoveTela | null,
    };
  },
  created() {
    this.controleTela = new MoveTela();
    this.escondeNav();
  },
  methods: {
    escondeNav() {
      if (window.scrollY > 0) {
        this.corNav = "top-0";
      } else {
        this.corNav = "top-[-5rem]";
      }
      window.addEventListener("scroll", this.escondeNav);
    },
  },
};
</script>
