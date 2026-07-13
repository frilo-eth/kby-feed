/* kby-feed cheatsheet catalog — sourced from feed.html patterns */
(function () {
'use strict';

window.CS_NAV = [
  {
    "id": "sidebar",
    "label": "Sidebar",
    "group": "Navigation"
  },
  {
    "id": "topbar",
    "label": "Topbar",
    "group": "Navigation"
  },
  {
    "id": "mobile-nav",
    "label": "Mobile nav",
    "group": "Navigation"
  },
  {
    "id": "more-menus",
    "label": "More menus",
    "group": "Navigation"
  },
  {
    "id": "feed-media",
    "label": "Feed media",
    "group": "Feed"
  },
  {
    "id": "glass-controls",
    "label": "Glass controls",
    "group": "Feed"
  },
  {
    "id": "react-rail",
    "label": "Reaction rail",
    "group": "Feed"
  },
  {
    "id": "meta-layout",
    "label": "Meta layout",
    "group": "Feed"
  },
  {
    "id": "feed-motion",
    "label": "Feed motion",
    "group": "Feed"
  },
  {
    "id": "comments-drawer",
    "label": "Comments drawer",
    "group": "Comments"
  },
  {
    "id": "comment-list",
    "label": "Comment list",
    "group": "Comments"
  },
  {
    "id": "comment-reacts",
    "label": "Comment reacts",
    "group": "Comments"
  },
  {
    "id": "comment-ctx",
    "label": "Comment ctx menu",
    "group": "Comments"
  },
  {
    "id": "comment-compose",
    "label": "Comment compose",
    "group": "Comments"
  },
  {
    "id": "comment-attach",
    "label": "Comment attach",
    "group": "Comments"
  },
  {
    "id": "cfx",
    "label": "CFX overlay",
    "group": "Comments"
  },
  {
    "id": "trade-drawer",
    "label": "Trade drawer",
    "group": "Overlays"
  },
  {
    "id": "share-modal",
    "label": "Share modal",
    "group": "Overlays"
  },
  {
    "id": "haptics",
    "label": "Haptics",
    "group": "Systems"
  },
  {
    "id": "sounds",
    "label": "Sounds",
    "group": "Systems"
  },
  {
    "id": "apis",
    "label": "API index",
    "group": "Systems"
  },
  {
    "id": "persistence",
    "label": "Persistence",
    "group": "Systems"
  }
];

window.CS_CATALOG = [
  {
    "id": "sidebar",
    "title": "Sidebar",
    "blurb": "Expanded 220px / collapsed 76px with More popover.",
    "tags": [
      "navigation",
      "desktop"
    ],
    "matrix": [
      {
        "state": "expanded",
        "desktop": "labels + Collapse",
        "mobile": "hidden",
        "selector": ".sidebar"
      },
      {
        "state": "collapsed",
        "desktop": "icon rail 76px",
        "mobile": "—",
        "selector": ".sidebar.collapsed"
      },
      {
        "state": "active item",
        "desktop": "orange-dim bg",
        "mobile": "—",
        "selector": ".nav-item.active"
      },
      {
        "state": "more pop",
        "desktop": "Signals…Account",
        "mobile": "more-sheet",
        "selector": ".nav-more-pop.show"
      }
    ],
    "interactions": [
      "hover → bg var(--line)",
      "brand click toggles collapse",
      "persist kb_sidebar_collapsed",
      "haptic: selection on more"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-2\">\n<div class=\"cs-state\"><div class=\"cap\">Expanded</div>\n<div class=\"demo-nav-item\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 5.9L8 1.3l5.7 4.6V13.7H2.3V5.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg><span>Home</span></div>\n<div class=\"demo-nav-item active\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 2.3h11.3v4.7H2.3V2.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M2.3 9h11.3v4.7H2.3V9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg><span>Feed</span></div>\n<div class=\"demo-nav-item\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3.4 8h.02M8 8h.02M12.5 8h.02\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"/></svg><span>More</span></div>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Collapsed + more pop</div>\n<div style=\"display:flex;gap:8px;align-items:flex-start\">\n  <div style=\"display:flex;flex-direction:column;gap:6px;width:44px\">\n    <div class=\"demo-nav-item\" style=\"justify-content:center;padding:0;width:44px;height:44px\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 5.9L8 1.3l5.7 4.6V13.7H2.3V5.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg></div>\n    <div class=\"demo-nav-item active\" style=\"justify-content:center;padding:0;width:44px;height:44px\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 2.3h11.3v4.7H2.3V2.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M2.3 9h11.3v4.7H2.3V9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg></div>\n    <div class=\"demo-nav-item\" style=\"justify-content:center;padding:0;width:44px;height:44px\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3.4 8h.02M8 8h.02M12.5 8h.02\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"/></svg></div>\n  </div>\n  <div style=\"background:var(--card);border:1px solid var(--line);border-radius:12px;padding:6px;min-width:150px;box-shadow:var(--shadow);font-size:13px\">\n    <div style=\"padding:9px 10px;border-radius:8px\">Signals</div>\n    <div style=\"padding:9px 10px;border-radius:8px\">Tip Jar</div>\n    <div style=\"padding:9px 10px;border-radius:8px;background:var(--line)\">Notifications</div>\n    <div style=\"padding:9px 10px;border-radius:8px\">Profile</div>\n    <div style=\"padding:9px 10px;border-radius:8px\">Account</div>\n  </div>\n</div></div>\n</div>",
      "mobile": "<div class=\"cs-note\">Sidebar hidden ≤860px — use <code>.mobile-nav</code> + <code>#moreSheet</code>.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "css": ".sidebar{width:var(--sidebar-w);transition:width .32s cubic-bezier(.65,0,.35,1);}\n.sidebar.collapsed{width:var(--sidebar-w-collapsed);}\n.nav-item:hover{background:var(--line);color:var(--ink);}\n.nav-item.active{background:var(--orange-dim);color:var(--orange);}\n.nav-more-pop{/* absolute under #sideMoreBtn */}\n.nav-more-pop.show{opacity:1;pointer-events:auto;}",
      "html": "<div class=\"sidebar\" id=\"sidebar\">\n  <div class=\"side-nav\">\n    <div class=\"nav-item active\" title=\"Feed\">…<span class=\"label\">Feed</span></div>\n    <div class=\"nav-more-wrap\" id=\"navMoreWrap\">\n      <div class=\"nav-item\" id=\"sideMoreBtn\" title=\"More\">…</div>\n      <div class=\"nav-more-pop\" id=\"navMorePop\" role=\"menu\">\n        <button type=\"button\" data-more=\"signals\">Signals</button>\n        <!-- tipjar, notifications, profile, account -->\n      </div>\n    </div>\n  </div>\n  <button class=\"side-collapse-btn\" id=\"sidebarToggle\">Collapse</button>\n</div>",
      "js": "function setSidebarCollapsed(collapsed){\n  sidebar.classList.toggle('collapsed', collapsed);\n  try{ localStorage.setItem('kb_sidebar_collapsed', collapsed ? '1' : '0'); }catch(e){}\n  reflowDuringChrome();\n}\nif(localStorage.getItem('kb_sidebar_collapsed')==='1') setSidebarCollapsed(true);"
    }
  },
  {
    "id": "topbar",
    "title": "Topbar",
    "blurb": "Search, theme, Launch, wallet — compact icon chrome on mobile.",
    "tags": [
      "navigation",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "search",
        "desktop": "pill + marquee on overflow hover",
        "mobile": "38px icon only",
        "selector": ".search / .search-text"
      },
      {
        "state": "theme",
        "desktop": "#themeBtn",
        "mobile": "hidden → more-sheet",
        "selector": ".topbar #themeBtn"
      },
      {
        "state": "launch",
        "desktop": "label + icon",
        "mobile": "compact padding",
        "selector": ".btn-launch"
      },
      {
        "state": "wallet",
        "desktop": "0x… + label",
        "mobile": "avatar circle 38px",
        "selector": ".btn-wallet"
      }
    ],
    "interactions": [
      "theme → html.dark toggle",
      "search marquee --mq / --mq-dur",
      "haptic light on launch (mobile nav)"
    ],
    "preview": {
      "desktop": "<div style=\"display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--bg)\">\n  <div style=\"flex:1;display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:9px 12px;color:var(--ink-faint);font-size:13px\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"11\" cy=\"11\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M21 21l-4-4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg> Search for a token…</div>\n  <button class=\"cs-iconbtn\" type=\"button\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"5\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n  <button class=\"demo-btn-launch\" type=\"button\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13.5 4.5c2.4-1.5 5-1.2 6-1c.2 1 .5 3.6-1 6L14 14l-4-4l3.5-5.5Z\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M10 14l-1.5 1.5M6.5 12.5C5 13.5 4.5 16.5 4.5 19.5c3 0 6-.5 7-2\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"15\" cy=\"9\" r=\"1.3\" fill=\"currentColor\"/></svg> Launch Token</button>\n  <button class=\"demo-btn-wallet\" type=\"button\">0x635e…9739 <img src=\"/public/anon-avatar.png\" alt=\"\"></button>\n</div>",
      "mobile": "<div style=\"display:flex;align-items:center;gap:8px;padding:8px;border:1px solid var(--line);border-radius:12px;background:var(--card)\">\n  <img src=\"/public/logo-light.png\" width=\"36\" height=\"36\" alt=\"\">\n  <div style=\"margin-left:auto;width:38px;height:38px;border-radius:10px;background:var(--bg);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--ink-soft)\"><svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"11\" cy=\"11\" r=\"7\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M21 21l-4-4\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></div>\n  <button class=\"demo-btn-launch\" type=\"button\" style=\"padding:9px 12px;font-size:12px\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13.5 4.5c2.4-1.5 5-1.2 6-1c.2 1 .5 3.6-1 6L14 14l-4-4l3.5-5.5Z\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M10 14l-1.5 1.5M6.5 12.5C5 13.5 4.5 16.5 4.5 19.5c3 0 6-.5 7-2\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"15\" cy=\"9\" r=\"1.3\" fill=\"currentColor\"/></svg></button>\n  <img src=\"/public/anon-avatar.png\" width=\"38\" height=\"38\" style=\"border-radius:50%\" alt=\"\">\n</div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<div class=\"topbar\">\n  <img class=\"brand-logo brand-logo-light\" src=\"/public/logo-light.png\" width=\"36\" height=\"36\" alt=\"Kumbaya\">\n  <div class=\"search\" role=\"button\" tabindex=\"0\" aria-label=\"Search\">…<span class=\"search-text\"><span class=\"st\">Search for a token, wallet or contract</span></span></div>\n  <div class=\"topbar-spacer\"></div>\n  <button class=\"icon-btn\" id=\"themeBtn\" title=\"Toggle theme\">…</button>\n  <button class=\"btn-launch\" type=\"button\">…<span>Launch Token</span></button>\n  <button class=\"btn-wallet\" type=\"button\" id=\"walletBtn\">\n    <span class=\"btn-wallet-label\">0x635e...9739</span>\n    <img class=\"btn-wallet-avatar circle\" id=\"walletAvatar\" src=\"\" alt=\"\">\n  </button>\n</div>",
      "css": "@media (max-width:860px){\n  .topbar #themeBtn{display:none;}\n  .search{width:38px;height:38px;padding:0;border-radius:10px;margin-left:auto;}\n  .search-text{display:none;}\n  .btn-wallet{width:38px;height:38px;padding:0;border-radius:50%;}\n  .btn-wallet-label{display:none;}\n  .btn-wallet-avatar{display:block;}\n}",
      "js": "document.getElementById('themeBtn').addEventListener('click', ()=>{\n  document.documentElement.classList.toggle('dark');\n});"
    }
  },
  {
    "id": "mobile-nav",
    "title": "Mobile nav",
    "blurb": "Bottom primary bar with Launch and more-open state.",
    "tags": [
      "navigation",
      "mobile"
    ],
    "matrix": [
      {
        "state": "items",
        "desktop": "hidden",
        "mobile": "home/feed/tokens/swap/pools/more",
        "selector": ".mnav-item"
      },
      {
        "state": "launch",
        "desktop": "—",
        "mobile": "orange 48px",
        "selector": ".mnav-launch"
      },
      {
        "state": "more-open",
        "desktop": "—",
        "mobile": "elevated chip",
        "selector": ".mnav-item.more-open"
      }
    ],
    "interactions": [
      "active → orange",
      "more opens #moreSheet",
      "haptic: light"
    ],
    "preview": {
      "desktop": "<div class=\"cs-note\">Visible only ≤860px.</div>",
      "mobile": "<div class=\"cs-grid\" style=\"gap:14px\">\n<div class=\"cs-state\"><div class=\"cap\">Default</div>\n<nav class=\"demo-mnav\">\n  <button type=\"button\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 5.9L8 1.3l5.7 4.6V13.7H2.3V5.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg></button>\n  <button type=\"button\" class=\"active\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 2.3h11.3v4.7H2.3V2.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M2.3 9h11.3v4.7H2.3V9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg></button>\n  <button type=\"button\" class=\"launch\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13.5 4.5c2.4-1.5 5-1.2 6-1c.2 1 .5 3.6-1 6L14 14l-4-4l3.5-5.5Z\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M10 14l-1.5 1.5M6.5 12.5C5 13.5 4.5 16.5 4.5 19.5c3 0 6-.5 7-2\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"15\" cy=\"9\" r=\"1.3\" fill=\"currentColor\"/></svg></button>\n  <button type=\"button\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3.4 8h.02M8 8h.02M12.5 8h.02\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"/></svg></button>\n</nav></div>\n<div class=\"cs-state\"><div class=\"cap\">More open</div>\n<nav class=\"demo-mnav\">\n  <button type=\"button\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 5.9L8 1.3l5.7 4.6V13.7H2.3V5.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg></button>\n  <button type=\"button\" class=\"active\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M2.3 2.3h11.3v4.7H2.3V2.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M2.3 9h11.3v4.7H2.3V9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg></button>\n  <button type=\"button\" class=\"launch\"><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M13.5 4.5c2.4-1.5 5-1.2 6-1c.2 1 .5 3.6-1 6L14 14l-4-4l3.5-5.5Z\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/><path d=\"M10 14l-1.5 1.5M6.5 12.5C5 13.5 4.5 16.5 4.5 19.5c3 0 6-.5 7-2\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"15\" cy=\"9\" r=\"1.3\" fill=\"currentColor\"/></svg></button>\n  <button type=\"button\" class=\"more-open\"><svg viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M3.4 8h.02M8 8h.02M12.5 8h.02\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\"/></svg></button>\n</nav></div>\n</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<nav class=\"mobile-nav\" id=\"mobileNav\" aria-label=\"Primary\">\n  <button type=\"button\" class=\"mnav-item\" data-nav=\"home\">…</button>\n  <button type=\"button\" class=\"mnav-item active\" data-nav=\"feed\">…</button>\n  <button type=\"button\" class=\"mnav-item mnav-launch\" data-nav=\"launch\">…</button>\n  <button type=\"button\" class=\"mnav-item\" data-nav=\"more\" aria-haspopup=\"true\">…</button>\n</nav>",
      "css": ".mobile-nav{display:none;}\n@media (max-width:860px){\n  .mobile-nav{display:flex;/* fixed bottom, height --mobile-nav-h */}\n  .mnav-item.active{color:var(--orange);}\n  .mnav-item.more-open{\n    background:var(--card);color:var(--ink);\n    box-shadow:0 1px 0 rgba(0,0,0,.04),0 4px 12px rgba(42,36,28,.08);\n  }\n}"
    }
  },
  {
    "id": "more-menus",
    "title": "More menus",
    "blurb": "Desktop pop vs mobile sheet — theme only on mobile sheet.",
    "tags": [
      "navigation",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "desktop pop",
        "desktop": "Signals, Tip Jar, Notifications, Profile, Account",
        "mobile": "—",
        "selector": "#navMorePop"
      },
      {
        "state": "mobile sheet",
        "desktop": "—",
        "mobile": "+ Toggle theme first",
        "selector": "#moreSheet"
      }
    ],
    "interactions": [
      "theme only in #moreSheet",
      "data-more handlers",
      "haptic: selection / light"
    ],
    "preview": {
      "desktop": "<div class=\"cs-state\" style=\"width:fit-content\"><div class=\"cap\">#navMorePop</div>\n<div style=\"display:flex;flex-direction:column;gap:2px;min-width:168px\">\n  <div class=\"demo-sheet-item\" style=\"padding:9px 12px;font-size:13px\">Signals</div>\n  <div class=\"demo-sheet-item\" style=\"padding:9px 12px;font-size:13px\">Tip Jar</div>\n  <div class=\"demo-sheet-item\" style=\"padding:9px 12px;font-size:13px\">Notifications</div>\n  <div class=\"demo-sheet-item\" style=\"padding:9px 12px;font-size:13px\">Profile</div>\n  <div class=\"demo-sheet-item\" style=\"padding:9px 12px;font-size:13px\">Account</div>\n</div></div>",
      "mobile": "<div class=\"cs-state\"><div class=\"cap\">#moreSheet</div>\n<div class=\"demo-sheet-item\"><svg viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"4.2\" stroke=\"currentColor\" stroke-width=\"1.6\"/></svg>Toggle theme</div>\n<div class=\"demo-sheet-item\">Profile</div>\n<div class=\"demo-sheet-item\">Signals</div>\n<div class=\"demo-sheet-item\">Notifications</div>\n<div class=\"demo-sheet-item\">Tip Jar</div>\n<div class=\"demo-sheet-item\">Account</div>\n</div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<!-- desktop -->\n<div class=\"nav-more-pop\" id=\"navMorePop\">\n  <button type=\"button\" data-more=\"signals\">Signals</button>\n  <button type=\"button\" data-more=\"tipjar\">Tip Jar</button>\n  <button type=\"button\" data-more=\"notifications\">Notifications</button>\n  <button type=\"button\" data-more=\"profile\">Profile</button>\n  <button type=\"button\" data-more=\"account\">Account</button>\n</div>\n<!-- mobile: theme first -->\n<div class=\"more-sheet\" id=\"moreSheet\">\n  <button type=\"button\" data-more=\"theme\">Toggle theme</button>\n  <button type=\"button\" data-more=\"profile\">Profile</button>\n  <!-- signals, notifications, tipjar, account -->\n</div>",
      "js": "if(action === 'theme'){\n  document.documentElement.classList.toggle('dark');\n  haptic('toggle');\n}\n// desktop pop has no theme — topbar #themeBtn handles it"
    }
  },
  {
    "id": "feed-media",
    "title": "Feed media",
    "blurb": "Loading shimmer → ready / error; hover + drag chrome.",
    "tags": [
      "feed",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "loading",
        "desktop": "shimmer ::after",
        "mobile": "same",
        "selector": ".media-inner:not(.is-ready)"
      },
      {
        "state": "ready",
        "desktop": "is-ready fades shimmer",
        "mobile": "same",
        "selector": ".media-inner.is-ready"
      },
      {
        "state": "error",
        "desktop": "broken + retry",
        "mobile": "same",
        "selector": ".media-inner.is-error"
      },
      {
        "state": "hover",
        "desktop": ".media-hover / :hover topctl",
        "mobile": "always on active",
        "selector": ".media-card.media-hover"
      },
      {
        "state": "dragging",
        "desktop": "grabbing cursor",
        "mobile": "is-dragging opacity",
        "selector": ".media-inner.is-dragging"
      }
    ],
    "interactions": [
      "markMediaReady / markMediaError",
      "syncMediaHover after settle",
      "drag to comment attach"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-3\">\n<div class=\"cs-state\"><div class=\"cap\">Loading</div>\n<div style=\"aspect-ratio:3/4;border-radius:12px;background:#111;position:relative;overflow:hidden;max-width:120px\">\n  <div style=\"position:absolute;inset:0;background:linear-gradient(105deg,transparent 42%,rgba(255,255,255,.07) 50%,transparent 58%);background-size:220% 100%;animation:mediaShimmer 1.1s ease infinite\"></div>\n</div></div>\n<div class=\"cs-state\"><div class=\"cap\">Ready</div>\n<img src=\"/public/tabasco2.png\" alt=\"\" style=\"width:120px;border-radius:12px;display:block;box-shadow:0 8px 24px rgba(0,0,0,.2)\">\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Error</div>\n<div style=\"width:120px;aspect-ratio:3/4;border-radius:12px;background:#14110d;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.45);font-size:11px;font-weight:700\">Broken</div>\n</div>\n</div>\n<style>@keyframes mediaShimmer{0%{background-position:120% 0}100%{background-position:-120% 0}}</style>",
      "mobile": "<div class=\"cs-state media-stage\"><div class=\"cap\">Hover / active controls</div>\n<div style=\"position:relative;border-radius:12px;overflow:hidden;max-width:200px;margin:0 auto\">\n  <img src=\"/public/tabasco2.png\" alt=\"\" style=\"width:100%;display:block\">\n  <div style=\"position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between\">\n    <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M11 5L6 9H2v6h4l5 4V5z\" fill=\"currentColor\"/><path d=\"M23 9l-6 6M17 9l6 6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n    <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\" fill=\"currentColor\"/></svg></button>\n  </div>\n</div></div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "media-stage"
    },
    "code": {
      "css": ".media-inner::after{/* shimmer */}\n.media-inner.is-ready::after{opacity:0;}\n.media-inner.is-error{background:#14110d;}\n.media-card:hover .media-topctl,\n.media-card.media-hover .media-topctl{opacity:1;}\n.media-inner.is-dragging{opacity:.72;transform:scale(.985);}",
      "js": "function markMediaReady(inner){\n  if(inner){ inner.classList.remove('is-error'); inner.classList.add('is-ready'); }\n}\nfunction markMediaError(inner){\n  if(inner){ inner.classList.remove('is-ready'); inner.classList.add('is-error'); }\n}\nfunction syncMediaHover(x, y){\n  if(window.innerWidth <= 860 || matchMedia('(hover:none)').matches) return;\n  clearMediaHover();\n  const card = document.elementFromPoint(x,y)?.closest('.media-card');\n  if(card?.closest('.feed-item.active')) card.classList.add('media-hover');\n}"
    }
  },
  {
    "id": "glass-controls",
    "title": "Glass controls",
    "blurb": "Mute + more — 46px frosted circles on media.",
    "tags": [
      "feed",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "default",
        "desktop": "hidden until hover",
        "mobile": "visible on active",
        "selector": ".media-topctl"
      },
      {
        "state": "mute",
        "desktop": "videos only (not gif)",
        "mobile": "same",
        "selector": ".glass-btn.mute-btn"
      },
      {
        "state": "more",
        "desktop": "opens .more-menu",
        "mobile": "same",
        "selector": ".glass-btn.more-btn"
      }
    ],
    "interactions": [
      "active scale .88",
      "mute ↔ setFeedSound",
      "haptic: toggle / selection"
    ],
    "preview": {
      "desktop": "<div class=\"cs-frame dark-stage\" style=\"border:none;box-shadow:none\"><div class=\"stage\" style=\"display:flex;gap:16px;padding:20px;background:#0c0b0a;border-radius:12px\">\n  <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M11 5L6 9H2v6h4l5 4V5z\" fill=\"currentColor\"/><path d=\"M23 9l-6 6M17 9l6 6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n  <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\" fill=\"currentColor\"/></svg></button>\n</div></div>",
      "mobile": "<div style=\"display:flex;gap:12px;justify-content:center;padding:16px;background:#111;border-radius:12px\">\n  <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M11 5L6 9H2v6h4l5 4V5z\" fill=\"currentColor\"/><path d=\"M23 9l-6 6M17 9l6 6\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button>\n  <button class=\"demo-glass\" type=\"button\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"12\" cy=\"5\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"12\" r=\"1.8\" fill=\"currentColor\"/><circle cx=\"12\" cy=\"19\" r=\"1.8\" fill=\"currentColor\"/></svg></button>\n</div>",
      "dual": true,
      "desktopFrame": "dark-stage",
      "mobileFrame": "dark-stage"
    },
    "code": {
      "css": ".glass-btn{\n  width:46px;height:46px;border-radius:50%!important;\n  color:#fff;background:var(--glass-dark);\n  backdrop-filter:blur(10px) saturate(160%);\n}\n.glass-btn:active{transform:scale(.88);}\n@media (max-width:860px){\n  html.dark .glass-btn{background:rgba(255,255,255,.16);}\n}",
      "html": "<div class=\"media-topctl\">\n  <div class=\"topctl-left\">\n    <button type=\"button\" class=\"glass-btn mute-btn\" aria-label=\"Toggle mute\">…</button>\n  </div>\n  <button type=\"button\" class=\"glass-btn more-btn\" aria-label=\"More options\">…</button>\n</div>\n<div class=\"more-menu\">\n  <button type=\"button\" data-act=\"notinterested\">Not interested</button>\n  <button type=\"button\" data-act=\"report\">Report</button>\n</div>"
    }
  },
  {
    "id": "react-rail",
    "title": "Reaction rail",
    "blurb": "Tip / like / dislike / comment / share with active + pulse.",
    "tags": [
      "feed",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "default",
        "desktop": "card bg",
        "mobile": "glass-dark",
        "selector": ".react-btn"
      },
      {
        "state": "active tip/like/dislike",
        "desktop": "orange/green/red",
        "mobile": "same (!important)",
        "selector": ".react-btn.tip.active"
      },
      {
        "state": "pulse",
        "desktop": "reactPulse",
        "mobile": "same",
        "selector": ".react-btn.pulse"
      },
      {
        "state": "overlay / mobile",
        "desktop": "meta-overlay-mode glass",
        "mobile": "always glass",
        "selector": ".meta-overlay-mode .react-btn"
      }
    ],
    "interactions": [
      "haptic: tip|like|dislike|comment|share",
      "tip float spawnTipFloat",
      "active toggle + pulse class"
    ],
    "preview": {
      "desktop": "<div class=\"cs-state\"><div class=\"cap\">Desktop</div><div style=\"display:flex;gap:14px;align-items:flex-end\">\n  <div class=\"demo-react\"><button class=\"tip active pulse\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg></button><div class=\"c\">1.2K</div></div>\n  <div class=\"demo-react\"><button><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 21C17 21 21 17 21 12S17 3 12 3 3 7 3 12c0 1.5.4 2.9 1 4.1L3 21l5-1C9.2 20.7 10.6 21 12 21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button><div class=\"c\">88</div></div>\n  <div class=\"demo-react\"><button class=\"like active\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button><div class=\"c\">4.1K</div></div>\n  <div class=\"demo-react\"><button class=\"dislike\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M17 2V14M22 12V4a2 2 0 00-2-2H6.5a2 2 0 00-2 1.6l-1.4 7A2 2 0 005.1 15H10l-1 5 .5 1a2 2 0 003.4.3L17 16H22z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button><div class=\"c\"></div></div>\n  <div class=\"demo-react\"><button><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"18\" cy=\"5\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"6\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"18\" cy=\"19\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button><div class=\"c\"></div></div>\n</div></div>",
      "mobile": "<div class=\"cs-state\"><div class=\"cap\">Glass / mobile</div><div style=\"display:flex;gap:12px;align-items:flex-end;padding:16px;border-radius:14px;background:#111\">\n  <div class=\"demo-react glass\"><button class=\"tip active\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg></button><div class=\"c\">88</div></div>\n  <div class=\"demo-react glass\"><button><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 21C17 21 21 17 21 12S17 3 12 3 3 7 3 12c0 1.5.4 2.9 1 4.1L3 21l5-1C9.2 20.7 10.6 21 12 21Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button><div class=\"c\">41</div></div>\n  <div class=\"demo-react glass\"><button class=\"like active\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button><div class=\"c\">970</div></div>\n  <div class=\"demo-react glass\"><button class=\"dislike\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M17 2V14M22 12V4a2 2 0 00-2-2H6.5a2 2 0 00-2 1.6l-1.4 7A2 2 0 005.1 15H10l-1 5 .5 1a2 2 0 003.4.3L17 16H22z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button><div class=\"c\"></div></div>\n  <div class=\"demo-react glass\"><button><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><circle cx=\"18\" cy=\"5\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"6\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><circle cx=\"18\" cy=\"19\" r=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg></button><div class=\"c\"></div></div>\n</div></div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "dark-stage"
    },
    "code": {
      "css": ".react-btn{width:46px;height:46px;border-radius:50%;background:var(--card);color:var(--ink);}\n.react-btn.pulse{animation:reactPulse .42s cubic-bezier(.22,1.5,.36,1);}\n.react-btn.tip.active{background:var(--orange)!important;color:#fff!important;}\n.react-btn.like.active{background:var(--green)!important;color:#fff!important;}\n.react-btn.dislike.active{background:var(--red)!important;color:#fff!important;}\n.meta-overlay-mode .react-btn{background:var(--glass-dark);color:#fff;backdrop-filter:blur(12px);}\n@media (max-width:860px){\n  .react-btn{background:var(--glass-dark);color:#fff;backdrop-filter:blur(10px);}\n}",
      "html": "<div class=\"react-col\">\n  <button type=\"button\" class=\"react-btn tip\" data-tips=\"1200\">…</button>\n  <div class=\"react-count tip-count\">1.2K</div>\n</div>\n<!-- comment, like, dislike, share -->",
      "js": "tipBtn.addEventListener('click', (e)=>{\n  e.stopPropagation(); spawnTipFloat(tipBtn); haptic('tip');\n});\nlikeBtn.addEventListener('click', (e)=>{\n  e.stopPropagation(); likeBtn.classList.toggle('active');\n  likeBtn.classList.add('pulse'); haptic('like');\n});\nitem.querySelector('.react-btn.share').addEventListener('click', (e)=>{\n  e.stopPropagation(); openShare(posts[item.dataset.index]); haptic('share');\n});"
    }
  },
  {
    "id": "meta-layout",
    "title": "Meta layout",
    "blurb": "Pinned gutter vs float-on-media vs full overlay-mode.",
    "tags": [
      "feed",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "pinned",
        "desktop": "left gutter when cardLeft ≥ PIN+metaW+12",
        "mobile": "—",
        "selector": ".col-info (default)"
      },
      {
        "state": "float",
        "desktop": ".meta-float + scrim",
        "mobile": "always float-like",
        "selector": ".feed-item.meta-float"
      },
      {
        "state": "overlay-mode",
        "desktop": "narrow chrome",
        "mobile": "always",
        "selector": ".meta-overlay-mode"
      }
    ],
    "interactions": [
      "layoutMeta() on aspect / chrome change",
      "reflowDuringChrome 440ms"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-2\">\n<div class=\"cs-state\"><div class=\"cap\">Pinned</div>\n<div style=\"display:flex;gap:12px;align-items:flex-end\">\n  <div style=\"max-width:120px;font-size:12px\"><b>@user</b><div style=\"color:var(--ink-soft)\">caption…</div><span style=\"color:var(--coffee);font-weight:700\">$TICKER</span></div>\n  <img src=\"/public/tabasco2.png\" width=\"90\" style=\"border-radius:10px\" alt=\"\">\n</div></div>\n<div class=\"cs-state\"><div class=\"cap\">Float + scrim</div>\n<div style=\"position:relative;width:140px;border-radius:12px;overflow:hidden\">\n  <img src=\"/public/tabasco2.png\" width=\"140\" style=\"display:block\" alt=\"\">\n  <div style=\"position:absolute;inset:auto 0 0;padding:28px 10px 10px;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff;font-size:11px\"><b>@user</b><div>$TICKER</div></div>\n</div></div>\n</div>",
      "mobile": "<div class=\"cs-note\">≤860 always uses bottom-left meta + glass rail (TikTok layout).</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "js": "function layoutMeta(item){\n  const ci = item.querySelector('.col-info');\n  const card = item.querySelector('.media-card');\n  item.classList.remove('meta-float');\n  const PIN = 24, PAD = 18;\n  const metaW = ci.offsetWidth;\n  if(card.offsetLeft >= PIN + metaW + 12) return; // pinned\n  item.classList.add('meta-float');\n  ci.style.left = Math.round(card.offsetLeft + PAD) + 'px';\n  ci.style.bottom = Math.round(item.clientHeight - (card.offsetTop + card.offsetHeight) + PAD) + 'px';\n  ci.style.maxWidth = Math.round(Math.max(160, card.offsetWidth - PAD * 2)) + 'px';\n}",
      "css": ".feed-item.meta-float .media-meta-scrim{display:block;}\n.feed-item.meta-float .meta-block{color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5);}\n.meta-overlay-mode .react-btn{background:var(--glass-dark);color:#fff;}"
    }
  },
  {
    "id": "feed-motion",
    "title": "Feed motion",
    "blurb": "Spring scroll, peek, parallax, pull-refresh, new-pill, 2× hold, tap pause.",
    "tags": [
      "feed",
      "motion",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "spring",
        "desktop": "stiffness 280 / damp 30 / mass 0.8",
        "mobile": "same",
        "selector": "springTo()"
      },
      {
        "state": "peek",
        "desktop": "--feed-peek 28px next card",
        "mobile": "0",
        "selector": ".is-peek-next"
      },
      {
        "state": "parallax",
        "desktop": "scale/opacity by offset",
        "mobile": "same",
        "selector": "applyParallax()"
      },
      {
        "state": "pull-refresh",
        "desktop": "hidden spin",
        "mobile": "threshold 74px",
        "selector": "#pullSpin / dampPull"
      },
      {
        "state": "new-pill",
        "desktop": "over media",
        "mobile": "hidden",
        "selector": "#newPill.show"
      },
      {
        "state": "2x hold",
        "desktop": "playbackRate=2 + badge",
        "mobile": "same",
        "selector": ".speed-badge.show"
      },
      {
        "state": "tap pause",
        "desktop": "togglePlayPause",
        "mobile": "same",
        "selector": "GESTURE_MOVE_PX=8"
      }
    ],
    "interactions": [
      "settle haptic on index change",
      "dragtick while dragging",
      "nudge on 2x engage",
      "space / ↑↓ keys"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-2\">\n<div class=\"cs-state\"><div class=\"cap\">Spring</div>\n<div class=\"mono\" style=\"font-size:11px;color:var(--ink-soft);line-height:1.6\">stiffness=280<br>damping=30<br>mass=0.8<br>settle |Δ|&lt;0.0025</div></div>\n<div class=\"cs-state\"><div class=\"cap\">New pill</div>\n<button type=\"button\" style=\"display:inline-flex;align-items:center;gap:7px;padding:9px 16px;border-radius:999px;background:#fff;color:#2A241C;border:1px solid rgba(0,0,0,.06);font-weight:700;font-size:13px;box-shadow:0 8px 28px rgba(0,0,0,.1)\">↑ New posts</button>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">2× hold</div>\n<div style=\"position:relative;width:120px;height:80px;border-radius:10px;background:#111;display:flex;align-items:center;justify-content:center\">\n  <span style=\"display:inline-flex;align-items:center;gap:5px;min-height:34px;padding:7px 14px 7px 10px;border-radius:999px;background:rgba(20,16,12,.55);color:#fff;font-weight:800;font-size:13px;letter-spacing:.04em\">››› 2x</span>\n</div></div>\n<div class=\"cs-state\"><div class=\"cap\">Pull</div>\n<div class=\"mono\" style=\"font-size:11px;color:var(--ink-soft)\">PULL_THRESHOLD = 74<br>dampPull max=170 k=0.55</div></div>\n</div>",
      "mobile": "<div class=\"cs-note\">Pull-to-refresh + full-bleed; new-pill disabled. Hold anywhere on video for 2×.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "js": "function springTo(target, initialVel){\n  let v = initialVel||0;\n  const stiffness=280, damping=30, mass=0.8, dt=1/60;\n  function frame(){\n    const force=-stiffness*(pos-target), damp=-damping*v;\n    v += (force+damp)/mass*dt; pos += v*dt;\n    applyTransform(); applyParallax();\n    if(Math.abs(pos-target)<0.0025 && Math.abs(v)<0.01){\n      pos=target; onSettled(target); return;\n    }\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);\n}\nfunction applyParallax(){\n  // d===0|1 → scale 1; d===-1 → scale .97 opacity .55; else fade\n}\nconst PULL_THRESHOLD = 74;\nfunction dampPull(dy){ const max=170, k=0.55; const raw=Math.max(0,dy)*k; return max*(1-Math.exp(-raw/max)); }\n// hold ≥ ~320ms → playbackRate=2 + .speed-badge.show + haptic('nudge')\n// tap without move → togglePlayPause(item)"
    }
  },
  {
    "id": "comments-drawer",
    "title": "Comments drawer",
    "blurb": "360px side panel on desktop; 86vh bottom sheet on mobile.",
    "tags": [
      "comments",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "closed",
        "desktop": "width 0",
        "mobile": "translateY offscreen",
        "selector": ".drawer"
      },
      {
        "state": "open",
        "desktop": "width 360px",
        "mobile": "sheet + #sheetScrim",
        "selector": ".drawer.open"
      }
    ],
    "interactions": [
      "openComments / close",
      "sheet drag via enableSheetDrag",
      "haptic: comment / open"
    ],
    "preview": {
      "desktop": "<div class=\"cs-state\" style=\"max-width:280px\"><div class=\"cap\">Side panel</div>\n<div style=\"border:1px solid var(--line);border-radius:12px;padding:14px;background:var(--card)\">\n  <div style=\"display:flex;justify-content:space-between;font-weight:700;margin-bottom:12px\">Comments <span style=\"color:var(--ink-faint)\">✕</span></div>\n  <div class=\"demo-skel\"><div class=\"a\"></div><div class=\"b\"><div class=\"l\" style=\"width:40%\"></div><div class=\"l\" style=\"width:70%\"></div></div></div>\n</div></div>",
      "mobile": "<div class=\"cs-state\"><div class=\"cap\">Bottom sheet</div>\n<div style=\"border-radius:20px 20px 0 0;border:1px solid var(--line);background:var(--card);padding:8px 14px 18px\">\n  <div style=\"width:38px;height:5px;border-radius:99px;background:var(--ink-faint);opacity:.4;margin:4px auto 14px\"></div>\n  <div style=\"font-weight:700;margin-bottom:10px\">Comments</div>\n  <div style=\"font-size:12px;color:var(--ink-soft)\">86vh · drag handle · scrim</div>\n</div></div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "css": ".drawer{width:0;transition:width .38s cubic-bezier(.22,1,.36,1);}\n.drawer.open{width:360px;}\n@media (max-width:860px){\n  .drawer{position:fixed;bottom:0;width:0;transform:translateY(calc(100% + 24px));\n    transition:transform .44s cubic-bezier(.32,.72,0,1);z-index:70;}\n  .drawer.open{width:100%;transform:translateY(0);}\n  #commentsDrawer{height:86vh;}\n}",
      "html": "<div class=\"drawer\" id=\"commentsDrawer\">\n  <div class=\"sheet-handle\"></div>\n  <div class=\"drawer-inner comments-inner\">\n    <div class=\"drawer-head\"><h3>Comments</h3><button class=\"drawer-close\" id=\"commentsClose\">✕</button></div>\n    <div class=\"comments-body\"><div class=\"comments-list\" id=\"commentsList\"></div>…</div>\n    <div class=\"comment-compose\" id=\"commentCompose\">…</div>\n  </div>\n</div>"
    }
  },
  {
    "id": "comment-list",
    "title": "Comment list",
    "blurb": "Skeleton, empty, enter animation; anon vs public rows.",
    "tags": [
      "comments"
    ],
    "matrix": [
      {
        "state": "skeleton",
        "desktop": "is-loading skels",
        "mobile": "same",
        "selector": ".comment-skel"
      },
      {
        "state": "empty",
        "desktop": ".comments-empty",
        "mobile": "same",
        "selector": ".comments-empty"
      },
      {
        "state": "enter",
        "desktop": "comment-enter → is-in",
        "mobile": "same",
        "selector": ".comment-item.comment-enter.is-in"
      },
      {
        "state": "anon row",
        "desktop": "no reacts / no media",
        "mobile": "same",
        "selector": ".comment-item.is-anon"
      },
      {
        "state": "public row",
        "desktop": "reacts + optional thumb",
        "mobile": "same",
        "selector": ".comment-item"
      }
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-2\">\n<div class=\"cs-state\"><div class=\"cap\">Skeleton</div><div class=\"demo-skel\"><div class=\"a\"></div><div class=\"b\"><div class=\"l\" style=\"width:40%\"></div><div class=\"l\" style=\"width:85%\"></div><div class=\"l\" style=\"width:55%\"></div></div></div></div>\n<div class=\"cs-state\"><div class=\"cap\">Empty</div><div style=\"text-align:center;color:var(--ink-faint);padding:20px;font-size:13px\">No comments yet</div></div>\n<div class=\"cs-state\"><div class=\"cap\">Public</div>\n<div class=\"demo-comment\">\n  <img class=\"av\" src=\"/public/anon-avatar.png\" alt=\"\">\n  <div><div><span class=\"user\">asuncion.eth</span><span class=\"time\">3 h</span></div>\n  <div class=\"txt\">testing <span class=\"quote\">&gt;&gt;12</span> hold speed</div>\n  </div>\n</div></div>\n<div class=\"cs-state\"><div class=\"cap\">Anon</div>\n<div class=\"demo-comment\">\n  <img class=\"av\" src=\"/public/anon-avatar.png\" alt=\"\">\n  <div><div><span class=\"user\" style=\"color:#8B3A2A\">anon</span><span class=\"time\">1 m</span></div>\n  <div class=\"txt\">ghost take — no reacts</div>\n  </div>\n</div></div>\n</div>",
      "mobile": "<div class=\"cs-note\">Same list; larger <code>.c-pill</code> hit targets on mobile.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": ""
    },
    "code": {
      "css": ".comment-item.comment-enter{opacity:0;transform:translateY(10px);}\n.comment-item.comment-enter.is-in{opacity:1;transform:translateY(0);\n  transition:opacity .36s cubic-bezier(.22,1,.36,1),transform .42s cubic-bezier(.22,1.4,.36,1);}\n.comment-item.is-anon .comment-reacts{display:none;}",
      "js": "row.className = 'comment-item' + (anon ? ' is-anon' : '');\n// after mount: requestAnimationFrame(()=> row.classList.add('is-in'));\nfunction isAnonComment(c){ return c.user === 'anon' || c.isAnon === true; }"
    }
  },
  {
    "id": "comment-reacts",
    "title": "Comment reacts",
    "blurb": "Compact c-pill tip / like / dislike states.",
    "tags": [
      "comments"
    ],
    "matrix": [
      {
        "state": "rest",
        "desktop": "ink-soft",
        "mobile": "larger padding",
        "selector": ".c-pill"
      },
      {
        "state": "tip active",
        "desktop": "orange + orange-dim",
        "mobile": "same",
        "selector": ".c-pill.tip.active"
      },
      {
        "state": "like active",
        "desktop": "green tint",
        "mobile": "same",
        "selector": ".c-pill.like.active"
      },
      {
        "state": "dislike active",
        "desktop": "red tint",
        "mobile": "same",
        "selector": ".c-pill.dislike.active"
      }
    ],
    "interactions": [
      "hover → bg var(--line)",
      "haptic: tip|like|dislike",
      "hidden on is-anon"
    ],
    "preview": {
      "desktop": "<div style=\"display:flex;gap:6px;flex-wrap:wrap\">\n  <button class=\"demo-c-pill tip\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg><span>22</span></button>\n  <button class=\"demo-c-pill tip active\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg><span>23</span></button>\n  <button class=\"demo-c-pill like\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>44</span></button>\n  <button class=\"demo-c-pill like active\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>45</span></button>\n  <button class=\"demo-c-pill dislike\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M17 2V14M22 12V4a2 2 0 00-2-2H6.5a2 2 0 00-2 1.6l-1.4 7A2 2 0 005.1 15H10l-1 5 .5 1a2 2 0 003.4.3L17 16H22z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button>\n  <button class=\"demo-c-pill dislike active\" type=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M17 2V14M22 12V4a2 2 0 00-2-2H6.5a2 2 0 00-2 1.6l-1.4 7A2 2 0 005.1 15H10l-1 5 .5 1a2 2 0 003.4.3L17 16H22z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button>\n</div>",
      "mobile": "<div style=\"display:flex;gap:8px\">\n  <button class=\"demo-c-pill tip active\" type=\"button\" style=\"font-size:13px;padding:9px 12px\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg><span>22</span></button>\n  <button class=\"demo-c-pill like active\" type=\"button\" style=\"font-size:13px;padding:9px 12px\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg><span>44</span></button>\n</div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<div class=\"comment-reacts\">\n  <button type=\"button\" class=\"c-pill tip${c.tipped?' active':''}\" data-v=\"${c.tips}\">…<span>${fmt(c.tips)}</span></button>\n  <button type=\"button\" class=\"c-pill like${c.liked?' active':''}\" data-v=\"${c.likes}\">…</button>\n  <button type=\"button\" class=\"c-pill dislike${c.disliked?' active':''}\">…</button>\n</div>",
      "css": ".c-pill.tip.active{color:var(--orange);background:var(--orange-dim);}\n.c-pill.like.active{color:var(--green);background:rgba(31,164,99,.12);}\n.c-pill.dislike.active{color:var(--red);background:rgba(229,69,63,.1);}"
    }
  },
  {
    "id": "comment-ctx",
    "title": "Comment context menu",
    "blurb": "… button opens fixed .ctx-menu (report / copy / delete).",
    "tags": [
      "comments"
    ],
    "interactions": [
      "comment-more.active",
      "danger delete row",
      "haptic: selection"
    ],
    "preview": {
      "desktop": "<div style=\"position:relative;width:200px\">\n  <button type=\"button\" style=\"margin-left:auto;display:block;border:none;background:var(--line);border-radius:8px;width:28px;height:24px;color:var(--ink)\">…</button>\n  <div style=\"margin-top:6px;background:var(--card);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow);padding:6px;min-width:168px\">\n    <button type=\"button\" style=\"display:block;width:100%;text-align:left;border:none;background:none;padding:9px 12px;border-radius:8px;font-size:13px\">Copy text</button>\n    <button type=\"button\" style=\"display:block;width:100%;text-align:left;border:none;background:none;padding:9px 12px;border-radius:8px;font-size:13px\">Report</button>\n    <button type=\"button\" style=\"display:block;width:100%;text-align:left;border:none;background:none;padding:9px 12px;border-radius:8px;font-size:13px;color:var(--red)\">Delete</button>\n  </div>\n</div>",
      "mobile": "<div class=\"cs-note\">Same <code>.ctx-menu</code> — fixed position near the … control.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": ""
    },
    "code": {
      "css": ".ctx-menu{position:fixed;z-index:210;background:var(--card);border:1px solid var(--line);\n  border-radius:12px;box-shadow:var(--shadow);padding:6px;min-width:168px;\n  opacity:0;pointer-events:none;transform:scale(.94);}\n.ctx-menu.show{opacity:1;transform:scale(1);pointer-events:auto;}\n.ctx-menu button.danger{color:var(--red);}",
      "js": "ctxMenu.className = 'ctx-menu';\n// position near .comment-more, then ctxMenu.classList.add('show');"
    }
  },
  {
    "id": "comment-compose",
    "title": "Comment compose",
    "blurb": "Identity, anon pop, input rest/focus/ready, send.show.",
    "tags": [
      "comments"
    ],
    "matrix": [
      {
        "state": "rest",
        "desktop": "pill border #D1CDC7",
        "mobile": "safe-area padding",
        "selector": ".comment-input-row"
      },
      {
        "state": "focus",
        "desktop": "ink border + ring",
        "mobile": "same",
        "selector": ":focus-within"
      },
      {
        "state": "ready / send",
        "desktop": ".comment-send.show",
        "mobile": "same",
        "selector": ".comment-send.show"
      },
      {
        "state": "anon",
        "desktop": "is-anon hides attach",
        "mobile": "same",
        "selector": ".comment-compose.is-anon"
      }
    ],
    "interactions": [
      "identity opens anon pop",
      "toggle → haptic toggle",
      "Enter sends"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid\" style=\"gap:16px\">\n<div class=\"cs-state\"><div class=\"cap\">Rest</div>\n<div class=\"demo-pill-input\"><img class=\"av\" src=\"/public/anon-avatar.png\" alt=\"\"><span class=\"ph\">Post content to earn</span><span style=\"color:var(--ink)\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8.7 13.7H2.3V2.3h11.3v6.3M2.3 11l3-3 3.3 3.3M10 12.3h4.7M12.3 10v4.7M9.7 7.7a1.7 1.7 0 100-3.3 1.7 1.7 0 000 3.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg></span></div>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Focus + ready</div>\n<div class=\"demo-pill-input focus\"><img class=\"av\" src=\"/public/anon-avatar.png\" alt=\"\"><span class=\"ph\" style=\"color:var(--ink)\">gm frens</span>\n<button class=\"send\" type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" width=\"16\" height=\"16\"><path d=\"M12 19V5M12 5l-6 6M12 5l6 6\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button></div>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Anon pop</div>\n<div class=\"demo-anon-pop\"><img src=\"/public/anon-avatar.png\" alt=\"\"><span class=\"lbl\">Anon</span><button class=\"demo-switch on\" type=\"button\" aria-label=\"Anon\"></button></div>\n</div>\n</div>",
      "mobile": "<div class=\"demo-pill-input focus\"><img class=\"av\" src=\"/public/anon-avatar.png\" alt=\"\"><span class=\"ph\" style=\"color:var(--ink)\">Reply…</span><button class=\"send\" type=\"button\"><svg viewBox=\"0 0 24 24\" fill=\"none\" width=\"16\" height=\"16\"><path d=\"M12 19V5M12 5l-6 6M12 5l6 6\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></button></div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<div class=\"comment-compose\" id=\"commentCompose\">\n  <div class=\"comment-input-row\" id=\"commentInputRow\">\n    <div class=\"comment-identity\" id=\"commentIdentity\">\n      <button type=\"button\" class=\"comment-identity-btn\" id=\"commentIdentityBtn\" aria-expanded=\"false\">\n        <img class=\"circle\" id=\"commentInputAvatar\" src=\"\" alt=\"\">\n        <svg class=\"chev\" viewBox=\"0 0 12 12\">…</svg>\n      </button>\n      <div class=\"comment-anon-pop\" id=\"commentAnonPop\">\n        <img src=\"/public/anon-avatar.png\" alt=\"\" width=\"28\" height=\"28\">\n        <span class=\"anon-label\">Anon</span>\n        <button type=\"button\" class=\"anon-toggle\" id=\"commentAnonToggle\" role=\"switch\" aria-checked=\"false\">\n          <span class=\"anon-switch\"></span>\n        </button>\n      </div>\n    </div>\n    <input type=\"text\" id=\"commentInput\" placeholder=\"Post content to earn\">\n    <button type=\"button\" class=\"comment-attach-btn\" id=\"commentAttachBtn\">…</button>\n    <button type=\"button\" class=\"comment-send\" id=\"commentSendBtn\">…</button>\n  </div>\n</div>",
      "css": ".comment-input-row:focus-within{border-color:var(--ink);box-shadow:0 0 0 3px rgba(42,36,28,.06);}\n.comment-send{display:none;}\n.comment-send.show{display:inline-flex;}\n.comment-compose.is-anon .comment-attach,\n.comment-compose.is-anon .comment-attach-btn{display:none!important;}\n.comment-anon-pop.show{opacity:1;pointer-events:auto;}",
      "js": "commentCompose?.classList.toggle('is-anon', on);\ncommentSendBtn.classList.toggle('show', commentInput.value.trim().length > 0 || hasAttach);"
    }
  },
  {
    "id": "comment-attach",
    "title": "Comment attach",
    "blurb": "Preview, remove, pop-in, fly-in, drop stage, anon auto-exit.",
    "tags": [
      "comments"
    ],
    "matrix": [
      {
        "state": "preview",
        "desktop": ".comment-attach.show",
        "mobile": "same",
        "selector": ".comment-attach.show"
      },
      {
        "state": "remove",
        "desktop": "✕ top-right",
        "mobile": "same",
        "selector": ".comment-attach-remove"
      },
      {
        "state": "pop-in",
        "desktop": "attachPopIn / is-popping",
        "mobile": "same",
        "selector": ".is-popping"
      },
      {
        "state": "fly-in",
        "desktop": ".comment-fly fixed",
        "mobile": "same",
        "selector": ".comment-fly"
      },
      {
        "state": "drop stage",
        "desktop": "comments-inner.is-drop",
        "mobile": "same",
        "selector": ".comment-drop-stage"
      },
      {
        "state": "anon auto-exit",
        "desktop": "ensurePublicForMedia",
        "mobile": "same",
        "selector": "anon-exit anim"
      }
    ],
    "interactions": [
      "haptic: attach",
      "drag media from feed",
      "file input accept image/*,video/*,.gif"
    ],
    "preview": {
      "desktop": "<div class=\"cs-grid cols-3\">\n<div class=\"cs-state\"><div class=\"cap\">Preview</div>\n<div class=\"demo-attach\"><img src=\"/public/tabasco2.png\" alt=\"\"><span class=\"x\">✕</span></div>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Drop stage</div>\n<div class=\"demo-drop\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8.7 13.7H2.3V2.3h11.3v6.3M2.3 11l3-3 3.3 3.3M10 12.3h4.7M12.3 10v4.7M9.7 7.7a1.7 1.7 0 100-3.3 1.7 1.7 0 000 3.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg><span>Drop to attach</span></div>\n</div>\n<div class=\"cs-state\"><div class=\"cap\">Anon exit</div>\n<div class=\"cs-note\" style=\"margin:0\">Attaching forces public via <code>ensurePublicForMedia()</code> + <code>anon-exit</code> flash.</div>\n</div>\n</div>",
      "mobile": "<div class=\"demo-drop\"><svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"><path d=\"M8.7 13.7H2.3V2.3h11.3v6.3M2.3 11l3-3 3.3 3.3M10 12.3h4.7M12.3 10v4.7M9.7 7.7a1.7 1.7 0 100-3.3 1.7 1.7 0 000 3.3Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg><span>Drop to attach</span></div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "css": ".comment-attach.show{max-height:120px;opacity:1;pointer-events:auto;}\n.comment-attach-card.is-popping .comment-attach-thumb{animation:attachPopIn .58s both;}\n.comments-inner.is-drop .comment-drop-stage{opacity:1;}\n.comment-fly{position:fixed;z-index:420;border-radius:16px;pointer-events:none;}",
      "js": "function ensurePublicForMedia(){\n  // if anon on, flip off with anon-exit animations, return true if exited\n}\n// Successful drops restore the list after the fly-in; cancel restores immediately\nhaptic('attach');"
    }
  },
  {
    "id": "cfx",
    "title": "Comment focus (cfx)",
    "blurb": "Desktop stage beside comments; mobile lightbox + pinch zoom.",
    "tags": [
      "comments",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "desktop overlay",
        "desktop": "right:360px stage",
        "mobile": "—",
        "selector": ".cfx / @media min 861"
      },
      {
        "state": "mobile lightbox",
        "desktop": "—",
        "mobile": "z-index 90 full",
        "selector": "@media max 860 .cfx"
      },
      {
        "state": "caption reacts",
        "desktop": ".cfx-reacts",
        "mobile": "same",
        "selector": ".cfx-react"
      },
      {
        "state": "pinch zoom",
        "desktop": "—",
        "mobile": "transform + spring-back",
        "selector": ".cfx-media.is-gesturing"
      }
    ],
    "interactions": [
      "body.cfx-on",
      "close #cfxClose",
      "haptic: open / settle"
    ],
    "preview": {
      "desktop": "<div style=\"display:flex;gap:12px;align-items:stretch;background:#0c0b0a;padding:16px;border-radius:12px\">\n  <div class=\"demo-cfx-media\"><img src=\"/public/tabasco2.png\" alt=\"\"></div>\n  <div style=\"color:#fff;font-size:12px;display:flex;flex-direction:column;gap:8px;justify-content:flex-end\">\n    <div>caption reacts</div>\n    <div style=\"display:flex;gap:6px\">\n      <button class=\"demo-c-pill tip active\" type=\"button\" style=\"color:#fff\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12.012 10.1V9M12.012 17.2V18M9.7 15.4C10.5 17.1 14.1 17 14.1 15.2C14.1 12.8 9.9 14 9.9 11.6C9.9 10 12.5 9.7 13.7 10.8M12 6.4C18.5-.3 29.7 12.1 12 22C-5.7 12.1 5.5-.3 12 6.4Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"square\"/></svg> 22</button>\n      <button class=\"demo-c-pill like\" type=\"button\" style=\"color:#fff\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M7 22V10M2 12v8a2 2 0 002 2h13.5a2 2 0 002-1.6l1.4-7A2 2 0 0018.9 9H14l1-5-.5-1a2 2 0 00-3.4-.3L7 8H2z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg> 44</button>\n    </div>\n  </div>\n</div>",
      "mobile": "<div style=\"background:#0c0b0a;padding:20px;border-radius:12px;text-align:center\">\n  <div class=\"demo-cfx-media\" style=\"margin:0 auto;max-width:180px\"><img src=\"/public/tabasco2.png\" alt=\"\"></div>\n  <div class=\"cs-note\" style=\"margin-top:12px;border-color:rgba(255,255,255,.15);color:rgba(255,255,255,.65)\">Pinch / pan · <code>is-settling</code> spring-back</div>\n</div>",
      "dual": true,
      "desktopFrame": "dark-stage",
      "mobileFrame": "dark-stage"
    },
    "code": {
      "css": "@media(min-width:861px){ .cfx{right:360px;} .cfx-close{right:376px;} }\n@media(max-width:860px){\n  .cfx{right:0;z-index:90;touch-action:none;}\n  .cfx-media.is-gesturing img{transition:none;}\n  .cfx-media.is-settling img{transition:transform .55s cubic-bezier(.22,1.25,.36,1);}\n}\nbody.cfx-on #commentsDrawer{z-index:50;}",
      "html": "<div class=\"cfx\" id=\"cfx\" aria-hidden=\"true\">\n  <div class=\"cfx-stage\">\n    <div class=\"cfx-media\" id=\"cfxMedia\"></div>\n    <div class=\"cfx-caption\" id=\"cfxCaption\"></div>\n  </div>\n</div>\n<button type=\"button\" class=\"cfx-close\" id=\"cfxClose\">✕</button>"
    }
  },
  {
    "id": "trade-drawer",
    "title": "Trade drawer",
    "blurb": "Buy/sell sheet for the active token — same drawer chrome as comments.",
    "tags": [
      "overlays",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "open",
        "desktop": "#drawer.open 360px",
        "mobile": "bottom sheet",
        "selector": "#drawer.open"
      }
    ],
    "interactions": [
      "openDrawer(post)",
      "avatar-plus / ticker / pill",
      "haptic: open"
    ],
    "preview": {
      "desktop": "<div class=\"cs-state\" style=\"max-width:300px\"><div class=\"cap\">#drawer</div>\n<div style=\"display:flex;gap:10px;align-items:center;margin-bottom:12px\">\n  <img src=\"/public/tabasco2.png\" width=\"44\" height=\"44\" class=\"squircle\" style=\"border-radius:12px;object-fit:cover\" alt=\"\">\n  <div><div style=\"font-weight:700;font-size:14px\">$THINCK</div><div style=\"font-size:12px;color:var(--ink-faint)\">Meme token</div></div>\n</div>\n<div style=\"font-size:26px;font-weight:800;color:var(--green);margin-bottom:10px\">$356.32K</div>\n<div style=\"display:flex;background:var(--bg);border-radius:10px;padding:3px;margin-bottom:10px\">\n  <button type=\"button\" style=\"flex:1;border:none;background:var(--card);padding:9px;border-radius:8px;font-weight:700;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.06)\">Buy</button>\n  <button type=\"button\" style=\"flex:1;border:none;background:none;padding:9px;font-weight:700;font-size:13px;color:var(--ink-soft)\">Sell</button>\n</div>\n<button type=\"button\" style=\"width:100%;background:var(--green);color:#fff;border:none;border-radius:12px;padding:14px;font-weight:800\">Buy</button>\n</div>",
      "mobile": "<div class=\"cs-note\">Same content in vaul-style sheet ≤860px.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<div class=\"drawer\" id=\"drawer\">\n  <div class=\"sheet-handle\"></div>\n  <div class=\"drawer-inner\">\n    <div class=\"drawer-head\"><h3 id=\"drawerName\">Thinkc boutit</h3>\n      <button class=\"drawer-close\" id=\"drawerClose\">✕</button></div>\n    <div class=\"drawer-token\"><img id=\"drawerAvatar\" class=\"squircle\" src=\"\" alt=\"\">…</div>\n    <div class=\"mcap\">$356.32K</div>\n    <div class=\"drawer-tabs\"><button class=\"active\">Buy</button><button>Sell</button></div>\n    <div class=\"field\"><label>PAY</label><div class=\"val\">300 USDm</div></div>\n    <div class=\"field\"><label>GET</label><div class=\"val\">53,000,000 MADMAN</div></div>\n    <button class=\"buy-btn\">Buy</button>\n  </div>\n</div>",
      "js": "item.querySelector('.avatar-plus').addEventListener('click', (e)=>{\n  e.stopPropagation(); openDrawer(posts[item.dataset.index]); haptic('open');\n});"
    }
  },
  {
    "id": "share-modal",
    "title": "Share modal",
    "blurb": "Centered modal on desktop; bottom sheet on mobile.",
    "tags": [
      "overlays",
      "desktop",
      "mobile"
    ],
    "matrix": [
      {
        "state": "desktop",
        "desktop": "centered 420px modal",
        "mobile": "—",
        "selector": ".modal-overlay.show"
      },
      {
        "state": "mobile sheet",
        "desktop": "—",
        "mobile": "align flex-end",
        "selector": "@media max 860 .modal-overlay"
      }
    ],
    "interactions": [
      "openShare(post)",
      "Share on X / Copy url",
      "haptic: share"
    ],
    "preview": {
      "desktop": "<div class=\"cs-state\" style=\"max-width:320px\"><div class=\"cap\">Modal</div>\n<div style=\"border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#d7ebfd,#addafb);padding:18px;display:flex;justify-content:space-between;gap:12px\">\n  <div style=\"color:#0e2c56\"><div style=\"font-weight:800;font-style:italic\">Kumbaya</div>\n  <div style=\"margin-top:8px;background:rgba(255,255,255,.6);display:inline-block;padding:4px 12px;border-radius:16px;font-size:12px;font-weight:700\">Dare</div>\n  <div style=\"font-weight:800;font-size:18px;margin-top:8px\">Thinck Boutit</div>\n  <div style=\"color:#2f6fd0;font-weight:700\">$THINCK</div></div>\n  <img src=\"/public/tabasco2.png\" width=\"90\" height=\"90\" style=\"border-radius:12px;object-fit:cover\" alt=\"\">\n</div>\n<button type=\"button\" style=\"width:100%;margin-top:10px;padding:12px;border:none;border-radius:12px;background:#7cb2f0;color:#0e2c56;font-weight:800\">Share on X</button>\n</div>",
      "mobile": "<div class=\"cs-state\"><div class=\"cap\">Sheet</div>\n<div style=\"border-radius:20px 20px 0 0;border:1px solid var(--line);padding:10px 14px 16px;background:var(--card)\">\n  <div style=\"width:38px;height:5px;border-radius:99px;background:var(--ink-faint);opacity:.4;margin:4px auto 12px\"></div>\n  <div style=\"font-weight:700;margin-bottom:8px\">Share</div>\n  <div style=\"font-size:12px;color:var(--ink-soft)\">Full-width sheet · drag to dismiss</div>\n</div></div>",
      "dual": true,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "html": "<div class=\"modal-overlay\" id=\"shareOverlay\">\n  <div class=\"modal share-modal\">\n    <div class=\"sheet-handle\"></div>\n    <div class=\"share-head\"><h4>Share</h4><button class=\"share-close\" id=\"shareClose\">✕</button></div>\n    <div class=\"share-body\">\n      <div class=\"share-card\" id=\"shareCard\">…</div>\n      <button class=\"share-x-btn\" id=\"shareXBtn\">Share on X</button>\n      <button class=\"copy-url\" id=\"copyUrlBtn\">Copy url</button>\n    </div>\n  </div>\n</div>",
      "css": ".modal-overlay.show{opacity:1;pointer-events:auto;}\n@media (max-width:860px){\n  .modal-overlay{align-items:flex-end;}\n  .modal{width:100%!important;border-radius:20px 20px 0 0;\n    transform:translateY(calc(100% + 24px));}\n  .modal-overlay.show .modal{transform:translateY(0);}\n}"
    }
  },
  {
    "id": "haptics",
    "title": "Haptics",
    "blurb": "All presets — web-haptics + vibrate + native taptic fallback.",
    "tags": [
      "systems"
    ],
    "interactions": [
      "data-haptic triggers in cheatsheet",
      "pairs with PRESET_SOUND"
    ],
    "preview": {
      "desktop": "<div class=\"demo-haptic-row\"><button type=\"button\" data-haptic=\"light\">light</button><button type=\"button\" data-haptic=\"selection\">selection</button><button type=\"button\" data-haptic=\"nudge\">nudge</button><button type=\"button\" data-haptic=\"settle\">settle</button><button type=\"button\" data-haptic=\"attach\">attach</button><button type=\"button\" data-haptic=\"dragtick\">dragtick</button><button type=\"button\" data-haptic=\"toggle\">toggle</button><button type=\"button\" data-haptic=\"open\">open</button><button type=\"button\" data-haptic=\"comment\">comment</button><button type=\"button\" data-haptic=\"share\">share</button><button type=\"button\" data-haptic=\"tip\">tip</button><button type=\"button\" data-haptic=\"like\">like</button><button type=\"button\" data-haptic=\"dislike\">dislike</button></div><div class=\"cs-note\">Buttons use <code>data-haptic</code>; app.js should call <code>haptic(preset)</code> from feed.</div>",
      "mobile": "<div class=\"demo-haptic-row\"><button type=\"button\" data-haptic=\"light\">light</button><button type=\"button\" data-haptic=\"selection\">selection</button><button type=\"button\" data-haptic=\"nudge\">nudge</button><button type=\"button\" data-haptic=\"settle\">settle</button><button type=\"button\" data-haptic=\"attach\">attach</button><button type=\"button\" data-haptic=\"dragtick\">dragtick</button><button type=\"button\" data-haptic=\"toggle\">toggle</button><button type=\"button\" data-haptic=\"open\">open</button><button type=\"button\" data-haptic=\"comment\">comment</button><button type=\"button\" data-haptic=\"share\">share</button><button type=\"button\" data-haptic=\"tip\">tip</button><button type=\"button\" data-haptic=\"like\">like</button><button type=\"button\" data-haptic=\"dislike\">dislike</button></div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": "phone"
    },
    "code": {
      "js": "const WEB_HAPTIC_PRESETS = {\n  light:'light', selection:'selection', nudge:'nudge', settle:'success',\n  dragtick:'soft', toggle:'rigid', open:'medium', comment:'success',\n  tip:'success', like:'medium', dislike:'warning', share:'soft', attach:'success',\n};\nconst HAPTIC_PATTERNS = {\n  light:     { vibrate: [7], taps: 1 },\n  selection: { vibrate: [9, 24, 7], taps: 1 },\n  nudge:     { vibrate: [11, 32, 9], taps: 2, tapGap: 48 },\n  settle:    { vibrate: [13, 34, 17], taps: 2, tapGap: 42 },\n  attach:    { vibrate: [10, 28, 14, 40, 18], taps: 2, tapGap: 36 },\n  dragtick:  { vibrate: [3], taps: 0 },\n  toggle:    { vibrate: [5, 18, 5], taps: 1 },\n  open:      { vibrate: [8, 28, 9], taps: 1 },\n  comment:   { vibrate: [9, 30, 9], taps: 2, tapGap: 38 },\n  share:     { vibrate: [7, 32, 7], taps: 2, tapGap: 36 },\n  tip:       { vibrate: [9, 42, 11, 48, 16], taps: 3, tapGap: 52 },\n  like:      { vibrate: [7, 28, 11], taps: 2, tapGap: 32 },\n  dislike:   { vibrate: [26, 16, 22], taps: 1 },\n};\nfunction haptic(preset, soundKind, soundArg){\n  unlockAudio();\n  runVibration(preset || 'light');\n  const sound = soundKind === false ? null : (soundKind || PRESET_SOUND[preset] || 'light');\n  if(sound) playSound(sound, soundArg);\n}"
    }
  },
  {
    "id": "sounds",
    "title": "Sounds",
    "blurb": "Preset → WebAudio synth map (no ambient loop).",
    "tags": [
      "systems"
    ],
    "preview": {
      "desktop": "<table class=\"cs-matrix\"><thead><tr><th>Preset</th><th>Sound kind</th><th>Synth</th></tr></thead><tbody>\n<tr><td class=\"mono\">light / selection / nudge</td><td class=\"mono\">light</td><td>microClick</td></tr>\n<tr><td class=\"mono\">settle / attach</td><td class=\"mono\">settle</td><td>slotLand arpeggio</td></tr>\n<tr><td class=\"mono\">dragtick</td><td class=\"mono\">dragtick</td><td>slotReelTick (≤55ms)</td></tr>\n<tr><td class=\"mono\">toggle</td><td class=\"mono\">toggle</td><td>microClick 980/640</td></tr>\n<tr><td class=\"mono\">open</td><td class=\"mono\">open</td><td>microClick 760</td></tr>\n<tr><td class=\"mono\">comment</td><td class=\"mono\">comment</td><td>reactCommentSound</td></tr>\n<tr><td class=\"mono\">share</td><td class=\"mono\">share</td><td>reactShareSound</td></tr>\n<tr><td class=\"mono\">tip</td><td class=\"mono\">tip</td><td>reactTipSound</td></tr>\n<tr><td class=\"mono\">like</td><td class=\"mono\">like</td><td>reactLikeSound</td></tr>\n<tr><td class=\"mono\">dislike</td><td class=\"mono\">dislike</td><td>reactDislikeSound</td></tr>\n</tbody></table>",
      "mobile": "<div class=\"cs-note\">Audio unlocks on first pointerdown in <code>.feed-wrap</code>.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": ""
    },
    "code": {
      "js": "const PRESET_SOUND = {\n  light:'light', selection:'light', nudge:'light', settle:'settle', attach:'settle',\n  dragtick:'dragtick', toggle:'toggle', open:'open', comment:'comment', share:'share',\n  tip:'tip', like:'like', dislike:'dislike',\n};\nfunction playSound(kind, arg){\n  unlockAudio();\n  if(kind==='dragtick') slotReelTick(actx, arg || 0, 0);\n  else if(kind==='settle') slotLand(actx);\n  else if(kind==='tip') reactTipSound(actx);\n  else if(kind==='like') reactLikeSound(actx);\n  else if(kind==='dislike') reactDislikeSound(actx);\n  else if(kind==='comment') reactCommentSound(actx);\n  else if(kind==='share') reactShareSound(actx);\n  else if(kind==='toggle') reactToggleSound(actx);\n  else if(kind==='open') reactOpenSound(actx);\n  else if(kind==='light') microClick(actx);\n}"
    }
  },
  {
    "id": "apis",
    "title": "API index",
    "blurb": "Key functions from the feed.html IIFE.",
    "tags": [
      "systems"
    ],
    "preview": {
      "desktop": "<table class=\"cs-matrix\"><thead><tr><th>Function</th><th>Role</th></tr></thead><tbody>\n<tr><td class=\"mono\">haptic(preset, sound?, arg?)</td><td>Vibration + optional sound</td></tr>\n<tr><td class=\"mono\">springTo / goToIndex</td><td>Scroll engine</td></tr>\n<tr><td class=\"mono\">applyTransform / applyParallax</td><td>Card positions</td></tr>\n<tr><td class=\"mono\">layoutMeta / checkOverlayMode</td><td>Meta + glass rail</td></tr>\n<tr><td class=\"mono\">markMediaReady / Error</td><td>Media states</td></tr>\n<tr><td class=\"mono\">setFeedSound / syncMuteButtons</td><td>Video audio</td></tr>\n<tr><td class=\"mono\">openComments / openDrawer / openShare</td><td>Overlays</td></tr>\n<tr><td class=\"mono\">loadCommentsForPost</td><td>Comment list</td></tr>\n<tr><td class=\"mono\">ensurePublicForMedia</td><td>Anon → public for attach</td></tr>\n<tr><td class=\"mono\">enableSheetDrag</td><td>Mobile sheet dismiss</td></tr>\n<tr><td class=\"mono\">doRefresh / dampPull</td><td>Pull-to-refresh</td></tr>\n<tr><td class=\"mono\">togglePlayPause / endSpeedHold</td><td>Tap / 2× hold</td></tr>\n<tr><td class=\"mono\">userAvatar / makeBlockie</td><td>Identicons</td></tr>\n<tr><td class=\"mono\">setSidebarCollapsed / reflowDuringChrome</td><td>Sidebar chrome</td></tr>\n<tr><td class=\"mono\">fmt(n)</td><td>1.2K / 1.0M</td></tr>\n</tbody></table>",
      "mobile": "<div class=\"cs-note\">All live in the feed.html script IIFE — not ES modules.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": ""
    },
    "code": {
      "js": "// Entry points commonly wired from UI:\nopenComments(post)      // comments drawer\nopenDrawer(post)        // trade drawer\nopenShare(post)         // share modal\nsetFeedSound(on)        // session kb_feed_sound\nsetSidebarCollapsed(b)  // local kb_sidebar_collapsed\nhaptic('settle')        // onSettled index change\ncheckOverlayMode()      // resize / drawer / sidebar"
    }
  },
  {
    "id": "persistence",
    "title": "Persistence",
    "blurb": "localStorage + sessionStorage keys used by the prototype.",
    "tags": [
      "systems"
    ],
    "preview": {
      "desktop": "<table class=\"cs-matrix\"><thead><tr><th>Key</th><th>Store</th><th>Values</th><th>Purpose</th></tr></thead><tbody>\n<tr><td class=\"mono\">kb_sidebar_collapsed</td><td>localStorage</td><td>'1' / absent</td><td>Sidebar icon rail</td></tr>\n<tr><td class=\"mono\">kb_feed_hint_v6</td><td>localStorage</td><td>'1'</td><td>Dismiss swipe hint</td></tr>\n<tr><td class=\"mono\">kb_feed_sound</td><td>sessionStorage</td><td>'1' / '0'</td><td>Video unmuted for session</td></tr>\n</tbody></table>\n<div class=\"cs-note\">Theme (<code>html.dark</code>) is not persisted in feed.html — toggled live only.</div>",
      "mobile": "<div class=\"cs-note\">Same keys on mobile.</div>",
      "dual": false,
      "desktopFrame": "",
      "mobileFrame": ""
    },
    "code": {
      "js": "const FEED_SOUND_KEY = 'kb_feed_sound';\ntry{ feedSoundOn = sessionStorage.getItem(FEED_SOUND_KEY) === '1'; }catch(e){}\ntry{ sessionStorage.setItem(FEED_SOUND_KEY, on ? '1' : '0'); }catch(e){}\n\ntry{ feedHintDismissed = localStorage.getItem('kb_feed_hint_v6') === '1'; }catch(e){}\ntry{ localStorage.setItem('kb_feed_hint_v6','1'); }catch(e){}\n\ntry{ localStorage.setItem('kb_sidebar_collapsed', collapsed ? '1' : '0'); }catch(e){}\nif(localStorage.getItem('kb_sidebar_collapsed')==='1') setSidebarCollapsed(true);"
    }
  }
];

})();
