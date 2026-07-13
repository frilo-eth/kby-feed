# Kumbaya Feed

TikTok-style doomscroll feed prototype with spring physics, haptics, comments, and trade drawer.

**Live:** [https://kby-feed.vercel.app](https://kby-feed.vercel.app)  
**Repo:** [frilo-eth/kby-feed](https://github.com/frilo-eth/kby-feed)

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (`/` → feed).  
Cheatsheet: [http://localhost:3000/cheatsheet](http://localhost:3000/cheatsheet)

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

### 1. Simple hover / press (CSS)

| Target | Hover | Active (press) | Transition |
|--------|-------|----------------|------------|
| Nav item | bg + color | — | `.15s` |
| Icon / launch / chevron | `scale(1.04–1.06)` | `scale(.88)` | `.14–.15s` |
| Glass mute/more | bg brighten | `scale(.88)` | transform `.12s`, bg `.15s` |
| **Kbd helper** | rest = icon only; **active** = soft circle `var(--line)` | `scale(.92)` | `.15–.2s` |
| Kbd panel open | — | `scale(.9)→1`, `opacity 0→1` | `.2s` `(.22,1,.36,1)` |
| **Reaction rail** | `scale(1.04) translateY(-1px)`, soft disc wash | `scale(.86)` | `.32s` `(.22,1.45,.36,1)` |
| Avatar+ | `scale(1.03) translateY(-1px)` | `scale(.95)` | `.28s` `(.22,1.4,.36,1)` |
| Plus badge | `scale(1.06)` | `scale(.92)` | `.32s` `(.22,1.5,.36,1)` |
| New posts pill | brightness `.98` | `scale(.95)` | opacity `.3s`, transform `.38s` pop |
| Tag / uname | color / underline | — | `.15s` |

Desktop reaction hover is gated: `@media (hover:hover) and (pointer:fine)`.

---

### 2. Reaction feedback

| Motion | Code | Timing |
|--------|------|--------|
| Click pulse (btn) | `@keyframes reactPulse` | `.48s` `(.22,1.5,.36,1)` — scale `1 → 1.22 → .9 → 1` |
| Click pulse (icon) | `@keyframes reactIconPop` | same — scale + slight rotate |
| Tip float `+$5` | `@keyframes tipFloat` | `1s ease-out` — rise `−52px`, fade |
| Active fill | tip `orange` / like `green` / dislike `red` | bg/color `.22s`, glow shadow |
| Tip lock | once tipped, no hover grow | cursor `default` |

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
| Thumb + rings travel | `@keyframes hintThumbDrag` | `1.8s` `(.65,0,.35,1)` infinite |
| Ripple circles | `@keyframes hintRipple` | `1.8s` `(.22,.7,.36,1)`, delays `0 / .22 / .44s` |
| Auto-dismiss | `kb_feed_hint_v6` | ~9s or on feed navigate |

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
| Topbar auto-hide (mobile) | `max-height` + pad + opacity, `(.32,.72,0,1)` | `.38s` |
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

| Step | Code | Detail |
|------|------|--------|
| Rubber-band | `dampPull(dy)` | `max=170`, `k=0.55`, asymptotic `max*(1−e^(−raw/max))` |
| Threshold | `PULL_THRESHOLD = 74` | px of damped pull |
| Spinner | `--p` progress + `@keyframes pullspin` | `.7s linear` when spinning |
| Track release | `.pull-animate` | `.5s` `(.22,1.32,.36,1)` |
| Content fade | `.refresh-fade` | opacity `.3s` → `.2` |
| Reload | rotate posts, `pos=0`, spring settle | haptic `open` / `settle` |
| Desktop alternate | `#newPill` | opacity `.3s`, transform `.38s` pop |

---

### 9. Haptics (paired with motion)

Presets via [web-haptics](https://haptics.lochie.me/) + `navigator.vibrate` fallback:

`light` · `selection` · `nudge` · `settle` · `dragtick` · `toggle` · `open` · `comment` · `share` · `tip` · `like` · `dislike` · `attach`

Each can fire a matching WebAudio one-shot (no ambient loop).

---

## Breakpoint

**860px** — mobile full-bleed feed, bottom nav, sheets; desktop sidebar + side drawers + kbd helper + new-pill.
