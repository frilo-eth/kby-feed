# Kumbaya Feed

**Version 0.1.3** — TikTok-style doomscroll feed prototype with spring physics, haptics, comments, trade drawer, and mobile-first overlays.

**Live:** [https://kby-feed.vercel.app](https://kby-feed.vercel.app)  
**Repo:** [frilo-eth/kby-feed](https://github.com/frilo-eth/kby-feed)  
**Tag:** [`v0.1.0`](https://github.com/frilo-eth/kby-feed/releases/tag/v0.1.0)

### This drop — jump links (GitHub `#`)

Porting / review: open the heading, not the whole README. Production: [https://kby-feed.vercel.app](https://kby-feed.vercel.app) · first card is the `$SAUCE` original post.

| Topic | GitHub |
|-------|--------|
| [`$SAUCE` Dare](#sauce-token) — OP first, then entries | [README.md#sauce-token](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sauce-token) |
| [Token vs yap](#token-vs-yap) (tip, menu, token art) | [README.md#token-vs-yap](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-vs-yap) |
| [Yap thread](#yap-thread) (entries wire into OP comments) | [README.md#yap-thread](https://github.com/frilo-eth/kby-feed/blob/main/README.md#yap-thread) |
| [Morphing pill](#dare-role-badge) (Dare/Meme → OP / Entry / Content) | [README.md#dare-role-badge](https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge) · [#morphing-pill](https://github.com/frilo-eth/kby-feed/blob/main/README.md#morphing-pill) |
| [Info tip](#info-hover-tip) (Image vs Video copy) | [README.md#info-hover-tip](https://github.com/frilo-eth/kby-feed/blob/main/README.md#info-hover-tip) |
| [Token page](#token-page) (`/token` — ticker + View token) | [README.md#token-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page) |
| [Profile page](#profile-page) (`/profile` — handle + View my profile) | [README.md#profile-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#profile-page) |
| [Auth (Option 4)](#auth) — social vs EOA · wallet popup / `?autosig` | [README.md#auth](https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth) |
| [Sheet morph](#sheet-morph) (`morphSheet` ~320ms) | [README.md#sheet-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sheet-morph) |
| [Deposit](#deposit) (Cash vs Crypto, unified QR) | [README.md#deposit](https://github.com/frilo-eth/kby-feed/blob/main/README.md#deposit) |
| [Send](#send) | [README.md#send](https://github.com/frilo-eth/kby-feed/blob/main/README.md#send) |
| [Notifications](#notifications) | [README.md#notifications](https://github.com/frilo-eth/kby-feed/blob/main/README.md#notifications) |
| [Signals](#signals) | [README.md#signals](https://github.com/frilo-eth/kby-feed/blob/main/README.md#signals) |
| [Stakeholder flows](#stakeholder-flows) (`/flows`, `?flow=`) | [README.md#stakeholder-flows](https://github.com/frilo-eth/kby-feed/blob/main/README.md#stakeholder-flows) |
| [Icons](#icons) | [README.md#icons](https://github.com/frilo-eth/kby-feed/blob/main/README.md#icons) |
| [Trade drawer](#trade-drawer) (dollarized buy) | [README.md#trade-drawer](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-drawer) |
| [Trade CTA](#trade-cta) (Sign in → Top up → green Buy) | [README.md#trade-cta](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-cta) |
| [Slippage](#slippage) | [README.md#slippage](https://github.com/frilo-eth/kby-feed/blob/main/README.md#slippage) |
| [Pay with](#pay-with) (hidden on launchpad Buy) | [README.md#pay-with](https://github.com/frilo-eth/kby-feed/blob/main/README.md#pay-with) |
| [Meta affordances](#meta-affordances) | [README.md#meta-affordances](https://github.com/frilo-eth/kby-feed/blob/main/README.md#meta-affordances) |
| [Haptic + sound map](#haptic-sound-map) — success / error / clicks · [▶ samples](https://kby-feed.vercel.app/sounds) | [README.md#haptic-sound-map](https://github.com/frilo-eth/kby-feed/blob/main/README.md#haptic-sound-map) |
| [Animation system](#animation-system) | [README.md#animation-system](https://github.com/frilo-eth/kby-feed/blob/main/README.md#animation-system) |

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000/feed](http://localhost:3000/feed). Token stub: [http://localhost:3000/token?t=SAUCE](http://localhost:3000/token?t=SAUCE). Profile stub: [http://localhost:3000/profile](http://localhost:3000/profile). Stakeholder index: [http://localhost:3000/flows](http://localhost:3000/flows). Sound samples: [http://localhost:3000/sounds](http://localhost:3000/sounds). `/` also serves the feed.

## Controls

| Key | Action |
|-----|--------|
| `J` / `↓` | Next post |
| `K` / `↑` | Previous post |
| `L` | Like (no-ops on original posts) |
| `D` | Dislike (no-ops on original posts) |
| `T` | Tip (no-ops on original posts) |
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
| Trade entry points | Avatar+, Buy CTA → trade drawer. **Ticker / `.token-tag` → [`/token`](#token-page)** (same as View token). Morphing [category pill](#dare-role-badge): hover/cycle explains OP vs Entry/Content; desktop click still trades |
| [Token vs yap](#token-vs-yap) | OP = the token (no tip / like / dislike, View token → [`/token`](#token-page)). Entry/Content = yaps (tip + View in thread). Mini/plus/drawer = `tokenArtOf()`, never the yap frame |
| [Yap thread](#yap-thread) | Entries are comments on the OP. `wireYapsIntoOpThreads()` shares each entry’s `commentList` as replies on that yap. OP rail count includes every yap + its comments |
| Hover cards | Desktop only — user / token / **`>>` quote** preview portals (no Buy on the card) — meta triggers in [Meta affordances](#meta-affordances) |
| [Meta affordances](#meta-affordances) | `@uname` opacity hover · **`.blockie`** lighten · morphing [category pill](#dare-role-badge) (Dare/Meme → Original Post / Entry / Content) · token mini · ticker · [Q&A](#meta-affordances) |
| [2× hold → lock](#hold-lock-2x) | ≥240ms → glass `2x` badge with **charge ring** + **“Hold 3s to lock”** (`SPEED_LOCK_MS=3000`); no chevron pulse on this path; release early = back to 1×; lock survives finger-up; tap badge to unlock — [full technical overview](#hold-lock-2x) |
| Activity bubbles | Desktop ambient reactions; progressive disclosure on the reaction chip; discs clamped to a band above the post avatar (never climb the feed); avatar seeded from display name (matches hover card); hairline ring only (no colored/brown halo) |
| New posts / pull pill | Themed `--card` / `--ink` / `--line`; 20px clearance under topbar; soft-dismiss after **2** settled swipes (`NEW_PILL_SWIPES`), then re-arm ~3 min |
| Meta float scrim | Desktop short veil (`clamp(132px, 28%, 176px)`); mobile taller |
| Tablet chrome | Keep chevron gutter (`--feed-chevron-gutter: 88px`); glass rail only when overlaid on media |
| First-visit hint | Hand Lottie + one auto-swipe; `kb_feed_hint_v10`; idle = `display:none` (no backdrop veil) |
| Topbar auto-hide | Mobile; overlays feed (no layout resize); after settle on next; page-step locked mid-swipe |
| [Token page](#token-page) | `.token-tag` and OP `…` → **View token** both go to `/token?t=TICKER` (empty stub). Buy / plus still open the trade drawer. |

### Comments

| Feature | Behavior |
|---------|----------|
| Drawer / sheet | Desktop 360 side panel; mobile 86vh bottom sheet + scrim + drag dismiss |
| Compose dock | Comments tab: list scrolls in `.comments-body`; compose stays on the drawer floor (not sticky-inside-scroll). Keep scroll **16px** gutters — do not negative-margin the whole panel |
| Compose chrome | Squircle input row (`border-radius:14px`) matching `.comment-send`; send haptic `sent`. Viewing the thread is open; posting (compose, reply, attach, send) and like / dislike are `requireAuth`. **Share** is ungated |
| Anon vs public | Anon: no reacts/media; public: X-proof tip + reacts |
| **Threaded replies** | One indent level under a root (`.comment-replies` pad-left 46px / 40px mobile); smaller reply avatars (28px) |
| [Yap thread](#yap-thread) | Same-ticker entries are media comments on the OP (`wireYapsIntoOpThreads`). Shared `commentList` — not a copy |
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
| Auth / wallet / funds | **One tray at a time** (`overlayOpen` closes the other three). In-tray steps use [`morphSheet`](#sheet-morph) — do not remount a new overlay per step |

### Auth, wallet, funds

| Feature | Behavior |
|---------|----------|
| [Option 4](#auth) | Social / email → embedded **Account** wallet, **sponsored** (no signature on tip/buy/sell). Crypto wallet (EOA) → that address is the account; tip/buy/sell/launch **sign** (`needsSig()`) with a fake extension popup (**Connect** / **Confirm**). Skip with `?autosig`. Comment, like, dislike, tip, buy, sell, and launch are `requireAuth`. **Share** is ungated. Header **Sign up / Log in**. Account **USD balance** / **Top up**. Send short → **Top up to send** |
| Sign-in sheet | Email, Google / X / TikTok, Crypto wallet, Passkey, More options (Apple / Discord / GitHub / Telegram). Title **Sign up / Log in**. Alt: [`?minimal`](https://kby-feed.vercel.app/feed?minimal) hides Passkey. Same `.modal` chrome as share (`--card`, Inter, `--bg` `#F2EEEA`) |
| [Deposit](#deposit) | Hub is **Cash** or **Crypto**, with card vs network chips. Cash is a MoonPay stand-in. Transfer crypto is first on the crypto list, then MegaETH. Connect wallet is wallet first, then EVM/Solana. Copy: `Send USDC on Ethereum to this address.` |
| [Send](#send) | From / To / amount on one sheet. Linked wallets as recommended destinations + paste any address. Short From → **Top up to send** |
| [Notifications](#notifications) | Ghost bell left of theme in the topbar (desktop). Mobile: More sheet. Same tray as Account — side drawer / bottom sheet. All / Unread, Mark as read |
| [Signals](#signals) | Sitewide live activity. Same full-height tray as Notifications. Live stack is parked |
| [Icons](#icons) | [Central Icons](https://www.npmjs.com/package/@central-icons-react/all) **sharp** (square join, outlined, radius 0, stroke 1.5, 16×16). Inline SVG + `currentColor`. Custom glyphs when handed (Pools, Tip Jar, Passkey) |

### Trade drawer

| Feature | Behavior |
|---------|----------|
| [Buy field](#trade-drawer) | **Buy $TICKER** + pill helpers `$25 / $100 / $500`. Amount row: `$` + input + token chip (chip aligns with the dollar, not the label). Spend always uses `tradeUsdAmt()` |
| Sell helpers | `25% / 50% / All` of holdings (dollarized spend) |
| Unit swap | `#tradeOut` **⇅** toggles `session.tradeUnit` `'usd'` \| `'token'`. Rate `TOKEN_PER_USD = 26120`. Token mode hides `$` via `#tradeBuyField.is-token` |
| [Pay with](#pay-with) | Hidden on launchpad Buy (USD only). ETH / WETH / USDm still price the quote |
| [CTA](#trade-cta) | Unsigned → **Sign in to buy** / **Sign in to sell**. $0 → **Enter amount**. Sell w/ no bag → **Nothing to sell**. Funded short → **Top up to buy**. Ready → big green **Buy** (`#3DDC97`). Login resumes the drawer. Top up prefills the shortfall and completes the buy when MoonPay clears |
| [Slippage](#slippage) | Gear chip unfolds AUTO / 0.5% / 0.3% / custom. Rest chrome is `--card` + hairline (not orange). **Auto** badge in You’ll pay is purple `#7B6CF0` + white |
| Elevation | Sheet / drawer = `--card`. Controls at rest = `--card` + hairline. Hover = `color-mix` with white — never cream `--bg` wells (Pay-with chip is the exception; it matches the screenshot `--bg` fill) |

---

## Animation system
<a id="animation-system"></a>

Most motion reuses a small set of curves. Durations are wall-clock; doomscroll springs use **real frame dt** (see `swipe-silk` below).

### Shared easing tokens

| Token | Curve | Feel |
|-------|-------|------|
| **`--ease-out`** | `cubic-bezier(.23, 1, .32, 1)` | Morphing pill width + wash; UI that should start moving immediately |
| **`--ease-in-out`** | `cubic-bezier(.77, 0, .175, 1)` | On-screen travel (not the pill — dual `max-width` + this curve ballooned) |
| **Snap** | `cubic-bezier(.65, 0, .35, 1)` | Sidebar collapse, hint thumb travel |
| **Standard out** | `cubic-bezier(.22, 1, .36, 1)` | Drawers, panels, list settle |
| **Soft overshoot** | `cubic-bezier(.22, 1.2–1.4, .36, 1)` | Comment enter, drop stage, attach |
| **Pop** | `cubic-bezier(.22, 1.45–1.5, .36, 1)` | Reaction pulse, new-pill, attach thumb |
| **Vaul sheet** | `cubic-bezier(.32, .72, 0, 1)` | Mobile bottom sheets / topbar hide / [`morphSheet`](#sheet-morph) height (~320ms) |
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
| **Morphing pill** | [Morphing pill](#dare-role-badge) — Dare/Meme → Original Post / Entry / Content (`--pill-morph` 0→1) | `scale(.97)` | `.28s` `var(--ease-out)` · overlay labels · measured width · hover + active-item cycle |
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
| Tip float `+$1.00` | `@keyframes tipFloat` | `1s ease-out` — rise `−52px`, fade |
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
| Copy | tip `tipped $1.00` · like `liked it` · dislike `disliked it` · comment short text |
| Marquee | `@keyframes actRxMarquee` — **comments only**, and only when the label overflows (`syncActRxMarquee`) |
| Never marquee | tip (`tipped $1.00`), like (`liked it`), dislike (`disliked it`), short comment snips (`wow`, `love this`) |
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
| Auto-dismiss | `kb_feed_hint_v10` | show after ready; auto-swipe next post ~1.6s (or ~10s / navigate); 900ms grace |

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
| **Theme flip** | Lights on/off: view-transition fade (400ms `cubic-bezier(.2,0,0,1)`). Dark = old snapshot dissolves; light = new snapshot arrives. No circular clip. `html.theme-switching` freezes CSS vars. Reduced-motion: class toggle only | `.4s` |

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
| Done | after `PULL_LOAD_MS` + spring home | shuffle posts · chip clear | `pullsettle` → sound **`refresh`** (library notification chime) |

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

<a id="haptics"></a>
<a id="haptic-sound-map"></a>

### 9. Haptic + sound map (for porting)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#haptic-sound-map](https://github.com/frilo-eth/kby-feed/blob/main/README.md#haptic-sound-map)

**Hear them:** GitHub markdown can’t play audio. Use the sample page — each cue has **Play** + **Copy** (recipe object or `haptic('…')`):

[https://kby-feed.vercel.app/sounds](https://kby-feed.vercel.app/sounds) · local [`/sounds`](http://localhost:3000/sounds)

In the tables below, **▶** is a plain-text link that opens that sample (deep-linked to the cue).

One call path: `haptic(preset, soundKind?, soundArg?)` → vibration + optional audio. Sources:

| Layer | Library | Role |
|-------|---------|------|
| Vibration | [WebHaptics](https://haptics.lochie.me/) (`web-haptics`) | Primary pattern (`WEB_HAPTIC_PRESETS`) |
| Fallback | `navigator.vibrate` + native taptic burst | `HAPTIC_PATTERNS` when WebHaptics missing |
| UI audio | [procedural-sounds](https://procedural-sounds.vercel.app/) | All cues are `SOUND_RECIPES` + vendored `playRecipe()` (paste-player model; no npm yet) |

`PRESET_SOUND` maps each haptic preset → sound key (or `false` = haptic only). Override with `haptic(preset, false)` or `haptic(preset, 'otherSound')`.

Celebration helper: `celebrateSuccess(kind)` · `celebrateBuySuccess()` · `celebrateTip(btn)` — pick a success preset and optionally fire confetti.

---

#### Outcome family — success / warning / error

| Preset | Hear | When it fires | WebHaptics | Sound recipe | Notes |
|--------|------|---------------|------------|--------------|-------|
| **`buySuccess`** | [▶](https://kby-feed.vercel.app/sounds#buySuccess) | Buy settles (`celebrateBuySuccess`) | Custom **rich** 8-step ascending pattern | **`buySuccess`** (`successZhxpj` export) | + full confetti |
| **`tipSuccess`** | [▶](https://kby-feed.vercel.app/sounds#tip) | **First** tip ever (`celebrateTip`) | Same rich pattern | **`tip`** (`successX9pkg`) | + tip-scale confetti · `kb_first_tip_v1` |
| **`tip`** | [▶](https://kby-feed.vercel.app/sounds#tip) | Repeat tip | Custom tip 5-step pattern | **`tip`** (`successX9pkg`) | No confetti |
| **`success`** | [▶](https://kby-feed.vercel.app/sounds#sent) | Sell settle · send complete | Rich pattern | **`sent`** (`success0m6r9` — soft sine pair + delay) | Via `celebrateSuccess('sell'\|'send')` |
| **`funds`** | [▶](https://kby-feed.vercel.app/sounds#funds) | Top-up / deposit credited | Rich pattern | **`funds`** (FM sine 660 + 990, reverb) | Via `celebrateSuccess('funds')` |
| **`sent`** | [▶](https://kby-feed.vercel.app/sounds#sent) | Comment posted | Rich pattern | **`sent`** | Via `celebrateSuccess('sent')` |
| **`dislike`** | [▶](https://kby-feed.vercel.app/sounds#dislike) | Dislike react | Built-in `warning` | **`dislike`** (descending triangles) | React only |
| **`warning`** | [▶](https://kby-feed.vercel.app/sounds#warning) | Top up to continue · short wallet · Enter an amount · Not enough in this wallet | Built-in `warning` | **`warning`** (triangle + soft double ping) | Soft gate — recoverable |
| **`error`** | [▶](https://kby-feed.vercel.app/sounds#error) | MoonPay under-$10 · leave Solana warn · checkout / connect / auth cancel · signature reject · Sign-in cancelled · settle fail | Built-in `error` | **`error`** (`errorY8d0h` — noise tick + low sines + delay) | Hard reject · sheet shake where applicable |

Rich haptic = `RICH_SUCCESS_WEB` (8 pulses, peaks at intensity 1). Tip haptic = `TIP_RICH_WEB` (5 pulses). Both flatten to `navigator.vibrate` when needed.

**Flow mapping (quick):**

| Situation | Preset |
|-----------|--------|
| Under-$10 cash · shake + red Solana note | `error` |
| Checkout declined · Connection rejected · Authorization cancelled | `error` |
| Signature / connection rejected in wallet popup | `error` |
| Sign-in cancelled | `error` |
| Swap settle “Not enough funds” (hard fail back to confirm) | `error` |
| `requireSpend` / buy shortfall → Top up | `warning` |
| Active wallet short (switch wallet toast) | `warning` |
| Send “Not enough in this wallet” / can’t top up that EOA | `warning` |
| Trade confirm with $0 (“Enter an amount”) | `warning` |
| Send **Top up to send** → open deposit | `warning` |

---

#### Everyday clicks / selection (UI chrome)

Default “tap something” = **`selection`** (WebHaptics `selection` · sound **`light`**). Use this for tabs, chips, toggles that are not outcomes.

| Preset | Hear | Sound | Typical use |
|--------|------|-------|-------------|
| **`light`** | [▶](https://kby-feed.vercel.app/sounds#light) | `light` (brief 998 + 1817 Hz) | Chevron next/prev · copy URL flash · soft taps · `haptic('selection','light')` overrides |
| **`selection`** | [▶](https://kby-feed.vercel.app/sounds#light) | `light` | Trade unit / side / slip / pay chip · drawer chrome · comment identity · sheet chrome · most buttons |
| **`nudge`** | [▶](https://kby-feed.vercel.app/sounds#light) | `light` (or override `'refresh'`) | Soft attention · unread notifs (`nudge` + `refresh`) · 2× hold start |
| **`open`** | [▶](https://kby-feed.vercel.app/sounds#open) | `open` (= comment recipe: 533→598) | Open drawer · comments · launch nav · token surfaces |
| **`comment`** | [▶](https://kby-feed.vercel.app/sounds#comment) | `comment` | Open comments affordance |
| **`share`** | [▶](https://kby-feed.vercel.app/sounds#share) | `share` (714→1069) | Share sheet / Post on X |
| **`like`** | [▶](https://kby-feed.vercel.app/sounds#like) | `like` (651→728) | Like react |
| **`toggle`** | [▶](https://kby-feed.vercel.app/sounds#toggle) | `toggle` (880 Hz tap) | Anon toggle · theme-adjacent toggles |
| **`attach`** | [▶](https://kby-feed.vercel.app/sounds#settle) | `settle` (`transitionQpv7x` — soft sine pair) | Media attach to comment |
| **`copyAddr`** | [▶](https://kby-feed.vercel.app/sounds#copyAddr) | `copyAddr` (shimmer delay arpeggio) | Copy receive / wallet address |
| **`mute` / `unmute`** | [▶](https://kby-feed.vercel.app/sounds#mute) · [▶](https://kby-feed.vercel.app/sounds#unmute) | `mute` / `unmute` | Feed sound toggle |
| **`lock` / `unlock`** | [▶](https://kby-feed.vercel.app/sounds#lock) · [▶](https://kby-feed.vercel.app/sounds#unlock) | `lock` / `unlock` | 2× hold lock / unlock |

`attach` → `PRESET_SOUND.attach = 'settle'` → `playSound('settle')` (soft sine pair, `transitionQpv7x`).

---

#### Motion / continuous (mostly haptic-only)

| Preset | Sound | Use |
|--------|-------|-----|
| **`settle`** | **none** | Feed index settle after swipe |
| **`dragtick`** | **none** (slot tick only if forced) | Cross index while dragging |
| **`pulltick`** | none | Pull-to-refresh notches |
| **`pullmorph`** | `light` | Morph into refresh glyph |
| **`pullarm`** | `light` | Cross arm threshold |
| **`pulldisarm`** | none | Fall back under threshold |
| **`pullfire`** | `open` | Release → refresh fires |
| **`pullcancel`** | none | Early release |
| **`pullsettle`** | **`refresh`** (555→759→1066 ramp) | Band returns home after load |

---

#### Full preset → sound → vibration cheat sheet

| `haptic(…)` preset | `PRESET_SOUND` | WebHaptics input | `vibrate` fallback (ms) |
|--------------------|----------------|------------------|-------------------------|
| `light` | `light` | `light` | `[7]` · 1 tap |
| `selection` | `light` | `selection` | `[9,24,7]` · 1 tap |
| `nudge` | `light` | `nudge` | `[11,32,9]` · 2 taps |
| `settle` | **false** | `success` | `[13,34,17]` · 2 taps |
| `dragtick` | **false** | `soft` | `[3]` |
| `toggle` | `toggle` | `rigid` | `[5,18,5]` · 1 tap |
| `unmute` | `unmute` | `nudge` | `[8,26,12,36,10]` · 2 taps |
| `mute` | `mute` | `rigid` | `[14,22,8]` · 1 tap |
| `open` | `open` | `medium` | `[8,28,9]` · 1 tap |
| `comment` | `comment` | `success` | `[9,30,9]` · 2 taps |
| `sent` | `sent` | rich success | rich · 5 taps |
| `share` | `share` | `soft` | `[7,32,7]` · 2 taps |
| `tip` | `tip` | tip rich | tip · 3 taps |
| `tipSuccess` | `tip` | rich success | rich · 5 taps |
| `like` | `like` | `medium` | `[7,28,11]` · 2 taps |
| `dislike` | `dislike` | `warning` | `[26,16,22]` · 1 tap |
| `warning` | `warning` | `warning` | `[18,28,22,32,18]` · 2 taps |
| `attach` | `settle` | `success` | `[10,28,14,40,18]` · 2 taps |
| `lock` | `lock` | `rigid` | `[12,22,16]` · 1 tap |
| `unlock` | `unlock` | `nudge` | `[8,20,10,28,8]` · 2 taps |
| `success` | `sent` | rich success | rich · 5 taps |
| `buySuccess` | `buySuccess` | rich success | rich · 5 taps |
| `funds` | `funds` | rich success | rich · 5 taps |
| `error` | `error` | `error` | `[40,40,40,40,40]` · 3 taps |
| `copyAddr` | `copyAddr` | custom soft pulse | `[5,14,6]` · 1 tap |
| `pulltick` | **false** | 8ms @ 0.22 | `[4]` |
| `pullmorph` | `light` | 14ms @ 0.4 | `[8]` · 1 tap |
| `pullarm` | `light` | 32@0.85 → 48@0.5 | `[14,36,18]` · 2 taps |
| `pulldisarm` | **false** | 12ms @ 0.32 | `[7]` · 1 tap |
| `pullfire` | `open` | 28@0.7 → 55@0.9 → 30@0.4 | `[12,32,16,40,12]` · 2 taps |
| `pullcancel` | **false** | 16ms @ 0.38 | `[10]` · 1 tap |
| `pullsettle` | `refresh` | 40@0.55 → 55@0.75 | `[14,36,20]` · 2 taps |

---

#### Procedural recipes in `SOUND_RECIPES`

| Key | Hear | Character | Origin |
|-----|------|-----------|--------|
| `light` | [▶](https://kby-feed.vercel.app/sounds#light) | Tiny double ping | Library-style tap |
| `open` / `comment` | [▶](https://kby-feed.vercel.app/sounds#open) · [▶](https://kby-feed.vercel.app/sounds#comment) | Soft rising pair | Same patch family |
| `like` | [▶](https://kby-feed.vercel.app/sounds#like) | Short rising pair | React |
| `share` | [▶](https://kby-feed.vercel.app/sounds#share) | Mid rising pair | Share |
| `tip` | [▶](https://kby-feed.vercel.app/sounds#tip) | Bright sine stack + delay (`successX9pkg`) | Tip (first + repeat) |
| `dislike` | [▶](https://kby-feed.vercel.app/sounds#dislike) | Descending triangles | Dislike react |
| `warning` | [▶](https://kby-feed.vercel.app/sounds#warning) | Soft double ping | Top-up / short / soft gates |
| `error` | [▶](https://kby-feed.vercel.app/sounds#error) | Noise tick + low sines (`errorY8d0h`) | Hard reject / cancel |
| `sent` | [▶](https://kby-feed.vercel.app/sounds#sent) | Soft sine pair + delay (`success0m6r9`) | Send / sell / comment success |
| `funds` | [▶](https://kby-feed.vercel.app/sounds#funds) | FM + reverb bloom | Deposit credit |
| `refresh` | [▶](https://kby-feed.vercel.app/sounds#refresh) | Rising sine ramp | Pull settle / notifs |
| `copyAddr` | [▶](https://kby-feed.vercel.app/sounds#copyAddr) | Delay-shimmer arpeggio | Address copy |
| **`buySuccess`** | [▶](https://kby-feed.vercel.app/sounds#buySuccess) | Five-layer sine/triangle + delay (`successZhxpj`) | Buy success |
| `toggle` | [▶](https://kby-feed.vercel.app/sounds#toggle) | Single 880 Hz sine tap | Chrome toggles |
| `mute` | [▶](https://kby-feed.vercel.app/sounds#mute) | Descending triangles + tick | Feed mute |
| `unmute` | [▶](https://kby-feed.vercel.app/sounds#unmute) | Rising sine bloom + tick | Feed unmute |
| `lock` | [▶](https://kby-feed.vercel.app/sounds#lock) | Low thud + square click | 2× lock |
| `unlock` | [▶](https://kby-feed.vercel.app/sounds#unlock) | Rising bloom + tick | 2× unlock |
| `settle` | [▶](https://kby-feed.vercel.app/sounds#settle) | Soft sine pair (`transitionQpv7x`) | Attach media |
| `dragtick` | [▶](https://kby-feed.vercel.app/sounds#dragtick) | Short triangle + click | Sample only (`PRESET_SOUND` false in feed) |

All UI audio is recipe-only ([procedural-sounds](https://procedural-sounds.vercel.app/) player). Haptics stay on WebHaptics / vibrate.

---

#### Porting rules

1. Call **`haptic(preset)`** — do not invent parallel audio/vibrate paths.
2. Outcome moments go through **`celebrateSuccess` / `celebrateBuySuccess` / `celebrateTip`** so confetti and rich patterns stay consistent.
3. Continuous motion (swipe, pull notches) stays **haptic-only** (`false` in `PRESET_SOUND`).
4. Respect `prefers-reduced-motion` for confetti; vibration still runs.
5. Source of truth in `feed.html`: `WEB_HAPTIC_PRESETS` · `HAPTIC_PATTERNS` · `PRESET_SOUND` · `SOUND_RECIPES` · `celebrateSuccess`.

---

<a id="meta-affordances"></a>

### Meta affordances — username, token mini, ticker

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#meta-affordances](https://github.com/frilo-eth/kby-feed/blob/main/README.md#meta-affordances)

Bottom-left post chrome (`.col-info` → `.meta-block`). **Rule:** hover is mostly color-graded; the **token mini is the exception** that may scale. Click on `.token-tag` goes to [`/token`](#token-page); user surfaces are preview-only in this prototype (hover card, no profile route).

| Target | Hover affordance | Press | Click | Desktop hover card | Haptic |
|--------|------------------|-------|-------|--------------------|--------|
| `.avatar-sm.blockie` | opacity `.88` + brightness `1.06` · `.15s` | — | — | **user** · 280ms | — |
| `.uname` (`@user`) | `opacity:.8` · `.15s` (no underline) | — | — *(no profile route yet)* | **user** · 280ms | — |
| `.pill` (Dare / Meme) | Rest = category. Hover / cycle / tap morphs to **Original Post** (OP) · **Entry** (Dare) · **Content** (Meme) | `scale(.97)` | desktop click → **trade drawer**; mobile tap → explain tip | **info** · 180ms | `open` (desktop click) |
| **`img.blockie`** (all instances) | same lighten — meta, comments, CFX, act-bubbles, hover cards, buyers, wallet | — | — | user card where bound | — |
| `.token-tag` (wraps mini + ticker) | mini scale + ring; ticker color | mini `scale(.96)` | **[`/token`](#token-page)** | **token** · 280ms | `open` |
| `.token-mini` | `scale(1.14)` + orange ring `0 0 0 2px rgba(255,102,34,.35)` + brightness | `scale(.96)` · `.1s` | *(via `.token-tag`)* | *(via `.token-tag`)* | — |
| `.tag-ticker` | `color: var(--coffee) → var(--coffee-hover)` · `.15s` | — | *(via `.token-tag`)* | *(via `.token-tag`)* | — |

**Not on the card:** Buy CTA — hover cards are preview-only; Buy / plus still open the drawer; ticker goes to `/token`.

##### Markup

```html
<div class="col-info">
  <div class="meta-block">
    <div class="row1">
      <img class="avatar-sm circle blockie" src="…">
      <div class="uname">@${user}</div>
    </div>
    <div class="desc">…</div>
    <div class="meta-tags">
      <a class="token-tag" href="/token?t=SAUCE" aria-label="View $SAUCE">
        <img class="token-mini squircle" src="…" alt="">
        <span class="tag-ticker">${ticker}</span>  <!-- already includes $ -->
      </a>
      <!-- morphing category pill — see #dare-role-badge -->
      <div class="pill dare">…</div>
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
  color:inherit; text-decoration:none;
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
  --pill-morph: 0;                 /* 0 rest · 1 Original Post / Entry / Content */
  height: 22px; padding: 4px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 700;
}
.pill.dare{ color: var(--dare-fg); background: var(--dare-bg); }
.pill.meme{ color: var(--meme-fg); background: var(--meme-bg); }
```

##### JS binding

```js
item.querySelector('.token-tag')?.addEventListener('click', (e) => {
  e.stopPropagation();
  if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  hideHoverCards(true);
  haptic('open');
  openTokenPage(posts[item.dataset.index]);
});

bindHoverCard(item.querySelector('.uname'), 'user', postRef, 280);
bindHoverCard(item.querySelector('.avatar-sm'), 'user', postRef, 280);
bindHoverCard(item.querySelector('.token-tag'), 'token', postRef, 280);
bindMorphPill(item.querySelector('.pill'), postRef);
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
<a id="morphing-pill"></a>

##### Morphing pill (OP / Entry / Content)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge](https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge)

**Problem:** Viewers can’t tell an **original post (OP)** from a Dare **entry** or Meme **content**.

**Solution:** don’t add a second chip. The existing category `.pill` **morphs** — rest stays Dare / Meme; hover, focus, tap, or the active-item cycle reveals the role. Figma: [dare](https://www.figma.com/design/DYukWIAVscGqu85nfGUhT5/Launchpad---Root?node-id=17247-443202) · [meme](https://www.figma.com/design/DYukWIAVscGqu85nfGUhT5/Launchpad---Root?node-id=17270-443404). Linear: [KUM-592](https://linear.app/kumbaya/issue/KUM-592/there-is-nothing-to-differentiate-between-an-entry-and-a-dare).

| `post.role` | `post.cat` | Rest | Morph label | Icon | Tooltip |
|-------------|------------|------|-------------|------|---------|
| `"op"` | Dare or Meme | Dare / Meme | **Original Post** | diamond origin (`pillOp`, rotated 45°) | `{Image\|Video} posted by the token creator at launch.` |
| `"entry"` or omitted | Dare | Dare | **Entry** | paper plane (`pillEntry`) | `{Image\|Video} participating on a Dare.` |
| `"entry"` or omitted | Meme | Meme | **Content** | frame + plus (`pillContent`) | `{Image\|Video} posted on a Meme thread.` |

**Paint**

- Rest: existing `--dare-bg/#fg` · `--meme-bg/#fg`
- Morph Dare: gradient `#0067C9 → #0089E2`, fg `#CCECFF`
- Morph Meme: gradient `#FF6622 → #FF7A3F`, fg `#FFE5DD`
- Overlay `::before` opacity follows `--pill-morph` so the wash is interruptible

**Motion** (`--pill-morph` 0→1 via `@property`, `.28s` `--ease-out` `cubic-bezier(.23, 1, .32, 1)`)

| Piece | Detail |
|-------|--------|
| Driver | `--pill-morph` on `.pill`; hover / `:focus-visible` / `.is-morph` / `.is-cycled` → `1` |
| Width | labels **overlay** in one grid cell; chip `width` interpolates measured `--pill-w-rest` → `--pill-w-role` (no dual `max-width` — that ballooned mid-morph) |
| Crossfade | opacity only (same slot — no blur) |
| Press | `scale(.97)` · `160ms` `--ease-out` |
| Cycle | active item only: rest 3.8s ↔ morph 2.4s after a 1.4s settle; pauses on hover/tap and while dragging |
| Touch | tap toggles morph + `#infoHoverTip` (token-tag still opens [`/token`](#token-page)) |
| Desktop click | still opens the trade drawer |
| Reduced motion | no cycle; snap width; keep color/opacity |

```html
<div class="pill dare" role="button" tabindex="0" aria-label="Dare, Original Post"
     data-role="op" data-tip-title="Original Post"
     data-tip-body="Media posted by the token creator at launch.">
  <span class="pill-rest">Dare</span>
  <span class="pill-role" aria-hidden="true">
    <!-- svgIcon('pillOp') -->
    <span class="pill-role-label">Original Post</span>
  </span>
</div>
```

<a id="token-vs-yap"></a>

##### Token vs yap

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-vs-yap](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-vs-yap)

**OP is the token. Entries / Content are yaps (comments) on that token.** Chrome follows that split:

| Surface | Original Post | Entry / Content |
|---------|---------------|-----------------|
| Rail tip | **hidden** — you cannot tip an OP | `$` tip + `usdLabel` total (immutable +$1.00) |
| Rail like / dislike | **hidden** — same as tip (`canVote = canTip`) | like ↔ dislike exclusive |
| `…` menu | **View token** (origin icon) → [token page](#token-page) | **View in thread** (list icon) → parent token comments |
| Token mini + plus rail + drawer av | Token art = this media | Token art from the parent OP (`tokenArtOf`) — **not** the yap frame |
| `.token-tag` click | [`/token?t=TICKER`](#token-page) | same — ticker is the token, not the yap |
| Media container | Token launch media | Yap media (can differ from the mini) |
| Comments | [Yap thread](#yap-thread) — OP list includes every same-ticker entry as a media comment | Rail still opens **this** post’s comments; those rows are the same objects as the OP yap’s replies |

`tokenArtOf(post)` resolves `parentTokenPost` (same `ticker` + `role:"op"`), then `avatar` / `poster` / `src`. A token is **Dare or Meme, never both**.

<a id="yap-thread"></a>

##### Yap thread

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#yap-thread](https://github.com/frilo-eth/kby-feed/blob/main/README.md#yap-thread)

Entries **are** comments on the original post. After `const posts = […]`, `wireYapsIntoOpThreads()`:

1. For each `role:"op"`, collect same-`ticker` non-OP posts
2. `entryAsYap(post)` builds a comment: user + caption + `media` from the entry frame; **`replies` is the entry’s `commentList` array** (shared reference, not a copy)
3. Those yaps prepend the OP `commentList`. Duplicate user+text roots (e.g. gremlin on both) are dropped from the OP native list
4. OP `comments` count += `1 + entry.comments` per yap

| View | What you see |
|------|----------------|
| OP comment rail | Nathan’s kitchen photo as a yap, then p3dr0u / gremlin / … as replies, then the other `$SAUCE` entries, then OP-only comments |
| Entry comment rail | That entry’s `commentList` only (same objects as the OP yap replies) |
| View in thread | `openComments(parentTokenPost)` — the OP thread |

New comments `bumpCommentCount(post)` increment the entry **and** the parent OP badge.

Source: `entryAsYap()` · `wireYapsIntoOpThreads()` · `bumpCommentCount()` / `paintFeedCommentCount()`.

<a id="sauce-token"></a>

##### `$SAUCE` (Dare)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#sauce-token](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sauce-token)

All Tabasco media belongs to **`$SAUCE`**, a Dare: drink the Tabasco.

**Default feed order** (first card on load — `posts[0]`, `lastActiveIdx = 0`):

| # | User | Role | Media | Notes |
|---|------|------|-------|-------|
| 1 | `sauce.eth` | **OP** | `/public/SAUCE.webp` (1080×1080) | Balcony gallon. Token art for the whole cluster |
| 2 | `nath4an` | Entry | `/public/tabasco4.jpeg` (9:16) | Kitchen gallon — kept as an entry, not removed |
| 3–7 | asuncion.eth → frilostudio | Entry | existing clips / stills | Prototype ratio pack |
| 8–10 | ringside / bellcurve / edsnaps | Entry | `tabasco6.webp` · `tabasco7.webp` · `tabasco8.webp` | Live-product memes (wrestling / IQ curve / Ed) |

Caption on the OP: *“the dare: drink the tabasco. one gallon, fridge-cold, no chaser.”* Token mini / plus / drawer on every `$SAUCE` yap resolve to `SAUCE.webp` via `tokenArtOf()`. **Comments:** Nathan’s thread (p3dr0u + 7 replies, gremlin, framefan, nightowl) is wired into the OP as that entry’s yap — see [yap thread](#yap-thread). Extra-media posts keep their own tickers. Pull-to-refresh may shuffle `posts[0]` — OP identity is `role:"op"` + ticker, not array index.

<a id="token-page"></a>

##### Token page

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page)

OP `…` → **View token** and the feed **`.token-tag`** (mini + `$SAUCE`) are a **route**, not the trade drawer: `token.html` at `/token?t=SAUCE` (empty stub + ticker + back to feed). `openTokenPage()` / `tokenPageUrl()`. Buy / plus still open the drawer. Local: `http://localhost:3000/token?t=SAUCE`. Vercel rewrite: `/token` → `token.html`.

<a id="profile-page"></a>

##### Profile page

Account **View my profile** (ghost CTA) goes to `profile.html` at `/profile?u=Handle` (empty stub + handle + back to feed), same pattern as the token page. Local: `http://localhost:3000/profile?u=Handle`. Vercel rewrite: `/profile` → `profile.html`.

##### Port checklist

1. Keep **username** and **token** as separate targets — user → profile preview; token ticker → [`/token`](#token-page); Buy / plus → trade.
2. Hit target for ticker+mini is the **`.token-tag` wrapper** (`<a href="/token?t=…">`, negative margin padding), not two separate buttons.
3. Only the mini may scale on hover — ticker stays type-only (color). Do not scale the whole chip.
4. Tag every `userAvatar()` `<img>` with **`.blockie`** so hover lighten is shared (meta, comments, CFX, bubbles, cards, wallet). Skip anon PNG / token photos.
5. OP posts set `role: "op"` (any `cat`); Dare entries `role: "entry"` (or omit); Meme non-OP morphs to **Content**.
6. Do not render the rail tip **or** like/dislike on OP. Menu item is **View token** (OP) vs **View in thread** (yap). Token mini / plus / drawer use `tokenArtOf()`, never the yap `src` on entries.
7. Hover card delay **280ms** on token/user; pill info tip **180ms**. Leave trigger has a short bridge onto the card.
8. `stopPropagation` on clicks so the scroller doesn’t treat them as feed gestures. Cmd/ctrl-click on `.token-tag` uses the native `<a>` (new tab).
9. On float/mobile, switch to light-on-scrim tokens — coffee brown disappears on dark frames.
10. Category `.pill` morphs in place — do not add a second username badge.
11. Call `wireYapsIntoOpThreads()` once after `posts` exists so entries share `commentList` with the OP yap. Do not copy the array.

##### Q&A

**Q: Why doesn’t `@uname` underline anymore?**  
A: Underline competed with ticker/link cues. Hover is opacity-only (`.8`) — lighter, still clickable-looking with `cursor:pointer`.

**Q: Why can the token mini scale but the username avatar doesn’t?**  
A: Mini is a trade affordance (exception to the “no scale on hover” rule). User blockies use a shared **lighten** (opacity + brightness) so they don’t fight layout in dense lists.

**Q: What’s a “blockie” vs the token image?**  
A: Blockies = deterministic `userAvatar(seed)` identicons for **people**. Token art = `tokenArtOf(post)` on `.token-mini` / rail `.avatar-plus` / drawer — the **token**, not the yap frame. On an OP those match the media; on Entry/Content the mini stays the parent token while `.media-inner` shows the yap.

**Q: Why no tip on original posts?**  
A: The OP **is** the token. Tips go to yaps (Entry/Content). The `$` rail control is omitted on `role:"op"` (keyboard `T` no-ops). Like / dislike are omitted the same way.

**Q: View token vs View in thread?**  
A: OP → **token page** (`/token?t=SAUCE`, empty stub — not the trade drawer). Entry/Content → parent token’s comment thread (`openComments(parentTokenPost)`). Rail comment still opens **this** post’s comments. `.token-tag` always goes to `/token`. Buy / plus still open the drawer.

**Q: Where do Nathan’s comments live?**  
A: On the entry **and** on the OG. `nath4an.commentList` is the `replies` array on the OP yap. Open comments on `sauce.eth` to see the kitchen photo as a media comment plus that whole thread. See [#yap-thread](#yap-thread).

**Q: Where does `.blockie` hover apply?**  
A: Every tagged instance: meta `.avatar-sm`, comment avatars, CFX caption av, act-bubble discs (data-URL only), user/quote hover cards, chart buyer stack + markers, wallet chip. Compose input drops `.blockie` while anon.

**Q: Click username/avatar — where do I go?**  
A: Prototype has **no profile route**. Desktop opens the user hover card; mobile has no hover card. **`.token-tag` → `/token`**. Buy CTA / plus → **trade drawer** (`haptic('open')`). Desktop pill click also trades; mobile pill tap explains the role.

**Q: Why bind hover cards on `.token-tag` instead of mini and ticker separately?**  
A: One hit target, one delay timer, no flicker when the pointer crosses from mini → `$TICKER`.

**Q: Pinned vs float — do affordances change?**  
A: Motion/CSS hooks stay the same; **paint** swaps to light-on-scrim when `.meta-float` or mobile so coffee/ink don’t vanish on dark frames.

**Q: Where did the username OP badge go?**  
A: Replaced by the morphing category pill — same distinction, no extra chrome. See [#dare-role-badge](#dare-role-badge).

Source: CSS `.pill` morph · `morphPillHtml()` / `bindMorphPill()` / `armPillCycle()` · `#infoHoverTip` · `layoutMeta` · blockie / token-tag nearby.

---

### 10. Hover info cards (desktop)

Preview-only popovers. **No CTA on the card** — click the underlying zone still runs the real action (Buy / plus → drawer, `.token-tag` → `/token`).

| | User (`#userHoverCard`) | Token (`#tokenHoverCard`) | Quote (`#quoteHoverCard`) |
|--|--|--|--|
| **Triggers** | `.uname`, `.avatar-sm`, comment avatar/name | `.avatar-plus`, `.buy-cta`, **`.token-tag`** (mini+ticker) (280ms) — [meta affordances](#meta-affordances) | `.comment-quote[data-qid]` in list + compose mirror (180ms) |
| **Content** | blockie, name, Mirror+X, Launches, Global PnL | avatar, ticker+cat, MCAP, seeded chart, buyers / comments / tips / heat | avatar, `>>id`, time, 3-line text clamp, optional thumb |
| **Gate** | `width > 860` and `(hover:hover) and (pointer:fine)` | same | same |
| **API** | `bindHoverCard` · `hideHoverCards` · `mockUserStats` / `mockTokenStats` / `buildTokenChartSvg` · `renderQuoteHoverCard` · `findCommentById` | | |
| **Hide** | leave trigger (160ms bridge onto card), Escape, scroll, resize, open drawer/share | | |

Portal: `#kbHoverPortal`. Stats/chart are deterministic from `hashSeed(user|ticker)` — swap those helpers for live API data later.

---

<a id="info-hover-tip"></a>

### 11. Info hover tip (Image vs Video)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#info-hover-tip](https://github.com/frilo-eth/kby-feed/blob/main/README.md#info-hover-tip)

`#infoHoverTip` is the pill explain surface (not the token hover card). Copy is built in `pillRoleOf()` via `postMediaNoun(post)`:

| Media | Noun | How |
|-------|------|-----|
| `type:"video"` or `"gif"` | **Video** | gif counts as video |
| `.mp4` / `.webm` / `.mov` src | **Video** | extension fallback |
| everything else | **Image** | default, including `$SAUCE` OP and still memes |

Bodies: `{noun} posted by the token creator at launch.` · `{noun} participating on a Dare.` · `{noun} posted on a Meme thread.`

| Piece | Detail |
|-------|--------|
| Show | desktop hover 180ms; mobile tap on pill |
| Hide | leave trigger, swipe, drawer open |
| Motion | same as hover cards — opacity `.18s`, no scale |

---

<a id="sheet-morph"></a>

### 12. Sheet morph (`morphSheet`)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#sheet-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sheet-morph)

Auth, wallet, signature, and funds share **one tray**. Switching steps **mutates the same modal** — do not remount, do not crossfade a second overlay on top.

`morphSheet(modal, mutate)` (~320ms, Vaul `cubic-bezier(.32,.72,0,1)`):

1. Measure `from` height
2. Run `mutate()` (swap inner HTML / unhide a clip)
3. Measure `to` height
4. If `|to-from| < 2px`, skip
5. Lock `height: from`, `overflow: hidden`, then animate to `to`
6. On `transitionend` (or 400ms fallback) clear inline height so the sheet can grow again

| Also | Detail |
|------|--------|
| Reduced motion | mutate only, no height tween |
| One overlay | `overlayOpen` closes the other auth-family trays first |
| Family Values | [benji.org/family-values](https://benji.org/family-values) — fluidity (persistent UI), progressive disclosure, no redundant animation |

Mobile enter of `.modal` itself is still `transform: translateY(100%+24px) → 0` · `.44s` same Vaul curve (share / auth / wallet / funds).

---

<a id="notifications"></a>

### 12b. Notifications

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#notifications](https://github.com/frilo-eth/kby-feed/blob/main/README.md#notifications)

Inbox is a **wallet-class tray**: desktop right drawer (400px), mobile Vaul sheet. One tray at a time (`overlayOpen`). Topbar: ghost bell **left of** ghost theme. Count badge on the bell + title pill. Inbox starts **all read** (no badge when signed out). Badge pop demo: `?notiff` (`?notif` / `#notiff` also). Tabs **All** / **Unread (N)**; **Mark as read** clears unread. Settings is a stub. Mobile uses More → Notifications (topbar icons hide).

Rows: 32px thumb (avatar or token media) + action badge or small avatar overlay; user · action · `$TICKER` or `#id`; unread orange dot + `1hr`. Hover is `color-mix` on `--card`, not `--bg`.

API: `openNotifs` · `closeNotifs` · `paintNotifChrome`.

---

<a id="signals"></a>

### 12c. Signals

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#signals](https://github.com/frilo-eth/kby-feed/blob/main/README.md#signals)

Sitewide live activity (launched / bought / sold / yapped / graduated / fueled) — not personal inbox. Same row anatomy as [Notifications](#notifications) (`notif-row`, 32px thumb, action · `$TICKER` / `#id`).

Same full-height tray as Account / Notifications (`#signalsOverlay`, 400px desktop drawer / mobile sheet). Header: radar glyph + **Signals** + orange **Live** pill. More → Signals. One tray at a time. Live toast stack is parked.

API: `openSignals` · `closeSignals` · `pushSignal`. Center `showToast` pills are unchanged (copy / signed out / etc).

---

<a id="icons"></a>

### Icons

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#icons](https://github.com/frilo-eth/kby-feed/blob/main/README.md#icons)

UI glyphs are **[Central Icons](https://iconists.co/central)** — the **sharp** set: square join, outlined, radius 0, stroke **1.5**, 16×16 ([`@central-icons-react/all`](https://www.npmjs.com/package/@central-icons-react/all)). This file inlines the SVG (no React package). Use `currentColor` so light/dark and active nav follow `--ink-soft` / `--ink` / `--orange`.

Do not invent rounded substitutes. If a mark is missing from Central (or the product has a custom one), use the SVG that was handed — **Pools**, **Tip Jar**, and **Passkey** are custom. Filled custom paths get `.ic-fill` so active nav does not paint an extra stroke.

---

<a id="stakeholder-flows"></a>

### 12d. Stakeholder flow index

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#stakeholder-flows](https://github.com/frilo-eth/kby-feed/blob/main/README.md#stakeholder-flows)

Click-through for design reviews: [https://kby-feed.vercel.app/flows](https://kby-feed.vercel.app/flows) · local [http://localhost:3000/flows](http://localhost:3000/flows). Auth, Funds, Others. Each row shows the shortened path; **Local** / **Here** opens this host, **Prod** opens production. Rewrite: `/flows` → `flows.html` (`vercel.json`, `dev-server.py`).

| Flow | URL |
|------|-----|
| Land and browse | [`/feed`](https://kby-feed.vercel.app/feed) |
| First action (login + pending tip) | [`/feed?flow=first`](https://kby-feed.vercel.app/feed?flow=first) |
| Login · More options / cancelled | [`?flow=more`](https://kby-feed.vercel.app/feed?flow=more) · [`?flow=login-error`](https://kby-feed.vercel.app/feed?flow=login-error) |
| Wallet catalog | [`/feed?flow=wallets`](https://kby-feed.vercel.app/feed?flow=wallets) (pick MetaMask → Connect) |
| Top up to continue | [`/feed?flow=topup`](https://kby-feed.vercel.app/feed?flow=topup) |
| MoonPay waiting | [`/feed?flow=moonpay`](https://kby-feed.vercel.app/feed?flow=moonpay) |
| Post-deposit success / abandoned | [`?flow=funded`](https://kby-feed.vercel.app/feed?flow=funded) · [`?flow=abandoned`](https://kby-feed.vercel.app/feed?flow=abandoned) |
| Account USD + holdings / empty | [`?flow=account`](https://kby-feed.vercel.app/feed?flow=account) · [`?flow=account-empty`](https://kby-feed.vercel.app/feed?flow=account-empty) |
| Wallet-login account | [`/feed?flow=wallet`](https://kby-feed.vercel.app/feed?flow=wallet) (Connect, then Account) |
| Crypto wallets (Settings) | [`/feed?flow=manage`](https://kby-feed.vercel.app/feed?flow=manage) |
| Profile tab | [`/feed?flow=profile`](https://kby-feed.vercel.app/feed?flow=profile) |
| Signature pending / rejected | [`/feed?sig`](https://kby-feed.vercel.app/feed?sig) · [`?flow=sig-reject`](https://kby-feed.vercel.app/feed?flow=sig-reject) |
| Onboarding hint | [`/feed?flow=onboard`](https://kby-feed.vercel.app/feed?flow=onboard) (auto-swipe) |
| Buy in USD | [`/feed?flow=buy`](https://kby-feed.vercel.app/feed?flow=buy) |
| Buy (wallet) | [`/feed?flow=buy-wallet`](https://kby-feed.vercel.app/feed?flow=buy-wallet) |
| Launch Token | [`/feed?flow=launch`](https://kby-feed.vercel.app/feed?flow=launch) |
| Pull-to-refresh / notif badge | [`?refresh`](https://kby-feed.vercel.app/feed?refresh) · [`?notiff`](https://kby-feed.vercel.app/feed?notiff) |

Copy in the prototype: header and login modal **Sign up / Log in**. Account **USD balance**, **Top up** / **Top up to continue.**

---

<a id="auth"></a>

### 13. Auth (Option 4)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth](https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth)

One login, one paying wallet. Prototype only — no real keys.

| Path | `session.auth` | Wallet | Tip / buy / sell / launch / comment / like |
|------|----------------|--------|---------------------------------------------|
| Google, Apple, X, Farcaster, email | `'social'` | minted **embedded** (`kind:'embedded'`, name Account) | **sponsored** — no signature sheet |
| MetaMask / Phantom / … | `'eoa'` | that catalog row (`kind:'eoa'`) | **`needsSig()`** → signature sheet, then proceed |

Comment, like, and dislike use `requireAuth`, same family as tip/buy. Reading comments and **Share** are ungated. Topbar: **Sign up / Log in** → after auth, wallet chip with `usdLabel(totalBal())`.

Identity is three layers that must not be derived from each other:

| Layer | Social login | Wallet login |
|-------|--------------|--------------|
| **Username** | Generated animal handle (header + Profile). Same on every path. Not an email. | Same generated animal handle. |
| **Login credential** | A realistic Google / Apple / email / social (e.g. `maya.chen.92@gmail.com`). Never `swiftsunnystoat@gmail.com` from the handle. | The EOA you connected. |
| **Receive address** | Minted embedded **Account** (`kind:'embedded'`). Copy lives on the USD balance row — not a later-linked MetaMask. | **That same EOA.** No second wallet is minted. Copy on the USD balance row is the address you signed in with. |

Account opens with a large blockie (seeded from that receive address, classic blockies palette) and the animal name. The 36×36 pencil sits immediately after the username (same control as copy). Under the name: login icon + email / @handle on social, or the shortened EOA on wallet login — click copies (full address or login) with the same check / **Copied** tip as the USD-balance copy control. Changing the username does **not** retint the blockie. The 36×36 copy control sits next to **USD Balance**; the address is tooltip-only while the dollar balance value remains fixed. Tabs are **Tokens**, **Activity**, **Tips**, **Profile**, **Settings**. Crypto wallets live on **Settings**, below **Login connections** and **Passkey** — not on the default Tokens view. Settings lists only what is already connected. Wallet settings rows are borderless (no divider lines). **Connect account** opens the same Sign up / Log in methods (email, Google / X / TikTok, More options — no Phone) and the same verifying / connected wait. **Connect wallet** is a full-row button that opens the picker (same pattern as Top up methods). Connect and Disconnect show on hover. Social users see the embedded wallet labeled **Account**; wallet-login users see only the wallet they signed in with (plus any they connect later). Linked wallets: **Rename**, **Copy address**, **Remove**. Account hero is **USD Balance**; the CTA is **Top up**. Send short uses **Top up to send** only from the social Account cash pot. Deposit hub title is **Top up**. **View my profile** is a ghost button to [`/profile`](#profile-page).

Default login sheet: email, Google / X / TikTok, Crypto wallet, Passkey, More options. Title **Sign up / Log in**. Wallet lives on the main sheet only — not under More. Present the stripped sheet with [`?minimal`](https://kby-feed.vercel.app/feed?minimal) (or `?flow=first&minimal`): icons first, email, Crypto wallet, More options (Passkey hidden). Click-through index: [`/flows`](https://kby-feed.vercel.app/flows).

The USD balance label has the copy control beside it. The address is not visible at rest — hover the copy control for **Your account address**, a MegaETH explainer, then the address. Social login still keeps that address off the identity row (email / @handle lives under the name).

EOA connect and spend always open a fake extension popup (`#walletExt`, top-right on desktop). Connect is **Cancel / Connect**; signatures are **Cancel / Confirm**. Social stays **sponsored** (no popup). Skip the popup with [`?autosig`](https://kby-feed.vercel.app/feed?autosig). Cancel **morphs the wait sheet** to **Connection rejected** / **Signature rejected** + Try again — not a toast. [`/feed?sig`](https://kby-feed.vercel.app/feed?sig) lands on wait + Connect and funds `$250` after confirm. [`/feed?flow=buy-wallet`](https://kby-feed.vercel.app/feed?flow=buy-wallet) opens the trade confirm + Confirm popup.

| Demo URL | Lands on |
|----------|----------|
| [`/feed?sig`](https://kby-feed.vercel.app/feed?sig) | EOA login wait + Connect popup |
| [`/feed?flow=wallet`](https://kby-feed.vercel.app/feed?flow=wallet) | Connect, then Account |
| [`/feed?flow=buy-wallet`](https://kby-feed.vercel.app/feed?flow=buy-wallet) | Trade confirm + Confirm popup |
| [`/feed?error=sig`](https://kby-feed.vercel.app/feed?error=sig) / [`?flow=sig-reject`](https://kby-feed.vercel.app/feed?flow=sig-reject) | Popup, then cancel → **Connection rejected** |
| [`/feed?autosig`](https://kby-feed.vercel.app/feed?autosig) | Skip hatch — EOA auto-completes |
| [`/feed?error=funds`](https://kby-feed.vercel.app/feed?error=funds) | Trade confirm, empty cash → **Not enough funds.** |
| [`/feed?error=short`](https://kby-feed.vercel.app/feed?error=short) | Send, amount > From.bal → **Top up to send** |

Hash aliases: `#sig`, `#error-sig`, `#error-funds`, `#error-short`. Deposit errors are under [Deposit](#deposit).

| Motion | Spec |
|--------|------|
| Open / close overlay | `.modal` Vaul slide · `.44s` `(.32,.72,0,1)` |
| Panel switch (login ↔ wallets ↔ email ↔ funds) | [`morphSheet`](#sheet-morph) `.32s` |
| Icon / row press | `scale(.97)` · `.12s` |
| Hover on `--card` controls | `color-mix(in srgb, var(--card) 62%, white)` — not `--bg` |
| Signed-in feedback | short “You’re signed in.” hold, then `afterAuth`. Overlay fades on the success sheet — does **not** reprint login while closing, does **not** auto-open funds |

API: `completeLogin` · `requireAuth` · `requireSpend` · `requestSignature` · `showWalletExt` · `paintAuthChrome`.

---

<a id="deposit"></a>

### 14. Deposit

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#deposit](https://github.com/frilo-eth/kby-feed/blob/main/README.md#deposit)

`openDeposit(need, then)` / `session.flow.kind === 'deposit'`. Hosts: auth tray (`setAuthPanel('funds')`), wallet tray, or `#fundsOverlay`. Hub title is **Top up**. A `need` amount skips the hub and opens the MoonPay cash step pre-filled with the shortfall. Account button is **Top up**. Short-balance toast is **Top up to continue.** Signup does **not** force this sheet — it is a showable feature on `?deposit` (`#deposit` / `demo=deposit` also).

Error demos (skip wait, fire the same cancel toast / inline UI):

| URL | Lands on |
|-----|----------|
| [`/feed?error=checkout`](https://kby-feed.vercel.app/feed?error=checkout) | MoonPay wait → **Checkout declined.** |
| [`/feed?error=connect`](https://kby-feed.vercel.app/feed?error=connect) | Connect-wallet wait → **Connection rejected.** |
| [`/feed?error=exchange`](https://kby-feed.vercel.app/feed?error=exchange) | Coinbase wait → **Authorization cancelled.** |
| [`/feed?error=empty`](https://kby-feed.vercel.app/feed?error=empty) | **No token balances found.** |
| [`/feed?error=cash`](https://kby-feed.vercel.app/feed?error=cash) | Cash amount over max |

`#error-checkout` (etc.) also. Signature / trade / send demos: [Auth](#auth).

Prefill the MoonPay amount with the shortfall (`openTopUp(need, then)`), floored to the **$10 cash minimum**. Do **not** put the need in the title. Amounts under $10 turn the amount red, morph the Solana note to a red **Minimum top up is $10** warning, shake the sheet, and fire `haptic('error')` ([web-haptics Error](https://haptics.lochie.me/) + dedicated error recipe). Clearing the amount morphs the note back to the amber Solana warning. When `need > 0`, skip the Cash/Crypto hub and open the cash step. Completing checkout runs `pendingFunds` (tip spends; buy confirms) only if a rounded shortfall remains — never reopen the hub at `$0`. Account **Top up** does not adopt a leftover `pendingSpend`.

Hub is two jobs. One back chevron + [`morphSheet`](#sheet-morph). No stacked breadcrumbs.

| Step | UI |
|------|----|
| `home` | **Cash** (Mastercard / Visa / Apple Pay chips) · **Crypto** (Ethereum / Base / Solana chips) |
| `methods` | Transfer crypto (first) · Transfer on MegaETH · Connect wallet · Connect exchange |
| `mega` | Unified QR, `net` locked MegaETH. **Between my wallets** only if 2+ MegaETH (embedded) wallets |
| `qr` | Transfer crypto: network + asset pills with icons, real QR (`qrcode-generator`, ECC H) + Mega/token center. **Info** accordion under the address |
| `watch` | Watching for deposit (close allowed) → `confirm` |
| `cash` | MoonPay stand-in: amount, USD/EUR/GBP pill, presets, paying-with row, Continue, then collapsible Solana note |
| `cashPay` | Select payment method. Warning is not on this step |
| `cashWait` | Complete checkout in MoonPay (Cancel = declined) |
| `cwWallets` | Wallet first, then EVM or Solana |
| `cwFamily` | EVM or Solana (token chips under the copy) |
| `cwWait` | Waiting for {wallet}. Cancel = rejected |
| `cwBalances` | Loading → empty. Disconnect. **Transfer to account** → watch |
| `exList` → `exWait` | Exchange list. Waiting: *Complete authorization in the Coinbase tab…* |
| `confirm` | “Adding funds” → `Added $25.00` (`is-confirming`, close locked) |

**Cash** is a MoonPay stand-in. Currency pill (USD / EUR / GBP) matches the trade chip. Warning sits **below Continue**: title *A Solana wallet may appear*; body *Your purchase lands in your USD balance* (ETH/USDm on MegaETH under the hood). Accordion chevron expands the body on tap/click (same at every breakpoint — no hover-open). Neutral (`--coffee`), not red. Opening the method list exits the note then [`morphSheet`](#sheet-morph).

**Transfer crypto** opens the QR (no full-screen network list). Network and token pills use [cryptocurrency-icons](https://github.com/spothq/cryptocurrency-icons) / Trust Wallet assets via jsDelivr. QR encodes the receive address with [qrcode-generator](https://github.com/kazuhikoarai/qrcode-generator) (error correction H). Center mark stays MegaETH on Mega, token + network badge otherwise. **Info** on the address row opens an accordion *below the address*: processing time and “send only” token/network. Same chevron + `grid-template-rows` motion as the cash note. MegaETH receive is the MegaETH accepted set (ETH, USDm, USDT0, BTC.b, wstETH, stcUSD, USDe, cUSD). Other chains do not list USDm. Later this is [LI.FI](https://li.fi/) — do not promise “any token.”

**Between my wallets** (Mega only) shows if there are 2+ embedded MegaETH wallets. Linked ETH addresses with no Mega balance do not count. When shown: From a linked wallet → To the cash account. EOA From → `requestSignature`.

**Connect wallet** is wallet first, then EVM or Solana. Token chips sit under the subtitle. It is a deposit pull. Linking an extra wallet from Account is **Settings → Crypto wallets → Connect wallet**, not a drawer CTA.

| Chain | Tokens |
|-------|--------|
| MegaETH (Transfer on MegaETH) | ETH, USDm, USDT0, BTC.b, wstETH, stcUSD, USDe, cUSD |
| Ethereum | ETH, USDC, USDT |
| Base | ETH, USDC |
| Solana | SOL, USDC |

| Motion | Spec |
|--------|------|
| Method row hover | `--card` mix white · `.15s` |
| Method press | `scale(.985)` · `.12s` |
| Native select hover | `--card` mix white · `.15s` |
| List load | skeleton ~420ms |
| Cash warning enter | opacity + `translateY(6px)` · `.24s` `--ease-out` |
| Cash warning exit | same props · `.16s`, then morph to method list |
| Cash warning accordion | chevron 180° + `grid-template-rows` 0fr→1fr · `.24s` open / `.16s` close |
| QR Info accordion | same motion, panel under the address |
| Reduced motion | confirm / wait spins skipped; warning opacity only · `.08s`; accordion instant |

---

<a id="send"></a>
<a id="withdraw"></a>

### 15. Send

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#send](https://github.com/frilo-eth/kby-feed/blob/main/README.md#send)

`openSend()`. On-chain withdraw is out of scope. Send moves USD from **From** to a destination. The sheet always opens.

One sheet in the **wallet** tray (`session.walletView = 'flow'`). Header **Send**. Back returns to the account list.

| Block | UI |
|-------|----|
| From | Defaults to `cashWallet()`. Identicon, address, **Active** if `w.active`, label (`socialName()` for embedded). Chevron expands other linked wallets in place. One wallet → no chevron |
| To | “Enter or select destination” + clipboard paste + account-address shortcut. Expand: input + recommended wallets except From. Paste accepts any address; the wallet icon fills `accountReceiveAddr()` (social = embedded Account; wallet login = the EOA you signed in with — not a later-linked extra); a match snaps to that row |
| Amount | Dollar field. **50%** / **MAX** of **From** `bal`. Available line under the field. Over-balance turns the number red |
| CTA | Live prompt (not a second step) |

| CTA condition | Label | Enabled |
|---------------|-------|---------|
| No / short To | Insert recipient address | no |
| To === From | Pick a different destination | no |
| From empty, or amount > From.bal | Top up to send | yes → `openDeposit`, then resume Send |
| No amount | Enter amount | no |
| Ready | Send $X.XX | yes |
| In flight | Sending + spin | no |

Incomplete CTA is `.flow-cta.is-wait` (pale `--orange-dim`, `--orange` label). Ready uses ink `.flow-cta`.

**Money:** debit From. Credit To only if it is the cash account (social embedded) or any wallet on an EOA login. A linked MetaMask on social is an address, not a second cash pot — send to it leaves the account and does **not** credit `w.bal` on that row. From EOA → `requestSignature(..., { wallet: from })`. Embedded is sponsored. Does **not** change `active`. `logActivity('send', …)`.

| Motion | Spec |
|--------|------|
| Enter / leave Send | [`morphSheet`](#sheet-morph) `.32s` `(.32,.72,0,1)` |
| From / To expand | `grid-template-rows: 0fr → 1fr` · `.24s` `cubic-bezier(0.2, 0, 0, 1)`. Exit `.16s`. In-place — do not `innerHTML` the sheet |
| Chevron | rotate `.16s` |
| Hover | `--card` mix white · `.15s` |
| Press | `scale(.97)` · `.16s` |
| CTA label | opacity `.16s` |
| Reduced motion | expand/spin skipped; opacity only |

---

<a id="trade-drawer"></a>

### 16. Trade drawer (dollarized)

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-drawer](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-drawer)

Same chrome as comments (desktop 360 / mobile sheet). Buy / Sell tabs. Amount is always a **USD spend** under the hood (`tradeUsdAmt()`); the field can display tokens. **Chart lives inside `#tokenDrawerScroll`** (not sticky chrome) — wheel/touch collapses the chart first, then chart+form scroll together.

| Control | Buy | Sell |
|---------|-----|------|
| Helpers | `$25` / `$100` / `$500` | `25%` / `50%` / `All` of holdings |
| Label | Buy `$TICKER` | Sell `$TICKER` |
| `#tradePayWith` label | Pay with | Receive |
| [CTA](#trade-cta) | Buy · Sign up / Log in · Top up to buy | Sell · Sign up / Log in · Sell (fees come out of proceeds; never Top up) |

**Amount row:** `$` + `#tradePayInput` (32px / 800) + token chip `#tradeGetAsset` (aligned with the input, **not** the label row).

**⇅ `#tradeOut`:** toggles `session.tradeUnit` `'usd'` ↔ `'token'`. Rate `TOKEN_PER_USD = 26120`. Token mode: `#tradeBuyField.is-token` hides `$`. Quote still converts through USD.

**You’ll pay** (`#tradeMeta`) — collapsed summary + chevron. Open reveals Max slippage (purple **Auto** chip + %) / You receive / You pay / Fee (`PROTOCOL_FEE_PCT = 1.3`). **No top hairline** on `.trade-meta-inner`. Auto label is `color:#fff` (do not let `.trade-meta-inner span` wash it to `--ink-faint`).

| Motion | Spec |
|--------|------|
| Field focus | background mix white · border mix ink · `.15s` |
| Helper pills | rest mix 8% ink on `--card`; hover 12%; on 16%; press `scale(.97)` · `.12s` |
| CTA | green `#3DDC97` buy / `--red` sell / ink gated; hover brightness `1.03`; press `scale(.985)` |
| You’ll pay / slippage unfold | `grid-template-rows: 0fr → 1fr` · `.32s` Vaul |
| Drawer open | existing comments/trade panel morph (not a new overlay) |

<a id="trade-cta"></a>

### 16b. Trade CTA

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-cta](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-cta)

`tradeCtaState()` → `{ state, enabled }` where `state` is `'auth'` \| `'amt'` \| `'empty'` \| `'deposit'` \| `'go'`. `'deposit'` is **buy only** — sell never prompts Top up. Fees come out of leftover cash on buy, or out of sale proceeds on sell. Login resumes the drawer on the confirm sheet. Top up prefills the USD shortfall and, when MoonPay clears, completes the buy (`resumeTrade(side, true)`). Tips still auto-resume via `requireSpend` pending.

| State | Label | Paint | Click |
|-------|-------|-------|-------|
| `'auth'` | Sign in to buy / sell | `.is-gated` ink | `requireAuth` → `resumeTrade(side, false)` |
| `'amt'` | Enter amount | `.is-wait` muted | focuses amount field |
| `'empty'` | Nothing to sell | `.is-wait` muted | no-op |
| `'deposit'` | Top up to buy | `.is-short` ink | `openTopUp(shortfall, () => resumeTrade(side, true))` |
| `'go'` | **Buy** / Sell | green `#3DDC97` / `--red` | confirm sheet / sell |

After deposit, `creditFunds` runs `pendingFunds`. Social buys reopen the **Confirm purchase** summary (they must tap Buy). Wallet-login buys open the fake signature popup. A leftover `$0` shortfall does not reopen the hub. Login alone does not.

<a id="slippage"></a>

### 16c. Slippage

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#slippage](https://github.com/frilo-eth/kby-feed/blob/main/README.md#slippage)

`#tradeAutoBtn` (gear + AUTO / `0.50%`) unfolds `#tradeSlip`. Presets: AUTO (`AUTO_SLIP_PCT = 1`), `0.5`, `0.3`, custom input. Quote uses `slipPct()` to guard You receive.

| Rest | Open |
|------|------|
| `--card` + hairline, ink-soft. Custom `0.50%` stays **neutral** — not orange | slightly lifted `--card` mix white (still not orange) |

You’ll pay **Auto** chip: background `#7B6CF0`, label **white**. Info (i) next to Slippage uses the same `#infoHoverTip` as the pill.

Source: `paintSlippage()` · `setSlipMode()` · `.trade-auto-btn` · `.trade-slip-auto`.

---

<a id="pay-with"></a>

### 17. Pay with chip

**Share this section:** [https://github.com/frilo-eth/kby-feed/blob/main/README.md#pay-with](https://github.com/frilo-eth/kby-feed/blob/main/README.md#pay-with)

Stay until a later PRD cut on Swap / Pools. **Hidden on the launchpad trade drawer** (`#tradePayWith` `display:none`). Buy is USD-only in that UI; ETH / WETH / USDm still price the quote under the hood.

**Not** a modal and **not** an in-drawer asset swap.

| Piece | Detail |
|-------|--------|
| Assets | ETH (default), WETH, USDm · `session.payAsset` |
| Chip `#tradePayChip` | `--bg` fill + down chevron (`has-chev`) — screenshot exception to the “no `--bg` wells” rule |
| Amount `#tradePayAssetInput` | native units (ETH) next to `#tradePayBal` (`0 ETH` unsigned) |
| Menu `#tradePayMenu` | `position:fixed` under the chip (`placePayMenu`); `--card` + hairline + `--shadow`; radius 14px |
| Close | outside click, Escape, drawer scroll, switching to Sell |

Hover on menu rows / selected: `--bg`. Icons are inline SVG (`PAY_ETH_ICON` / `PAY_WETH_ICON` / `PAY_USDM_ICON`).

---

## Breakpoint

**860px** — mobile full-bleed feed, bottom nav, sheets; desktop sidebar + side drawers + kbd helper + new-pill + hover cards.

---

## Version 0.1.0

First tagged snapshot of the single-file prototype (`feed.html` + `public/`).

| Area | Included |
|------|----------|
| Feed | Spring doomscroll, infinite wrap, pull-to-refresh, mute morph, Buy CTA pill (enter/exit spring, mobile too) + hover Buy-bar marquee on `+`, hover cards, 2× hold→lock + “Hold 3s to lock” annotation, activity bubbles, new-pill soft-dismiss, first-visit hint |
| Meta | Pinned left (flush) or float-on-media (padded inset + short desktop scrim) via `layoutMeta`; [username / token / ticker](#meta-affordances); [morphing pill](#dare-role-badge) |
| Token vs yap | [OP vs Entry/Content](#token-vs-yap); [yap thread](#yap-thread); [`$SAUCE` Dare](#sauce-token); [token page stub](#token-page) (`token.html`) |
| Comments | Anon/public, **threaded replies** (indent + View 5 / Hide), **`>>id` quotes** + hover card, attach + fly-in, CFX gallery; entries share lists with the OP |
| Sheets | Trade, share (auto-close on X/copy), more (auto-close incl. theme), sheet-colored close targets, [auth / deposit / send](#auth) with [`morphSheet`](#sheet-morph) |
| Trade | [Dollarized buy](#trade-drawer) · [CTA gate](#trade-cta) · [Slippage](#slippage) · [Pay with chip](#pay-with) · social sponsored / EOA signs |
| System | Light/dark tokens, web-haptics + procedural-sounds recipes, session keys for hint / sound / sidebar |

See `COMPONENT_UPDATE.txt` for the compact behaviour checklist and [CHANGELOG.md](CHANGELOG.md) for release notes.
