//Lista do Cadastros e Senhas para o login

let listaCadastrados = [];
let listaSenhas = [];

//Consts da maioria dos botões

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

//Botão para mudar Tema

let menuAberto = false;

document.getElementById("btn-tema").addEventListener("click", () => {
    const menu = document.getElementById("tema-menu");
    if (menuAberto) {
        menu.style.display = "none";
        menuAberto = false;
    } else {
        menu.style.display = "block";
        menuAberto = true;
    }
});

document.querySelectorAll(".btn-tema-opcao").forEach(btn => {
    btn.addEventListener("click", () => aplicarTema(btn.aplicarTema(btn.id)));
});

document.addEventListener("click", (e) => {
    const switcher = document.querySelector(".trocarTema");
    if (!switcher.contains(e.target)) {
        document.getElementById("tema-menu").style.display = "none";
        menuAberto = false;
    }
});

function aplicarTema(tema) {
    document.body.classList.remove("tema-roxo", "tema-verde", "tema-azul");
    document.body.classList.add(`tema-${tema}`);
    document.getElementById("tema-menu").style.display = "none";
    menuAberto = false;
    localStorage.setItem("temaSalvo", tema);
}

const temaSalvo = localStorage.getItem("temaSalvo") || "roxo";
aplicarTema(temaSalvo);

//SlideShow e botão para avançar as imagens

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

//Function para Texto na tela

function textoTela(id, texto){
    let campo = document.getElementById(id);
    campo.innerHTML = texto;
}

//Function para clicar botão

function clicarBotao(variavel, id, texto){
    variavel.addEventListener("click", () => {
        textoTela(id, texto);
    });
}

clicarBotao(botaoCadastro, "sub-titulo", "Cadastro");

//As funcionalidades ao clicar os botões específicos

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

const confirmarLogin = botaoConfirmar.addEventListener("click", () => {
    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;

    let i = 0;
    let loginSucesso = false; 

    while (i < listaCadastrados.length) {
        if (usuario === listaCadastrados[i] && senha === listaSenhas[i]) {
            loginSucesso = true;
            break;
        }
        i++;
    }

    if (loginSucesso) {
        alert(`Login realizado com sucesso.`);
        textoTela("h1", `BODY <span>WHISPER</span>`);
        textoTela("sub-titulo", "Camisa inteligente com monitoramento de sinais vitais em tempo real!");
        textoTela("paragrafo", `Bem vindo, ${usuario}! O Body Whisper é uma camisa inteligente desenvolvida com Arduino e sensores de alta precisão que monitora sinais vitais em tempo real, como frequência cardíaca, temperatura e oxigenação do sangue, gerando alertas automáticos em situações de risco. O projeto foi criado pensando principalmente em idosos com alzhaimer e seus cuidadores, visando resolver o problema crítico de monitoramento 24 horas, já que muitas vezes os sinais de emergência são percebidos tarde demais.`)
        botaoLogin.style.display = "none";
        botaoCadastro.style.display = "none";
        formularioLogin.style.display = "none";
        botaoSlidePrev.style.display = "inline";
        botaoSlideNext.style.display = "inline";
        quiz.style.display = "block";
        initializeSlider()
        console.log("Login correto!");
    }else{
        alert("Senha ou Login incorretos! Tente Novamente!");
    }
});

    const confirmarCadastro = botaoConfirmarCadastro.addEventListener("click", ()=>{
        let addUsuario = document.getElementById("addUsuario").value;
        let addSenha = document.getElementById("addSenha").value;
        console.log(addUsuario);

        if(addSenha == ""){
            alert("Preencha com uma senha!");
            return;
        }else if(addUsuario == ""){
            alert("Escolha um login!")
        }else{
            textoTela("h1", `Bem vindo, ${addUsuario}!`);
            textoTela("sub-titulo", "Cadastro realizado com sucesso!");
            formularioCadastro.style.display = "none";
            listaCadastrados.push(addUsuario);
            listaSenhas.push(addSenha);
            console.log(listaCadastrados);
            console.log(listaSenhas)
            return;
        }
})

//Lista de perguntas do Quiz (Usei IA para dar idéis das perguntas do Quiz)

const perguntas = [
  {pergunta: "Qual é o protótipo do Body Whisper?", opcoes: ["Uma camisa.", "Um bracelete."], correta: 0},
  {pergunta: "O Body Whisper foi feito para ajudar quem?", opcoes: ["Crianças.", "Idosos."], correta: 1},
  {pergunta: "Qual dos dados o Body Whisper NÃO mede?", opcoes: ["Insulina.", "Oxigenação do Sangue."], correta: 0},
  {pergunta: "Qual tecnologia é usada no protótipo do Body Whisper?", opcoes: ["Arduino.", "Raspberry Pi."], correta: 0},
  {pergunta: "O Body Whisper monitora sinais vitais em tempo real?", opcoes: ["Não.", "Sim."], correta: 1},
  {pergunta: "O Body Whisper pode monitorar a oxigenação do sangue?", opcoes: ["Sim.", "Não."],correta: 0},
  {pergunta: "O Body Whisper é uma camisa inteligente?", opcoes: ["Não, é apenas uma camisa comum", "Sim."], correta: 1},
  {pergunta: "O projeto Body Whisper tem foco em qual área?", opcoes: ["Saúde.", "Entretenimento."], correta: 0},
  {pergunta: "Qual sensor o Body Whisper utiliza para medir batimentos?", opcoes: ["Sensor cardíaco.", "Sensor de temperatura."], correta: 0},
  {pergunta: "O Body Whisper envia alertas em situações de risco?", opcoes: ["Não.", "Sim."], correta: 1}];

const respostas = new Array(perguntas.length).fill(null);

//Consts para botões do Quiz

const quizContainer = document.getElementById("quiz-container");
const quizResultado = document.getElementById("quiz-resultado");
const quizPlacar = document.getElementById("quiz-placar");
const btnFinalizar = document.getElementById("btn-finalizar-quiz");
const btnRefazer = document.getElementById("btn-refazer");

//Funciton para renderizar o Quiz na tela

function renderizarQuiz() {
  quizContainer.innerHTML = "";
  respostas.fill(null);
  quizResultado.style.display = "none";
  btnFinalizar.style.display  = "none";

  perguntas.forEach((q, i) => {
    const secao = document.createElement("section");
    secao.classList.add("input_quiz");
    secao.setAttribute("data-index", i);

    const titulo = document.createElement("h2");
    titulo.textContent = `${i + 1}. ${q.pergunta}`;
    secao.appendChild(titulo);

    q.opcoes.forEach((opcao, j) => {
      const p = document.createElement("p");

      const btn = document.createElement("button");
      btn.textContent = opcao;
      btn.classList.add("btn-opcao");
      btn.addEventListener("click", () => selecionarResposta(i, j, secao));

      p.appendChild(btn);
      secao.appendChild(p);
    });

    quizContainer.appendChild(secao);
  });
}

//Function para validar se as respostas estão corretas ou erradas.

function selecionarResposta(indexPergunta, indexOpcao, secao) {
  respostas[indexPergunta] = indexOpcao;

  const botoes = secao.querySelectorAll(".btn-opcao");
  botoes.forEach((btn, j) => {
    btn.classList.remove("opcao-correta", "opcao-errada", "opcao-neutra");

    if (j === perguntas[indexPergunta].correta) {
      btn.classList.add("opcao-correta");
    } else if (j === indexOpcao) {
      btn.classList.add("opcao-errada");
    } else {
      btn.classList.add("opcao-neutra");
    }

    btn.disabled = true;
  });

  const todasRespondidas = respostas.every(r => r !== null);
  if (todasRespondidas) {
    btnFinalizar.style.display = "inline-block";
  }
}

btnFinalizar.addEventListener("click", () => {
  const acertos = respostas.filter((r, i) => r === perguntas[i].correta).length;
  quizPlacar.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas!`;
  quizResultado.style.display = "block";
  btnFinalizar.style.display  = "none";
});

btnRefazer.addEventListener("click", renderizarQuiz);

renderizarQuiz();

//Para o Quiz, foi solicitado ajuda da IA Claude, pois haviam erros de lógica que não permitiam os botões funcionarem.