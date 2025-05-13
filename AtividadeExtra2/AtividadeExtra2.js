let listaAlunos = [];
const limiteAlunos = 10;

document.getElementById('formulario').addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nomeCompleto = document.getElementById('nome').value.trim();
  const registro = document.getElementById('ra').value.trim();
  const n1 = parseFloat(document.getElementById('nota1').value);
  const n2 = parseFloat(document.getElementById('nota2').value);
  const n3 = parseFloat(document.getElementById('nota3').value);

  // Verificações
  if (nomeCompleto.split(" ").length < 2) {
    alert("Por favor, insira o nome e o sobrenome do aluno.");
    return;
  }

  if (!/^\d{5}$/.test(registro)) {
    alert("O RA deve ter exatamente 5 números.");
    return;
  }

  if ([n1, n2, n3].some(nota => isNaN(nota) || nota < 0 || nota > 10)) {
    alert("As notas precisam estar entre 0 e 10.");
    return;
  }

  const mediaFinal = ((n1 + n2 + n3) / 3).toFixed(2);
  listaAlunos.push({ nomeCompleto, registro, mediaFinal });

  atualizarLista();
  document.getElementById('formulario').reset();

  if (listaAlunos.length >= limiteAlunos) {
    document.getElementById('formulario').style.display = 'none';
    exibirMediaTurma();
  }
});

function atualizarLista() {
  const painel = document.getElementById('lista-alunos');
  painel.innerHTML = "<h3>Lista de Alunos:</h3>";
  listaAlunos.forEach(aluno => {
    painel.innerHTML += `<p><strong>${aluno.nomeCompleto}</strong> - RA: ${aluno.registro} - Média: ${aluno.mediaFinal}</p>`;
  });
}

function exibirMediaTurma() {
  const total = listaAlunos.reduce((acumulado, aluno) => acumulado + parseFloat(aluno.mediaFinal), 0);
  const mediaTurma = total / listaAlunos.length;
  const painelMedia = document.getElementById('media-geral');
  painelMedia.innerHTML = `<h3>Média Final da Turma: ${mediaTurma.toFixed(2)}</h3>`;
}
