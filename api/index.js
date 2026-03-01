const { getQuote, getAnimeList, getStats } = require("./lib/quote");
const { generateSVG, FONT_MAP } = require("./lib/svg");
const { getTheme, themes } = require("./lib/themes");
const { readFileSync } = require("fs");
const { join } = require("path");

function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }
function hexColor(val) {
  if (typeof val !== "string") return undefined;
  const c = val.replace(/^#/, "");
  return /^[0-9a-fA-F]{6,8}$/.test(c) ? c : undefined;
}
function str(val) { return typeof val === "string" && val.trim() ? val.trim() : undefined; }
function int(val) { const n = parseInt(val); return isNaN(n) ? undefined : n; }

function sendSVG(res, svg) {
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.status(200).send(svg);
}

function sendJSON(res, data) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}

module.exports = function handler(req, res) {
  const url = req.url || "/";
  const [path, qs] = url.split("?");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (path === "/api/quote" || path === "/api/quote/") {
    try {
      const q = req.query;
      const result = getQuote({
        anime:     str(q.anime)?.replace(/\+/g, " "),
        id:        int(q.id),
        character: str(q.character)?.replace(/\+/g, " "),
      });
      return sendJSON(res, result);
    } catch (err) {
      res.status(404).json({ error: err.message });
      return;
    }
  }

  if (path === "/api/anime" || path === "/api/anime/") {
    return sendJSON(res, getAnimeList());
  }

  if (path === "/api/stats" || path === "/api/stats/") {
    return sendJSON(res, getStats());
  }

  if (path === "/api/themes" || path === "/api/themes/") {
    return sendJSON(res, Object.keys(themes));
  }

  if (path === "/" || path === "/api" || path === "/api/") {
    const q = req.query;
    const theme = getTheme(str(q.theme) ?? "dark", {
      ...(hexColor(q.bg_color)     && { bg:             hexColor(q.bg_color) }),
      ...(hexColor(q.quote_color)  && { quote:           hexColor(q.quote_color) }),
      ...(hexColor(q.author_color) && { character:       hexColor(q.author_color) }),
      ...(hexColor(q.anime_color)  && { anime:           hexColor(q.anime_color) }),
      ...(hexColor(q.accent_color) && { accent:          hexColor(q.accent_color) }),
      ...(hexColor(q.border_color) && { border:          hexColor(q.border_color) }),
    });
    const font = (str(q.font) in FONT_MAP) ? str(q.font) : "helvetica";
    const borderRadius = clamp(int(q.border_radius) ?? 8, 0, 40);
    const borderWidth  = clamp(int(q.border_width)  ?? 1, 0, 5);
    const svgOpts = { theme, font, borderRadius, borderWidth };

    const customQuote = str(q.quote)?.replace(/\+/g, " ");
    if (customQuote) {
      return sendSVG(res, generateSVG({
        quote: customQuote,
        character: str(q.author)?.replace(/\+/g, " ") ?? "Anonymous",
        anime: str(q.anime_name)?.replace(/\+/g, " ") ?? "",
        ...svgOpts,
      }));
    }

    try {
      const result = getQuote({
        anime:     str(q.anime)?.replace(/\+/g, " "),
        id:        int(q.id),
        character: str(q.character)?.replace(/\+/g, " "),
      });
      return sendSVG(res, generateSVG({ quote: result.quote, character: result.character, anime: result.anime, ...svgOpts }));
    } catch (err) {
      return sendSVG(res, generateSVG({
        quote: "Could not load a quote. Please try again.",
        character: "Error", anime: err.message ?? "",
        ...svgOpts,
      }));
    }
  }

  res.status(404).json({ error: "Not found" });
};