<template>
  <div class="w-full flex justify-center items-center flex-col">
    <div>
      <h2 class="text-white font-semibold drop-shadow-md my-10 text-4xl">
        About Me:
      </h2>
    </div>
    <div
      id="animacaoScrollAbout"
      class="mx-4 shadow-xl mb-20 lg:w-1/2 h-fit bg-base-100 rounded-xl"
    >
      <div
        class="h-14 bg-white gap-4 px-5 rounded-t-xl flex justify-start items-center"
      >
        <span class="bg-red-500 w-4 aspect-square rounded-full block"></span>
        <span class="bg-yellow-400 w-4 aspect-square rounded-full block"></span>
        <span class="bg-green-400 w-4 aspect-square rounded-full block"></span>
      </div>
      <div
        class="containerCodigo font-semibold w-full h-full text-white p-7 bg-gray-900 rounded-b-xl"
      >
        <span class="ponto">{</span>
        <div>
          <p>
            "full-name"<span class="ponto">: </span>
            <span> "João Vitor Carmassi"</span><span class="virgula">,</span>
          </p>
          <p>
            "birthdate"<span class="ponto">: </span>
            <span>"December 8, 2004"</span><span class="virgula">,</span>
          </p>
          <p>
            "place-of-birth"<span class="ponto">: </span>
            <span>"São Paulo, SP"</span><span class="virgula">,</span>
          </p>
          <p>
            "where-I-live"<span class="ponto">: </span>
            <span>"São Bento do Sapucai, SP"</span
            ><span class="virgula">,</span>
          </p>
          <p>
            "languages"<span class="ponto">: </span>
            <span class="lista">{</span>
          </p>
          <div>
            <a href="/certificados/ingles.pdf" download>
              "english"<span class="ponto">: </span><span>"C1"</span
              ><span class="virgula">,</span>
            </a>
            <a href="/certificados/espanhol.pdf" download>
              <p>
                "spanish"<span class="ponto">: </span><span>"B2"</span
                ><span class="virgula">,</span>
              </p>
            </a>
          </div>
          <span class="lista">}</span><span class="virgula">,</span>
          <a
            href="https://cursos.alura.com.br/user/joaovitorcarmassi/fullCertificate/897f16e3faccf20ba9a1b019c6ba05b6"
            target="_blank"
          >
            "technologies"<span class="ponto">: </span>
            <span class="lista">[</span>
            <span>
              "HTML"
              <span class="virgula">,</span>
              "CSS"
              <span class="virgula">,</span>
              "Tailwind"
              <span class="virgula">,</span>
              "Boostrap"
              <span class="virgula">,</span>
              "Sass"
              <span class="virgula">,</span>
              "React"
              <span class="virgula">,</span>
              "Vue"
              <span class="virgula">,</span>
              "Git"
              <span class="virgula">,</span>
              "Github" </span
            ><span class="lista">]</span><span class="virgula">,</span>
          </a>
          <p>
            "interests"<span class="ponto">: </span>
            <span class="lista">[</span>
          </p>
          <div>
            <p><span>"Programming"</span><span class="virgula">,</span></p>
            <p><span>"Games"</span><span class="virgula">,</span></p>
            <p><span>"Anime"</span><span class="virgula">,</span></p>
            <p><span>"Music"</span><span class="virgula">,</span></p>
            <p><span>"Movies"</span><span class="virgula">,</span></p>
            <p><span>"Hiking"</span><span class="virgula">,</span></p>
            <p><span>"Technology"</span><span class="virgula">,</span></p>
            <p>
              <span>"Meeting new people and places"</span
              ><span class="virgula">,</span>
            </p>
          </div>
          <span class="lista">]</span><span class="virgula">,</span>
        </div>
        <span class="ponto">}</span><span class="virgula">,</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.containerCodigo {
  & .ponto {
    color: #d272c6;
  }

  & .lista {
    color: #179fe1;
  }

  & .virgula {
    color: white;
  }

  & a {
    color: #988bc7;
    text-decoration: underline;
    display: block;
  }

  & p {
    color: #988bc7;
  }

  & span {
    color: #e7de79;
  }

  & div {
    margin-left: 1.5rem;
  }

  @media (min-width: 728px) {
    & div {
      margin-left: 2rem;
    }
  }
}
</style>
