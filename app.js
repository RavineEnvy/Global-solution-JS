let listaCadastrados = [];
let listaSenhas = [];

const botaoLogin = document.getElementById("btn-login");
const botaoCadastro = document.getElementById("btn-cadastro");
const botaoConfirmar = document.getElementById("btn-confirmar");
const botaoConfirmarCadastro = document.getElementById("btn-confirmar-Cadastro");
const formularioLogin = document.getElementById("form-login");
const formularioCadastro = document.getElementById("form-cadastro");
const botaoSlidePrev = document.getElementById("btn-slide-prev");
const botaoSlideNext = document.getElementById("btn-slide-next");
const slides = document.querySelectorAll(".slides img");
const quiz = document.getElementById("quiz");

let slideIndex = 0;
let intervaloID = null;

function initializeSlider(){

    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervaloID = setInterval(nextSlide, 9000);
    }
}

function showSlide(index){

    if(index >= slides.length){
        slideIndex = 0;
    }else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

function textoTela(id, texto){
    let campo = document.getElementById(id);
    campo.innerHTML = texto;
}

function clicarBotao(variavel, id, texto){
    variavel.addEventListener("click", () => {
        textoTela(id, texto);
    });
}

clicarBotao(botaoCadastro, "sub-titulo", "Cadastro");

const clicarLogin = botaoLogin.addEventListener("click", () =>{
    textoTela("h1", `BODY <span>WHISPER</span>`);
    textoTela("sub-titulo", "Faça seu Login:")
    botaoLogin.style.display = "none";
    botaoCadastro.style.display = "block";
    formularioLogin.style.display = "block";
    formularioCadastro.style.display ="none"
})

const clicarCadastro = botaoCadastro.addEventListener("click", () =>{
    textoTela("sub-titulo", "Faça seu Cadastro:")
    botaoCadastro.style.display = "none";
    botaoLogin.style.display = "block";
    formularioCadastro.style.display = "block";
    formularioLogin.style.display = "none";
})
