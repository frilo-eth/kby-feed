# Changelog

## Unreleased

### Feedback
- Dedicated **`warning`** and **`error`** sound recipes (no longer reuse `dislike` for flow failures).
- Flow failures fire haptics: hard rejects (`error`) for checkout / connect / auth cancel, signature reject, under-$10 cash, sign-in cancelled; soft gates (`warning`) for top-up shortfalls, short wallet, and empty trade amount.
- All UI audio unified on [procedural-sounds](https://procedural-sounds.vercel.app/) recipes — former custom oscillators (`mute` / `unmute` / `lock` / `unlock` / `toggle` / `settle` / `dragtick`) are now `SOUND_RECIPES`. `/sounds` is recipe-only (Play + Copy).
- Comment / send / sell success sound (`sent`) swapped to `success0m6r9` (soft sine pair + delay).
- Tip sound (`tip` / `tipSuccess`) swapped to `successX9pkg` (bright sine stack + delay); buy stays on `buySuccess` / `successZhxpj`.
- Attach / settle sound swapped to quieter `transitionQpv7x` (soft sine pair).
- Error sound swapped to `errorY8d0h` (bandpass noise tick + low sines + delay).

### Docs
- README [#haptic-sound-map](https://github.com/frilo-eth/kby-feed/blob/main/README.md#haptic-sound-map): full preset → WebHaptics → sound recipe catalog (success / error / clicks / pull).
- Playable samples at [`/sounds`](https://kby-feed.vercel.app/sounds) — **Play** + **Copy** recipe; README tables link **▶** to each cue.

## 0.1.3 — 2026-08-19

### Account UI & trade
- Topbar auth CTA is **Sign in** (login modal keeps **Sign up / Log in**).
- Trade drawer gated CTA is **Sign in to buy** / **Sign in to sell** (was **Sign up / Log in**).
- Trade CTA semantic idle states: **Enter amount** ($0), **Nothing to sell** (zero holdings).
- Comment compose: **Sign in to comment** placeholder; logged-out users type freely; Enter with text opens sign-in, then posts.
- Logged-in wallet pill shows the same account blockie as the wallet header.
- Login-method tooltip title is now **Logged in with {provider}** (Google, X, TikTok, MetaMask, etc.) instead of a bare "Logged in with".
- Wallet identity login-method pill (`.wallet-id-method`) has slightly more horizontal padding.
- Removed Agentation dev overlay (dependency + localhost CDN mount).

### Success feedback
- Buy success: richer procedural sound + haptic (`buySuccess`) and confetti (respects reduced motion).
- Sell, send, top-up, and comment-sent share the rich success haptic pattern ([WebHaptics](https://haptics.lochie.me/) + native fallback).
- Tips play the `successZhxpj` procedural sound ([procedural-sounds](https://procedural-sounds.vercel.app/) `buySuccess` recipe); first tip adds confetti.

### Fixes
- Blank feed: comment compose auth no longer touches send-ready before comment refs init.

## 0.1.2 — 2026-08-18

### PRD audit (onboarding, auth, deposits)
- One entry verb: login modal, gated trade CTA, and comment placeholder are **Sign up / Log in**. Crypto wallet stays its own row on the main sheet (not under More options).
- Launchpad Buy is USD-only for **social** (Pay with hidden). **Wallet login** shows the ETH / WETH / USDm selector; confirm is Selling that asset. Social confirm is **Paying $…** into the token, not Selling ETH.
- Username is the generated animal handle on every path. Connected Google / Apple / email is a separate realistic persona (not `handle@gmail.com`). Wallet login does **not** mint a second Account — copy and USD-balance hover use the EOA you signed in with.
- Tokens tab action is **Refresh** (re-ticks balances). There is no Import token sheet.
- Linked crypto wallets keep their own balances and token bags. Send From a linked EOA does not MoonPay-top-up that wallet; **Top up to send** is for the Account cash pot only.
- **Top up** is the deposit hub title. Shortfall opens MoonPay cash pre-filled. Checkout runs the pending tip or buy. Send short CTA is **Top up to send**.
- MoonPay note still warns a Solana wallet may appear, and states **Your purchase lands in your USD balance**.
- Embedded wallet catalog name is **Account** (social only). Wallet-login **Settings → Crypto wallets** lists the wallet you signed in with, not a generated extra.
- Account tabs: **Tokens**, **Activity**, **Tips**, **Profile**, **Settings**. Points / leaderboard pills are gone.
- **Disconnect** (red) sits in the account header. No Mainnet / Testnet switch.
- Wallet management is under **Settings**, below Connected accounts and Passkey, as **Crypto wallets**. Receive address hover copies it (address morphs to a copy icon; no Top up on that tip). External wallets: Rename, Copy address, Remove (no pin).
- **Profile**: 1:1 picture + Update pic (then drop), username (`letters / numbers / _ / -`), description, ghost **View my profile** → `/profile`.
- First-visit hint (`kb_feed_hint_v10`) auto-swipes one post after ~1.6s. Token creation, Swap, and Pools unchanged.
- Successful top-up no longer reopens the Cash / Crypto hub. Account Top up does not steal a leftover spend callback. Shortfall uses rounded cents so a $25 credit covers a $25 buy.
- Sell confirms like buy: fees come out of proceeds (or leftover cash on buy). Tips land on **Tips**, not Activity. Settings gear is Central Icons sharp. MoonPay Solana note uses Tailwind amber-50 / amber-200 / amber-800.
- Modal **Cancel** and swap **Check on Block explorer** are the same outlined secondary as **View my profile**: swap-cta size, transparent on the sheet (white/white, dark/dark) with `--line` border. Success title is **Buy successful** / **Sell successful**. Explorer is [mega.etherscan.io](https://mega.etherscan.io/).
- Send **To** is an icon-only clipboard paste plus a wallet shortcut that fills `accountReceiveAddr()` (embedded Account on social; the signed-in EOA on wallet login). Copy on the USD balance row is the same address.
- Hover **USD balance** is gone. The 36×36 copy control sits next to the USD balance label; the address is tooltip-only (**Your account address** + MegaETH explainer + the address). The 36×36 pencil sits immediately after the animal name. Under the name: login icon + email / @handle (social) or shortened EOA (wallet) — click copies with the same check / **Copied** feedback.
- Settings is an unboxed list: subdued sentence-case **Login connections**, **Passkey**, **Crypto wallets**. Connected rows only. **Connect account** opens the same Sign up / Log in methods (email, Google / X / TikTok, More options) and the same wait / success flow. No Phone. **Connect wallet** discloses the wallet picker. Connect and Disconnect appear on hover (always on touch). The login you signed in with cannot be disconnected.
- Cash top up minimum **$10**. Under-min morphs the Solana note to a red warning, shakes the sheet, and fires [web-haptics Error](https://haptics.lochie.me/). Default tip is **$1**.
- Buy confirm is split: social sees the in-app summary; wallet login goes to the fake signature popup (not both).
- After a successful MetaMask (or social) login, the overlay no longer reprints the login sheet while fading out.

## 0.1.1 — 2026-08-17

### Account identity
- Large blockie + animal name for social and EOA. Under it: method icon, handle or short address, copy control. Copy is the receive address (Kumbaya for social, EOA for wallet). README [#auth](https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth)
- Prototype exception to the design PRD: social still shows a copyable receive row so funds can be sent to the balance. Default view remains **USD balance**.
- Wallet settings rows are borderless (no divider lines), including active wallet rows and the Connect wallet row.
- Account eyebrow uses sentence caps (**USD Balance**) and is the only element that morphs to the short address on hover; the dollar amount remains fixed.

### EOA wallet popups
- Fake extension (`#walletExt`) is the **default** for MetaMask connect and for tip / buy / sell / send / launch. Social stays sponsored. Skip with [`?autosig`](https://kby-feed.vercel.app/feed?autosig). Cancel morphs the wait sheet to **Connection rejected** / **Signature rejected**. README [#auth](https://github.com/frilo-eth/kby-feed/blob/main/README.md#auth)
- `/flows`: **Signature**, **Signature rejected**, **Crypto wallets**, **Wallet login** (Connect then Account), **Buy (wallet)**

### Sounds & `/flows`
- UI cues from [procedural-sounds](https://procedural-sounds.vercel.app/) recipes (`playRecipe`). Slot ticks, mute, and lock stay custom.
- `/flows` is Auth / Funds / Others. Shortened path plus **Local** / **Here** / **Prod**. No login-minimal, Signals, or token page.

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
- Account identity is the animal display name. Social email is hover-only. Copy receive address uses the info tip (**Copied** / MegaETH + **Top up**), not a redundant nested tooltip.
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
