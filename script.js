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

function calcularLarguraDisco(tamanho) {
    return 50 + (tamanho * 12);
}

function desenharTorres() {
    const elementosTorres = document.querySelectorAll(".torre");

    for (let I = 0; I < elementosTorres.length; I++) {
        const elementoTorre = elementosTorres[I];
        const discosAtuais = elementoTorre.querySelectorAll(".disco");

        for (let i = 0; i < discosAtuais.length; i++) {
            discosAtuais[i].remove();
        }

        const torre = torres[I];

        for (let indiceDisco = 0; indiceDisco < torre.length; indiceDisco++) {
            const discoInfo = torre[indiceDisco];
            const disco = document.createElement("div");

            disco.className = "disco";
            disco.style.bottom = (20 + (indiceDisco * 24)) + "px";
            disco.style.width = calcularLarguraDisco(discoInfo.tamanho) + "px";
            disco.style.backgroundColor = discoInfo.cor;

            elementoTorre.appendChild(disco);
        }
    }
}

desenharTorres();
