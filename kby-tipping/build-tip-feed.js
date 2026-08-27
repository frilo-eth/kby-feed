const fs = require('fs');
const shell = fs.readFileSync('tip-feed-shell.html', 'utf8');
const core = fs.readFileSync('tip-feed-core.js', 'utf8');
const out = `(function(){
  'use strict';
  let _activeBtn = null;
  let _activeCtx = null;
  const _hooks = { onCommit: null, onNoBalance: null, syncBalances: null, onReady: null, onBeforeInteract: null };

  function getFlipBtn() { return _activeBtn; }

  window.KbyTipping = {
    init(hooks) {
      Object.assign(_hooks, hooks || {});
    },
    setActive(btn, ctx) {
      _activeBtn = btn || null;
      if (ctx) _activeCtx = ctx;
    },
    activeBtn() { return _activeBtn; },
    activeCtx() { return _activeCtx; },
    syncBalances() {
      if (typeof _hooks.syncBalances === 'function') {
        const b = _hooks.syncBalances() || {};
        if (typeof window.KbyTipping._applyBalances === 'function') {
          window.KbyTipping._applyBalances(b.walletUsd, b.jarUsd);
        }
      }
    },
    wire(btn, ctx) {
      if (!btn) return;
      this.setActive(btn, ctx || _activeCtx);
      if (typeof wireTipButton === 'function') wireTipButton(btn);
    },
    /** Resume a pending tip without re-pressing the tip button (auth / top-up return). */
    openQuickTip(btn, ctx) {
      if (!btn) return;
      this.wire(btn, ctx);
      if (typeof window.KbyTipping.hide === 'function') window.KbyTipping.hide();
      this.syncBalances();
      if (typeof window.KbyTipping._openQuickTip === 'function') {
        window.KbyTipping._openQuickTip();
      }
    },
    simulateTap(btn, ctx) {
      if (!btn) return;
      this.wire(btn, ctx);
      // Core sets .hide to dismiss tip UI + clear reopen cooldown. Required so
      // resume after top-up does not only dismiss the stuck "broke" tooltip.
      if (typeof window.KbyTipping.hide === 'function') window.KbyTipping.hide();
      this.syncBalances();
      btn.classList.add('demo-tip-focus');
      setTimeout(() => btn.classList.remove('demo-tip-focus'), 1400);
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 42, pointerType: 'mouse', button: 0, buttons: 1 };
      setTimeout(() => {
        btn.dispatchEvent(new PointerEvent('pointerdown', opts));
        setTimeout(() => {
          btn.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, opts, { buttons: 0 })));
        }, 140);
      }, 80);
    },
    simulateHold(btn, ctx, holdMs) {
      if (!btn) return;
      holdMs = holdMs || 720;
      this.wire(btn, ctx);
      if (typeof window.KbyTipping.hide === 'function') window.KbyTipping.hide();
      this.syncBalances();
      btn.classList.add('demo-tip-focus');
      setTimeout(() => btn.classList.remove('demo-tip-focus'), holdMs + 400);
      const r = btn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, pointerId: 43, pointerType: 'mouse', button: 0, buttons: 1 };
      setTimeout(() => {
        btn.dispatchEvent(new PointerEvent('pointerdown', opts));
        setTimeout(() => {
          btn.dispatchEvent(new PointerEvent('pointerup', Object.assign({}, opts, { buttons: 0 })));
        }, holdMs);
      }, 80);
    },
    _ready() {
      if (typeof _hooks.onReady === 'function') _hooks.onReady();
    }
  };

  Object.defineProperty(window.KbyTipping, 'onCommit', {
    get() { return _hooks.onCommit; },
    set(fn) { _hooks.onCommit = fn; }
  });
  Object.defineProperty(window.KbyTipping, 'onNoBalance', {
    get() { return _hooks.onNoBalance; },
    set(fn) { _hooks.onNoBalance = fn; }
  });
  Object.defineProperty(window.KbyTipping, 'onBeforeInteract', {
    get() { return _hooks.onBeforeInteract; },
    set(fn) { _hooks.onBeforeInteract = fn; }
  });

  function injectShell() {
    if (document.getElementById('tipMinimodalOuter')) return;
    const host = document.createElement('div');
    host.id = 'kbyTipUiRoot';
    host.innerHTML = ${JSON.stringify(shell)};
    document.body.appendChild(host);
  }

  if (document.body) injectShell();
  else document.addEventListener('DOMContentLoaded', injectShell);

${core}
})();
`;
fs.writeFileSync('tip-feed.js', out);
console.log('built tip-feed.js');
