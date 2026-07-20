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

Swipe / wheel on desktop. Hold video ≥240ms for 2× — badge opens straight into the charge ring + **“Hold 3s to lock”** annotation → locked 2× (tap badge to unlock). Pull down on mobile for refresh (short pull) or wrap to previous (longer drag — infinite loop).

---

## Feature map (for production ports)

Use this as the checklist when reimplementing — these are the UX details that are easy to drop.

### Feed

| Feature | Behavior |
|---------|----------|
| Infinite wrap | Both directions; first-post down-swipe wraps to previous (TikTok trap) |
| Pull-to-refresh | Mobile only; short deliberate pull at top; longer drag hands off to wrap scroll |
| Mute morph | pathLength SVG draw (waves ↔ slash); session `kb_feed_sound` |
| Buy `$ticker` | Desktop only — show ~4.2s → tuck → reappear after ~6.5s engage (max 3 / post); crystal glass on `.token-anchor`. Enter/exit share the same spring; wipe uses `clip-path: inset(… round 999px)` so the pill never goes square mid-flight. Hidden on mobile |
| Media frame | **Desktop always matches source aspect ratio** (`fitMediaBox` + `--ar`); one binding axis, the other `auto`. Mobile ≤860 stays full-bleed `object-fit:cover` |
| Trade entry points | Avatar+, Buy CTA, ticker, token mini, category pill → trade drawer |
| Hover cards | Desktop only — user / token / **`>>` quote** preview portals (no Buy on the card) |
| 2× hold → lock | ≥240ms → glass `2x` badge with **charge ring** + **“Hold 3s to lock”** (`SPEED_LOCK_MS=3000`); no chevron pulse on this path; release early = back to 1×; lock survives finger-up; tap badge to unlock |
| Activity bubbles | Desktop ambient reactions; progressive disclosure on the reaction chip; discs clamped inside the feed wrap (never under sidebar/drawer) |
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
| **View / hide replies** | Collapsed by default. `View N replies` → reveal **5** at a time (`REPLY_PAGE`); then `View N more`; **Hide** collapses the whole indent |
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
| **Buy $ticker** | desktop only (≥861px); pill on `.token-anchor`; show ~4.2s then tuck; reappear after ~6.5s engage (≤3× / post); shared enter/exit spring; `inset(… round 999px)` wipe | brightness | clip/transform spring |
| **Hover cards** | user + token + **`>>` quote** portals (no Buy CTA); desktop `pointer:fine` only | — | show `.18s`, delay 180–280ms |
| New posts pill | brightness `.98`; soft-dismiss after 2 settled swipes | `scale(.95)` | opacity `.28s`, transform `.34s` pop |
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

### 2b. Activity bubbles (progressive disclosure)

Floating IG-style avatars for ambient / live tip · comment · like · dislike. Host `#actBubbles` (`z-index:18`).

| Piece | Detail |
|-------|--------|
| Enter / exit | `.act-bubble.is-in` / `.is-out` / `.is-fling` — opacity + scale, `.34–.55s` soft overshoot |
| Idle drift | `@keyframes actBubbleDrift` — `5.2s ease-in-out` infinite (staggered delays) |
| Chip closed | `.act-hit-rx` — 16×16 color badge with reaction icon |
| Chip open | `.is-rx-open` — blooms to pill (`max-width:168px`, `.32s` `(.22,1,.36,1)`) |
| Copy | tip `tipped $N` · like `liked it` · dislike `disliked it` · comment short text |
| Marquee | `@keyframes actRxMarquee` — **comments only**, and only when the label overflows (`syncActRxMarquee`) |
| Never marquee | tip (`tipped $N`), like (`liked it`), dislike (`disliked it`), short comment snips (`wow`, `love this`) |
| API | `spawnActivityBubble` · `signalActivity` · `setActDisclosure` · `layoutActivityBubbles` |

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
| 2× hold / lock | see **Hold → lock gesture** below | `SPEED_HOLD_MS=240` · `SPEED_LOCK_MS=3000` |
| Buy CTA cycle | desktop show → dormant → reappear on engage | show 4.2s / engage 6.5s / max 3 |
| Buy CTA enter / exit | shared transition; `clip-path: inset(… round 999px)` + scale/translate (never bare `inset` / `none` mismatch) | `.46s` / `.5s` `(.18,1.12,.32,1)` / `(.16,1.2,.28,1)` |
| Progress bar | `.video-progress-fill` | width `.08s linear` |
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

#### Hold → lock gesture (2× + annotation)

Press-and-hold on video media (not chrome / rail). Move >8px cancels an unlocked hold; a committed lock is never cancelled by drag.

| Phase | When | UI | API / haptic |
|-------|------|----|--------------|
| Armed | pointerdown on video | — | `SPEED_HOLD_MS = 240` timer |
| Charging 2× | hold ≥240ms | `.speed-badge.show.is-charging` — **ring** + `2x` + **“Hold 3s to lock”** (no chevron pulse) | `playbackRate=2` · haptic `nudge` · `startSpeedLockCharge` · `--lock-p` 0→1 over `SPEED_LOCK_MS = 3000` |
| Locked | charge completes | `.is-locked` — padlock pathLength draw (`data-lock="1"`); hint hidden; badge clickable | haptic `lock` · rate stays 2 after finger-up |
| Early release | up before 3s | badge clears; rate → 1 | `endSpeedHold` |
| Unlock | tap locked badge | `.is-unlocking` — open shackle swing + fade | haptic `unlock` · ~420ms then clear |

**No chevron flash:** hold used to add `.show` one frame before `.is-charging`, which briefly ran `@keyframes speedChevron`. Charge now starts in one step (`startSpeedLockCharge` adds both classes). Chevrons stay in the DOM but only animate under `.show:not(.is-locked):not(.is-charging)` — unused on the lock path.

**Gesture annotation** — label under the badge while charging only (not while locked / unlocking):

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

Ring progress: `.speed-lock-ring .speed-ring-prog` uses `stroke-dashoffset` from `--lock-p` (0→1). Padlock morph reuses the mute pathLength draw (`lockDraw` / `lockShackleSwing`).

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
| Hide | `hideThreadReplies` clears the box; Hide button only while `.has-open` |
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

### 8. Pull-to-refresh → spring settle

Infinite wrap both ways (TikTok trap). At the first post, a **short** down-pull still refreshes; drag further and it hands off to previous-post scroll.

| Step | Code | Detail |
|------|------|--------|
| Infinite wrap | `wrappedOffset` / `springTo` | swipe down on first → previous (`N-1`); never hard-stops |
| Pull vs scroll | `PULL_SCROLL_BREAK` + `pullFingerFor(THRESHOLD)` | handoff always past refresh-arm distance so wrap can't steal the gesture |
| Rubber-band | `dampPull(dy)` | `max=112`, `k=0.48`, asymptotic |
| Offset | `pullOffset` via `setPullOffset` → `applyTransform` | active item only |
| Mask | `.is-pulling` / `.is-refreshing` | non-active hidden; peek gradient off |
| Threshold | `PULL_THRESHOLD = 68` | haptic `nudge` on arm |
| Spinner pill | `#pullSpin` — `background:var(--card)`; `color:var(--ink)`; `border:var(--line)` | grounded on media lip; `TOP_PAD = 20` under topbar |
| Spin feel | rAF cruise + wobble + SVG blur while `.is-spinning` | ease-out ramp ~200ms → ~1.7 rps |
| Hold / settle | `PULL_HOLD = 64` | keep gap while loading |
| Desktop alternate | `#newPill` — same theme tokens; `positionNewPill` max(20px, media−pill−14) | opacity `.28s`, transform `.34s` pop |
| Soft dismiss | `noteNewPillSwipe` after settled nav while `.show` | hide after `NEW_PILL_SWIPES = 2`, re-arm `NEW_PILL_DELAY` (~3 min) |

```css
.pull-spin, .new-pill{
  background: var(--card);
  color: var(--ink);
  border: 1px solid var(--line);
}
```

---

### 9. Haptics (paired with motion)

Presets via [web-haptics](https://haptics.lochie.me/) + `navigator.vibrate` fallback:

`light` · `selection` · `nudge` · `settle` · `dragtick` · `toggle` · `unmute` · `mute` · `open` · `comment` · `sent` · `share` · `tip` · `like` · `dislike` · `attach` · `lock` · `unlock`

Each can fire a matching WebAudio one-shot (no ambient loop).

---

### 10. Hover info cards (desktop)

Preview-only popovers. **No CTA on the card** — click the underlying zone still opens the trade drawer / existing actions.

| | User (`#userHoverCard`) | Token (`#tokenHoverCard`) | Quote (`#quoteHoverCard`) |
|--|--|--|--|
| **Triggers** | `.uname`, `.avatar-sm`, comment avatar/name | `.avatar-plus`, `.buy-cta`, `.token-mini`, `.tag-ticker`, `.pill` (280ms) | `.comment-quote[data-qid]` in list + compose mirror (180ms) |
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
| Feed | Spring doomscroll, infinite wrap, pull-to-refresh, mute morph, Buy CTA (enter/exit spring), hover cards, 2× hold→lock + “Hold 3s to lock” annotation, activity bubbles, new-pill soft-dismiss, first-visit hint |
| Meta | Pinned left (flush) or float-on-media (padded inset + short desktop scrim) via `layoutMeta` |
| Comments | Anon/public, **threaded replies** (indent + View 5 / Hide), **`>>id` quotes** + hover card, attach + fly-in, CFX gallery |
| Sheets | Trade, share (auto-close on X/copy), more (auto-close incl. theme), sheet-colored close targets |
| System | Light/dark tokens, web-haptics + WebAudio, session keys for hint / sound / sidebar |

See `COMPONENT_UPDATE.txt` for the compact behaviour checklist and [CHANGELOG.md](CHANGELOG.md) for release notes.
