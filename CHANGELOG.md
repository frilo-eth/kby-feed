# Changelog

## Unreleased

### Trade drawer
- CTA is a gate: **Sign in to buy** → **Deposit to buy** → green **Buy**. Signup/deposit does not auto-trade. README [#trade-cta](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-cta)
- Slippage chip unfolds AUTO / 0.5% / 0.3% / custom. Rest chrome stays `--card` (not orange). **Auto** badge is purple `#7B6CF0` + white. README [#slippage](https://github.com/frilo-eth/kby-feed/blob/main/README.md#slippage)
- You’ll pay accordion (no top hairline). Fee 1.3%. Chart scrolls inside the drawer
- Pay with: ETH amount + `0 ETH` balance when unsigned. README [#pay-with](https://github.com/frilo-eth/kby-feed/blob/main/README.md#pay-with)

### Deposit
- Native `<select>` pair for chain + token (Ethereum/Base/Solana). Copy: `Send USDC on Ethereum to this address.` README [#deposit](https://github.com/frilo-eth/kby-feed/blob/main/README.md#deposit)
- No need amount on Fund your account. (i) on **Your deposit address** explains the mechanic

### Token vs yap
- `.token-tag` (`$SAUCE`) → `/token?t=SAUCE` (same as View token). Buy / plus still trade. README [#token-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page)
- OP cannot be liked or disliked (same as tip)
- Entries wire into the OP comment thread (`wireYapsIntoOpThreads`). Nathan’s kitchen yap + p3dr0u thread live on `sauce.eth`. README [#yap-thread](https://github.com/frilo-eth/kby-feed/blob/main/README.md#yap-thread)

### Auth, funds, trade
- Option 4: social/email → embedded sponsored wallet; EOA wallet → signatures on gift/buy/sell. README [#auth](https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth)
- One tray at a time; in-tray steps use `morphSheet` (~320ms Vaul). README [#sheet-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sheet-morph)
- Withdraw: amount → address → review. README [#withdraw](https://github.com/frilo-eth/kby-feed/blob/main/README.md#withdraw)
- Trade: dollarized buy helpers; sell `%` of holdings; ⇅ USD↔token (`TOKEN_PER_USD`). README [#trade-drawer](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-drawer)

### `$SAUCE` catalog
- Default first card is the OP: `sauce.eth` / `public/SAUCE.webp`. `nath4an` / `tabasco4.jpeg` is the second card (Entry). README [#sauce-token](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sauce-token)
- Real entries: `tabasco6.webp` (wrestling), `tabasco7.webp` (IQ curve), `tabasco8.webp` (Ed)

### Morphing pill / token vs yap
- Category `.pill` morphs in place (Dare/Meme → Original Post / Entry / Content). Username OP badge removed.
- Motion: `--pill-morph` 0→1, `.28s` `--ease-out`; labels overlay; width interpolates measured rest→role (no dual `max-width` balloon). README [#dare-role-badge](https://github.com/frilo-eth/kby-feed/blob/main/README.md#dare-role-badge)
- OP cannot be tipped; `…` is **View token** (route `/token`) vs **View in thread** (parent comments). README [#token-vs-yap](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-vs-yap)
- Token mini / plus / drawer use `tokenArtOf()` (parent OP art), not the yap frame
- Empty token page: `token.html` · `/token?t=SAUCE`. README [#token-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page)
- `$SAUCE` is a Dare (drink the Tabasco); OP `sauce.eth`. README [#sauce-token](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sauce-token)
- Pill info tip uses Image vs Video copy (`postMediaNoun`). README [#info-hover-tip](https://github.com/frilo-eth/kby-feed/blob/main/README.md#info-hover-tip)

### Feed — swipe-silk
- Wall-clock spring `dt` (same feel on 60/120Hz); critically damped ~0.5s settle; hard flicks ζ≈0.90
- ~90ms release-velocity sample window; momentum projection snap (`silkSnapTarget`)
- Mid-glide grab inherits `springVel`; wheel lock shortened to 360ms

### Activity bubbles
- Avatar seeded from display name (matches hover card — no near-black “wrong” blockie)
- Hairline ring only on an opaque disc; dropped colored `--act` outer ring / brown wash shadow
- Layout band (~96px) above the post avatar; lowest free slot on respawn; no upward collision bias
- Softer exit rise + smaller idle drift so the flock doesn’t climb the feed over idle time

### Comments
- Compose docked to drawer floor; `.comments-body` owns scroll
- Squircle compose input (`14px`) matching send button
- Restored 16px gutters (negative-margin panel + `padding:0` conflict had flushed avatars to the edge)
- **Hide** hover pill no longer uses a right negative margin (was clipped by `overflow-x:hidden`)
- Send uses haptic preset `sent`

### Media
- Desktop frames always match source aspect ratio (`fitMediaBox` + `--ar`); landscape/portrait bind one axis
- Dropped `max-width: min(90vh, …)` — it clamped landscape width alone and made `object-fit:cover` crop
- Desktop paint uses `object-fit:contain` inside the AR box; mobile ≤860 stays full-bleed cover

### Buy CTA
- Enter/exit share one spring; wipe stays `clip-path: inset(… round 999px)`
- **Mobile:** on each swipe-in, `+` marquee (2×) first → then floating pill. Reappear / idle / hotzone / tab = pill only
- **Desktop:** pill cadence + hover Buy-bar marquee on `+`
- Swipe settle/dragtick = haptic only (no reel audio)
- Pull-to-refresh done uses a dedicated `refresh` ping (not swipe land)
- See README **Trade plus → Buy bar (key)**

### Feed polish
- Activity bubbles clamped inside the feed wrap (no sidebar/drawer clip); reaction pills flip toward open space
- Escape peels overlays topmost-first (CFX → hover card → kbd → more → share → drawer)

### Dev
- Agentation `^3.0.2` as a localhost-only annotation helper

---

## 0.1.0 — 2026-07-13

First production snapshot of the Kumbaya doomscroll feed prototype.

### Feed
- Spring-based vertical doomscroll with infinite wrap both ways
- Mobile pull-to-refresh (short pull) vs wrap-to-previous (longer drag)
- Mute / unmute pathLength SVG morph; session-persisted sound
- Buy `$ticker` CTA — theme crystal glass, text-only, CSS-anchored to rail avatar (no media hover)
- Desktop user / token hover cards (preview only)
- Video 2× hold, new-posts pill, first-visit hand hint

### Layout
- Meta pinned left: bottom flush with media card
- Meta float overlay: bottom inset by `PAD` (18px)
- Breakpoint **860px** (mobile sheets vs desktop drawers)

### Comments & overlays
- Comments drawer / sheet with anon vs public compose
- Attach media (file or drag from feed) + CFX gallery focus
- Trade drawer; share modal/sheet (auto-close after X / copy)
- More sheet auto-closes after every action including theme toggle

### System
- Light / dark tokens, haptics + WebAudio feedback
- Single-file app: `feed.html` + `public/`
