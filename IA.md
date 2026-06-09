<p>Para este projeto, até então, foi usado a IA Claude para ajudar com pequenos erros de lógica e na estrutura do Quiz (principalmente validar os botões do quiz sem deixar de reconhecer os do login).</p>

Foi entregue pela IA uma versão corridiga do código, que é este código a seguir:

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