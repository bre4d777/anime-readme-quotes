const themes = {
  dark: {
    bg: "0d1117", border: "21262d", quote: "e6edf3", character: "58a6ff",
    anime: "7ee787", accent: "1f6feb", glow: "1f6feb",
    quoteMarkColor: "1f6feb", divider: "30363d",
  },
  light: {
    bg: "ffffff", border: "d0d7de", quote: "24292f", character: "0550ae",
    anime: "116329", accent: "0969da", glow: "0969da",
    quoteMarkColor: "0969da", divider: "d0d7de",
  },
  tokyo_night: {
    bg: "1a1b2e", border: "2f3549", quote: "c0caf5", character: "7aa2f7",
    anime: "9ece6a", accent: "bb9af7", glow: "7aa2f7",
    quoteMarkColor: "bb9af7", divider: "3b3f5e",
  },
  dracula: {
    bg: "282a36", border: "44475a", quote: "f8f8f2", character: "bd93f9",
    anime: "50fa7b", accent: "ff79c6", glow: "bd93f9",
    quoteMarkColor: "ff79c6", divider: "44475a",
  },
  nord: {
    bg: "2e3440", border: "3b4252", quote: "eceff4", character: "88c0d0",
    anime: "a3be8c", accent: "81a1c1", glow: "88c0d0",
    quoteMarkColor: "81a1c1", divider: "434c5e",
  },
  gruvbox: {
    bg: "1d2021", border: "3c3836", quote: "ebdbb2", character: "fabd2f",
    anime: "b8bb26", accent: "d79921", glow: "d79921",
    quoteMarkColor: "fe8019", divider: "3c3836",
  },
  catppuccin: {
    bg: "1e1e2e", border: "313244", quote: "cdd6f4", character: "89b4fa",
    anime: "a6e3a1", accent: "cba6f7", glow: "89b4fa",
    quoteMarkColor: "cba6f7", divider: "313244",
  },
  rose_pine: {
    bg: "191724", border: "26233a", quote: "e0def4", character: "9ccfd8",
    anime: "ebbcba", accent: "c4a7e7", glow: "c4a7e7",
    quoteMarkColor: "eb6f92", divider: "2a273f",
  },
  ayu: {
    bg: "0b0e14", border: "11151c", quote: "b3b1ad", character: "39bae6",
    anime: "7fd962", accent: "ffb454", glow: "39bae6",
    quoteMarkColor: "ffb454", divider: "1a1f29",
  },
  monokai: {
    bg: "272822", border: "383830", quote: "f8f8f2", character: "66d9e8",
    anime: "a6e22e", accent: "f92672", glow: "ae81ff",
    quoteMarkColor: "f92672", divider: "383830",
  },
  evangelion: {
    bg: "080808", border: "4a0000", quote: "e8e8e8", character: "ff2a2a",
    anime: "ff7700", accent: "990000", glow: "cc0000",
    quoteMarkColor: "770000", divider: "2a0000",
  },
  mononoke: {
    bg: "0a1a0a", border: "1e4a14", quote: "cce8b0", character: "66cc33",
    anime: "99cc44", accent: "3a6e22", glow: "4a9e30",
    quoteMarkColor: "3a6e22", divider: "163610",
  },
  akira: {
    bg: "000912", border: "002244", quote: "c8eeff", character: "00aadd",
    anime: "33ccee", accent: "0066aa", glow: "0088cc",
    quoteMarkColor: "004488", divider: "002244",
  },
  sakura: {
    bg: "fef0f5", border: "f7b8ce", quote: "2d0015", character: "cc0044",
    anime: "880033", accent: "f9a8c9", glow: "ff5599",
    quoteMarkColor: "dd0055", divider: "f4b8cc",
  },
  bleach: {
    bg: "0f0f0f", border: "2a2a2a", quote: "f0f0f0", character: "c8a820",
    anime: "b09030", accent: "222222", glow: "aa8818",
    quoteMarkColor: "444444", divider: "252525",
  },
  cyberpunk: {
    bg: "030012", border: "aa00dd", quote: "00eeff", character: "ff00bb",
    anime: "ffee00", accent: "6600bb", glow: "bb00ee",
    quoteMarkColor: "880099", divider: "330055",
  },
  jujutsu: {
    bg: "0c0c14", border: "252538", quote: "dcdce8", character: "9070ff",
    anime: "ff6666", accent: "3a2880", glow: "6644cc",
    quoteMarkColor: "3a2880", divider: "1a1a2c",
  },
  aot: {
    bg: "110e08", border: "3a2a10", quote: "ecd8a0", character: "cc9933",
    anime: "aa7722", accent: "2a1a08", glow: "886622",
    quoteMarkColor: "553310", divider: "2a1e0c",
  },
  oshi_no_ko: {
    bg: "0c0014", border: "330066", quote: "f0e0ff", character: "cc88ff",
    anime: "ff99cc", accent: "660099", glow: "9933cc",
    quoteMarkColor: "550088", divider: "220044",
  },
  spy_family: {
    bg: "0a1428", border: "1a3050", quote: "e8eeff", character: "5599ff",
    anime: "ffcc44", accent: "2255aa", glow: "3366cc",
    quoteMarkColor: "1a3a88", divider: "162040",
  },
  chainsaw_man: {
    bg: "160308", border: "4a0a14", quote: "f5e8e8", character: "ff3344",
    anime: "ff8844", accent: "880018", glow: "cc1128",
    quoteMarkColor: "660011", divider: "2a0810",
  },
  transparent: {
    bg: "ffffff00", border: "30363d", quote: "e6edf3", character: "58a6ff",
    anime: "7ee787", accent: "1f6feb", glow: "1f6feb",
    quoteMarkColor: "1f6feb", divider: "30363d",
  },
};

function getTheme(name, overrides = {}) {
  const base = themes[name] ?? themes.dark;
  return { ...base, ...overrides };
}

module.exports = { themes, getTheme };