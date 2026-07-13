# Kumbaya Feed

TikTok-style doomscroll feed prototype with spring physics, haptics, comments, and trade drawer.

**Live:** [https://kby-feed.vercel.app](https://kby-feed.vercel.app)  
**Repo:** [frilo-eth/kby-feed](https://github.com/frilo-eth/kby-feed)

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` → feed).

## Controls

| Key | Action |
|-----|--------|
| `J` / `↓` | Next post |
| `K` / `↑` | Previous post |
| `L` | Like |
| `D` | Dislike |
| `T` | Tip |
| `C` | Comment |
| `S` | Share |

Swipe / wheel on desktop. Hold video ≥240ms for 2×. Pull down on mobile for refresh.

---

## Animation system

Most motion reuses a small set of curves. Durations are wall-clock; springs are physics-stepped at `dt = 1/60`.

### Shared easing tokens

| Token | Curve | Feel |
|-------|-------|------|
| **Snap** | `cubic-bezier(.65, 0, .35, 1)` | Sidebar collapse, hint thumb travel |
| **Standard out** | `cubic-bezier(.22, 1, .36, 1)` | Drawers, panels, list settle |
| **Soft overshoot** | `cubic-bezier(.22, 1.2–1.4, .36, 1)` | Comment enter, drop stage, attach |
| **Pop** | `cubic-bezier(.22, 1.45–1.5, .36, 1)` | Reaction pulse, new-pill, attach thumb |
| **Vaul sheet** | `cubic-bezier(.32, .72, 0, 1)` | Mobile bottom sheets / topbar hide |
| **Linear / ease** | `linear`, `ease`, `ease-out`, `ease-in-out` | Spinners, fades, marquee |

---

### 1. Hover / press (CSS)

**Rule:** hover is **color-graded only** (background, color, brightness, shadow tint). No scale / translate on hover — except token chip + trade plus.

| Target | Hover | Press | Transition |
|--------|-------|-------|------------|
| Nav / icon / chevron / glass | bg + color | brightness dip | `.15s` |
| **Kbd helper** | rest = icon; hover/active = soft circle `var(--line)` + ink | brightness | `.2s` |
| Kbd panel open | — | `scale(.9)→1`, opacity | `.2s` `(.22,1,.36,1)` |
| **Reaction rail** | outside: `#FAFAFA→#FFF` / dark `#130A07→#251D18`; on-media glass tint; active `brightness(1.06)` | `brightness(.94)` | bg/color `.22s` |
| Reaction count | ink / white | — | color `.2s` |
| **Mute / unmute** | pathLength draw morph — see below | — | `.2s` ease-in-out (+`.1s` outer) |
| **Buy $ticker** | dark glass pill on media (`Buy $TICKER` + token av); Y-aligned with rail `.avatar-plus` via `layoutBuyCta` | brightness | opacity `.22s`; opens trade |
| **Hover cards** | user + token preview portals (no Buy CTA); desktop `pointer:fine` only | — | show `.18s`, delay 280ms |
| New posts pill | brightness `.98` | `scale(.95)` | opacity `.3s`, transform `.38s` pop |
| Tag / uname | color / underline | — | `.15s` |
| **Token mini** *(size allowed)* | `scale(1.14)` + orange ring | `scale(.96)` | `.28s` `(.22,1.4,.36,1)` |
| **Trade plus** *(embellished)* | see below | settle | pop curve |

Desktop reaction hover gated: `@media (hover:hover) and (pointer:fine)`.

#### Mute / unmute SVG morph

WebHaptics-style pathLength draw — one SVG, no hard icon swap. Cone stays; waves or slash sketch in.

| Piece | Detail |
|-------|--------|
| SVG | `.mute-icon` · viewBox `0 0 28 28` · stroke `2.35` (~rail weight) |
| Cone | `.mute-cone` — always visible |
| Sound on | `.mute-waves` shown · `data-sound="1"` · waves draw via `@keyframes muteDraw` |
| Muted | `.mute-slash` shown · `data-sound="0"` · X lines draw the same way |
| Draw | `pathLength="1"` + `stroke-dasharray:1` / `stroke-dashoffset:1→0` · outer path `.mute-draw-delay` (+`.1s`) |
| Settled | `.is-settled` skips animation (`stroke-dashoffset:0`) |
| API | `muteIconHtml()` · `applyMuteButtonState(btn, on, {animate})` · `setFeedSound` / `syncMuteButtons` |
| Feedback | haptic + sound presets `unmute` / `mute` · session key `kb_feed_sound` |

```html
<svg class="mute-icon" width="24" height="24" viewBox="0 0 28 28" fill="none">
  <path class="mute-cone" d="M13 7L8 11H4V17H8L13 21V7Z"/>
  <g class="mute-waves">
    <path class="mute-draw mute-draw-delay" pathLength="1" d="M21.07 7C…21.14"/>
    <path class="mute-draw" pathLength="1" d="M17.54 10.53C…17.6"/>
  </g>
  <g class="mute-slash">
    <path class="mute-draw mute-draw-delay" pathLength="1" d="M25 11L19 17"/>
    <path class="mute-draw" pathLength="1" d="M19 11L25 17"/>
  </g>
</svg>
```

#### Trade plus embellishment

| Piece | Hover |
|-------|--------|
| Avatar | orange `2px` ring + slight brightness |
| Plus badge | SVG `+` (grid-centered); `scale(1.1) rotate(90deg)`, `.28s` `(.22,1.2,.36,1)` |
| Plus `::before` ring | opacity `0→1`, `scale(.85→1.2)` — same curve |

---

### 2. Reaction feedback

| Motion | Code | Timing |
|--------|------|--------|
| Click pulse (btn) | `@keyframes reactPulse` | `.48s` `(.22,1.5,.36,1)` — brightness flash (no size) |
| Click pulse (icon) | `@keyframes reactIconPop` | same — opacity dip |
| Tip float `+$5` | `@keyframes tipFloat` | `1s ease-out` — rise `−52px`, fade |
| Active fill | tip `orange` / like `green` / dislike `red` | bg/color `.22s`, glow shadow |
| Tip lock | once tipped, no hover brighten | cursor `default` |

---

### 3. Media load & playback

| Motion | Code | Timing |
|--------|------|--------|
| Skeleton shimmer | `@keyframes mediaShimmer` | `1.15s ease` infinite, gradient sweep |
| Media fade-in | `.media-inner.is-ready` / `.vid-live` | opacity `.18–.22s ease` |
| Rail unlock | `.feed-item.media-ready` | opacity/filter `.28s ease` |
| Top controls show | `.media-topctl` | opacity `.2s`, `translateY(−6→0)` |
| Play/pause flash | `@keyframes flashPop` | `.58s` `(.22,1,.36,1)` — scale `.55→1→1.5`, fade out |
| 2× badge in | `.speed-badge.show` | `.4s` `(.22,1.45,.36,1)` spring-in |
| 2× chevrons | `@keyframes speedChevron` | `.85s ease-in-out` infinite, staggered `.14s` |
| Hold → 2× | `playbackRate = 2` after **240ms** hold | haptic `nudge` |
| Progress bar | `.video-progress-fill` | width `.08s linear` |

---

### 4. First-visit swipe hint

| Motion | Code | Timing |
|--------|------|--------|
| Overlay in | `.feed-hint.show` | opacity/bg/blur `.45s ease` |
| Hand Lottie | local `lottie.min.js` + `/public/hand-helper/Hand.json` (MP4 fallback) | 700×700, 30fps, 110f (~3.7s), loop |
| Lottie enter | `.hint-lottie` | `.55s` `(.22,1.4,.36,1)` scale `.94→1` |
| Auto-dismiss | `kb_feed_hint_v8` | show after ready; ~10s or navigate (900ms grace) |

---

### 5. Feed doomscroll (JS spring)

Core engine in `springTo()`:

```js
stiffness = 280
damping   = 30
mass      = 0.8
dt        = 1/60

force = -stiffness * (pos - target)
damp  = -damping * v
v    += (force + damp) / mass * dt
pos  += v * dt

// settle when |pos-target| < 0.0025 && |v| < 0.01
```

| Piece | Behavior |
|-------|----------|
| Step size | `pageStep = scroller.clientHeight − --feed-peek` |
| Parallax | active/next `scale(1)`; prev `scale(.97) opacity .55`; else fade `1 − ad*0.5`, scale `≥.92` |
| Wheel | deltaY → `goToIndex(±1)`, lock **520ms** |
| Drag fling | `|velocity| > 0.7` → ceil/floor target |
| Settle haptic | `haptic('settle')` when index changes |
| Drag tick | `haptic('dragtick')` each crossed index |

---

### 6. Chrome / layout motion

| Motion | Curve / code | Duration |
|--------|--------------|----------|
| Sidebar width | `(.65,0,.35,1)` | `.32s` |
| Drawer open (desktop) | width `0→360`, `(.22,1,.36,1)` | `.38s` |
| Mobile sheet open | `translateY(100%→0)`, `(.32,.72,0,1)` | `.44s` |
| Sheet scrim | opacity | `.35s ease` |
| More sheet | same vaul curve; **closes after any action including Toggle theme** | `.44s` |
| Topbar auto-hide (mobile) | after settle; `max-height` + pad + opacity, `(.32,.72,0,1)` | `.38s` (page-step locked during swipe) |
| Chrome reflow | `reflowDuringChrome()` rAF loop | **440ms** |
| Search marquee | `@keyframes searchMarquee` | `--mq-dur` (~overflow/45), ease-in-out alternate |

---

### 7. Comments & attach

| Motion | Curve | Duration |
|--------|-------|----------|
| List swap out | ease | `.22s` |
| List ready in | `(.22,1,.36,1)` / `(.22,1.2,.36,1)` | `.34–.42s` |
| Row enter (stagger) | `(.22,1.4,.36,1)` | `.36–.42s` |
| Drop stage in | `(.22,1.4,.36,1)` | `.42s` |
| Attach expand | `(.22,1,.36,1)` + pop | `.42s` |
| Attach thumb pop | `@keyframes attachPopIn` `(.22,1.45,.36,1)` | `.58s` |
| Fly-in from feed | JS transform + settle pop | GPU fly → pop |
| Anon exit | `anonExit*` keyframes `(.22,1.4–1.5,.36,1)` | `.42–.45s` |
| Send btn show | `(.22,1.5,.36,1)` | `.18s` |
| Compose lift on drop | `(.22,1.3,.36,1)` | `.36s` |

---

### 8. Pull-to-refresh → spring settle (mobile)

Infinite wrap both ways (TikTok trap). At the first post, a **short** down-pull still refreshes; drag further and it hands off to previous-post scroll.

| Step | Code | Detail |
|------|------|--------|
| Infinite wrap | `wrappedOffset` / `springTo` | swipe down on first → previous (`N-1`); never hard-stops |
| Pull vs scroll | `PULL_SCROLL_BREAK = 0.24` page | below → rubber-band refresh; at/above → `abortPullForScroll` → wrap |
| Rubber-band | `dampPull(dy)` | `max=112`, `k=0.48`, asymptotic |
| Offset | `pullOffset` via `setPullOffset` → `applyTransform` | active item only |
| Mask | `.is-pulling` / `.is-refreshing` | non-active hidden; peek gradient off |
| Threshold | `PULL_THRESHOLD = 68` | haptic `nudge` on arm |
| Spinner | centered in gap (`y = pull*0.5`) | `--p` + `pullspin` `.65s` |
| Hold / settle | `PULL_HOLD = 56` · `.is-pull-settle` | `.42s` `(.22,1,.36,1)` |
| Desktop alternate | `#newPill` | opacity `.3s`, transform `.38s` pop |

---

### 9. Haptics (paired with motion)

Presets via [web-haptics](https://haptics.lochie.me/) + `navigator.vibrate` fallback:

`light` · `selection` · `nudge` · `settle` · `dragtick` · `toggle` · `unmute` · `mute` · `open` · `comment` · `share` · `tip` · `like` · `dislike` · `attach`

Each can fire a matching WebAudio one-shot (no ambient loop).

---

### 10. Hover info cards (desktop)

Preview-only popovers. **No CTA on the card** — click the underlying zone still opens the trade drawer / existing actions.

| | User card (`#userHoverCard`) | Token card (`#tokenHoverCard`) |
|--|--|--|
| **Triggers** | `.uname`, `.avatar-sm` | `.avatar-plus`, `.buy-cta`, `.token-mini`, `.tag-ticker`, `.pill` (280ms) |
| **Content** | blockie, name, Mirror+X icons, Launches, Global PnL | avatar, ticker+cat, name, MCAP, seeded SVG chart + markers, buyers / comments / tips / heat |
| **Gate** | `width > 860` and `(hover:hover) and (pointer:fine)` — hidden on mobile | same |
| **API** | `bindHoverCard(el, 'user'\|'token', post, delayMs)` · `hideHoverCards(immediate?)` · `mockUserStats` / `mockTokenStats` / `buildTokenChartSvg` | |
| **Hide** | leave trigger (160ms bridge onto card), Escape, scroll, resize, open drawer/comments/share | |

Portal: `#kbHoverPortal`. Stats/chart are deterministic from `hashSeed(user|ticker)` — swap those helpers for live API data later.

---

## Breakpoint

**860px** — mobile full-bleed feed, bottom nav, sheets; desktop sidebar + side drawers + kbd helper + new-pill + hover cards.
