import { listarFilmes, getFilme, addFilme, updateFilme, deleteFilme, buscarPorTitulo } from './config/crud.js';
import { buscarFilmeComImagem, buscarFilmesDaAPI, buscarDetalhesFilmePorId } from './apis/api_filmes.js'; 
import { formatarData } from './config/utils.js'; 

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (path.includes('index.html') || path === '/') { 
    carregarListaFilmesLocais();

    const searchInput = document.getElementById('search');
    const apiSearchResultsList = document.getElementById('api-search-results');
    let searchTimeout;

    if (apiSearchResultsList) {
        apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena">Comece a digitar para pesquisar filmes na API.</p>';
    }

    if (searchInput && apiSearchResultsList) {
      searchInput.addEventListener('input', async (e) => {
        clearTimeout(searchTimeout);

        const termoBusca = e.target.value.trim();

        if (termoBusca === '') {
          apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena">Comece a digitar para pesquisar filmes na API.</p>';
          carregarListaFilmesLocais();
          return;
        }

        searchTimeout = setTimeout(async () => {
          apiSearchResultsList.innerHTML = '';

          const resultadosLocais = buscarPorTitulo(termoBusca);
          renderFilmes(resultadosLocais, 'lista-filmes', 'Meus Filmes Locais');

          console.log(`[main.js] Nenhum filme local correspondente encontrado. Buscando "${termoBusca}" na API do TMDB para sugestões...`);
          try {
            const filmesAPI = await buscarFilmesDaAPI(termoBusca);
            
            if (filmesAPI.length > 0) {
              renderAPISearchResults(filmesAPI);
              console.log('[main.js] Filmes da API encontrados e renderizados:', filmesAPI);
            } else {
              apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena">Nenhum filme encontrado na API.</p>';
              console.log('[main.js] Nenhum filme encontrado na API para o termo:', termoBusca);
            }
          } catch (error) {
            console.error('[main.js] Erro ao buscar filmes na API:', error);
            apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena" style="color: var(--cor-perigo);">Erro ao buscar na API. Verifique sua conexão e a chave TMDB.</p>';
          }
        }, 500);
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !apiSearchResultsList.contains(e.target)) {
          apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena">Comece a digitar para pesquisar filmes na API.</p>';
          if (searchInput.value.trim() === '') {
              carregarListaFilmesLocais();
          }
        }
      });
    }
  }

  if (path.includes('/pages/adicionar.html')) {
    const formFilme = document.getElementById('form-filme');
    const params = new URLSearchParams(window.location.search);
    const idTmdb = params.get('idTmdb');

    if (idTmdb && formFilme) {
      (async () => {
        console.log(`[adicionar.html] Buscando detalhes para o filme com TMDB ID: ${idTmdb}`);
        const loadingMessage = document.createElement('p');
        loadingMessage.id = 'loading-msg';
        loadingMessage.textContent = 'Carregando detalhes do filme...';
        formFilme.insertAdjacentElement('beforebegin', loadingMessage);

        const dadosFilme = await buscarDetalhesFilmePorId(idTmdb);
        
        loadingMessage.remove();

        if (dadosFilme) {
          preencherFormularioAdicao(formFilme, dadosFilme);
          console.log('[adicionar.html] Formulário preenchido com dados da API:', dadosFilme);
        } else {
          console.warn('[adicionar.html] Não foi possível obter detalhes do filme da API.');
          alert('Não foi possível carregar os detalhes do filme. Tente novamente.');
        }
      })();
    } else {
      console.log('[adicionar.html] Nenhum idTmdb encontrado na URL. Formulário em branco.');
    }

    if (formFilme) {
      formFilme.addEventListener('submit', (e) => {
        e.preventDefault();
        const dadosFilme = obterDadosDoFormulario(e.target);
        dadosFilme.dataAdicao = new Date().toISOString().split('T')[0];

        addFilme(dadosFilme);
        alert('Filme adicionado com sucesso!');
        window.location.href = '../index.html'; 
      });
    }
  }

  if (path.includes('/pages/detalhes.html')) {
    const params = new URLSearchParams(window.location.search);
    const idFilme = params.get('id');

    if (!idFilme) {
      alert('ID do filme não encontrado na URL. Retornando para a lista principal.');
      window.location.href = '../index.html'; 
      return;
    }

    const filmeDetalhes = getFilme(idFilme);
    if (filmeDetalhes) {
      preencherFormularioEdicao(filmeDetalhes);
    } else {
      alert('Filme não encontrado na sua coleção. Retornando para a lista principal.');
      window.location.href = '../index.html'; 
      return;
    }

    const formEdicao = document.getElementById('form-edicao');
    if (formEdicao) {
      formEdicao.addEventListener('submit', (e) => {
        e.preventDefault();
        const novosDadosFilme = obterDadosDoFormulario(e.target);
        updateFilme(idFilme, novosDadosFilme);
        alert('Alterações salvas com sucesso!');
        window.location.href = '../index.html'; 
      });
    }

    const btnExcluir = document.getElementById('btn-excluir');
    if (btnExcluir) {
      btnExcluir.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir este filme? Esta ação é irreversível.')) {
          deleteFilme(idFilme);
          alert('Filme excluído com sucesso.');
          window.location.href = '../index.html'; 
        }
      });
    }
  }
});


function carregarListaFilmesLocais() {
  const filmesExistentes = listarFilmes();
  renderFilmes(filmesExistentes, 'lista-filmes', 'Meus filmes');
}

function renderFilmes(lista, containerId, sectionTitleText) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Contêiner com ID '${containerId}' não encontrado.`);
    return;
  }

  if (containerId === 'lista-filmes') {
    let currentTitleElement = container.parentElement?.querySelector('h2');
    if (currentTitleElement) {
      currentTitleElement.textContent = sectionTitleText;
    } else {
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = sectionTitleText;
      container.parentElement?.prepend(sectionTitle);
    }
  }
  
  container.innerHTML = '';

  if (lista.length === 0) {
    let message = 'Nenhum filme encontrado.';
    if (containerId === 'lista-filmes') {
      message = 'Nenhum filme adicionado localmente.';
    }
    container.innerHTML = `<p class="mensagem-vazia">${message}</p>`;
    return;
  }

  lista.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'filme-card';

    let starsHtml = '<div class="estrela-rating">';
    const notaInteiraParaEstrelas = Math.round(filme.notaUsuario || 0);
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<div class="estrela ${i <= notaInteiraParaEstrelas ? '' : 'vazia'}"></div>`;
    }
    starsHtml += '</div>';

    card.innerHTML = `
      <h3>${filme.titulo || 'Título Desconhecido'}</h3>
      ${filme.poster ? `<img src="${filme.poster}" alt="Pôster de ${filme.titulo}" class="filme-poster">` : ''}
      <p><strong>Diretor:</strong> ${filme.diretor || '-'}</p>
      <p><strong>Ano:</strong> ${filme.ano || '-'}</p>
      <p><strong>Gênero:</strong> ${filme.genero || '-'}</p>
      ${starsHtml}
      <p><strong>Nota:</strong> ${filme.notaUsuario ? filme.notaUsuario.toFixed(0) : '-'}</p>
      <a href="pages/detalhes.html?id=${filme.id}">Ver detalhes</a> `;
    container.appendChild(card);
  });
}

function renderAPISearchResults(results) {
  const apiSearchResultsList = document.getElementById('api-search-results');
  if (!apiSearchResultsList) return;

  apiSearchResultsList.innerHTML = '';

  if (results.length === 0) {
    apiSearchResultsList.innerHTML = '<p class="mensagem-vazia-pequena">Nenhum filme encontrado na API.</p>';
    return;
  }

  const ulElement = document.createElement('ul');
  ulElement.className = 'search-results-ul';

  results.forEach(filmeApi => {
    const liElement = document.createElement('li');
    
    // Simplificamos o link para passar apenas o ID do TMDB
    const link = `pages/adicionar.html?idTmdb=${filmeApi.idTmdb}`;
    const ano = filmeApi.release_date ? filmeApi.release_date.split('-')[0] : 'Desconhecido';

    liElement.innerHTML = `<a href="${link}">${filmeApi.title || 'Título Desconhecido'} (${ano})</a>`;
    ulElement.appendChild(liElement);
  });

  apiSearchResultsList.appendChild(ulElement);
}

function obterDadosDoFormulario(form) {
  const dados = {};
  new FormData(form).forEach((valor, chave) => {
    dados[chave] = valor;
  });
  dados.notaUsuario = parseInt(dados.notaUsuario) || 0;
  return dados;
}

function preencherFormularioAdicao(form, dadosFilme) {
    if (!form || !dadosFilme) return;

    Object.keys(dadosFilme).forEach(chave => {
        const inputField = form.querySelector(`[name="${chave}"]`);
        if (inputField) {
            if (inputField.tagName === 'TEXTAREA') {
                inputField.textContent = dadosFilme[chave];
            } else {
                inputField.value = dadosFilme[chave];
            }
        }
    });
}

function preencherFormularioEdicao(filme) {
  if (!filme) return;

  const form = document.getElementById('form-edicao');
  if (!form) return;

  const posterDisplay = document.getElementById('poster-display');
  if (posterDisplay && filme.poster) {
    posterDisplay.innerHTML = `<img src="${filme.poster}" alt="Pôster de ${filme.titulo}" class="filme-poster-detalhe">`;
  } else if (posterDisplay) {
    posterDisplay.innerHTML = '';
  }

  Object.keys(filme).forEach(chave => {
    if (form[chave] && chave !== 'id') { 
      if (form[chave].type === 'date' && filme[chave]) {
        form[chave].value = filme[chave]; 
      } else {
        form[chave].value = filme[chave];
      }
    }
  });

  const additionalInfoDisplay = document.getElementById('additional-info-display');
  if (additionalInfoDisplay) {
    const notaFormatada = filme.notaUsuario ? filme.notaUsuario.toFixed(0) : '-';
    const dataAssistidoFormatada = filme.dataAdicao ? formatarData(filme.dataAdicao) : '-';
    additionalInfoDisplay.innerHTML = `
      <div class="info-display">
          <div class="info-item">
              ${notaFormatada} <span>nota</span>
          </div>
          <div class="info-item">
              ${dataAssistidoFormatada} <span>assistido</span>
          </div>
      </div>
    `;
  }
}