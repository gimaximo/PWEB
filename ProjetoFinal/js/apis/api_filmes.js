const API_KEY = '7d05ed489ae257f88384e83130cacdf6';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w200'; 
const IMG_BASE_LARGE = 'https://image.tmdb.org/t/p/w500'; 

export async function buscarFilmeComImagem(titulo) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(titulo)}`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro na API TMDB: ${resposta.status} ${resposta.statusText}`);
    }
    const dados = await resposta.json();

    if (dados.results.length > 0) {
      const filme = dados.results[0];
      return {
        idTmdb: filme.id,
        poster: filme.poster_path ? IMG_BASE_LARGE + filme.poster_path : null,
        sinopse: filme.overview,
        tituloOriginal: filme.original_title,
        ano: filme.release_date ? filme.release_date.split('-')[0] : ''
      };
    }
    return null;
  } catch (error) {
    console.error('Erro em buscarFilmeComImagem:', error);
    return null;
  }
}

export async function buscarFilmesDaAPI(termo) {
  if (!termo) return [];
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(termo)}`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro na API TMDB: ${resposta.status} ${resposta.statusText}`);
    }
    const dados = await resposta.json();
    
    return dados.results.map(filmeApi => ({
      idTmdb: filmeApi.id,
      title: filmeApi.title,
      release_date: filmeApi.release_date,
      poster_path: filmeApi.poster_path,
      overview: filmeApi.overview
    }));
  } catch (error) {
    console.error('Erro ao buscar filmes na API do TMDB (buscarFilmesDaAPI):', error);
    return [];
  }
}

export async function buscarDetalhesFilmePorId(tmdbId) {
  if (!tmdbId) {
    console.error("ID do TMDB não fornecido para buscarDetalhesFilmePorId.");
    return null;
  }

  const urlDetalhes = `${BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}&language=pt-BR`;
  const urlCreditos = `${BASE_URL}/movie/${tmdbId}/credits?api_key=${API_KEY}&language=pt-BR`;
  const urlReleaseDates = `${BASE_URL}/movie/${tmdbId}/release_dates?api_key=${API_KEY}`;

  try {
    const [respDetalhes, respCreditos, respReleaseDates] = await Promise.all([
      fetch(urlDetalhes),
      fetch(urlCreditos),
      fetch(urlReleaseDates)
    ]);

    if (!respDetalhes.ok || !respCreditos.ok || !respReleaseDates.ok) {
      throw new Error(`Erro ao buscar dados na API TMDB.`);
    }

    const dadosDetalhes = await respDetalhes.json();
    const dadosCreditos = await respCreditos.json();
    const dadosReleaseDates = await respReleaseDates.json();

    const diretor = dadosCreditos.crew.find(membro => membro.job === 'Director');
    const elencoPrincipal = dadosCreditos.cast.slice(0, 5).map(ator => ator.name).join(', ');

    const brData = dadosReleaseDates.results.find(r => r.iso_3166_1 === 'BR');
    let classificacao = '';
    if (brData && Array.isArray(brData.release_dates)) {
      const releaseInfo = brData.release_dates.find(rd => rd.certification && rd.certification.trim() !== '');
      if (releaseInfo) {
        classificacao = releaseInfo.certification;
      }
    }
    
    return {
      titulo: dadosDetalhes.title,
      ano: dadosDetalhes.release_date ? dadosDetalhes.release_date.split('-')[0] : '',
      genero: dadosDetalhes.genres ? dadosDetalhes.genres.map(g => g.name).join(', ') : '',
      duracao: dadosDetalhes.runtime || '',
      diretor: diretor ? diretor.name : '',
      sinopse: dadosDetalhes.overview,
      poster: dadosDetalhes.poster_path ? IMG_BASE_LARGE + dadosDetalhes.poster_path : null,
      idTmdb: dadosDetalhes.id,
      elenco: elencoPrincipal, 
      classificacao: classificacao,
    };

  } catch (error) {
    console.error('Erro em buscarDetalhesFilmePorId:', error);
    return null;
  }
}