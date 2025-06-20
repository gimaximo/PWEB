export function gerarId() {
  return Date.now(); 
}

export function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}
