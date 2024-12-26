<template>
  <section class="bg-base-100 px-5">
    <div class="py-10 md:py-14 grid place-items-center">
      <h2 class="text-3xl md:text-4xl text-primary font-semibold">Github</h2>
    </div>
    <div
      class="pb-14 md:pb-20 grid place-items-center gap-16 justify-center h-full"
    >
      <div id="infoGithub" class="shadow-lg max-h grid place-items-center">
        <header class="bg-primary w-full">
          <a
            class="flex items-center w-fit h-fit p-4 gap-4"
            :href="user.html_url"
            target="_blank"
          >
            <div class="avatar online">
              <div class="w-16 rounded-full">
                <img :src="user.avatar_url" />
              </div>
            </div>
            <h2 class="text-lg text-white font-semibold">{{ user.login }}</h2>
          </a>
        </header>
        <main>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-primary">Repositórios:</h3>
              <p class="text-2xl font-semibold">{{ user.public_repos }}</p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-primary">Seguidores:</h3>
              <p class="text-2xl font-semibold">{{ user.followers }}</p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-primary">Seguindo:</h3>
              <p class="text-2xl font-semibold">{{ user.following }}</p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-primary">Localização:</h3>
              <p class="text-2xl break-all break-words font-semibold">
                {{ user.location }}
              </p>
            </div>
          </div>
          <div class="px-8 pb-8 grid place-items-center">
            <canvas id="myChart"></canvas>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import type IUserGithub from "@/interface/IUserGithub";
import baixaUserGithub from "@/service/SBaixaUserGithub";
import criaGrafico from "@/util/criaGrafico";

export default {
  data() {
    return {
      user: {} as IUserGithub,
    };
  },
  async mounted() {
    this.user = await baixaUserGithub();
    criaGrafico();
  },
};
</script>
