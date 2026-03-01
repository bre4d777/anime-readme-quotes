const { readFileSync } = require("fs");
const { join } = require("path");

let _cache = null;

function loadQuotes() {
  if (_cache) return _cache;
  const raw = readFileSync(join(process.cwd(), "main.json"), "utf-8");
  _cache = JSON.parse(raw);
  return _cache;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getQuote({ anime, id, character } = {}) {
  const all = loadQuotes();
  if (!all.length) throw new Error("main.json is empty");

  let pool = all;

  if (id) {
    pool = all.filter((q) => q.anilistId === id);
    if (!pool.length) throw new Error(`No quotes for AniList ID: ${id}`);
  } else if (anime) {
    const needle = normalize(anime);
    pool = all.filter((q) => normalize(q.anime).includes(needle));
    if (!pool.length) throw new Error(`No anime matching: ${anime}`);
  }

  if (character) {
    const needle = normalize(character);
    const narrowed = pool.filter((q) => normalize(q.character).includes(needle));
    if (narrowed.length) pool = narrowed;
  }

  return pick(pool);
}

function getAnimeList() {
  const all = loadQuotes();
  const map = new Map();
  for (const q of all) {
    if (!map.has(q.anilistId)) {
      map.set(q.anilistId, { name: q.anime, anilistId: q.anilistId, count: 0 });
    }
    map.get(q.anilistId).count++;
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

function getStats() {
  const all = loadQuotes();
  const animeSet = new Set(all.map(q => q.anilistId));
  const charSet = new Set(all.map(q => q.character));
  return { totalQuotes: all.length, totalAnime: animeSet.size, totalCharacters: charSet.size };
}

module.exports = { getQuote, getAnimeList, getStats };