const STORAGE_KEY = 'filmes';

export function getAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
