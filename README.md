# Kumbaya Feed

**Version 0.1.0** — TikTok-style doomscroll feed prototype with spring physics, haptics, comments, trade drawer, and mobile-first overlays.

**Live:** [https://kby-feed.vercel.app](https://kby-feed.vercel.app)  
**Repo:** [frilo-eth/kby-feed](https://github.com/frilo-eth/kby-feed)  
**Tag:** [`v0.1.0`](https://github.com/frilo-eth/kby-feed/releases/tag/v0.1.0)

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

Swipe / wheel on desktop. Hold video ≥240ms for 2× — badge opens straight into the charge ring + **“Hold 3s to lock”** annotation → locked 2× (tap badge to unlock). Details: [2× hold → lock](#hold-lock-2x). At the first post, pull down to [refresh](#pull-refresh) (desktop + mobile). Infinite wrap both ways when swiping the feed.

---

## Feature map (for production ports)

Use this as the checklist when reimplementing — these are the UX details that are easy to drop.

### Feed

| Feature | Behavior |
|---------|----------|
| Infinite wrap | Both directions; first-post down-swipe wraps to previous (TikTok trap) |
| [Pull-to-refresh](#pull-refresh) | At first post: short deliberate pull refreshes; longer drag can wrap to previous (infinite loop). Desktop + mobile. `#pullSpin` dial → spin · [Q&A](#pull-refresh) |
| Mute morph | pathLength SVG draw (waves ↔ slash); session `kb_feed_sound` |
| [Video progress bar](#video-progress) | Bottom 3px track on `type=video` only (not gif-loops); `--orange` fill from `timeupdate`; non-interactive; loops with the clip |
| Buy `$ticker` | Floating crystal pill on `.token-anchor` (desktop + mobile). **Mobile stagger:** `+` Buy bar marquees 2× first, then pill (no overlap). Hotzone/tab = pill only. Desktop: pill cadence + hover Buy bar. Wipe: `clip-path: inset(… round 999px)` |
| Media frame | **Desktop always matches source aspect ratio** (`fitMediaBox` + `--ar`); one binding axis, the other `auto`. Mobile ≤860 stays full-bleed `object-fit:cover` |
| Trade entry points | Avatar+, Buy CTA, ticker, token mini, category pill → trade drawer |
| Hover cards | Desktop only — user / token / **`>>` quote** preview portals (no Buy on the card) — meta triggers in [Meta affordances](#meta-affordances) |
| [Meta affordances](#meta-affordances) | `@uname` opacity hover · **`.blockie`** lighten · **OP** [role badge](#dare-role-badge) (squarish; any cat; Entry = no badge) · token mini · ticker · pill · [Q&A](#meta-affordances) |
| [2× hold → lock](#hold-lock-2x) | ≥240ms → glass `2x` badge with **charge ring** + **“Hold 3s to lock”** (`SPEED_LOCK_MS=3000`); no chevron pulse on this path; release early = back to 1×; lock survives finger-up; tap badge to unlock — [full technical overview](#hold-lock-2x) |
| Activity bubbles | Desktop ambient reactions; progressive disclosure on the reaction chip; discs clamped to a band above the post avatar (never climb the feed); avatar seeded from display name (matches hover card); hairline ring only (no colored/brown halo) |
| New posts / pull pill | Themed `--card` / `--ink` / `--line`; 20px clearance under topbar; soft-dismiss after **2** settled swipes (`NEW_PILL_SWIPES`), then re-arm ~3 min |
| Meta float scrim | Desktop short veil (`clamp(132px, 28%, 176px)`); mobile taller |
| Tablet chrome | Keep chevron gutter (`--feed-chevron-gutter: 88px`); glass rail only when overlaid on media |
| First-visit hint | Hand Lottie; `kb_feed_hint_v9`; idle = `display:none` (no backdrop veil) |
| Topbar auto-hide | Mobile; overlays feed (no layout resize); after settle on next; page-step locked mid-swipe |

### Comments

| Feature | Behavior |
|---------|----------|
| Drawer / sheet | Desktop 360 side panel; mobile 86vh bottom sheet + scrim + drag dismiss |
| Compose dock | Comments tab: list scrolls in `.comments-body`; compose stays on the drawer floor (not sticky-inside-scroll). Keep scroll **16px** gutters — do not negative-margin the whole panel |
| Compose chrome | Squircle input row (`border-radius:14px`) matching `.comment-send`; send haptic `sent` |
| Anon vs public | Anon: no reacts/media; public: X-proof tip + reacts |
| **Threaded replies** | One indent level under a root (`.comment-replies` pad-left 46px / 40px mobile); smaller reply avatars (28px) |
| **View / hide replies** | Collapsed by default. `View N replies` → reveal **5** at a time (`REPLY_PAGE`); then `View N more`; **Hide** collapses the whole indent. Hide hover pill stays inside the scroll gutter (no right-edge clip) |
| **`>>id` quotes** | 4chan-style. Reply prefixes compose with `>>35355 `; send nests under that comment’s **root**; blue `.comment-quote` links in list + compose mirror |
| Quote hover card | Desktop — hover `>>id` → `#quoteHoverCard` mini preview (180ms); works in list + compose mirror |
| Attach | File pop-in or drag media from feed; drop stage; anon auto-exits for media |
| **Comment media focus (CFX)** | Tap a comment thumb → gallery focus overlay |
| CFX desktop | Stage beside the open comments drawer |
| **CFX mobile** | Full-screen lightbox **above** the comments sheet; two-finger **pinch / rotate / pan**; idle spring-back to fit; Photos-like |
| CFX caption | Tip / like / dislike stay in sync with the comment row |

### Sheets & modals (auto-dismiss details)

| Surface | Dismiss behavior |
|---------|------------------|
| **More sheet** (mobile) | Closes after **any** row action — including **Toggle theme**. Do not leave it open after theme flip. |
| **Share** | Desktop modal / mobile sheet. **Share on X** and **Copy url** auto-close after success (copy shows “Copied!” ~800ms then closes). Scrim / ✕ / drag-dismiss also close. |
| Trade / comments | Scrim tap, ✕, **Escape**, drag handle (mobile). Esc peels topmost layer first (CFX → hover card → kbd → more → share → drawer) |
| Sheet close buttons | Sheet-colored bg (`var(--card)`), 40px desktop / 44px mobile thumb target |

---

## Animation system

Most motion reuses a small set of curves. Durations are wall-clock; doomscroll springs use **real frame dt** (see `swipe-silk` below).

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
| **Buy $ticker** (floating pill) | desktop + mobile; cadence show → tuck → re-engage (≤3× / post); shared enter/exit spring; `inset(… round 999px)` wipe; hotzone wake = pill only (`is-hover-wake`) | brightness | clip/transform spring |
| **Hover cards** | user + token + **`>>` quote** portals (no Buy CTA); desktop `pointer:fine` only | — | show `.18s`, delay 180–280ms |
| New posts pill | brightness `.98`; soft-dismiss after 2 settled swipes | `scale(.95)` | opacity `.28s`, transform `.34s` pop |
| Tag / uname | [Meta affordances](#meta-affordances) — opacity `.8` (no underline) | — | `.15s` |
| **OP badge** | [OP badge](#dare-role-badge) — Launch icon + `OP` → `Original Post` (width + opacity crossfade) | — | max-width `.52s` `(.22,.82,.28,1)` · label `.28s` (exit delayed) |
| **Token mini** *(size allowed)* | [Meta affordances](#meta-affordances) — `scale(1.14)` + orange ring | `scale(.96)` | `.28s` `(.22,1.4,.36,1)` |
| **Trade plus → Buy bar** *(key)* | desktop hover / mobile auto (2 cycles → `+`) — see below | `scale(.97)` press | width + marquee |

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

#### Trade plus → Buy bar (key)

Two independent Buy surfaces on `.token-anchor`. Do **not** couple them.

| Surface | When it wakes | What moves |
|---------|---------------|------------|
| **Floating Buy pill** (`.buy-cta`) | Cadence + hotzone / idle / tab. **Mobile:** delayed until `+` marquee finishes (cadence); hotzone/tab = pill only | Crystal pill wipe. Soft glow on avatar/`+` allowed. |
| **Orange Buy bar** (`.plus-badge`) | **Desktop:** hover `.avatar-plus`. **Mobile:** leads cadence — 2 marquees, then collapse to `+`, then pill | Full-token `Buy $TICKER` marquee |

**Geometry (no jump)**

| Piece | Detail |
|-------|--------|
| Anchor | `right:-3px; bottom:-5px; height:20px` — only **width** grows left (`calc(100% + 3px)`); `border-radius:7px` |
| `+` icon | `justify-content:flex-end` + fixed `margin-right` — icon never travels |
| Label | `.plus-buy-label` fills space left of `+`; `padding-left:6px`; mask fades **right edge only** (left soft-mask crops “Buy”) |
| Press | `scale(0.97)`, `transform-origin:100% 50%` |
| Reduced motion | `@media (prefers-reduced-motion:reduce)` kills `.plus-buy-track` animation |

**Marquee** — continuous loop (no hold between cycles). Duplicated segments so `-50%` is seamless.

| Piece | Detail |
|-------|--------|
| Markup | `.plus-buy-label` → `.plus-buy-track` → two `.plus-buy-seg` (`Buy ${ticker}`, second `aria-hidden`) |
| Copy | `Buy $TICKER` (ticker already includes `$`) — **Buy** is the word eyes must catch first |
| Motion | `@keyframes plusBuyMarquee` `translateX(0→−50%)` · `3.2s linear` · `.18s` start delay · `infinite` while expanded |
| Gap | `padding-right:8px` on each seg (included in the `-50%` travel) |
| Gate (desktop) | `.token-anchor .avatar-plus:hover` |
| Gate (mobile) | `.is-plus-buy` via `armPlusBuyBar` — **2** cycles, then collapse; floating pill reveals after (`pillOnly`). Hotzone/tab skip the bar |
| Reduced motion | brief expand without loop, then collapse |

```css
/* Desktop hover + mobile .is-plus-buy share the same expand */
.token-anchor .avatar-plus:hover .plus-badge,
.token-anchor.is-plus-buy .plus-badge{
  width:calc(100% + 3px);
}
.token-anchor .avatar-plus:hover .plus-badge .plus-buy-track,
.token-anchor.is-plus-buy .plus-badge .plus-buy-track{
  animation:plusBuyMarquee 3.2s linear .18s infinite;
}
@keyframes plusBuyMarquee{
  from{transform:translateX(0);}
  to{transform:translateX(-50%);}
}
```

Non-token `.avatar-plus:hover .plus-badge` still uses the soft pop (`scale(1.12)` + ring) — token hover overrides to `transform:none` so width grow doesn’t fight scale.

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

### 2b. Activity bubbles (progressive disclosure)

Floating IG-style avatars for ambient / live tip · comment · like · dislike. Host `#actBubbles` (`z-index:18`).

| Piece | Detail |
|-------|--------|
| Enter / exit | `.act-bubble.is-in` / `.is-out` / `.is-fling` — opacity + scale, soft settle (exit rise ~6px, not a climb) |
| Idle drift | `@keyframes actBubbleDrift` — gentle `5.2s` loop (small amplitude so the flock doesn’t feel like it’s migrating) |
| Layout | `layoutActivityBubbles` — avatar-relative slots inside a **~96px band** above meta; lowest free `_slot` on respawn; separate overlaps along the join vector (no upward bias) |
| Avatar | `userAvatar(displayName)` — same seed as the user hover card (never the ambient `cmN` / `tipperN` key) |
| Ring | Opaque disc + white hairline on `.act-hit-av`; no colored `--act` outer ring / brown drop shadow |
| Chip closed | `.act-hit-rx` — 16×16 color badge with reaction icon |
| Chip open | `.is-rx-open` — blooms to pill (`max-width:168px`, `.32s` `(.22,1,.36,1)`) |
| Copy | tip `tipped $N` · like `liked it` · dislike `disliked it` · comment short text |
| Marquee | `@keyframes actRxMarquee` — **comments only**, and only when the label overflows (`syncActRxMarquee`) |
| Never marquee | tip (`tipped $N`), like (`liked it`), dislike (`disliked it`), short comment snips (`wow`, `love this`) |
| API | `spawnActivityBubble` · `signalActivity` · `setActDisclosure` · `layoutActivityBubbles` · `nextActBubbleSlot` |

```css
/* gated in JS: el.dataset.kind === 'comment' && overflow > 4 */
.act-rx-label.is-marquee .act-rx-label-text{
  animation: actRxMarquee 3.8s linear infinite;
}
@keyframes actRxMarquee{
  0%,14%{ transform: translateX(0); }
  86%,100%{ transform: translateX(var(--marquee-x, 0px)); }
}
```

---

### 3. Media load & playback

| Motion | Code | Timing |
|--------|------|--------|
| Skeleton shimmer | `@keyframes mediaShimmer` | `1.15s ease` infinite, gradient sweep |
| Media fade-in | `.media-inner.is-ready` / `.vid-live` | opacity `.18–.22s ease` |
| Desktop fit | `fitMediaBox` — landscape binds width, portrait binds height; `--ar` + `height/width:auto`; inline max ceilings | sync on load / resize / drawer |
| Desktop paint | `object-fit:contain` inside the AR frame (no crop); mobile full-bleed `cover` | — |
| Rail unlock | `.feed-item.media-ready` | opacity/filter `.28s ease` |
| Top controls show | `.media-topctl` | opacity `.2s`, `translateY(−6→0)` |
| Play/pause flash | `@keyframes flashPop` | `.58s` `(.22,1,.36,1)` — scale `.55→1→1.5`, fade out |
| 2× hold / lock | [Hold → lock technical overview](#hold-lock-2x) | `SPEED_HOLD_MS=240` · `SPEED_LOCK_MS=3000` |
| Buy CTA cycle | floating pill show → dormant → reappear (desktop + mobile); hotzone/idle/tab wake | show ~4.2s / engage / max 3 — pill only, not Buy bar |
| Buy CTA enter / exit | shared transition; `clip-path: inset(… round 999px)` + scale/translate (never bare `inset` / `none` mismatch) | `.46s` / `.5s` `(.18,1.12,.32,1)` / `(.16,1.2,.28,1)` |
| Buy bar marquee | desktop hover `+` · mobile `.is-plus-buy` (2 cycles → `+`) — see **Trade plus → Buy bar** | `3.2s linear` continuous, `.18s` delay |
| Progress bar | [Video progress bar](#video-progress) | width `.08s linear` · `type=video` only |
| Meta float scrim | `.media-meta-scrim` desktop `clamp(132px,28%,176px)` soft gradient | mobile `48–52%` |

```css
/* Open + dormant stay on inset+round so wake/tuck can interpolate without a square wipe */
.feed-item.active.media-ready .buy-cta:not(.is-dormant){
  clip-path: inset(0 0 0 0 round 999px);
  transform: translateY(-50%) translateX(0) scale(1);
}
.feed-item.active.media-ready .buy-cta.is-dormant{
  clip-path: inset(0 0 0 100% round 999px);
  transform: translateY(-50%) translateX(36px) scale(.42);
}
```

<a id="video-progress"></a>

#### Video progress bar — handoff for implementers

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#video-progress](https://github.com/frilo-eth/kby-feed/blob/main/README.md#video-progress)

> **What this is:** a read-only playback indicator pinned to the bottom edge of the media frame.  
> **What it is *not*:** a scrubber — no hit target, no seek, no drag, no haptic.

| Piece | Detail |
|-------|--------|
| When | Only posts with `type === 'video'` — **not** `type === 'gif'` (gif-style muted loops omit the bar) |
| Where | Inside `.media-inner` (which has `overflow:hidden` + `border-radius:16px`) so the bar is clipped to the rounded media corners |
| Track | `.video-progress` — full width, `height:3px`, `bottom:0`, `background:rgba(0,0,0,.28)`, `z-index:9` |
| Fill | `.video-progress-fill` — `background:var(--orange)` · light `#FF6622` / dark `#FF7A3D` |
| Motion | `width` driven by JS; CSS `transition: width .08s linear` softens `timeupdate` steps (~4 Hz) |
| Interaction | `pointer-events: none` on the track — gestures pass through to hold-2× / play-pause / swipe |
| Loop | Videos use `loop`; on wrap, `currentTime` jumps → fill snaps toward `0%` (still through the `.08s` transition) |
| Source | CSS ~419–420 · markup ~4357 · bind `timeupdate` ~4599–4602 |

**Markup (copy as-is — only for video posts)**

```html
<!-- Rendered only when p.type === 'video' -->
<div class="video-progress">
  <div class="video-progress-fill"></div>
</div>
```

```js
// feed item template (excerpt)
${p.type === 'video'
  ? '<div class="video-progress"><div class="video-progress-fill"></div></div>'
  : ''}
```

**CSS (minimum to port)**

```css
.video-progress{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 3px;
  background: rgba(0,0,0,.28);
  z-index: 9;
  pointer-events: none; /* never steal hold / swipe / tap */
}
.video-progress-fill{
  height: 100%;
  width: 0%;
  background: var(--orange); /* #FF6622 light · #FF7A3D dark */
  transition: width .08s linear;
}
```

**JS (bind once per feed item)**

```js
const progressFill = item.querySelector('.video-progress-fill');
const media = item.querySelector('video');
if (media && progressFill) {
  media.addEventListener('timeupdate', () => {
    if (!media.duration) return; // NaN until metadata
    progressFill.style.width =
      (media.currentTime / media.duration * 100) + '%';
  });
}
```

**Why `.08s linear` (not spring / rAF)**

| Choice | Reason |
|--------|--------|
| Drive from `timeupdate` | Cheap; browser already fires it while playing — no extra rAF loop |
| Short linear width tween | Bridges the gap between sparse `timeupdate` ticks so the bar doesn’t stair-step |
| Not `transform: scaleX` here | Width % is fine at 3px height; keep it trivial for ports |
| No scrub UI | Doomscroll feed — scrub fights vertical swipe / hold-to-2×; indicator only |

**Port checklist**

1. Mount the bar **inside** the clipped media frame (same parent as `<video>`), not on the outer card.
2. Gate on real videos only — omit for gif-tagged loops if those stay chrome-free.
3. Guard `media.duration` before dividing (metadata race).
4. Keep `pointer-events: none` so hold→lock and swipe stay on the media surface.
5. Expect a wrap flash on `loop` (100% → 0%); don’t add a special case unless product wants a hard cut (`transition: none` on seek/loop).
6. Color from the brand orange token — not a hardcoded hex in the component if the app already themes light/dark.

---

<a id="hold-lock-2x"></a>

#### Hold → lock gesture (2×) — states, animations, SVG, haptics

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#hold-lock-2x](https://github.com/frilo-eth/kby-feed/blob/main/README.md#hold-lock-2x) · **Padlock morph only:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#padlock-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#padlock-morph)

Press-and-hold on video media (not chrome / rail). Constants: `SPEED_HOLD_MS=240` · `SPEED_LOCK_MS=3000` · `GESTURE_MOVE_PX=8` · unlock clear `420ms`. Implementation in `feed.html` (CSS ~472–586 · JS ~2983–3105, ~6110–6204 · markup ~4364–4386).

##### State machine

| State | Trigger | Classes / attrs | `playbackRate` | Survives release? |
|-------|---------|-----------------|----------------|-------------------|
| Idle | Default / cleared | none (opacity 0) | 1 | — |
| Armed | `pointerdown` on video | timer only — no badge yet | 1 | No — up clears timer |
| Charging 2× | hold ≥240ms | `.show.is-charging` · `--lock-p` 0→1 | 2 | No — `endSpeedHold` → 1× + clear |
| Locked | charge `p≥1` (3s) | `.show.is-locked` · `data-lock=1` · `role=button` | 2 | **Yes** — finger-up keeps lock |
| Unlocking | tap `.speed-badge.is-locked` | `.is-unlocking` · `data-lock=0` | 1 (immediate) | Transient — `clearSpeedBadge` @ 420ms |

| Phase | UI | API / haptic |
|-------|----|--------------|
| Armed | — | `SPEED_HOLD_MS` timer |
| Charging 2× | glass badge + **ring** + `2x` + **“Hold 3s to lock”** (no chevron pulse) | `playbackRate=2` · haptic `nudge` · `startSpeedLockCharge` |
| Locked | padlock pathLength draw; hint hidden; badge clickable | haptic `lock` · rate stays 2 after finger-up |
| Early release | badge clears; rate → 1 | `endSpeedHold` |
| Unlock | open shackle swing + fade | haptic `unlock` · ~420ms then clear |

**Cancel / interrupt**

| Event | If charging (unlocked) | If locked |
|-------|------------------------|-----------|
| Move > 8px | Cancel hold · rate→1 · clear badge | Ignored — lock never cancelled by drag |
| `pointerup` / cancel | `endSpeedHold` → clear | `gHoldActive=false`; rate stays 2 |
| Tap locked badge | — | `unlockSpeed()` — haptic + morph |
| Post change / `resetAllSpeedLocks` | Clear all | Clear all · rate→1 |
| Already locked on same clip | No new hold timer | `pointerdown` on badge unlocks only |

**No chevron flash:** hold used to add `.show` one frame before `.is-charging`, which briefly ran `@keyframes speedChevron`. Charge now starts in one step (`startSpeedLockCharge` adds both `.show` and `.is-charging`). Chevrons stay in the DOM but only animate under `.show:not(.is-locked):not(.is-charging)` — unused on the lock path.

##### DOM (per-item glass pill)

```
.speed-badge
  ├─ .speed-lock-ring          (charging only)
  │    ├─ .speed-ring-track
  │    └─ .speed-ring-prog     ← --lock-p drives dashoffset
  ├─ .speed-chevs → 3× .speed-chev   (hidden while charging/locked)
  ├─ .speed-lock-ico           (locked / unlocking)
  │    ├─ .lock-body + .lock-dot
  │    ├─ .lock-closed .lock-draw    data-lock="1"
  │    └─ .lock-open .lock-draw      data-lock="0"
  ├─ .speed-label              "2x"
  └─ .speed-lock-hint          "Hold 3s to lock"
```

`pointer-events: none` until locked · height 46px · `--glass-dark` blur · locked `aria-label="Unlock 2x speed"`.

##### Animations by phase

| Phase | Motion | Timing / easing |
|-------|--------|-----------------|
| Badge appear | opacity 0→1 · `translateY(-10px) scale(.86) → 0/1` | opacity `.2s ease` · transform `.4s` `cubic-bezier(.22,1.45,.36,1)` |
| Locked press | `:active scale(.88)` | — |
| Annotation | hint opacity 0→1 (charging only) | `.25s ease` |
| Charge ring | `--lock-p` 0→1 via rAF | linear over `SPEED_LOCK_MS` |
| Lock draw-in | `lockDraw` stroke-dashoffset 1→0 | `.22s ease-in-out`; `.is-settled` after 280ms freezes at 0 |
| Unlock draw | open shackle pathLength (+ `.08s` delay on delayed path) | `.22s ease-in-out` |
| Unlock swing | `lockShackleSwing` rotate 0→−36° origin `(7.5px, 11px)` | `.32s` `cubic-bezier(.22,1.25,.36,1)` |
| Unlock exit | badge fade/rise then clear | opacity `.28s` @ `.18s` · transform `.34s` @ `.12s` · clear @ `420ms` |

`prefers-reduced-motion: reduce` — skip `lockDraw` / `lockShackleSwing`; snap `stroke-dashoffset` to 0.

##### Gesture annotation

| Piece | Detail |
|-------|--------|
| Copy | `Hold 3s to lock` |
| Node | `.speed-lock-hint` inside `.speed-badge` |
| Type | `13px` / weight `700` / `letter-spacing:.01em` / `rgba(255,255,255,.88)` + text-shadow |
| Position | `top: calc(100% + 14px)` centered under badge |
| Show | opacity `0→1` `.25s ease` when `.speed-badge.is-charging` |
| Hide | `display:none` on `.is-locked` / `.is-unlocking` |

```css
.speed-lock-hint{
  position: absolute; left: 50%; top: calc(100% + 14px);
  transform: translateX(-50%);
  font-size: 13px; font-weight: 700; letter-spacing: .01em;
  color: rgba(255,255,255,.88);
  opacity: 0; transition: opacity .25s ease;
}
.speed-badge.is-charging .speed-lock-hint{ opacity: 1; }
.speed-badge.is-locked .speed-lock-hint,
.speed-badge.is-unlocking .speed-lock-hint{ display: none; }
```

##### SVG morphing

**1. Charge ring** (progress, not path morph)

| Piece | Technique | Detail |
|-------|-----------|--------|
| `.speed-ring-prog` | `stroke-dashoffset` from CSS var | `dasharray: 69.1` · `offset: calc(69.1 - 69.1 * var(--lock-p, 0))` |
| Orientation | `rotate(-90deg)` origin `18px 18px` | Progress starts at 12 o’clock |
| Driver | rAF in `startSpeedLockCharge` | `p = (now − gLockStart) / SPEED_LOCK_MS` · clamp 0–1 |
| Commit | `p ≥ 1` → `lockSpeed()` | Sets `--lock-p:1` then swaps ring → padlock |

<a id="padlock-morph"></a>

**2. Padlock pathLength morph — handoff for implementers**

**Share this morph only:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#padlock-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#padlock-morph)

> **What this is *not*:** a continuous path interpolator (no SMIL, no flubber, no MorphSVG).  
> **What it is:** one SVG, shared body + keyhole; two shackle groups toggled by `data-lock`. Each shackle “draws on” via `pathLength` + `stroke-dashoffset` (same recipe as [mute / unmute](#mute--unmute-svg-morph)). Unlock also rotates the open shackle −36°.

| Piece | Detail |
|-------|--------|
| SVG | `.speed-lock-ico` · viewBox `0 0 24 24` · stroke `2.2` · size ~15×15 in badge |
| Body (static) | `.lock-body` rounded rect + `.lock-dot` keyhole — always present when icon shown |
| Lock | `.lock-closed` shown · `data-lock="1"` · closed shackle draws via `@keyframes lockDraw` |
| Unlock | `.lock-open` shown · `data-lock="0"` · open shackle draws + `lockShackleSwing` |
| Draw | `pathLength="1"` + `stroke-dasharray:1` / `stroke-dashoffset:1→0` · `.22s ease-in-out forwards` |
| Unlock stagger | `.lock-draw-delay` on open path · `animation-delay: .08s` |
| Settled | `.is-settled` after **280ms** skips animation (`stroke-dashoffset:0`) |
| Restart | JS: `p.style.animation='none'; void p.getBoundingClientRect(); p.style.animation=''` |
| API | `lockSpeed(item, video)` · `unlockSpeed({hapticFeedback, animate})` |
| Feedback | haptic `lock` / `unlock` · fire on the same frame as class swap |
| A11y | `@media (prefers-reduced-motion:reduce)` → no draw/swing; snap dashoffset to 0 |

**Markup (copy as-is)**

```html
<svg class="speed-lock-ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <!-- static body + keyhole -->
  <rect class="lock-body" x="5" y="11" width="14" height="10" rx="2.5"/>
  <circle class="lock-dot" cx="12" cy="16" r="1.35"/>
  <!-- LOCK: closed shackle (draw on) -->
  <g class="lock-closed">
    <path class="lock-draw" pathLength="1" d="M8 11V8.15A4 4 0 0 1 16 8.15V11"/>
  </g>
  <!-- UNLOCK: open shackle (draw on + swing) -->
  <g class="lock-open">
    <path class="lock-draw lock-draw-delay" pathLength="1" d="M8 11V8.15A4 4 0 0 1 14.85 5.05"/>
  </g>
</svg>
```

**CSS (minimum to port)**

```css
.speed-lock-ico .lock-body{
  fill:none; stroke:currentColor; stroke-width:2.2;
  stroke-linecap:round; stroke-linejoin:round;
}
.speed-lock-ico .lock-dot{ fill:currentColor; }
.speed-lock-ico .lock-draw{
  fill:none; stroke:currentColor; stroke-width:2.2;
  stroke-linecap:round; stroke-linejoin:round;
  stroke-dasharray:1; stroke-dashoffset:1; /* pathLength=1 units */
}
/* Visibility by state */
.speed-badge.is-locked[data-lock="1"] .lock-open{ display:none; }
.speed-badge.is-locked[data-lock="0"] .lock-closed,
.speed-badge.is-unlocking[data-lock="0"] .lock-closed{ display:none; }
/* Draw-on */
.speed-badge.is-locked[data-lock="1"] .lock-closed .lock-draw,
.speed-badge.is-unlocking[data-lock="0"] .lock-open .lock-draw{
  animation: lockDraw .22s ease-in-out forwards;
}
.speed-badge.is-unlocking[data-lock="0"] .lock-open .lock-draw-delay{
  animation-delay: .08s;
}
.speed-badge.is-locked.is-settled[data-lock="1"] .lock-closed .lock-draw{
  animation:none; stroke-dashoffset:0;
}
@keyframes lockDraw{ to{ stroke-dashoffset:0; } }
/* Unlock swing — pivot near left shackle foot */
.speed-badge.is-unlocking .lock-open{
  transform-origin: 7.5px 11px;
  animation: lockShackleSwing .32s cubic-bezier(.22,1.25,.36,1) both;
}
@keyframes lockShackleSwing{
  0%{ transform: rotate(0deg); }
  100%{ transform: rotate(-36deg); }
}
@media (prefers-reduced-motion: reduce){
  .speed-lock-ico .lock-draw{ animation:none!important; stroke-dashoffset:0; }
  .speed-badge.is-unlocking .lock-open{ animation:none!important; }
}
```

**JS recipe (must restart CSS animation after class swap)**

```js
// LOCK — after adding .is-locked + data-lock="1"
badge.querySelectorAll('.lock-closed .lock-draw').forEach((p) => {
  p.style.animation = 'none';
  void p.getBoundingClientRect(); // force reflow
  p.style.animation = '';
});
setTimeout(() => badge.classList.add('is-settled'), 280);

// UNLOCK — after adding .is-unlocking + data-lock="0"
badge.querySelectorAll('.lock-open .lock-draw').forEach((p) => {
  p.style.animation = 'none';
  void p.getBoundingClientRect();
  p.style.animation = '';
});
// then clear badge DOM/classes after ~420ms (exit tween finishes)
```

**Port checklist for the receiving engineer**

1. Ship **one** SVG with both shackles — do not swap `src` / replace innerHTML per state.
2. Normalize stroke length with `pathLength="1"` so dash math is identical across closed/open paths.
3. Toggle with `data-lock` + group `display` (or equivalent), then **reflow-restart** the draw animation.
4. Unlock = draw open path **and** rotate the open `<g>` −36°; then dismiss the badge (~420ms).
5. Mirror mute’s `.is-settled` so a locked badge that stays on screen does not re-draw on every style recalc.
6. Honor `prefers-reduced-motion`; fire haptics (`lock` / `unlock`) on the same frame as the class change.

##### Haptics

web-haptics primary · `navigator.vibrate` fallback · `haptic(preset)`. Visual commit and haptic fire on the same call path.

| Moment | Preset | web-haptics map | vibrate fallback |
|--------|--------|-----------------|------------------|
| Enter 2× (hold ≥240ms) | `nudge` | `nudge` | `[11, 32, 9]` · 2 taps / 48ms gap |
| Charge completes → lock | `lock` | `rigid` | `[12, 22, 16]` · 1 tap |
| Tap badge unlock | `unlock` | `nudge` | `[8, 20, 10, 28, 8]` · 2 taps / 36ms gap |

##### Class / CSS quick ref

| Selector | Role |
|----------|------|
| `.speed-badge.show` | Visible glass pill |
| `.speed-badge.is-charging` | Ring + hint; hide chevrons |
| `.speed-badge.is-locked` | Padlock; `pointer-events:auto`; clickable |
| `.speed-badge.is-unlocking` | Open shackle + exit tween |
| `.speed-badge.is-settled` | Freeze `lockDraw` after settle |
| `[data-lock="1"\|"0"]` | Closed vs open shackle group |
| `--lock-p` | 0–1 charge progress for ring dash |

---

### 4. First-visit swipe hint

| Motion | Code | Timing |
|--------|------|--------|
| Overlay in | `.feed-hint.show` | opacity/bg/blur `.45s ease` |
| Idle | **`display:none`** when not showing — never leave an `opacity:0` + `backdrop-filter` layer over `#actBubbles` | — |
| Hand Lottie | local `lottie.min.js` + `/public/hand-helper/hand.json` | 1080×1080, 30fps, 110f (~3.7s), loop · size `min(168px,44vw)` |
| Lottie enter | `.hint-lottie` | `.55s` `(.22,1.4,.36,1)` scale `.94→1` |
| Auto-dismiss | `kb_feed_hint_v9` | show after ready; ~10s or navigate (900ms grace) |

```css
.feed-hint{ display:none; /* … */ opacity:0; }
.feed-hint.show{
  display:flex; opacity:1;
  background:rgba(10,8,6,.52);
  backdrop-filter:blur(3px);
}
```

---

### 5. Feed doomscroll (JS spring) — `swipe-silk`

Core engine in `springTo()` — **wall-clock dt** (same feel on 60/120Hz), Apple-style damping ratio + response:

```js
// Critically damped by default; hard flicks get ζ≈0.90 + slightly shorter response
response = flick ? 0.40 : 0.50   // seconds
zeta     = flick ? 0.90 : 1.0
omega    = 2π / response
stiffness = omega² · mass
damping   = 2 · zeta · omega · mass

// real frame dt (capped), 1–2 substeps
force = -stiffness * (pos - target)
damp  = -damping * v
v    += (force + damp) / mass * h
pos  += v * h

// settle when |pos-target| < 0.0016 && |v| < 0.01
```

| Piece | Behavior |
|-------|----------|
| Step size | `pageStep = scroller.clientHeight − --feed-peek` |
| Drag | 1:1 with finger; mid-spring grab inherits `springVel` (no brick wall) |
| Release velocity | Sample window **~90ms** (`sampleReleaseVelocity`) — not last-frame noise |
| Snap | Momentum projection `pos + v·0.26`, then `silkSnapTarget` (hard / soft flick thresholds) |
| Parallax | active/next `scale(1)`; prev `scale(.97) opacity .55`; else fade `1 − ad*0.5`, scale `≥.92` |
| Wheel | accumulate delta (≥28); page step; lock **360ms** (was 520) for chained trackpad flicks |
| Settle haptic | `haptic('settle')` when index changes — **haptic only** (no swipe audio) |
| Drag tick | `haptic('dragtick')` each crossed index — **haptic only** |

---

### 6. Chrome / layout motion

| Motion | Curve / code | Duration |
|--------|--------------|----------|
| Sidebar width | `(.65,0,.35,1)` | `.32s` |
| Drawer open (desktop) | width `0→360`, `(.22,1,.36,1)` | `.38s` |
| Mobile sheet open | `translateY(100%→0)`, `(.32,.72,0,1)` | `.44s` |
| Sheet scrim | opacity | `.35s ease` |
| **More sheet** | same vaul curve; **auto-closes after every action including Toggle theme** | `.44s` |
| **Share** | modal (desktop) / sheet (mobile); **auto-closes after Share on X or Copy url** | — |
| Topbar auto-hide (mobile) | overlays feed (never resizes scroller); after settle; `(.32,.72,0,1)` | `.38s` (page-step locked during swipe) |
| Parallax | desktop settled peek only — **no mid-swipe / mobile scale** (keeps full-bleed 1:1) | — |
| Chrome reflow | `reflowDuringChrome()` rAF loop | **440ms** |
| Search marquee | `@keyframes searchMarquee` | `--mq-dur` (~overflow/45), ease-in-out alternate |
| Meta bottom | `layoutMeta` — pinned: flush with media bottom; float (`.meta-float`): inset by `PAD` (18px) | — |
| Chevron gutter | `--feed-chevron-gutter: 88px` on `.feed-item` (incl. `meta-overlay-mode` ≥861px) | keeps rail clear of `.chevron-nav` |
| Media chrome | `mediaChromePx()` reserves pad + rail + chevron column | tablet / expanded sidebar |
| Reaction glass | glass rail styles **only ≤860** (on-media); tablet keeps light `#FAFAFA` rail beside card | — |

---

### 7. Comments, attach & media focus (CFX)

| Motion | Curve | Duration |
|--------|-------|----------|
| List swap out | ease | `.22s` |
| List ready in | `(.22,1,.36,1)` / `(.22,1.2,.36,1)` | `.34–.42s` |
| Root row enter (stagger) | `.comment-enter` → `.is-in`; `--enter-d` = `min(i,8)×42ms` | opacity `.4s` `(.22,1,.36,1)`, transform `.48s` `(.18,1.15,.32,1)` |
| Reply page-in | same `.comment-enter`; `--enter-d` = `min(i,4)×36ms` (or page delta ×36ms) | same |
| Fresh send enter | `.comment-enter-fresh` (springier than list) | opacity `.42s`, transform `.52s` `(.18,1.25,.32,1)` |
| Thumb lag | `.comment-thumb-wrap` after row | +`.072–.088s` delay |
| Thread bar hover | `.comment-thread-more` / `.hide` → `var(--line)` pill | bg/color `.15s`; press `scale(.98)` |
| Drop stage in | `(.22,1.4,.36,1)` | `.42s` |
| Attach expand | `(.22,1,.36,1)` + pop | `.42s` |
| Attach thumb pop | `@keyframes attachPopIn` `(.22,1.45,.36,1)` | `.58s` |
| Fly-in from feed | JS transform + settle pop | GPU fly → pop |
| Anon exit | `anonExit*` keyframes `(.22,1.4–1.5,.36,1)` | `.42–.45s` |
| Send btn show | `(.22,1.5,.36,1)` | `.18s` |
| Compose lift on drop | `(.22,1.3,.36,1)` | `.36s` |
| Compose dock | `.comments-body` scrolls; `#commentCompose` relative on drawer floor | gutters from `.token-drawer-scroll` padding |
| Input shape | `.comment-input-row` `border-radius:14px` (squircle, matches send) | — |
| Send feedback | `haptic('sent')` on Enter / send | vibration + ascending cue |

#### Threaded replies + `>>id` quotes

One indent level only (not infinite nesting). Roots stay flush; replies live in `.comment-replies`.

| Piece | Detail |
|-------|--------|
| Indent | `.comment-replies` `padding-left:46px` (40px ≤860); `.is-reply` avatars 28px |
| Collapse | `thread._shown = 0` by default — bar shows `View N replies` |
| Page size | `REPLY_PAGE = 5` via `revealMoreReplies` → `View N more` until exhausted |
| Hide | `hideThreadReplies` clears the box; Hide button only while `.has-open`; hover pill flush to the right (no `-10px` clip) |
| Bar API | `syncThreadBar` · `renderCommentThread` · `renderThreadReplies({animate})` |
| `>>` render | `renderCommentText` → `<span class="comment-quote" data-qid>` (escaped HTML) |
| Reply action | `startReplyTo(c)` prefixes compose `>>{id} ` (replaces any existing leading tag) |
| Send nest | `sendComment` — leading `>>id` → push onto `hit.root.replies` (never deeper than 1) |
| Compose mirror | `#commentInputMirror` paints quotes; pointer-events on `.comment-quote` for hover |
| Quote card | `#quoteHoverCard` via `scheduleShowHover('quote', …)` · `renderQuoteHoverCard` |

```css
.comment-replies{ padding: 12px 0 0 46px; }
.comment-item.comment-enter{ opacity:0; transform:translateY(10px); }
.comment-item.comment-enter.is-in{
  opacity:1; transform:translateY(0);
  transition:
    opacity .4s cubic-bezier(.22,1,.36,1),
    transform .48s cubic-bezier(.18,1.15,.32,1);
  transition-delay: var(--enter-d, 0ms);
}
.comment-item.comment-enter-fresh.is-in{
  transition:
    opacity .42s cubic-bezier(.22,1,.36,1),
    transform .52s cubic-bezier(.18,1.25,.32,1);
}
```

#### Comment media gallery focus (`#cfx`)

Selecting a comment’s media thumb opens a focused gallery — not a plain `<img>` enlarge.

| Viewport | Behavior |
|----------|----------|
| **Desktop** | `#cfx` stage sits beside the open comments drawer; caption + tip/like/dislike under media |
| **Mobile** | Full-screen lightbox **above** comments sheet + scrim (`z-index` bump); comments stay parked underneath |
| **Gestures (mobile)** | Two-finger **pinch** (scale), **rotate**, and **pan** when zoomed; `touch-action: none` on `#cfx` |
| **Idle spring** | After gesture ends, soft spring-back toward fit (`is-settling`, ~`.55s` `(.22,1.25,.36,1)`) — Photos-like |
| **Sync** | Caption reacts mirror the focused comment row; closing returns to the list |

API surface: open via `.comment-thumb`; close `#cfxClose` / backdrop / Escape. Keep feed video paused while focused.

---

<a id="pull-refresh"></a>

### 8. Pull-to-refresh — handoff

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#pull-refresh](https://github.com/frilo-eth/kby-feed/blob/main/README.md#pull-refresh)

At the **settled first post**, drag down → rubber-band + `#pullSpin` dial. Cross threshold → arm → release fires refresh. Desktop **and** mobile (`pullEligible = atTop`). While pulling from home, `homeDragClamp` blocks wrap-to-previous so refresh owns the gesture. Demo: `?refresh` / `#refresh`.

| Constant | Value | Role |
|----------|-------|------|
| `PULL_THRESHOLD` | **84** | Arm / fire distance (damped px) |
| `PULL_HOLD` | 64 | Gap held while loading |
| `PULL_DAMP_MAX` / `K` | 160 / 0.42 | Asymptotic rubber-band (`dampPull`) |
| `PULL_LOAD_MS` | 520 | Fake load before settle home |
| `PULL_DIAL_TURNS` | 1.15 | Arrow winds with finger distance |
| `PULL_TICK_PX` | 11 | Stretch haptic notches |
| `PULL_REVEAL_PX` | 36 | Chip scales in once gap can hold it |

##### Phases

| Phase | When | UI | Haptic |
|-------|------|----|--------|
| Begin | down-drag on home (`dy>2`) | `.is-pulling` · chip `.is-live` | `pulltick` |
| Stretch | finger moves | dial `--rot` from distance · morph → “Refreshing” | `pulltick` notches · `pullmorph` mid-morph |
| Armed | `pullDist ≥ 84` | `.is-armed` | `pullarm` |
| Disarm | back below ~82% threshold | lose armed | `pulldisarm` |
| Cancel | release early | spring to 0 · dismiss chip | `pullcancel` |
| Fire | release while armed | `.is-refreshing` · hold at `PULL_HOLD` · `.is-spinning` | `pullfire` |
| Done | after `PULL_LOAD_MS` + spring home | shuffle posts · chip clear | `pullsettle` → sound **`refresh`** (A5→E6 ping) |

Desktop alternate when not pulling: `#newPill` (“New posts”) — soft-dismiss after **2** settled swipes, re-arm ~3 min. Same theme tokens as the spin chip.

##### Chip (minimum)

```html
<button type="button" class="pull-spin" id="pullSpin" aria-hidden="true" aria-label="Refreshing" tabindex="-1">
  <svg class="pull-reload-svg" viewBox="-2 -2 28 28" aria-hidden="true">
    <path class="pull-reload" d="M20 12a8 8 0 1 1-2.34-5.66"/>
    <path class="pull-reload" d="M20 4v5h-5"/>
  </svg>
  <span class="pull-label">Refreshing</span>
</button>
```

Grounded on the media lip (`layoutPullSpin`, `PULL_GROUND=22`, `TOP_PAD=20`). Vars: `--pull-morph`, `--pull-scale`, `--pull-lift`, `--rot`. Theme: `background:var(--card)` · `color:var(--ink)` · `border:var(--line)`.

##### Port checklist

1. Only arm pull when **settled on index 0** — don’t fight mid-swipe.
2. Clamp home so wrap-to-previous can’t steal the down-drag (`homeDragClamp`).
3. One rotation owner (`pullSpinAngle`) — finger dial **or** load spin, never both fighting `--rot`.
4. Hold the band at `PULL_HOLD` while loading; settle haptic/sound only when the band returns home.
5. Done sound is **`refresh`**, not swipe `settle` — different cue family.

##### Q&A

**Q: Mobile-only?**  
A: No — `pullEligible = atTop` on desktop and mobile. Desktop also gets `#newPill` as a non-gesture alternate.

**Q: Why doesn’t a long pull wrap to the previous post?**  
A: On home, `homeDragClamp` keeps `pos ≥ 0` so refresh owns down-drag. Infinite wrap still works when navigating the feed normally.

**Q: What does “arm” mean?**  
A: Past `PULL_THRESHOLD` (84px damped). Release while armed → refresh; release early → cancel spring.

**Q: Why dial the arrow with distance?**  
A: Continuity — the same glyph that winds under the finger becomes the load spinner (Family Values: float, don’t teleport).

Source: CSS ~2228–2363 · JS ~5492–6080 · markup `#pullSpin` ~2541 · pointer home path ~6148–6195.

---

### 9. Haptics (paired with motion)

Presets via [web-haptics](https://haptics.lochie.me/) + `navigator.vibrate` fallback:

`light` · `selection` · `nudge` · `settle` · `dragtick` · `toggle` · `unmute` · `mute` · `open` · `comment` · `sent` · `share` · `tip` · `like` · `dislike` · `attach` · `lock` · `unlock` · `pullsettle`→`refresh`

Swipe settle/dragtick = haptic only. Pull-refresh done plays a dedicated `refresh` notification ping.

---

<a id="meta-affordances"></a>

### Meta affordances — username, token mini, ticker

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#meta-affordances](https://github.com/frilo-eth/kby-feed/blob/main/README.md#meta-affordances)

Bottom-left post chrome (`.col-info` → `.meta-block`). **Rule:** hover is mostly color-graded; the **token mini is the exception** that may scale. Click opens trade for token surfaces; user surfaces are preview-only in this prototype (hover card, no profile route).

| Target | Hover affordance | Press | Click | Desktop hover card | Haptic |
|--------|------------------|-------|-------|--------------------|--------|
| `.avatar-sm.blockie` | opacity `.88` + brightness `1.06` · `.15s` | — | — | **user** · 280ms | — |
| `.uname` (`@user`) | `opacity:.8` · `.15s` (no underline) | — | — *(no profile route yet)* | **user** · 280ms | — |
| `.role-badge.role-op` | Launch icon + sheen; expands to “Original Post” (smooth width + crossfade). Entry: **no badge** | — | — | — | — |
| **`img.blockie`** (all instances) | same lighten — meta, comments, CFX, act-bubbles, hover cards, buyers, wallet | — | — | user card where bound | — |
| `.token-tag` (wraps mini + ticker) | mini scale + ring; ticker color | mini `scale(.96)` | **trade drawer** | **token** · 280ms | `open` |
| `.token-mini` | `scale(1.14)` + orange ring `0 0 0 2px rgba(255,102,34,.35)` + brightness | `scale(.96)` · `.1s` | *(via `.token-tag`)* | *(via `.token-tag`)* | — |
| `.tag-ticker` | `color: var(--coffee) → var(--coffee-hover)` · `.15s` | — | *(via `.token-tag`)* | *(via `.token-tag`)* | — |
| `.pill` (Dare / Meme) | — (category chip) | — | **trade drawer** | **token** · 280ms | `open` |

**Not on the card:** Buy CTA — hover cards are preview-only; the underlying click still opens the drawer.

##### Markup

```html
<div class="col-info">
  <div class="meta-block">
    <div class="row1">
      <img class="avatar-sm circle blockie" src="…">
      <div class="uname">@${user}</div>
      <!-- role==="op" only — see #dare-role-badge -->
      <span class="role-badge role-op">…</span>
    </div>
    <div class="desc">…</div>
    <div class="meta-tags">
      <span class="token-tag">
        <img class="token-mini squircle" src="…" alt="">
        <span class="tag-ticker">${ticker}</span>  <!-- already includes $ -->
      </span>
      <div class="pill ${cat.toLowerCase()}">${cat}</div>
    </div>
  </div>
</div>
```

##### CSS (affordance minimum)

```css
/* Shared user-blockie hover — tag every userAvatar() <img> with .blockie */
img.blockie{
  cursor: pointer;
  transition: opacity .15s ease, filter .15s ease;
}
@media (hover:hover) and (pointer:fine){
  img.blockie:hover,
  .act-hit-av:hover img.blockie,
  .uhc-avatar:hover img.blockie,
  .thc-marker-av:hover img.blockie,
  .thc-buyer-stack:hover img.blockie,
  .btn-wallet:hover img.blockie{
    opacity: .88;
    filter: brightness(1.06);
  }
}

.uname{
  font-weight:700; font-size:14px; cursor:pointer;
  transition: opacity .15s; color: var(--ink);
}
.uname:hover{ opacity:.8; }

.token-tag{
  display:inline-flex; align-items:center; gap:8px; cursor:pointer;
  border-radius:999px; padding:2px 4px 2px 2px;
  margin:-2px -4px -2px -2px; /* expand hit area without shifting layout */
  transition: background .18s ease;
}
.token-tag .token-mini{
  width:22px; height:22px; object-fit:cover; flex-shrink:0;
  transition: transform .28s cubic-bezier(.22,1.4,.36,1),
              box-shadow .22s ease, filter .2s ease;
}
.token-tag:hover .token-mini{
  transform: scale(1.14);
  box-shadow: 0 0 0 2px rgba(255,102,34,.35), 0 4px 12px rgba(0,0,0,.2);
  filter: brightness(1.05);
}
.token-tag:active .token-mini{
  transform: scale(.96); transition-duration: .1s;
}
.token-tag .tag-ticker{
  font-weight:700; font-size:13px;
  color: var(--coffee);           /* #A9906F light · themed dark */
  transition: color .15s;
}
.token-tag:hover .tag-ticker{ color: var(--coffee-hover); } /* #8A7452 */

.pill{
  font-size:11px; font-weight:700; text-transform:uppercase;
  letter-spacing:.04em; padding:4px 10px; border-radius:20px;
  border:none; cursor:pointer;
}
.pill.dare{ color:var(--dare-fg); background:var(--dare-bg); }
.pill.meme{ color:var(--meme-fg); background:var(--meme-bg); }
```

##### JS binding

```js
// Click → trade drawer (token surfaces only)
item.querySelector('.token-tag')?.addEventListener('click', (e) => {
  e.stopPropagation();
  openDrawer(posts[item.dataset.index]);
  haptic('open');
});
item.querySelector('.pill')?.addEventListener('click', (e) => {
  e.stopPropagation();
  openDrawer(posts[item.dataset.index]);
  haptic('open');
});

// Desktop hover cards — bind the whole .token-tag (not mini/ticker alone)
bindHoverCard(item.querySelector('.uname'), 'user', postRef, 280);
bindHoverCard(item.querySelector('.avatar-sm'), 'user', postRef, 280);
bindHoverCard(item.querySelector('.token-tag'), 'token', postRef, 280);
bindHoverCard(item.querySelector('.pill'), 'token', postRef, 280);
```

Gate: `width > 860` and `(hover:hover) and (pointer:fine)` · mouse `pointerenter` only · see [Hover info cards](#10-hover-info-cards-desktop).

##### Layout modes (where the chrome sits)

| Mode | When | Affordance paint |
|------|------|------------------|
| **Pinned** (default desktop) | Left gutter fits meta (`layoutMeta`) | Ink / coffee on `--bg` — no scrim |
| **`.meta-float`** | Gutter too narrow → overlay bottom-left of media | White uname · `#F0DDB8` ticker → `#fff` on hover · text-shadow · `.media-meta-scrim` |
| **Mobile ≤860** | Always on-media bottom-left | Same light-on-scrim treatment; CSS owns placement (`layoutMeta` no-ops) |

```css
/* Float / mobile: keep ticker readable on frames */
.feed-item.meta-float .uname{ color:#fff; }
.feed-item.meta-float .tag-ticker{ color:#F0DDB8; text-shadow:0 1px 2px rgba(0,0,0,.5); }
.feed-item.meta-float .token-tag:hover .tag-ticker{ color:#fff; }
```

<a id="dare-role-badge"></a>

##### OP badge (temporary)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge](https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge)

**Problem:** Viewers can’t tell an **original post (OP)** from a response **entry**. Entries stay unlabeled (a second badge was confusing).

**Temp solution (feed meta only):** squarish chip next to `@uname` when `role === "op"`. **Category-agnostic** — Meme or Dare. **Entry / missing role → no badge.**

| Field | Values | UI |
|-------|--------|-----|
| `post.role` | `"op"` | `.role-badge.role-op` — Launch icon + `OP` → **Original Post** on desktop row hover |
| `post.role` | `"entry"` or omitted | no badge |

**Shape / material**

- Squarish: `border-radius: 7px` (not a round pill — distinct from category `.pill`)
- Icon: shared Launch SVG (`viewBox 0 0 16 16`, `svgIcon('launch')`) — also on `.btn-launch` / `.mnav-launch`
- Specular sheen (`roleBadgeSheen`); `pointer-events: none`
- **Pinned** (meta outside media): inverted Buy CTA — light → dark chip; dark → light chip
- **On-media** (`.meta-float` + mobile ≤860): glass (`--glass-dark`)

**Motion (hover expand / collapse)**

| Piece | Detail |
|-------|--------|
| Width | `max-width` collapsed `3.85em` → open `10.5em` |
| Curve | `.52s` `cubic-bezier(.22,.82,.28,1)` — soft both ways (collapse must not snap) |
| Labels | Stacked in `.role-badge-text` (`display:inline-grid`); **opacity crossfade** — never `display:none` |
| Expand | short → 0 immediately; full → 1 after `.06s` |
| Collapse (exit) | full → 0 first; short → 1 after `.14s` (waits for width) |
| Touch | no expand (`hover:none`) |
| Reduced motion | kill sheen + width/label transitions |

```html
<span class="role-badge role-op" title="Original Post" aria-label="Original Post">
  <!-- svgIcon('launch') -->
  <span class="role-badge-text">
    <span class="role-badge-short">OP</span>
    <span class="role-badge-full">Original Post</span>
  </span>
</span>
```

**Design handoff (@orlando) — formal treatment still needed:**

1. Final OP labels / hover expand; confirm Entry stays badge-less  
2. Pinned inverted-CTA vs on-media glass as the lasting system  
3. Relationship to category `.pill` (Dare / Meme)  
4. Should Entry eventually link/preview the parent OP without a permanent chip?  
5. Propagate later to Dares / Tokens / Hall surfaces outside this prototype  

##### Port checklist

1. Keep **username** and **token** as separate targets — user → profile preview; token → trade.
2. Hit target for ticker+mini is the **`.token-tag` wrapper** (negative margin padding), not two separate buttons.
3. Only the mini may scale on hover — ticker stays type-only (color). Do not scale the whole chip.
4. Tag every `userAvatar()` `<img>` with **`.blockie`** so hover lighten is shared (meta, comments, CFX, bubbles, cards, wallet). Skip anon PNG / token photos.
5. OP posts set `role: "op"` (any `cat`); Entry posts omit the badge (no `role` or ignore `"entry"`).
6. Hover card delay **280ms**; leave trigger has a short bridge onto the card (don’t kill preview on the 1px gap).
7. `stopPropagation` on clicks so the scroller doesn’t treat them as feed gestures.
8. On float/mobile, switch to light-on-scrim tokens — coffee brown disappears on dark frames.
9. Category `.pill` is also a trade entry (same drawer + token hover card).

##### Q&A

**Q: Why doesn’t `@uname` underline anymore?**  
A: Underline competed with ticker/link cues. Hover is opacity-only (`.8`) — lighter, still clickable-looking with `cursor:pointer`.

**Q: Why can the token mini scale but the username avatar doesn’t?**  
A: Mini is a trade affordance (exception to the “no scale on hover” rule). User blockies use a shared **lighten** (opacity + brightness) so they don’t fight layout in dense lists.

**Q: What’s a “blockie” vs the token image?**  
A: Blockies = deterministic `userAvatar(seed)` identicons for **people**. Token art = `post.avatar` / `.token-mini` / rail `.avatar-plus` — those keep orange-ring / Buy behaviors, not `.blockie`.

**Q: Where does `.blockie` hover apply?**  
A: Every tagged instance: meta `.avatar-sm`, comment avatars, CFX caption av, act-bubble discs (data-URL only), user/quote hover cards, chart buyer stack + markers, wallet chip. Compose input drops `.blockie` while anon.

**Q: Click username/avatar — where do I go?**  
A: Prototype has **no profile route**. Desktop opens the user hover card; mobile has no hover card. Token tag + category pill open the **trade drawer** (`haptic('open')`).

**Q: Why bind hover cards on `.token-tag` instead of mini and ticker separately?**  
A: One hit target, one delay timer, no flicker when the pointer crosses from mini → `$TICKER`.

**Q: Pinned vs float — do affordances change?**  
A: Motion/CSS hooks stay the same; **paint** swaps to light-on-scrim when `.meta-float` or mobile so coffee/ink don’t vanish on dark frames.

**Q: What’s the difference between the category pill and the OP badge?**  
A: Bottom `.pill` = category (Dare / Meme). Username `.role-badge` = **OP only** (original post), on any category. Entries have no badge. Temporary — see [#dare-role-badge](#dare-role-badge).

Source: CSS `.role-badge` ~609–710 · markup `render()` row1 · Launch SVG in `svgIcon('launch')` + `.btn-launch` · `layoutMeta` · blockie / token-tag nearby.

---

### 10. Hover info cards (desktop)

Preview-only popovers. **No CTA on the card** — click the underlying zone still opens the trade drawer / existing actions.

| | User (`#userHoverCard`) | Token (`#tokenHoverCard`) | Quote (`#quoteHoverCard`) |
|--|--|--|--|
| **Triggers** | `.uname`, `.avatar-sm`, comment avatar/name | `.avatar-plus`, `.buy-cta`, **`.token-tag`** (mini+ticker), `.pill` (280ms) — [meta affordances](#meta-affordances) | `.comment-quote[data-qid]` in list + compose mirror (180ms) |
| **Content** | blockie, name, Mirror+X, Launches, Global PnL | avatar, ticker+cat, MCAP, seeded chart, buyers / comments / tips / heat | avatar, `>>id`, time, 3-line text clamp, optional thumb |
| **Gate** | `width > 860` and `(hover:hover) and (pointer:fine)` | same | same |
| **API** | `bindHoverCard` · `hideHoverCards` · `mockUserStats` / `mockTokenStats` / `buildTokenChartSvg` · `renderQuoteHoverCard` · `findCommentById` | | |
| **Hide** | leave trigger (160ms bridge onto card), Escape, scroll, resize, open drawer/share | | |

Portal: `#kbHoverPortal`. Stats/chart are deterministic from `hashSeed(user|ticker)` — swap those helpers for live API data later.

---

## Dev tooling

| Tool | Notes |
|------|-------|
| **Agentation** | `devDependency` — localhost-only annotation overlay for agent feedback (CDN mount at end of `feed.html`). Not shipped as a production UX surface. |

---

## Breakpoint

**860px** — mobile full-bleed feed, bottom nav, sheets; desktop sidebar + side drawers + kbd helper + new-pill + hover cards.

---

## Version 0.1.0

First tagged snapshot of the single-file prototype (`feed.html` + `public/`).

| Area | Included |
|------|----------|
| Feed | Spring doomscroll, infinite wrap, pull-to-refresh, mute morph, Buy CTA pill (enter/exit spring, mobile too) + hover Buy-bar marquee on `+`, hover cards, 2× hold→lock + “Hold 3s to lock” annotation, activity bubbles, new-pill soft-dismiss, first-visit hint |
| Meta | Pinned left (flush) or float-on-media (padded inset + short desktop scrim) via `layoutMeta`; [username / token / ticker affordances](#meta-affordances) |
| Comments | Anon/public, **threaded replies** (indent + View 5 / Hide), **`>>id` quotes** + hover card, attach + fly-in, CFX gallery |
| Sheets | Trade, share (auto-close on X/copy), more (auto-close incl. theme), sheet-colored close targets |
| System | Light/dark tokens, web-haptics + WebAudio, session keys for hint / sound / sidebar |

See `COMPONENT_UPDATE.txt` for the compact behaviour checklist and [CHANGELOG.md](CHANGELOG.md) for release notes.
