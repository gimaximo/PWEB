const dados = [];

function registrar() {
    const idade = parseInt(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;
    const opiniao = parseInt(document.getElementById("opiniao").value);

    if (!isNaN(idade)) {
        dados.push({ idade, sexo, opiniao });
        atualizarResultados();
    }
}

function atualizarResultados() {
    const total = dados.length;
    const mediaIdade = total ? (dados.reduce((sum, p) => sum + p.idade, 0) / total).toFixed(2) : 0;
    const maisVelha = total ? Math.max(...dados.map(p => p.idade)) : "-";
    const maisNova = total ? Math.min(...dados.map(p => p.idade)) : "-";
    const pessimos = dados.filter(p => p.opiniao === 1).length;
    const otimosBons = dados.filter(p => p.opiniao >= 3).length;
    const porcentagemOtimosBons = total ? ((otimosBons / total) * 100).toFixed(2) + "%" : "0%";
    const sexos = { Feminino: 0, Masculino: 0, Outros: 0 };
    dados.forEach(p => sexos[p.sexo]++);

    document.getElementById("resultados").innerHTML = `
        Média de idade: ${mediaIdade}<br>
        Pessoa mais velha: ${maisVelha}<br>
        Pessoa mais nova: ${maisNova}<br>
        Quantidade que respondeu péssimo: ${pessimos}<br>
        Porcentagem de ótimo e bom: ${porcentagemOtimosBons}<br>
        Mulheres: ${sexos.Feminino}, Homens: ${sexos.Masculino}, Outros: ${sexos.Outros}
    `;
}
