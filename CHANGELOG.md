# Changelog

## Unreleased

### Trade drawer
- CTA is a gate: **Sign in to buy** → **Top up to buy** → green **Buy**. Signup/top up does not auto-trade. README [#trade-cta](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-cta)
- Slippage chip unfolds AUTO / 0.5% / 0.3% / custom. Rest chrome stays `--card` (not orange). **Auto** badge is purple `#7B6CF0` + white. README [#slippage](https://github.com/frilo-eth/kby-feed/blob/main/README.md#slippage)
- You’ll pay accordion (no top hairline). Fee 1.3%. Chart scrolls inside the drawer
- Pay with: ETH amount + `0 ETH` balance when unsigned. README [#pay-with](https://github.com/frilo-eth/kby-feed/blob/main/README.md#pay-with)

### Deposit
- Hub is **Cash** or **Crypto**; method icons are ink on `--bg`. Empty-account sheet is titled **Fund your account** (hub body TBD); later opens stay **Add funds**. Not forced after signup — showable on `?deposit`. Cash is a MoonPay stand-in (amount, currency pill, payment method, accordion Solana note below Continue). Transfer on MegaETH receive is the MegaETH accepted set (ETH, USDm, USDT0, BTC.b, wstETH, stcUSD, USDe, cUSD). Transfer crypto skips isolated network/token lists and opens a real QR (`qrcode-generator`). Address **Info** is an accordion under the address. Connect wallet is wallet first, then EVM/Solana. README [#deposit](https://github.com/frilo-eth/kby-feed/blob/main/README.md#deposit)
- UI copy is **Add funds**. No need amount in the title. Short receive hints sit under **I've sent it**

### Token vs yap
- `.token-tag` (`$SAUCE`) → `/token?t=SAUCE` (same as View token). Buy / plus still trade. README [#token-page](https://github.com/frilo-eth/kby-feed/blob/main/README.md#token-page)
- OP cannot be liked or disliked (same as tip)
- Tip totals display as dollars (`$5.00`), including rail, comments, and the +$5.00 float
- Entries wire into the OP comment thread (`wireYapsIntoOpThreads`). Nathan’s kitchen yap + p3dr0u thread live on `sauce.eth`. README [#yap-thread](https://github.com/frilo-eth/kby-feed/blob/main/README.md#yap-thread)

### Auth, funds, trade
- Account drawer close is the same ✕ as the trade drawer (`share-close`). Confirm still locks it; returning to Account clears that lock.
- One tray at a time; in-tray steps use `morphSheet` (~320ms Vaul). README [#sheet-morph](https://github.com/frilo-eth/kby-feed/blob/main/README.md#sheet-morph)
- Send: From / To / amount on one sheet. Linked wallets as destinations + paste any address. README [#send](https://github.com/frilo-eth/kby-feed/blob/main/README.md#send)
- Trade: dollarized buy helpers; sell `%` of holdings; ⇅ USD↔token (`TOKEN_PER_USD`). README [#trade-drawer](https://github.com/frilo-eth/kby-feed/blob/main/README.md#trade-drawer)
- Stakeholder click-through: [`/flows`](https://kby-feed.vercel.app/flows) (`?flow=first`, `topup`, `account`, `wallet`, `onboard`, `buy`, `launch`, `?minimal`, …). README [#stakeholder-flows](https://github.com/frilo-eth/kby-feed/blob/main/README.md#stakeholder-flows)
- Default login: email, Google / X / TikTok, Crypto wallet, Passkey, More options (**Login or sign up**). Stripped alt: [`?minimal`](https://kby-feed.vercel.app/feed?minimal)
- Copy: header **Sign up / Log in**, Account **USD balance**, **Top up** / **Top up to continue** / **Top up to buy**
- Custom glyphs: Tip Jar (More menu), Passkey (login). README [#icons](https://github.com/frilo-eth/kby-feed/blob/main/README.md#icons)
- Notifications: inbox starts all read (no badge unsigned). Showcase badge pop on [`?notiff`](https://kby-feed.vercel.app/feed?notiff). README [#notifications](https://github.com/frilo-eth/kby-feed/blob/main/README.md#notifications)
- Signals: same full-height tray as Notifications. Live toast stack is parked. README [#signals](https://github.com/frilo-eth/kby-feed/blob/main/README.md#signals)
- Theme flip: 400ms lights on/off fade (no circular clip). CSS var interpolations stay frozen so the swap is not a muddy wash.
- New posts pill (`#newPill`) is parked — it sat on the feed after ~3 min. Pull-to-refresh still works.
- Icons: [Central Icons](https://www.npmjs.com/package/@central-icons-react/all) sharp (square, stroke 1.5, 16×16). Pools, Tip Jar, and Passkey are custom glyphs. README [#icons](https://github.com/frilo-eth/kby-feed/blob/main/README.md#icons)

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
- Posting is auth-gated (`requireAuth`): compose, reply, attach, send. Like / dislike (rail, comments, CFX) too. Reading the thread and **Share** stay open. Placeholder **Sign in to comment** until signed in
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
