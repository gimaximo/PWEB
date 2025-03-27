function calcularResultado() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);

    let soma = numero1 + numero2;
    let subtracao = numero1 - numero2;
    let produto = numero1 * numero2;
    let divisao = numero2 !== 0 ? (numero1 / numero2).toFixed(2) : "Divisão por zero!";
    let resto = numero2 !== 0 ? numero1 % numero2 : "Não existe resto com zero!";

    document.getElementById("resultadoCalculado").innerHTML = `
        <p><b>Soma:</b> ${soma}</p>
        <p><b>Subtração:</b> ${subtracao}</p>
        <p><b>Produto:</b> ${produto}</p>
        <p><b>Divisão:</b> ${divisao}</p>
        <p><b>Resto da divisão:</b> ${resto}</p>
    `;
}
