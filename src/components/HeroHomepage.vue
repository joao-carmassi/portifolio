<template>
  <section
    id="heroHomePage"
    class="hero text-white min-h-svh bg-center bg-no-repeat bg-cover md:bg-contain bg-black"
    style="background-image: url('./assets/imgs/ImgBg.jpg')"
  >
    <div class="hero-content text-center">
      <div class="m-2">
        <p class="textShadow text-3xl">
          <span class="font-bold">Hello</span>, my name is
        </p>
        <h1
          class="textShadow mt-3 mb-5 text-5xl md:text-6xl w-full md:text-nowrap"
        >
          João Vitor Carmassi
        </h1>
        <p class="text-3xl textShadow md:text-4xl">
          I'm a <span class="font-bold">web developer</span>
        </p>
        <ul class="flex mt-6 justify-center gap-8 items-center">
          <li
            class="butaoRedesSociais duration-300 hover:border-blue-600 border-2 backdrop-blur-lg p-2 rounded-full border-white"
          >
            <a href="https://github.com/joao-carmassi" target="_blank"
              ><img class="w-7" src="/assets/imgs/icons/github.svg" alt=""
            /></a>
          </li>
          <li
            class="butaoRedesSociais duration-300 hover:border-pink-600 border-2 backdrop-blur-lg p-2 rounded-full border-white"
          >
            <a href="https://www.instagram.com/joao_carmassi/" target="_blank"
              ><img class="w-7" src="/assets/imgs/icons/instagram.svg" alt=""
            /></a>
          </li>
          <li
            class="butaoRedesSociais duration-300 hover:border-blue-600 border-2 backdrop-blur-lg p-2 rounded-full border-white"
          >
            <a href="https://www.linkedin.com/in/joao-carmassi/" target="_blank"
              ><img class="w-7" src="/assets/imgs/icons/linkedin.svg" alt=""
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.butaoRedesSociais:hover {
  transform: scale(1.1);
}
</style>
