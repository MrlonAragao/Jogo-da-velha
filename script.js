const celulas = document.querySelectorAll('.celula');

let vezDoX = true;
let jogoAtivo = true;

document.getElementById("botaoReiniciar").addEventListener('click', inciciarJogo);

function inciciarJogo() {
    vezDoX = true;
    jogoAtivo = true;
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.removeEventListener('click', tratarClique);
        celula.addEventListener('click',tratarClique, {once:true});
    });
}

function tratarClique(evento) {
    if (!jogoAtivo) return;
    
    const celula = evento.target;
    const jogadorAtual = vezDoX ? "X" : "O";
    celula.textContent = jogadorAtual;
    
    if (verificarVencedor(jogadorAtual)) {
        alert(`O jogador ${jogadorAtual} venceu!`);
        jogoAtivo = false;
        return;
    }
    
    if ([...celulas].every(cel => cel.textContent !== "")) {
        alert("Empate!");
        jogoAtivo = false;
        return;
    }
    
    vezDoX = !vezDoX;
}

function verificarVencedor(jogador) {
    const combinacoes = [
        // Horizontais
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Verticais
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonais
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const combinacao of combinacoes) {
        const [a, b, c] = combinacao;
        if (celulas[a].textContent === jogador &&
            celulas[b].textContent === jogador &&
            celulas[c].textContent === jogador) {
            return true;
        }
    }
    return false;
}

inciciarJogo();