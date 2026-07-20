# Changelog

## Unreleased

### Media
- Desktop frames always match source aspect ratio (`fitMediaBox` + `--ar`); landscape/portrait bind one axis
- Dropped `max-width: min(90vh, …)` — it clamped landscape width alone and made `object-fit:cover` crop
- Desktop paint uses `object-fit:contain` inside the AR box; mobile ≤860 stays full-bleed cover

### Buy CTA
- Enter/exit share one spring; wipe stays `clip-path: inset(… round 999px)` so the pill never goes square mid-flight
- Hover dismiss waits for `transitionend` before finishing dormant (no snap)

### Comments
- Compose docked to drawer floor; `.comments-body` owns scroll
- Squircle compose input (`14px`) matching send button
- Restored 16px gutters (negative-margin panel + `padding:0` conflict had flushed avatars to the edge)
- Send uses haptic preset `sent`

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
