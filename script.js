// DEFS
const torres = [
    [
        { tamanho: 8, cor: "#e74c3c" },
        { tamanho: 7, cor: "#f39c12" },
        { tamanho: 6, cor: "#f1c40f" },
        { tamanho: 5, cor: "#2ecc71" },
        { tamanho: 4, cor: "#1abc9c" },
        { tamanho: 3, cor: "#3498db" },
        { tamanho: 2, cor: "#9b59b6" },
        { tamanho: 1, cor: "#ec407a" }
    ],
    [],
    []
];

const historico = [];
const Torres = document.querySelectorAll(".torre");
const contador = document.querySelector("#contador");
const minimo = document.querySelector("#minimo");
minimo.textContent = calcularMovimentosMinimos(torres[0].length);
const mensagem = document.querySelector("#mensagem");
let origem = null;
let movimentos = 0;


// FUNÇÕES

function reiniciarJogo() {
    torres[0] = [
        { tamanho: 8, cor: "#e74c3c" },
        { tamanho: 7, cor: "#f39c12" },
        { tamanho: 6, cor: "#f1c40f" },
        { tamanho: 5, cor: "#2ecc71" },
        { tamanho: 4, cor: "#1abc9c" },
        { tamanho: 3, cor: "#3498db" },
        { tamanho: 2, cor: "#9b59b6" },
        { tamanho: 1, cor: "#ec407a" }
    ];
    torres[1] = [];
    torres[2] = [];

    movimentos = 0;
    origem = null;
    historico.length = 0;

    atualizarContador();
    desenharTorres();
}

function calcularMovimentosMinimos(numDiscos) {
    return Math.pow(2, numDiscos) - 1;
}

function calcularLarguraDisco(tamanho) {
    return 50 + (tamanho * 12);
}

function limparSelecao() {
    for (let i = 0; i < Torres.length; i++) {
        Torres[i].classList.remove("selecionada");
    }
}

function desenharTorres() {
    limparSelecao();

    if (origem !== null) {
        Torres[origem].classList.add("selecionada");
    }

    for (let i = 0; i < Torres.length; i++) {
        const torreAtual = Torres[i];
        const discosAtuais = torreAtual.querySelectorAll(".disco");

        for (let j = 0; j < discosAtuais.length; j++) {
            discosAtuais[j].remove();
        }

        const torre = torres[i];

        for (let j = 0; j < torre.length; j++) {
            const discoInfo = torre[j];
            const disco = document.createElement("div");

            disco.className = "disco";
            disco.style.bottom = (20 + (j * 24)) + "px";
            disco.style.width = calcularLarguraDisco(discoInfo.tamanho) + "px";
            disco.style.backgroundColor = discoInfo.cor;

            torreAtual.appendChild(disco);
        }
    }
}

function atualizarContador() {
    contador.textContent = movimentos;
}

function movimentoValido(indiceOrigem, indiceDestino) {
    const torreOrigem = torres[indiceOrigem];
    const torreDestino = torres[indiceDestino];


    const discoOrigem = torreOrigem[torreOrigem.length - 1];
    const discoDestino = torreDestino[torreDestino.length - 1];

    return torreDestino.length === 0 || discoOrigem.tamanho < discoDestino.tamanho;
}

function executarMovimento(indiceOrigem, indiceDestino, registrarHistorico = true) {
    const torreOrigem = torres[indiceOrigem];
    const torreDestino = torres[indiceDestino];

    torreDestino.push(torreOrigem.pop());
    movimentos++;
    atualizarContador();

    if (registrarHistorico) {
        historico.push({ origem: indiceOrigem, destino: indiceDestino });
    }
}

function moverDisco(indiceOrigem, indiceDestino, registrarHistorico = true) {
    if (!movimentoValido(indiceOrigem, indiceDestino)) {
        mensagem.textContent = "Movimento inválido!";
        return false;
    }

    executarMovimento(indiceOrigem, indiceDestino, registrarHistorico);
    mensagem.textContent = "Movimento realizado!";
    return true;
}

function clicarTorre(indiceTorre) {
    if (origem === null) {
        if (torres[indiceTorre].length === 0) {
            mensagem.textContent = "Escolha uma torre com disco!";
            return;
        }
        origem = indiceTorre;
        mensagem.textContent = "Escolha a torre de destino!";
        desenharTorres();
        return;
    }

    if (indiceTorre === origem) {
        origem = null;
        mensagem.textContent = "Seleção cancelada!";
        desenharTorres();
        return;
    }

    moverDisco(origem, indiceTorre);
    origem = null;
    desenharTorres();
    verificarVitoria();
}

function verificarVitoria() {
    if (Torres[2].length === 8) {
        mensagem.textContent = "Parabéns! Você venceu!";
    }
}

function refazerMovimentos() {
    if (historico.length === 0) {
        mensagem.textContent = "Histórico vazio!";
        return;
    }

    const movimentosSalvos = historico.slice();

    reiniciarJogo();

    for (const movimento of movimentosSalvos) {
        moverDisco(movimento.origem, movimento.destino, false);
    }

    historico.push(...movimentosSalvos);

    desenharTorres();
    verificarVitoria();
    mensagem.textContent = "Movimentos refeitos com sucesso!";
}


for (let i = 0; i < Torres.length; i++) {
    Torres[i].addEventListener("click", function () {
        clicarTorre(i);
    });
}


// BOTÕES 

const botaoReiniciar = document.querySelector("#reiniciar");
if (botaoReiniciar) {
    botaoReiniciar.addEventListener("click", function() {
        reiniciarJogo();
        mensagem.textContent = "Jogo reiniciado!";
    });
}


const botaoRefazer = document.querySelector("#refazer");
if (botaoRefazer) {
    botaoRefazer.addEventListener("click", function() {
        refazerMovimentos();
    });
}


// CHAMADAS INICIAIS


desenharTorres();
atualizarContador();