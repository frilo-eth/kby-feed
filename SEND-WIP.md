# Send sheet — parked WIP

Parked on **14 Aug 2026** so we could restore the pre-fork working copy (`withdraw-feature`) without throwing Send away.

**Do not treat this as the live product.** Live `feed.html` on `main` (working tree) is the account-sheet snapshot again: Withdraw, cash-vs-wallet, login, trade, slippage, `?deposit` demo.

## Where the code is

| Place | What |
|-------|------|
| Git branch **`send-wip`** | Full `feed.html` + README Send section at the moment we parked |
| This file | Spec to re-apply later on top of the restored snapshot |

Restore Send later:

```bash
git checkout send-wip -- feed.html README.md
```

Or re-implement from this note on the current snapshot (preferred — the snapshot has login/trade/wallet work Send was missing).

## Product

Withdraw (amount → address → USDC network → warnings → review) is out of scope. **Send** moves USD from one place to a destination.

- **From** defaults to `cashWallet()` (social → embedded account; EOA login → that wallet).
- **To** = paste any address, or pick a linked wallet (everyone except From).
- Amount is **dollars**, 50% / MAX against **From’s** `bal`.
- Linked EOAs on a social account are **not** a second cash pot. Send to MetaMask debits the account and does **not** credit `w.bal` on that row.
- EOA From → `requestSignature`, then complete. Embedded is sponsored.
- Empty `totalBal()` → toast `Deposit first, then send.` → `openDeposit(0)`.

## CTA (live label, same button)

Incomplete uses `.flow-cta.is-wait` (pale `--orange-dim`, `--orange` text). Ready is ink `.flow-cta`.

| Condition | Label | Enabled |
|-----------|-------|---------|
| No / short To | Insert recipient address | no |
| To === From | Pick a different destination | no |
| No amount | Enter amount | no |
| Amount > From.bal | Not enough balance | no |
| Ready | Send $X.XX | yes |
| In flight | Sending + spin | no |

## Motion

- Enter/leave Send: existing `morphSheet` `.32s` `(.32,.72,0,1)`.
- From/To expand **in place** (`grid-template-rows: 0fr → 1fr`, `.24s` `cubic-bezier(0.2, 0, 0, 1)`). Exit `.16s`. Do not `innerHTML` the sheet on expand (kills input focus).
- Chevron rotate `.16s`. Press `scale(.97)` `.16s`. Hover mix toward white, not `--bg`.
- CTA label opacity `.16s`. Skip spin/expand when `prefers-reduced-motion`.

## Functions to port (`feed.html`)

`openSend` · `confirmSend` · `applySend` · `finishSend` · `bindSendForm` · `sendCtaState` · `sendFromWallet` · `sendWalletBits` · `sendBoxOpen` · `paintSendCta` · `findWalletByAddr` / `addrsMatch`

CSS: `.send-*`, `.flow-cta.is-wait`, `.flow-cta.is-sending`.

Account button: `#walletSendBtn` label **Send** (keep Deposit).

## Do not copy from Kumbaya

Wolf mascot, “Kumbaya Wallet” lockup, ETH token pill, Geist. This prototype stays Inter / `--bg` `#F2EEEA`.
