import { getAll, saveAll } from './db.js';
import { gerarId } from './utils.js';

export function addFilme(filme) {
  const filmes = getAll(); 
  filme.id = gerarId(); 
  filmes.push(filme); 
  saveAll(filmes); 
  console.log('[CRUD] Filme adicionado:', filme.titulo, 'ID:', filme.id);
}

export function getFilme(id) {
  const filmes = getAll();
  return filmes.find(f => f.id == id); 
}

export function listarFilmes() {
  return getAll();
}

export function updateFilme(id, novosDados) {
  const filmes = getAll();
  const index = filmes.findIndex(f => f.id == id); 
  if (index >= 0) {
    filmes[index] = { ...filmes[index], ...novosDados };
    saveAll(filmes); 
    console.log('[CRUD] Filme atualizado:', filmes[index].titulo, 'ID:', filmes[index].id);
  } else {
    console.warn('[CRUD] Filme com ID', id, 'não encontrado para atualização.');
  }
}

export function deleteFilme(id) {
  const filmesRestantes = getAll().filter(f => f.id != id);
  saveAll(filmesRestantes); 
  console.log('[CRUD] Filme com ID', id, 'excluído.');
}

export function buscarPorTitulo(texto) {
  const filmes = getAll();
  const termo = texto.toLowerCase();
  return filmes.filter(filme =>
    filme.titulo && filme.titulo.toLowerCase().includes(termo)
  );
}