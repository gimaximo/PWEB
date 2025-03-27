function calcularMedia() {
    let nome = document.getElementById("nome").value;
    
    let notas = [
        parseFloat(document.getElementById("nota1").value),
        parseFloat(document.getElementById("nota2").value),
        parseFloat(document.getElementById("nota3").value),
        parseFloat(document.getElementById("nota4").value),
    ];

    if (notas.some(isNaN)) {
        document.getElementById("resultado").innerText = "Por favor, insira todas as notas corretamente.";
        return;
    }

    let media = notas.reduce((acc, nota) => acc + nota, 0) / notas.length;

    document.getElementById("resultado").innerText = `Aluno: ${nome} - Média: ${media.toFixed(2)}`;
}
