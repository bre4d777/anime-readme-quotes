# anime-quote-card

Dynamic SVG anime quote cards for your GitHub README.

```md
![Anime Quote](https://animequotes.uwuify.space/api)
```

---

## Usage

Paste into any `README.md` or Markdown file. The card refreshes on every page load.

```md
<!-- random quote -->
![Anime Quote](https://animequotes.uwuify.space/api)

<!-- filter by anime -->
![Anime Quote](https://animequotes.uwuify.space/api?anime=Naruto)

<!-- filter by character -->
![Anime Quote](https://animequotes.uwuify.space/api?character=Spike)

<!-- specific theme -->
![Anime Quote](https://animequotes.uwuify.space/api?theme=tokyo_night)

<!-- custom quote -->
![Anime Quote](https://animequotes.uwuify.space/api?quote=Your+quote+here&author=You&anime_name=Life)
```

---

## Parameters

| Param | Default | Description |
|---|---|---|
| `theme` | `dark` | Card color theme (see below) |
| `font` | `helvetica` | Font family |
| `anime` | — | Filter by anime name (fuzzy) |
| `id` | — | Filter by AniList ID |
| `character` | — | Filter by character name (fuzzy) |
| `border_radius` | `8` | Corner radius `0–40` |
| `border_width` | `1` | Border width `0–5` |
| `bg_color` | — | Background hex (no `#`) |
| `quote_color` | — | Quote text hex |
| `author_color` | — | Character name hex |
| `anime_color` | — | Anime title hex |
| `accent_color` | — | Accent/glow hex |
| `border_color` | — | Border hex |
| `quote` | — | Custom quote text (spaces as `+`) |
| `author` | `Anonymous` | Custom author (used with `quote`) |
| `anime_name` | — | Custom anime label (used with `quote`) |

---

## Themes

| Key | Preview |
|---|---|
| `dark` | GitHub dark |
| `light` | GitHub light |
| `tokyo_night` | Tokyo Night |
| `dracula` | Dracula |
| `nord` | Nord |
| `gruvbox` | Gruvbox |
| `catppuccin` | Catppuccin Mocha |
| `rose_pine` | Rosé Pine |
| `ayu` | Ayu Mirage |
| `monokai` | Monokai |
| `evangelion` | Neon Genesis Evangelion |
| `mononoke` | Princess Mononoke |
| `akira` | Akira |
| `sakura` | Sakura |
| `bleach` | Bleach |
| `cyberpunk` | Cyberpunk |
| `jujutsu` | Jujutsu Kaisen |
| `aot` | Attack on Titan |
| `oshi_no_ko` | Oshi no Ko |
| `spy_family` | Spy × Family |
| `chainsaw_man` | Chainsaw Man |
| `transparent` | Transparent bg |

---

## API Endpoints

> **Error responses** always return `{ "error": "message" }` with a `404` status.

---

### `GET /api`

Returns a random quote rendered as an `image/svg+xml` SVG card.

**Query params**

| Param | Type | Default | Description |
|---|---|---|---|
| `theme` | string | `dark` | Color theme name |
| `font` | string | `helvetica` | Font family (`helvetica` `arial` `verdana` `tahoma` `trebuchet_ms` `times_new_roman` `georgia` `garamond` `courier_new`) |
| `anime` | string | — | Filter by anime name (fuzzy match) |
| `id` | integer | — | Filter by AniList ID (exact) |
| `character` | string | — | Filter by character name (fuzzy match, applied after anime/id filter) |
| `border_radius` | integer | `8` | Card corner radius, `0`–`40` |
| `border_width` | integer | `1` | Border stroke width, `0`–`5` |
| `bg_color` | hex | — | Override background color (no `#`, e.g. `1a1a2e`) |
| `quote_color` | hex | — | Override quote text color |
| `author_color` | hex | — | Override character name color |
| `anime_color` | hex | — | Override anime title color |
| `accent_color` | hex | — | Override accent/glow color |
| `border_color` | hex | — | Override border color |
| `quote` | string | — | Custom quote text (encode spaces as `+`) |
| `author` | string | `Anonymous` | Custom author name (only used with `quote`) |
| `anime_name` | string | — | Custom anime label (only used with `quote`) |

**Response**

```
Content-Type: image/svg+xml
Cache-Control: no-cache, no-store, must-revalidate
Access-Control-Allow-Origin: *
```

---

### `GET /api/quote`

Returns a single random quote as JSON. Supports the same filtering params as `/api`.

**Query params**

| Param | Type | Default | Description |
|---|---|---|---|
| `anime` | string | — | Filter by anime name (fuzzy match) |
| `id` | integer | — | Filter by AniList ID (exact) |
| `character` | string | — | Filter by character name (fuzzy match) |

**Response `200`**

```json
{
  "quote": "If you don't take risks, you can't create a future.",
  "character": "Monkey D. Luffy",
  "anime": "One Piece",
  "anilistId": 21
}
```

**Response `404`** — no quotes matched the filter

```json
{ "error": "No anime matching: Bersek" }
```

---

### `GET /api/anime`

Returns all anime in the database sorted by quote count descending. No params.

**Response `200`**

```json
[
  { "name": "Naruto", "anilistId": 20, "count": 142 },
  { "name": "One Piece", "anilistId": 21, "count": 98 },
  ...
]
```

---

### `GET /api/stats`

Returns aggregate counts for the entire database. No params.

**Response `200`**

```json
{
  "totalQuotes": 8540,
  "totalAnime": 312,
  "totalCharacters": 1024
}
```

---

### `GET /api/themes`

Returns an array of all valid theme key strings. No params.

**Response `200`**

```json
[
  "dark", "light", "tokyo_night", "dracula", "nord", "gruvbox",
  "catppuccin", "rose_pine", "ayu", "monokai", "evangelion",
  "mononoke", "akira", "sakura", "bleach", "cyberpunk", "jujutsu",
  "aot", "oshi_no_ko", "spy_family", "chainsaw_man", "transparent"
]
```

---

## Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bre4d777/anime-readme-quotes)

1. Fork this repo
2. Deploy to [Vercel](https://vercel.com)
3. Replace `animequotes.uwuify.space` with your deployment URL or Simply Visit your deployment to generate card
4. yes the html is somewhat ai generated 

---

## Data

Quotes sourced from [animeQuotes-offlineDB](https://github.com/bre4d777/animeQuotes-offlineDB).

Built by [bre4d777](https://github.com/bre4d777).
