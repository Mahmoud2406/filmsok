(function(){
  'use strict';

  // Elements
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('results');
  const statusEl = document.getElementById('status');
  const emptyEl = document.getElementById('emptyState');
  const template = document.getElementById('movieCardTemplate');

  // In-memory cache (query -> data)
  const cache = new Map();

  // Debounce config
  const DEBOUNCE_MS = 450;
  let debounceTimer = null;

  const MIN_QUERY = 2;
  const ENDPOINT = 'https://imdb.iamidiotareyoutoo.com/search?q=';

  function setStatus(message, type){
    if(!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.className = 'status' + (type ? ' ' + type : '');
  }

  function clearResults(){
    if(resultsEl){
      resultsEl.innerHTML = '';
      resultsEl.setAttribute('aria-busy', 'false');
    }
  }

  function showEmpty(show){
    if(emptyEl){
      emptyEl.hidden = !show;
    }
  }

  function sanitize(text){
    return String(text ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  async function fetchMovies(query){
    const q = query.trim();
    if(cache.has(q)) return cache.get(q);
    const url = ENDPOINT + encodeURIComponent(q);
    const resp = await fetch(url, { headers: { 'Accept':'application/json' } });
    if(!resp.ok) throw new Error('Feil ved henting (' + resp.status + ')');
    const data = await resp.json();
    cache.set(q, data);
    return data;
  }

  function renderMovies(list){
    clearResults();
    if(!Array.isArray(list) || list.length === 0){
      showEmpty(true);
      return;
    }
    showEmpty(false);
    const frag = document.createDocumentFragment();
    list.forEach(item => {
      const title = item['#TITLE'] || item.title || 'Uten tittel';
      const year = item['#YEAR'] || item.year || '';
      const img = item['#IMG_POSTER'] || item.poster || '';
      const card = template?.content ? template.content.firstElementChild.cloneNode(true) : document.createElement('article');
      if(!template?.content){ card.className = 'movie-card'; }
      const imgEl = card.querySelector('.poster');
      const yearEl = card.querySelector('.year');
      const titleEl = card.querySelector('.title');
      const metaEl = card.querySelector('.meta');
      if(imgEl){
        if(img){ imgEl.src = img; imgEl.alt = title; }
        else { imgEl.remove(); }
      }
      if(yearEl){ yearEl.textContent = year; if(!year) yearEl.remove(); }
      if(titleEl){ titleEl.textContent = title; }
      if(metaEl){ metaEl.textContent = year ? 'År: ' + year : ''; }
      frag.appendChild(card);
    });
    resultsEl.appendChild(frag);
    resultsEl.setAttribute('aria-busy', 'false');
  }

  async function performSearch(query, userInitiated){
    const q = query.trim();
    if(q.length < MIN_QUERY){
      setStatus(q.length ? 'Skriv minst ' + MIN_QUERY + ' tegn til.' : '');
      clearResults();
      showEmpty(true);
      return;
    }
    resultsEl.setAttribute('aria-busy', 'true');
    setStatus('Henter filmer...', 'loading');
    try {
      const data = await fetchMovies(q);
      const list = data?.description || data?.results || [];
      renderMovies(list);
      if(list.length){
        setStatus(list.length + ' treff for "' + q + '"');
      } else {
        setStatus('Ingen treff for "' + q + '"', 'warn');
      }
    } catch(err){
      console.error(err);
      clearResults();
      showEmpty(false);
      setStatus('Kunne ikke hente data. Prøv igjen senere.', 'error');
    }
  }

  function scheduleSearch(){
    if(debounceTimer) clearTimeout(debounceTimer);
    const q = input.value;
    debounceTimer = setTimeout(() => performSearch(q, false), DEBOUNCE_MS);
  }

  // Event handlers
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      if(debounceTimer) clearTimeout(debounceTimer);
      performSearch(input.value, true);
    });
  }

  if(input){
    input.addEventListener('input', scheduleSearch);
    input.addEventListener('keydown', e => {
      if(e.key === 'Escape'){
        input.value = '';
        clearResults();
        showEmpty(true);
        setStatus('');
      }
    });
  }

  // Initial empty state
  showEmpty(true);
})();

// Add keyboard navigation after IIFE loads
window.addEventListener('DOMContentLoaded', () => {
  const resultsEl = document.getElementById('results');
  const input = document.getElementById('searchInput');
  if(!resultsEl) return;
  function getCards(){ return Array.from(resultsEl.querySelectorAll('.movie-card')); }
  resultsEl.addEventListener('keydown', e => {
    const cards = getCards();
    if(!cards.length) return;
    const currentIndex = cards.indexOf(document.activeElement);
    if(currentIndex === -1) return;
    let nextIndex = null;
    if(e.key === 'ArrowRight') nextIndex = currentIndex + 1;
    else if(e.key === 'ArrowLeft') nextIndex = currentIndex - 1;
    else if(e.key === 'Home') nextIndex = 0;
    else if(e.key === 'End') nextIndex = cards.length -1;
    else if(e.key === 'ArrowDown') nextIndex = currentIndex + 4; // heuristic for grid row
    else if(e.key === 'ArrowUp') nextIndex = currentIndex - 4;
    if(nextIndex != null){
      e.preventDefault();
      if(nextIndex < 0) nextIndex = 0;
      if(nextIndex >= cards.length) nextIndex = cards.length -1;
      cards[nextIndex].focus();
    }
    if(e.key === 'Escape'){
      input?.focus();
    }
  });
});
