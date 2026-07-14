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

const elementosTorres = document.querySelectorAll(".torre");
const contadorMovimentos = document.querySelector("#contador");
const minimoMovimentos = document.querySelector("#minimo");
const mensagem = document.querySelector("#mensagem");
let origem = null;
let movimentos = 0;


function calcularLarguraDisco(tamanho) {
    return 50 + (tamanho * 12);
}

function limparSelecao() {
    for (let i = 0; i < elementosTorres.length; i++) {
        elementosTorres[i].classList.remove("selecionada");
    }
}

function desenharTorres() {
    limparSelecao();

    if (origem !== null) {
        elementosTorres[origem].classList.add("selecionada");
    }

    for (let i = 0; i < elementosTorres.length; i++) {
        const elementoTorre = elementosTorres[i];
        const discosAtuais = elementoTorre.querySelectorAll(".disco");

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

            elementoTorre.appendChild(disco);
        }
    }
}

function atualizarContador() {
    contadorMovimentos.textContent = movimentos;
}

function moverTorre(indiceDestino) {
    const torreOrigem = torres[origem];
    const torreDestino = torres[indiceDestino];

    if (torreOrigem.length === 0) {
        mensagem.textContent = "Movimento inválido!";
        origem = null;
        desenharTorres();
        return;
    }

    const discoMovendo = torreOrigem[torreOrigem.length - 1];
    const discoTopoDestino = torreDestino[torreDestino.length - 1];

    if (torreDestino.length === 0 || discoMovendo.tamanho < discoTopoDestino.tamanho) {
        torreOrigem.pop();
        torreDestino.push(discoMovendo);
        movimentos++;
        atualizarContador();
        mensagem.textContent = "Movimento realizado!";
    } else {
        mensagem.textContent = "Movimento inválido!";
    }

    origem = null;
    desenharTorres();
}

function selecionarTorre(indiceTorre) {
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

    if (origem === indiceTorre) {
        origem = null;
        mensagem.textContent = "Seleção cancelada!";
        desenharTorres();
        return;
    }

    moverTorre(indiceTorre);
}

for (let i = 0; i < elementosTorres.length; i++) {
    elementosTorres[i].addEventListener("click", function () {
        selecionarTorre(i);
    });
}

desenharTorres();
atualizarContador();
