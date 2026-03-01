const FONT_MAP = {
  helvetica:      "Helvetica, Arial, sans-serif",
  arial:          "Arial, sans-serif",
  verdana:        "Verdana, sans-serif",
  tahoma:         "Tahoma, sans-serif",
  trebuchet_ms:   "'Trebuchet MS', sans-serif",
  times_new_roman:"'Times New Roman', Times, serif",
  georgia:        "Georgia, serif",
  garamond:       "Garamond, serif",
  courier_new:    "'Courier New', Courier, monospace",
};

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(text, charsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (test.length > charsPerLine && cur) { lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

function hex(color) {
  return color === "ffffff00" ? "transparent" : `#${color}`;
}

function generateSVG({ quote, character, anime, theme, font, borderRadius, borderWidth }) {
  const ff = FONT_MAP[font] ?? FONT_MAP.helvetica;

  const W        = 800;
  const PAD_X    = 56;
  const TEXT_X   = PAD_X + 20;
  const CHARS    = 62;
  const Q_FS     = 17;
  const Q_LH     = 30;
  const PAD_TOP  = 52;
  const PAD_BOT  = 40;
  const GAP_META = 24;
  const GAP_DIV  = 16;
  const CH_FS    = 13;
  const AN_FS    = 11;

  const lines  = wrapLines(quote, CHARS);
  const qH     = lines.length * Q_LH;
  const totalH = PAD_TOP + qH + GAP_META + 1 + GAP_DIV + CH_FS + 8 + AN_FS + PAD_BOT;

  const qY   = PAD_TOP;
  const divY = qY + qH + GAP_META;
  const chY  = divY + 1 + GAP_DIV;
  const anY  = chY + CH_FS + 8;

  const bg    = hex(theme.bg);
  const glow  = hex(theme.glow);
  const acc   = hex(theme.accent);
  const qm    = hex(theme.quoteMarkColor);
  const id    = Math.random().toString(36).slice(2, 9);

  const textLines = lines.map((l, i) =>
    `<text x="${TEXT_X}" y="${qY + i * Q_LH}" font-family="${ff}" font-size="${Q_FS}" fill="${hex(theme.quote)}" dominant-baseline="hanging" letter-spacing="0.015em">${escapeXml(l)}</text>`
  ).join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${totalH}" viewBox="0 0 ${W} ${totalH}" role="img" aria-label="${escapeXml(quote)} — ${escapeXml(character)}, ${escapeXml(anime)}">
  <title>${escapeXml(quote)} — ${escapeXml(character)}</title>
  <defs>
    <clipPath id="clip${id}">
      <rect width="${W}" height="${totalH}" rx="${borderRadius}" ry="${borderRadius}"/>
    </clipPath>
    <linearGradient id="grad-h${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${glow}" stop-opacity="0.22"/>
      <stop offset="45%"  stop-color="${glow}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="grad-v${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${glow}" stop-opacity="0.10"/>
      <stop offset="60%"  stop-color="${glow}" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="grad-div${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${hex(theme.divider)}" stop-opacity="0"/>
      <stop offset="15%"  stop-color="${hex(theme.divider)}" stop-opacity="1"/>
      <stop offset="85%"  stop-color="${hex(theme.divider)}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${hex(theme.divider)}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="grad-bar${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${acc}" stop-opacity="0"/>
      <stop offset="30%"  stop-color="${acc}" stop-opacity="0.9"/>
      <stop offset="70%"  stop-color="${acc}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${acc}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="grad-orb${id}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0,0) scale(220,180)">
      <stop offset="0%"   stop-color="${glow}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="grad-orb2${id}" cx="1" cy="1" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(${W},${totalH}) scale(260,200)">
      <stop offset="0%"   stop-color="${acc}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${acc}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur${id}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
  </defs>

  <rect width="${W}" height="${totalH}" rx="${borderRadius}" ry="${borderRadius}" fill="${bg}" stroke="${hex(theme.border)}" stroke-width="${borderWidth}"/>

  <rect width="${W}" height="${totalH}" fill="url(#grad-orb${id})"  clip-path="url(#clip${id})"/>
  <rect width="${W}" height="${totalH}" fill="url(#grad-orb2${id})" clip-path="url(#clip${id})"/>
  <rect width="${W}" height="${totalH}" fill="url(#grad-h${id})"    clip-path="url(#clip${id})"/>
  <rect width="${W}" height="${totalH}" fill="url(#grad-v${id})"    clip-path="url(#clip${id})"/>

  <text
    x="${PAD_X - 10}" y="${qY - 16}"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="80" fill="${qm}"
    dominant-baseline="hanging" opacity="0.5">\u201C</text>

  <rect x="${PAD_X}" y="${qY + 6}" width="2.5" height="${qH - 12}" fill="url(#grad-bar${id})" rx="1.5"/>

    ${textLines}

  <line x1="${TEXT_X}" y1="${divY}" x2="${W - PAD_X}" y2="${divY}" stroke="url(#grad-div${id})" stroke-width="1"/>

  <text x="${TEXT_X}" y="${chY}" font-family="${ff}" font-size="${CH_FS}" fill="${hex(theme.character)}" font-weight="700" dominant-baseline="hanging" letter-spacing="0.05em">\u2014\u00A0${escapeXml(character)}</text>
  <text x="${TEXT_X}" y="${anY}" font-family="${ff}" font-size="${AN_FS}" fill="${hex(theme.anime)}" dominant-baseline="hanging" letter-spacing="0.06em" font-style="italic" opacity="0.85">${escapeXml(anime)}</text>
</svg>`;
}

module.exports = { generateSVG, FONT_MAP };