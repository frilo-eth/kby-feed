# Kumbaya Feed — Component & Screen Inventory

> **Purpose:** Hand this to Claude Code so it can design every instance, screen, element, and component systematically. Build bottom-up: atoms → molecules → organisms → screens.

---

## 1. Design Tokens

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#F2EEEA` | `#070403` |
| `--ink` | `#2A241C` | `#F4EFE7` |
| `--ink-soft` | `#6D6153` | `#B3A895` |
| `--ink-faint` | `#948A7B` | `#7A7062` |
| `--line` | `rgba(80,70,59,.12)` | `rgba(255,255,255,.1)` |
| `--card` | `#FFFDF9` | `#100D0A` |
| `--orange` | `#FF6622` | `#FF6622` |
| `--green` | `#3DDC97` | `#3DDC97` |
| `--red` | `#E5484D` | `#E5484D` |
| `--coffee` | amber-50/200/800 | amber tones |
| Border radius | 12px (cards), 8px (buttons/inputs), 20px (pills), 50% (avatars) |
| Font | Inter 400–800, monospace for addresses |

---

## 2. Atoms (Primitives)

### 2.1 Button

| Variant | Style | Example |
|---------|-------|---------|
| **Primary** | `--green` bg, white text, 8px radius | Buy, Send |
| **Danger** | `--red` bg or text | Disconnect, Sell |
| **Outlined / Secondary** | Transparent bg, `--line` border | Cancel, View my profile, Check on Block explorer |
| **Gated** | `--ink` text, no bg, `.is-gated` | Sign up / Log in (trade CTA) |
| **Short** | `--ink` text, `.is-short` | Top up to buy |
| **Icon-only** | 36×36, no bg, icon centered | Copy address, Edit name, Paste, Theme toggle |
| **Pill** | 20px radius, small text | Currency (USD/EUR/GBP), Network, Token chip |
| **Full-row** | `.kb-setrow.is-static`, chevron right | Connect account, Connect wallet |

### 2.2 Input

| Variant | Detail |
|---------|--------|
| **Dollar** | `$` prefix, 32px/800 weight, right-aligned token chip |
| **Text** | Username field (letters/numbers/_/-), description textarea |
| **Email** | Login email with inline submit arrow |
| **Address** | Paste + wallet-shortcut icon |
| **Search** | Wallet/token picker filter |

### 2.3 Icon

| Set | Usage |
|-----|-------|
| Central Icons Sharp | Settings gear, navigation |
| Social brand marks | Google, Apple, X, TikTok, Discord, GitHub, Telegram |
| Crypto wallet logos | MetaMask, Coinbase, WalletConnect, Phantom, Rabby |
| Token icons | ETH, USDm, WETH — via cryptocurrency-icons / Trust Wallet CDN |
| Inline SVG | Copy, check, chevron, close, back, pencil, paste, QR |

### 2.4 Avatar / Identicon

| Variant | Detail |
|---------|--------|
| **Blockie** | Deterministic pixel art from address, 1:1, border-radius 50% |
| **Profile pic** | 1:1 image, border-radius 50%, "Update pic" action |

### 2.5 Toast

- Bottom-center, auto-dismiss ~3s
- Variants: neutral, error (red), success (green)
- Examples: "Top up to continue," "Login cancelled," "Copied"

### 2.6 Tooltip / Tip

- Anchored below trigger, `--card` bg, shadow
- Title (bold) + optional body + optional address
- Used on: copy address, copy method, USD balance

---

## 3. Molecules

### 3.1 Copy Control

| Variant | Trigger | Feedback |
|---------|---------|----------|
| **Address copy** (36×36) | Click button next to USD balance | Icon morphs clipboard→check, tooltip "Copied", green flash |
| **Method copy** | Click login-method row under name | Same check + "Copied" tip, `.is-copied` green state |
| **Row copy** | Long-press or click on address in Settings | Copies address, brief flash |

### 3.2 Set Row (`.kb-setrow`)

| Variation | Content | Action |
|-----------|---------|--------|
| **Connected** | Icon + label + hint/address | Hover reveals Disconnect (red) |
| **Add row** (`.is-static`) | `+` icon + label + sub-description | Full row is the button, chevron right |
| **Passkey connected** | Shield icon + "Passkey" + "This device" | Hover reveals Disconnect |

### 3.3 Auth Mark / Chip

- Circle with provider icon (Google, Apple, X, etc.)
- `.sig-ring` animated border for signing state
- Used in: login sheet wait, link-account wait, wallet header

### 3.4 Sheet Header

| Element | Detail |
|---------|--------|
| Back chevron | Left; navigates view stack |
| Title | Center, 16px/700 |
| Close × | Right (or none on sub-views) |
| Top line | 32px wide pill, `--line` color, drag affordance (mobile) |

### 3.5 Trade Presets

- Row of quick-amount pills: `$25` / `$100` / `$500` (buy), `25%` / `50%` / `All` (sell)

### 3.6 Accordion Note

- Chevron toggles body open/closed
- `grid-template-rows: 0fr → 1fr` animation
- Variants: amber (MoonPay Solana warning), red ($10 minimum error), neutral (QR info)

---

## 4. Organisms

### 4.1 Login Sheet

**States:** `main` → `more` → `wallets` → `wait` → `done`

| View | Content |
|------|---------|
| **main** | Title "Sign up / Log in", email input, Google/X/TikTok icon row, "More options" row, "Crypto wallets" row |
| **more** | Back, Apple/Discord/GitHub/Telegram rows |
| **wallets** | Back, MetaMask/Coinbase/WalletConnect/Phantom/Rabby rows + search |
| **wait** | Spinning sig-ring + provider mark, "Complete login in {provider}…" |
| **done** | Check + "Logged in" (auto-closes) |

### 4.2 Account Modal (Wallet Tray)

**Tabs:** Tokens, Activity, Tips, Profile, Settings

| Section | Key elements |
|---------|-------------|
| **Header** | Blockie, animal name + pencil, login-method copy row, Disconnect (red) |
| **USD balance** | Dollar amount + copy-address button (36×36) |
| **Tokens tab** | Token rows (icon + ticker + balance), Refresh button |
| **Activity tab** | Transaction history rows |
| **Tips tab** | Tip history rows |
| **Profile tab** | 1:1 avatar + Update pic, username input, description textarea, "View my profile" button |
| **Settings tab** | See 4.3 |

### 4.3 Settings Panel

**Sections** (subdued 12px/600 sentence-case headers):

| Section | Rows |
|---------|------|
| **Login connections** | Connected social rows (icon + handle). "Connect account" add-row → opens 4.4 |
| **Passkey** | Connected: shield + "This device". Or: "Connect with a passkey" add-row |
| **Crypto wallets** | Connected wallet rows (blockie + name + address). "Connect wallet" add-row → wallet picker |

- Connect/Disconnect buttons appear on hover (always visible on touch)
- The login you signed in with cannot be disconnected

### 4.4 Link Account Flow

**States:** `accounts` → `accountsMore` → `accountsWait`

| View | Content |
|------|---------|
| **accounts** | Email input, Google/X/TikTok icons, "More options" row. Same layout as login sheet main |
| **accountsMore** | Back, Apple/Discord/GitHub/Telegram rows |
| **accountsWait** | Sig-ring + mark, "Connecting {provider}…", auto-completes → returns to Settings |

### 4.5 Trade Drawer

- Desktop: 360px overlay. Mobile: bottom sheet.
- **Buy / Sell tabs**
- Dollar input + token chip
- Presets row
- Pay with row (hidden on launchpad)
- Slippage (auto or custom)
- CTA button (gated → short → ready)
- Confirm sub-view: social sees summary, wallet sees signature popup

### 4.6 Deposit / Top Up

**Views:** `fundHub` → `cashStep` / `cryptoStep` / `exStep` / `megaStep` → `confirm`

| View | Content |
|------|---------|
| **fundHub** | Title "Top up", two cards: Cash (MoonPay), Transfer crypto |
| **cashStep** | Amount input, currency pill, Continue button, Solana accordion warning below |
| **cryptoStep** | QR code, address row + copy, network/token pills, info accordion |
| **confirm** | "Adding funds" spinner → "Added $25.00" check |

- $10 minimum: under-min → red amount, red warning replaces Solana note, sheet shake + haptic
- Shortfall prefills the amount and skips the hub

### 4.7 Send Sheet

| Block | UI |
|-------|----|
| **From** | Wallet identicon + name + balance. Chevron expands other wallets |
| **To** | Input + paste icon + wallet-shortcut icon. Expand: recommended wallets |
| **Amount** | Dollar input, 50%/MAX pills, available balance |
| **CTA** | Contextual: "Insert recipient" / "Top up to send" / "Send $X.XX" / Sending… |

### 4.8 Wallet Extension Popup

- Fake browser-extension popup (desktop-positioned)
- MetaMask / Coinbase / generic branded
- States: Connect → Approve → Confirming → Done (or Rejected)
- Used for: login signature, buy/sell/send on wallet-login, gift on wallet-login

### 4.9 Notification / Signals Panels

- Same modal chrome as account
- **Notifications:** unread badge on bell, list of notification rows
- **Signals:** separate panel, signal rows

### 4.10 Comments Sheet

- Desktop: 360px. Mobile: bottom sheet
- Comment input at bottom, send arrow
- Comment rows: avatar + name + time + text
- Placeholder: "Sign up to comment"

---

## 5. Screens

### 5.1 Feed (`/feed`)

| Element | Detail |
|---------|--------|
| Cards | Full-viewport TikTok swipe, spring physics, video/image with media scrim |
| Topbar | Logo, search, bell (badge), theme toggle. Auto-hides on mobile |
| Meta float | Token pill, OP badge, like/comment/share/tip actions |
| New-posts pill | Themed, top-center, auto-dismiss after 2 swipes |
| First-visit hint | Hand Lottie + auto-swipe, `kb_feed_hint_v10` |
| Trade drawer | Opens from Buy / token-tag |

### 5.2 Token Page (`/token?t=TICKER`)

- Empty stub, reached via `.token-tag` or "View token"

### 5.3 Profile Page (`/profile`)

- Empty stub, reached via "View my profile"

### 5.4 Flows Index (`/flows`)

- Grouped links: Auth, Funds, Others
- Each row: name + description + local/prod links

---

## 6. State Transitions & Flows

| Flow | Steps |
|------|-------|
| **First visit → Buy** | Feed → tap Buy → "Sign up / Log in" → provider → wait → logged in → trade drawer (gated removed) → enter amount → "Top up to buy" → MoonPay → funded → confirm sheet → done |
| **Social login** | Sheet → email or social icon → wait → complete → auto-close overlay |
| **Wallet login** | Sheet → "Crypto wallets" → pick wallet → extension popup (Connect → Sign) → complete |
| **Tip** | Tap tip → `requireAuth` if needed → `requireSpend` if short → amount picker → confirm |
| **Buy (social)** | Amount → "Buy" → confirm summary → executing → success |
| **Buy (wallet)** | Amount → "Buy" → extension popup (approve) → executing → success |
| **Sell** | Amount → "Sell" → confirm → success. No top-up gate. Fees from proceeds |
| **Send** | From → To → Amount → CTA. Short balance → "Top up to send" → deposit → resume |
| **Link account** | Settings → "Connect account" → email/social picker → wait → linked → back to Settings |
| **Link wallet** | Settings → "Connect wallet" → wallet picker → extension popup → linked → back |

---

## 7. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< 640px) | Full-screen sheets, topbar auto-hides, touch-always for hover actions |
| Tablet (640–1024px) | Chevron gutter `88px`, glass rail on media |
| Desktop (> 1024px) | 360px drawers/modals side-positioned, hover-reveal actions |

---

## 8. Animation Patterns

| Pattern | Technique | Duration |
|---------|-----------|----------|
| `morphSheet` | Height morph between views | ~320ms ease |
| Card swipe | Spring physics (`stiffness`, `damping`) | Momentum-based |
| Sig-ring spin | CSS border animation on `.sig-ring` | Continuous |
| Copy flash | `.is-copied` green state | ~1.5s auto-revert |
| Sheet shake | `@keyframes` horizontal shake | ~400ms |
| Accordion | `grid-template-rows: 0fr → 1fr` | ~250ms |
| Quote reel | Digit-by-digit roll animation | Per-digit stagger |
| Toast | Slide up + fade in, auto-dismiss | ~3s visible |
| Overlay | Backdrop fade + modal slide | ~200ms |
