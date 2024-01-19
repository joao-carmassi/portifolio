const htmlPagina = document.querySelector('html');
const btnTrocaTema = document.querySelector('.button-troca-tema');

const imgGit = document.querySelector('#imgGit');
const imgLinkedin = document.querySelector('#imgLinkedin');
const imgAlura = document.querySelector('#imgAlura');
const imgLocalizacao = document.querySelector('#imgLocalizacao');

var temaBranco = false;
var tema;

checaTema();

btnTrocaTema.addEventListener('click', () => {
    if(temaBranco === true) {
        temaBranco = false;
    } else {
        temaBranco = true;
    }
    localStorage.setItem('tema', JSON.stringify(temaBranco));
    checaTema();
})

function checaTema() {
    tema = JSON.parse(localStorage.getItem('tema'));
    trocaTema();
}

function trocaTema() {
    if(tema === true) {
        htmlPagina.setAttribute('data-contexto', 'tema-escuro');

        btnTrocaTema.classList.add('button-troca-tema-active');

        imgGit.setAttribute('src', './assets/imgs/gitBranco.svg');
        imgLinkedin.setAttribute('src', './assets/imgs/linkedinBranco.svg');
        imgAlura.setAttribute('src', './assets/imgs/aluraBranco.svg');
        imgLocalizacao.setAttribute('src', './assets/imgs/localizacaoBranco.svg');
    } else {
        htmlPagina.setAttribute('data-contexto', 'tema-branco');

        btnTrocaTema.classList.remove('button-troca-tema-active');

        imgGit.setAttribute('src', './assets/imgs/gitBranco.svg');
        imgLinkedin.setAttribute('src', './assets/imgs/linkedinBranco.svg');
        imgAlura.setAttribute('src', './assets/imgs/aluraBranco.svg');
        imgLocalizacao.setAttribute('src', './assets/imgs/localizacaoBranco.svg');
    }
}