# Changelog

## Unreleased

### Comments
- Threaded replies: one indent level, `View N replies` / `View N more` (5 at a time), Hide
- 4chan-style `>>id` quotes in list + compose; Reply prefixes input; send nests under root
- Desktop `#quoteHoverCard` preview on `>>` links (list + compose mirror)
- Staggered list enter + springier `.comment-enter-fresh` for live sends / reply page-ins

### Feed polish
- Buy CTA exit mirrors enter spring curves at ~0.55× duration
- New-posts pill soft-dismisses after 2 settled swipes, then re-arms (~3 min)
- Activity bubbles progressive disclosure; comment-only marquee
- Themed pull-spin / new-pill; shorter desktop meta float scrim; chevron gutter on tablet
- 2× hold→lock: charge ring + “Hold 3s to lock” annotation (13px, 14px under pill) while `.is-charging`; tap badge to unlock
- Fix: no speed-badge chevron flash — hold enters `.is-charging` in one step

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
