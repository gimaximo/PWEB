function jogar(escolhaUsuario) {
    const opcoes = ["Pedra", "Papel", "Tesoura"];
    const escolhaComputador = opcoes[Math.floor(Math.random() * 3)];

    const resultado =
        escolhaUsuario === escolhaComputador ? "Empate!" :
        (escolhaUsuario === "Pedra" && escolhaComputador === "Tesoura") ||
        (escolhaUsuario === "Tesoura" && escolhaComputador === "Papel") ||
        (escolhaUsuario === "Papel" && escolhaComputador === "Pedra")
        ? "Você venceu!" : "O computador venceu!";

    document.getElementById("resultado").innerText = `Você escolheu ${escolhaUsuario}. O computador escolheu ${escolhaComputador}. ${resultado}`;
}
