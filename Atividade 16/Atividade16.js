const informacoesCursos = {
  ads: `Curso: Análise e Desenvolvimento de Sistemas\nDuração: 6-8 semestres\nTurnos: Diurno / Noturno`,
  eletronica: `Curso: Eletrônica Automotiva\nDuração: 6 semestres\nTurno: Noturno`,
  fabrica: `Curso: Fabricação Mecânica\nDuração: 6 semestres\nTurnos: Diurno / Noturno`,
  qualidade: `Curso: Gestão da Qualidade\nDuração: 6 semestres\nTurno: Diurno`,
  logistica: `Curso: Logística\nDuração: 6 semestres\nTurno: Tarde`,
  manufatura: `Curso: Manufatura Avançada\nDuração: 6 semestres\nTurno: Diurno`,
  aeronaves: `Curso: Manutenção de Aeronaves\nDuração: 6 semestres\nTurno: Diurno`,
  polimeros: `Curso: Polímeros\nDuração: 6 semestres\nTurno: Noturno com aulas aos sábados`,
  metalurgia: `Curso: Processos Metalúrgicos\nDuração: 6 semestres\nTurnos: Diurno e Noturno`,
  projetos: `Curso: Projetos Mecânicos\nDuração: 6 semestres\nTurnos: Diurno / Noturno`,
  biomedicos: `Curso: Sistemas Biomédicos\nDuração: 6 semestres\nTurno: Matutino`
};

function mostrarCurso() {
  const seletor = document.getElementById("listaCursos");
  const cursoSelecionado = seletor.value;

  if (!cursoSelecionado) return;

  const confirmar = confirm("Você deseja abrir os detalhes do curso selecionado?");
  if (confirmar) {
      const conteudo = informacoesCursos[cursoSelecionado].replace(/\n/g, "<br>");
      const janela = window.open("", "", "width=600,height=300");
      janela.document.write(`
          <html>
          <head><title>Curso Selecionado</title></head>
          <body style="font-family: Arial; padding: 10px;">
              <h3>Informações do Curso</h3>
              <p>${conteudo}</p>
          </body>
          </html>
      `);
  }
}
