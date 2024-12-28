<template>
  <section class="bg-base-100 px-5">
    <div class="py-8 md:py-12 grid place-items-center">
      <h2 class="text-3xl md:text-4xl text-primary font-semibold">Github</h2>
    </div>
    <div class="pb-14 max-w-full md:pb-20 grid place-items-center">
      <div
        id="infoGithub"
        class="shadow-xl md:w-4/5 lg:w-1/2 grid place-items-center"
      >
        <header class="bg-primary w-full flex items-center h-fit p-4 gap-4">
          <a
            :href="user.html_url"
            target="_blank"
            class="hover:ring ring-white duration-300 rounded-full avatar online"
          >
            <div class="w-16 rounded-full">
              <img :src="user.avatar_url" />
            </div>
          </a>
          <h2 class="text-lg text-white font-semibold">{{ user.login }}</h2>
        </header>
        <main>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-md font-semibold text-gray-600">Reps:</h3>
              <p class="text-lg md:text-xl text-primary">
                {{ user.public_repos }}
              </p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-md font-semibold text-gray-600">Followers:</h3>
              <p class="text-lg md:text-xl text-primary">
                {{ user.followers }}
              </p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-md font-semibold text-gray-600">Following:</h3>
              <p class="text-lg md:text-xl text-primary">
                {{ user.following }}
              </p>
            </div>
            <div class="bg-base-200 p-4 rounded-lg">
              <h3 class="text-md font-semibold text-gray-600">Location:</h3>
              <p class="text-lg md:text-xl text-primary break-all break-words">
                {{ user.location }}
              </p>
            </div>
            <div class="bg-base-200 col-span-full p-4 rounded-lg">
              <h3 class="text-md font-semibold text-gray-600">Bio:</h3>
              <p class="text-lg md:text-xl text-primary break-all break-words">
                {{ user.bio }}
              </p>
            </div>
          </div>
          <div class="px-4 md:w-10/12 mx-auto pb-8 grid place-items-center">
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
