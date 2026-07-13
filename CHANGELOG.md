# Changelog

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
