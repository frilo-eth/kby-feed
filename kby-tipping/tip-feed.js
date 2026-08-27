(function(){
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
    host.innerHTML = "<div id=\"kbyTipCoinRoot\" aria-hidden=\"true\" style=\"position:fixed;inset:0;pointer-events:none;z-index:85;overflow:visible;\">\n  <div class=\"coin-pool\" id=\"coinPool\"></div>\n</div>\n<!-- On-hold minimodal — Figma: https://www.figma.com/design/DYukWIAVscGqu85nfGUhT5/Frontend?node-id=6360-443577 · Wallet: node-id=8958-229651 -->\n<div class=\"tip-minimodal-outer\" id=\"tipMinimodalOuter\">\n<div class=\"tip-minimodal\" id=\"tipMinimodal\" role=\"dialog\" aria-label=\"Confirm tip\" aria-hidden=\"true\">\n  <div class=\"tip-minimodal-main\" id=\"tipMinimodalMain\">\n  <div class=\"tip-minimodal-top\">\n    <div class=\"tip-minimodal-col--left\">\n      <span class=\"tip-minimodal-countdown-line\" id=\"minimodalCountdownLine\">\n        <span class=\"tip-minimodal-countdown-label\">Tipping</span>\n        <span class=\"tip-minimodal-countdown-suffix\" id=\"minimodalCountdownSuffix\" aria-live=\"polite\"></span>\n      </span>\n      <div class=\"tip-minimodal-usd-row\" id=\"minimodalUsdRow\">\n        <span class=\"tip-minimodal-usd-prefix\">~$</span>\n        <span class=\"counter tip-minimodal-usd-counter\" id=\"minimodalUsdCounter\" data-value=\"\" aria-live=\"polite\"></span>\n      </div>\n    </div>\n    <div class=\"tip-minimodal-col--right\">\n      <div class=\"tip-minimodal-from\">\n        <svg class=\"tip-minimodal-from-icon-jar\" xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M10.9179 3.08213H10.4179V3.16327L10.4436 3.24024L10.9179 3.08213ZM11.5709 5.04108H12.0709V4.95995L12.0453 4.88297L11.5709 5.04108ZM11.5709 12.8769V13.3769H12.0709V12.8769H11.5709ZM2.42911 12.8769H1.92911V13.3769H2.42911V12.8769ZM2.42911 5.04108L1.95477 4.88297L1.92911 4.95995V5.04108H2.42911ZM3.08209 3.08213L3.55644 3.24024L3.58209 3.16327V3.08213H3.08209ZM3.08209 1.12317V0.623169V1.12317ZM11.2444 1.62317H11.7444V0.623169H11.2444V1.12317V1.62317ZM2.65847 0.623169H2.15847V1.62317H2.65847V1.12317V0.623169ZM10.9179 1.12317H10.4179V3.08213H10.9179H11.4179V1.12317H10.9179ZM10.9179 3.08213L10.4436 3.24024L11.0966 5.1992L11.5709 5.04108L12.0453 4.88297L11.3923 2.92401L10.9179 3.08213ZM11.5709 5.04108H11.0709V12.8769H11.5709H12.0709V5.04108H11.5709ZM11.5709 12.8769V12.3769H2.42911V12.8769V13.3769H11.5709V12.8769ZM2.42911 12.8769H2.92911V5.04108H2.42911H1.92911V12.8769H2.42911ZM2.42911 5.04108L2.90345 5.1992L3.55644 3.24024L3.08209 3.08213L2.60775 2.92401L1.95477 4.88297L2.42911 5.04108ZM3.08209 3.08213H3.58209V1.12317H3.08209H2.58209V3.08213H3.08209ZM3.08209 1.12317V1.62317H10.9179V1.12317V0.623169H3.08209V1.12317ZM10.9179 1.12317V1.62317H11.2444V1.12317V0.623169H10.9179V1.12317ZM3.08209 1.12317V0.623169H2.65847V1.12317V1.62317H3.08209V1.12317ZM7.77652 6.69746L8.22896 6.48464C7.87007 5.72164 7.09371 5.19176 6.19258 5.19176V5.69176V6.19176C6.69194 6.19176 7.12389 6.48469 7.32407 6.91027L7.77652 6.69746ZM6.19258 5.69176V5.19176C4.95023 5.19176 3.94311 6.19888 3.94311 7.44122H4.44311H4.94311C4.94311 6.75116 5.50252 6.19176 6.19258 6.19176V5.69176ZM4.44311 7.44122H3.94311C3.94311 8.64939 4.89534 9.63482 6.09051 9.68841L6.11291 9.18891L6.13531 8.68942C5.47203 8.65968 4.94311 8.11209 4.94311 7.44122H4.44311ZM9.55693 8.51782H9.05693C9.05693 9.20789 8.49754 9.76728 7.80747 9.76728V10.2673V10.7673C9.04983 10.7673 10.0569 9.76018 10.0569 8.51782H9.55693ZM7.80747 10.2673V9.76728C7.1174 9.76728 6.558 9.20789 6.558 8.51782H6.058H5.558C5.558 9.76018 6.56511 10.7673 7.80747 10.7673V10.2673ZM6.058 8.51782H6.558C6.558 7.82774 7.11739 7.26835 7.80747 7.26835V6.76835V6.26835C6.56511 6.26835 5.558 7.27546 5.558 8.51782H6.058ZM7.80747 6.76835V7.26835C8.49754 7.26835 9.05693 7.82774 9.05693 8.51782H9.55693H10.0569C10.0569 7.27546 9.04983 6.26835 7.80747 6.26835V6.76835Z\" fill=\"#50463B\"/>\n        </svg>\n        <svg class=\"tip-minimodal-from-icon-wallet\" xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M9.14757 8.82292C9.34894 8.82292 9.51216 8.6597 9.51216 8.45833C9.51216 8.25697 9.34894 8.09375 9.14757 8.09375C8.94621 8.09375 8.78299 8.25697 8.78299 8.45833C8.78299 8.6597 8.94621 8.82292 9.14757 8.82292Z\" fill=\"#50463B\"/>\n          <path d=\"M9.73098 4.95848H3.60598C2.80056 4.95848 2.14764 4.30556 2.14764 3.50014C2.14764 2.69473 2.80056 2.04181 3.60598 2.04181H9.73098V4.95848ZM9.73098 4.95848H12.0643V11.9585H3.89764C2.93115 11.9585 2.14764 11.175 2.14764 10.2085V3.79181M9.14757 8.82292C9.34894 8.82292 9.51216 8.6597 9.51216 8.45833C9.51216 8.25697 9.34894 8.09375 9.14757 8.09375C8.94621 8.09375 8.78299 8.25697 8.78299 8.45833C8.78299 8.6597 8.94621 8.82292 9.14757 8.82292Z\" stroke=\"#50463B\" stroke-linecap=\"square\"/>\n        </svg>\n        <span id=\"minimodalFromLabel\">From Jar</span>\n      </div>\n      <div class=\"tip-minimodal-token-row\" id=\"minimodalTokenRow\">\n        <span class=\"counter tip-minimodal-token-counter\" id=\"minimodalTokenCounter\" data-value=\"\" aria-live=\"polite\"></span>\n        <span class=\"tip-minimodal-token-suffix\">K</span>\n      </div>\n    </div>\n  </div>\n  <div class=\"tip-minimodal-progress-wrap\">\n    <div class=\"tip-minimodal-progress-slot\" id=\"minimodalProgressSlot\" style=\"--bar-flip-dur: 200ms;\">\n      <div class=\"tip-minimodal-progress tip-minimodal-progress--jar\" id=\"minimodalProgressJarLayer\" aria-hidden=\"true\">\n        <div class=\"tip-minimodal-progress-inner\">\n          <div class=\"tip-minimodal-progress-fill tip-minimodal-progress-fill--jar\" id=\"minimodalProgressJarFill\"></div>\n        </div>\n      </div>\n      <div class=\"tip-minimodal-progress tip-minimodal-progress--wallet\" id=\"minimodalProgressWalletLayer\" aria-hidden=\"true\">\n        <div class=\"tip-minimodal-progress-inner\">\n          <div class=\"tip-minimodal-progress-fill tip-minimodal-progress-fill--wallet\" id=\"minimodalProgressWalletFill\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"tip-minimodal-cap-row\" id=\"minimodalCapRow\" aria-live=\"polite\">\n      <span class=\"tip-minimodal-cap-row-left\" id=\"minimodalCapLeft\"></span>\n      <span class=\"tip-minimodal-cap-row-right\" id=\"minimodalCapRight\"></span>\n    </div>\n    <div class=\"tip-minimodal-bottom-info\" id=\"minimodalBottomInfo\" aria-live=\"polite\">\n      <div class=\"tip-minimodal-bottom-side tip-minimodal-bottom-side--jar\" id=\"minimodalBottomJar\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M10.9179 3.08213H10.4179V3.16327L10.4436 3.24024L10.9179 3.08213ZM11.5709 5.04108H12.0709V4.95995L12.0453 4.88297L11.5709 5.04108ZM11.5709 12.8769V13.3769H12.0709V12.8769H11.5709ZM2.42911 12.8769H1.92911V13.3769H2.42911V12.8769ZM2.42911 5.04108L1.95477 4.88297L1.92911 4.95995V5.04108H2.42911ZM3.08209 3.08213L3.55644 3.24024L3.58209 3.16327V3.08213H3.08209ZM3.08209 1.12317V0.623169V1.12317ZM11.2444 1.62317H11.7444V0.623169H11.2444V1.12317V1.62317ZM2.65847 0.623169H2.15847V1.62317H2.65847V1.12317V0.623169ZM10.9179 1.12317H10.4179V3.08213H10.9179H11.4179V1.12317H10.9179ZM10.9179 3.08213L10.4436 3.24024L11.0966 5.1992L11.5709 5.04108L12.0453 4.88297L11.3923 2.92401L10.9179 3.08213ZM11.5709 5.04108H11.0709V12.8769H11.5709H12.0709V5.04108H11.5709ZM11.5709 12.8769V12.3769H2.42911V12.8769V13.3769H11.5709V12.8769ZM2.42911 12.8769H2.92911V5.04108H2.42911H1.92911V12.8769H2.42911ZM2.42911 5.04108L2.90345 5.1992L3.55644 3.24024L3.08209 3.08213L2.60775 2.92401L1.95477 4.88297L2.42911 5.04108ZM3.08209 3.08213H3.58209V1.12317H3.08209H2.58209V3.08213H3.08209ZM3.08209 1.12317V1.62317H10.9179V1.12317V0.623169H3.08209V1.12317ZM10.9179 1.12317V1.62317H11.2444V1.12317V0.623169H10.9179V1.12317ZM3.08209 1.12317V0.623169H2.65847V1.12317V1.62317H3.08209V1.12317ZM7.77652 6.69746L8.22896 6.48464C7.87007 5.72164 7.09371 5.19176 6.19258 5.19176V5.69176V6.19176C6.69194 6.19176 7.12389 6.48469 7.32407 6.91027L7.77652 6.69746ZM6.19258 5.69176V5.19176C4.95023 5.19176 3.94311 6.19888 3.94311 7.44122H4.44311H4.94311C4.94311 6.75116 5.50252 6.19176 6.19258 6.19176V5.69176ZM4.44311 7.44122H3.94311C3.94311 8.64939 4.89534 9.63482 6.09051 9.68841L6.11291 9.18891L6.13531 8.68942C5.47203 8.65968 4.94311 8.11209 4.94311 7.44122H4.44311ZM9.55693 8.51782H9.05693C9.05693 9.20789 8.49754 9.76728 7.80747 9.76728V10.2673V10.7673C9.04983 10.7673 10.0569 9.76018 10.0569 8.51782H9.55693ZM7.80747 10.2673V9.76728C7.1174 9.76728 6.558 9.20789 6.558 8.51782H6.058H5.558C5.558 9.76018 6.56511 10.7673 7.80747 10.7673V10.2673ZM6.058 8.51782H6.558C6.558 7.82774 7.11739 7.26835 7.80747 7.26835V6.76835V6.26835C6.56511 6.26835 5.558 7.27546 5.558 8.51782H6.058ZM7.80747 6.76835V7.26835C8.49754 7.26835 9.05693 7.82774 9.05693 8.51782H9.55693H10.0569C10.0569 7.27546 9.04983 6.26835 7.80747 6.26835V6.76835Z\" fill=\"#50463B\"/>\n        </svg>\n        <span id=\"minimodalBottomJarText\"></span>\n      </div>\n      <div class=\"tip-minimodal-bottom-side tip-minimodal-bottom-side--wallet\" id=\"minimodalBottomWallet\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"11\" height=\"11\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\">\n          <path d=\"M9.14757 8.82292C9.34894 8.82292 9.51216 8.6597 9.51216 8.45833C9.51216 8.25697 9.34894 8.09375 9.14757 8.09375C8.94621 8.09375 8.78299 8.25697 8.78299 8.45833C8.78299 8.6597 8.94621 8.82292 9.14757 8.82292Z\" fill=\"#50463B\"/>\n          <path d=\"M9.73098 4.95848H3.60598C2.80056 4.95848 2.14764 4.30556 2.14764 3.50014C2.14764 2.69473 2.80056 2.04181 3.60598 2.04181H9.73098V4.95848ZM9.73098 4.95848H12.0643V11.9585H3.89764C2.93115 11.9585 2.14764 11.175 2.14764 10.2085V3.79181M9.14757 8.82292C9.34894 8.82292 9.51216 8.6597 9.51216 8.45833C9.51216 8.25697 9.34894 8.09375 9.14757 8.09375C8.94621 8.09375 8.78299 8.25697 8.78299 8.45833C8.78299 8.6597 8.94621 8.82292 9.14757 8.82292Z\" stroke=\"#50463B\" stroke-linecap=\"square\"/>\n        </svg>\n        <span class=\"tip-minimodal-bottom-wallet-val\" id=\"minimodalBottomWalletText\"></span>\n      </div>\n    </div>\n  </div>\n  </div>\n  <p class=\"tip-minimodal-no-balance-tooltip\" id=\"minimodalNoBalanceTooltip\" role=\"status\" aria-live=\"polite\" hidden>Hold your horses! You're broke.</p>\n  <div class=\"tip-minimodal-actions\">\n    <button type=\"button\" class=\"tip-minimodal-send\" id=\"minimodalSend\">Send</button>\n    <button type=\"button\" class=\"tip-minimodal-cancel\" id=\"minimodalCancel\">Cancel</button>\n  </div>\n</div>\n</div>\n    <template id=\"coinTemplate\">\n      <div class=\"coin-spawn\">\n        <div class=\"coin-wrapper\">\n          <div class=\"coin\">\n            <div class=\"coin-face front\">\n              <svg width=\"64\" height=\"64\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"8.00004\" cy=\"7.99906\" r=\"6.335\" fill=\"url(#g1)\"/>\n                <path d=\"M9.14851 8.46216C9.20078 8.7638 9.06263 8.97469 8.98861 9.0004C8.7434 8.86 8.63479 8.67423 8.5627 8.41056L7.89937 8.38836C8.04995 8.92406 8.80402 9.47982 9.13122 9.02688C9.23459 8.89349 9.23847 8.63995 9.18562 8.46236H9.14851V8.46216ZM6.45903 8.34182H5.6694C5.61636 9.16183 7.1995 9.56355 7.01414 8.50656C7.00443 8.45165 6.98714 8.39674 6.92399 8.38836C6.98072 8.49994 6.98442 8.98501 6.8078 8.94646C6.76602 8.93711 6.37762 8.46178 6.45903 8.34182ZM5.06552 9.3217L3.99805 8.18214C4.41618 8.10503 4.69208 8.09471 4.97207 8.11185L4.04351 6.78321C4.16748 6.7614 5.15451 6.78321 5.15451 6.78321C5.2948 6.58459 5.21669 5.47404 5.25108 5.17922C5.32355 5.09744 5.57711 5.4867 5.62044 5.52993C5.7751 5.68474 6.51266 6.65956 6.51266 6.65956L7.71342 6.64417C7.91103 6.33592 8.7605 5.20766 8.94353 5.17825C9.04573 5.16189 9.03135 5.31398 9.03407 5.38797C9.05311 5.89817 8.93381 6.26095 9.03407 6.75848C9.30201 6.74134 10.7392 6.73472 11.1754 6.75848C11.3398 6.76724 12.1438 6.88116 11.9206 7.18221C11.5522 7.51792 11.5114 7.4967 11.6149 7.82968L11.3134 7.70545L10.8688 8.09237L11.0105 8.48125L10.6844 8.32215L10.3347 8.66858L10.4068 8.89933C10.2434 8.90167 10.0862 8.79788 9.94281 8.92309L10.3951 9.21888L10.6617 9.08627C10.6881 9.08764 10.6975 9.29191 10.7068 9.40952C10.7095 9.44399 11.1063 9.81592 11.1364 9.82391L11.5215 9.69091C11.5425 10.095 11.3862 10.2202 11.757 10.4081C11.9206 10.491 12.0018 10.6755 12.0018 10.6755C12.0018 10.7561 11.4218 10.7983 11.2671 10.8085C10.6753 10.848 9.97059 10.8201 9.35972 10.8085C8.14282 10.7853 6.88727 10.8071 5.66921 10.8085C5.55069 10.8085 4.81974 10.181 4.67518 10.0369C4.47039 9.83228 4.23626 9.65566 4.04351 9.43737L5.06494 9.3215H5.06533L5.06552 9.3217Z\" fill=\"#C6953D\"/>\n                <path d=\"M14.3337 8.0013C14.3337 11.4991 11.4981 14.3346 8.00033 14.3346C4.50252 14.3346 1.66699 11.4991 1.66699 8.0013C1.66699 4.5035 4.50252 1.66797 8.00033 1.66797C11.4981 1.66797 14.3337 4.5035 14.3337 8.0013Z\" stroke=\"#C6953D\" stroke-linecap=\"square\"/>\n                <defs>\n                  <linearGradient id=\"g1\" x1=\"8\" y1=\"14.334\" x2=\"8\" y2=\"1.664\" gradientUnits=\"userSpaceOnUse\">\n                    <stop offset=\"0.25\" stop-color=\"#FFD05B\"/>\n                    <stop offset=\"1\" stop-color=\"#FFEEC5\"/>\n                  </linearGradient>\n                </defs>\n              </svg>\n              <div class=\"shine\"></div>\n            </div>\n            <div class=\"coin-face back\">\n              <svg width=\"64\" height=\"64\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"8.00004\" cy=\"7.99906\" r=\"6.335\" fill=\"url(#g2)\"/>\n                <path d=\"M8.00033 4.83464V4.13093M8.00033 11.168V11.8717M9.66699 6.0013C9.36279 5.58063 8.65153 5.18649 8.00033 5.18649C7.23879 5.18649 6.24107 5.5123 6.24107 6.43752C6.24107 8.44117 9.75959 7.5979 9.75959 9.51137C9.75959 10.4366 8.77386 10.8161 8.00033 10.8161C7.34913 10.8161 6.54525 10.422 6.24107 10.0013M14.3337 8.0013C14.3337 11.4991 11.4981 14.3346 8.00033 14.3346C4.50252 14.3346 1.66699 11.4991 1.66699 8.0013C1.66699 4.5035 4.50252 1.66797 8.00033 1.66797C11.4981 1.66797 14.3337 4.5035 14.3337 8.0013Z\" stroke=\"#C6953D\" stroke-linecap=\"square\"/>\n                <defs>\n                  <linearGradient id=\"g2\" x1=\"8\" y1=\"14.334\" x2=\"8\" y2=\"1.664\" gradientUnits=\"userSpaceOnUse\">\n                    <stop offset=\"0.25\" stop-color=\"#FFD05B\"/>\n                    <stop offset=\"1\" stop-color=\"#FFEEC5\"/>\n                  </linearGradient>\n                </defs>\n              </svg>\n              <div class=\"shine\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </template>\n";
    document.body.appendChild(host);
  }

  if (document.body) injectShell();
  else document.addEventListener('DOMContentLoaded', injectShell);

  let total = 512.23;

  const BASE   = 512.23;
  /** Single-tap / per-step tip = 1% of remaining balance in the active bucket (jar, then wallet), min $0.01 */
  const TIP_BALANCE_PCT = 0.01;

  function roundTipUsd(n) {
    return Math.round(n * 100) / 100;
  }

  /** One step: 1% of `remainingUsd` (jar or wallet slice left to spend), at least one cent when balance > 0 */
  function tipPctIncrementFromRemainingUsd(remainingUsd) {
    if (remainingUsd <= 0) return 0;
    return Math.max(0.01, roundTipUsd(TIP_BALANCE_PCT * remainingUsd));
  }

  /** Remaining USD in the active funding bucket (jar cap slice first, then wallet) for countdown taps */
  function countdownTapBasisRemainingUsd() {
    const pend = pendingMinimodalUsd;
    const availJar = sessionAvailJarUsd;
    const wallet = sessionWalletUsd;
    if (availJar > 0 && pend < availJar - 1e-9) {
      return Math.max(0, availJar - pend);
    }
    const walletSpent = availJar > 0 ? Math.max(0, pend - availJar) : pend;
    return Math.max(0, wallet - walletSpent);
  }

  function countdownTapIncrementUsd() {
    return tipPctIncrementFromRemainingUsd(countdownTapBasisRemainingUsd());
  }

  /** Quick flip (modal closed): one step = 1% of total live tip balance */
  function defaultFlipTapTipUsd() {
    return tipPctIncrementFromRemainingUsd(liveTipBalanceCapUsd());
  }

  function formatAmount(n) {
    return n.toFixed(2);
  }

  function formatInteger(n) {
    return Math.round(n).toString();
  }

  function renderCounter(container, value, formatFn) {
    const str = (formatFn || formatAmount)(value);
    container.innerHTML = '';
    container.dataset.value = str;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const slot = document.createElement('span');
      slot.className = 'digit-slot';

      if (ch === '.') {
        slot.classList.add('decimal');
        slot.innerHTML = '<span class="digit-roll"><span class="digit-cell">.</span></span>';
      } else {
        const roll = document.createElement('span');
        roll.className = 'digit-roll';
        for (let d = 0; d <= 9; d++) {
          const cell = document.createElement('span');
          cell.className = 'digit-cell';
          cell.textContent = d;
          roll.appendChild(cell);
        }
        const d = parseInt(ch, 10);
        roll.style.transform = `translateY(-${d * 1.2}em)`;
        slot.appendChild(roll);
      }
      container.appendChild(slot);
    }
  }

  function updateCounter(container, newValue, formatFn) {
    const newStr = (formatFn || formatAmount)(newValue);
    container.dataset.value = newStr;

    let slotIdx = 0;
    for (let i = 0; i < newStr.length; i++) {
      const ch = newStr[i];
      const slot = container.children[slotIdx];
      if (!slot) break;

      if (ch === '.') {
        slotIdx++;
        continue;
      }

      const roll = slot.querySelector('.digit-roll');
      if (roll && roll.children.length > 1) {
        const digit = parseInt(ch, 10);
        roll.style.transform = `translateY(-${digit * 1.2}em)`;
      }
      slotIdx++;
    }
  }

  const VARIANTS = ['', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'];
  const DURATIONS = { '': 390, 'v2': 370, 'v3': 405, 'v4': 385, 'v5': 395, 'v6': 365, 'v7': 415, 'v8': 375 };
  let lastConfettiAt = 0;
  let tickTimeout = 0;
  let iconPopTimeout = 0;

  function spawnCoin(opts) {
    const grand = opts && opts.grand;
    const pool   = document.getElementById('coinPool');
    const tpl    = document.getElementById('coinTemplate');
    const spawn  = tpl.content.cloneNode(true);

    const suffix = Math.random().toString(36).slice(2, 8);
    spawn.querySelectorAll('[id]').forEach(el => { el.id = el.id + suffix; });
    spawn.querySelectorAll('[fill]').forEach(el => {
      const fill = el.getAttribute('fill');
      if (fill && fill.startsWith('url(#g')) {
        const m = fill.match(/url\(#(g\d?)\)/);
        if (m) el.setAttribute('fill', `url(#${m[1]}${suffix})`);
      }
    });

    const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    const duration = DURATIONS[variant];
    const offsetX = 12 + (Math.random() - 0.5) * 22;
    const scale = 0.94 + Math.random() * 0.12;
    const tilt = (Math.random() - 0.5) * 4;

    const spawnEl = spawn.querySelector('.coin-spawn');
    spawnEl.style.left = offsetX + 'px';
    spawnEl.style.transform = `scale(${scale}) rotate(${tilt}deg)`;
    spawnEl.style.transformOrigin = 'center bottom';
    spawn.querySelector('.coin').classList.add('flipping', variant);

    pool.appendChild(spawn);
    const added = pool.lastElementChild;

    if (grand) {
      setTimeout(() => spawnCoin(), 240);
    }

    setTimeout(() => {
      const btn = getFlipBtn();
      const btnRect = btn.getBoundingClientRect();
      const cx = (btnRect.left + btnRect.width  / 2) / window.innerWidth;
      const cy = (btnRect.top  + btnRect.height / 2) / window.innerHeight;

      const cOpts = {
        origin: { x: cx, y: cy },
        spread: grand ? 72 : 65,
        angle: 90,
        ticks: grand ? 48 : 40,
        gravity: 0.35,
        decay: 0.93,
        startVelocity: grand ? 13 : 12,
        drift: 0.35,
        colors: ['#FFD05B', '#FFEEC5', '#C6953D', '#FFCA6C', '#e8b84b', '#F97316', '#FF9270', '#FFB088', '#FFE5DD', '#FFDAB9'],
        shapes: ['circle'],
        zIndex: 9999,
      };

      const fire = (typeof confetti === 'function' ? confetti : window.confetti);
      if (fire && (Date.now() - lastConfettiAt) > 500) {
        lastConfettiAt = Date.now();
        fire({ ...cOpts, particleCount: grand ? 32 : 20, scalar: grand ? 0.58 : 0.5 });
      }

      if (added.parentNode) added.remove();
    }, duration);
  }

  function fireTipParticles(btn, particleOpts) {
    const wallet = particleOpts && particleOpts.wallet;
    const rect = btn.getBoundingClientRect();
    const cx = (rect.left + rect.width / 2) / window.innerWidth;
    const cy = (rect.top + rect.height / 2) / window.innerHeight;
    const fire = (typeof confetti === 'function' ? confetti : window.confetti);
    if (!fire) return;
    if (wallet) {
      fire({
        origin: { x: cx, y: cy },
        spread: 82,
        angle: 90,
        ticks: 62,
        gravity: 0.3,
        decay: 0.945,
        startVelocity: 15,
        drift: 0.32,
        colors: ['#FFD05B', '#FFEEC5', '#C43100', '#FF9361', '#FF7A45', '#FFECB3', '#FFF59D', '#FFFDE7', '#F97316'],
        shapes: ['circle'],
        particleCount: 58,
        scalar: 0.58,
        zIndex: 9999,
      });
      setTimeout(() => {
        fire({
          origin: { x: cx, y: cy },
          spread: 58,
          angle: 90,
          ticks: 48,
          gravity: 0.36,
          decay: 0.93,
          startVelocity: 11,
          drift: 0.38,
          colors: ['#FFD05B', '#F97316', '#FF9361', '#FFECB3', '#FFE0B2'],
          shapes: ['circle'],
          particleCount: 34,
          scalar: 0.48,
          zIndex: 9999,
        });
      }, 200);
    } else {
      fire({
        origin: { x: cx, y: cy },
        spread: 60,
        angle: 90,
        ticks: 35,
        gravity: 0.35,
        decay: 0.94,
        startVelocity: 8,
        drift: 0.4,
        colors: ['#FFD05B', '#FFEEC5', '#F97316', '#FFCA6C', '#FFB088', '#FFE5DD', '#e8b84b'],
        shapes: ['circle'],
        particleCount: 14,
        scalar: 0.4,
        zIndex: 9999,
      });
    }
  }

  function getAvailableJarUsdLive() {
    tickJarSliceCooldown();
    if (jarTokenBalanceK <= 1e-12 || jarBalanceUsd <= 0) return 0;
    const rec = ensureJarSliceRec();
    if (isJarSliceCooldownActive(rec)) return 0;
    return Math.min(jarBalanceUsd, jarSliceRemainingUsd(rec));
  }

  function walletPortionBeforeDeplete(amt) {
    const fromJar = Math.min(amt, getAvailableJarUsdLive());
    return Math.round((amt - fromJar) * 100) / 100;
  }

  function triggerFlip(amount = defaultFlipTapTipUsd()) {
    const cap = liveTipBalanceCapUsd();
    const amt = Math.min(Math.round(amount * 100) / 100, cap);
    if (amt <= 0) return;
    const fromWallet = walletPortionBeforeDeplete(amt);
    const btn = getFlipBtn();
    if (!btn) return;
    const fromJar = Math.round((amt - fromWallet) * 100) / 100;
    const ctx = window.KbyTipping?.activeCtx?.() || null;
    if (window.KbyTipping?.onCommit) {
      if (fromJar > 0) depleteTipBalances(fromJar);
      window.KbyTipping.onCommit(amt, { fromWallet, fromJar }, ctx);
    } else {
      depleteTipBalances(amt);
    }
    clearTimeout(iconPopTimeout);
    btn.classList.remove('icon-pop');
    void btn.offsetWidth;
    btn.classList.add('icon-pop');
    const popMs = fromWallet > 0 ? 340 : 220;
    iconPopTimeout = setTimeout(() => { btn.classList.remove('icon-pop'); iconPopTimeout = 0; }, popMs);
    btn.classList.remove('pulse');
    void btn.offsetWidth;
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), fromWallet > 0 ? 720 : 520);
    fireTipParticles(btn, { wallet: fromWallet > 0 });
    if (fromWallet > 0) {
      const h = window.__kbyWebHaptics;
      if (h) h.trigger('success', { intensity: 0.85 });
    }
    positionCoinPoolAtBtn();
    spawnCoin(fromWallet > 0 ? { grand: true } : undefined);
  }

  const VOTE_BASE = 256;
  let upvoted = false;
  let downvoted = false;

  function getVoteNet() {
    return Math.max(0, VOTE_BASE + (upvoted ? 1 : downvoted ? -1 : 0));
  }

  function updateVoteCounter() {
    const counter = document.getElementById('voteCounter');
    const net = getVoteNet();
    renderCounter(counter, net, formatInteger);
    counter.classList.remove('tick');
    void counter.offsetWidth;
    counter.classList.add('tick');
    setTimeout(() => counter.classList.remove('tick'), 360);
  }

  function triggerVotePulse(btn, colors) {
    btn.classList.remove('pulse');
    void btn.offsetWidth;
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 460);
    const rect = btn.getBoundingClientRect();
    const cx = (rect.left + rect.width / 2) / window.innerWidth;
    const cy = (rect.top + rect.height / 2) / window.innerHeight;
    const fire = (typeof confetti === 'function' ? confetti : window.confetti);
    if (fire) {
      fire({
        origin: { x: cx, y: cy },
        spread: 55,
        angle: 90,
        ticks: 32,
        gravity: 0.4,
        decay: 0.93,
        startVelocity: 9,
        drift: 0.35,
        colors,
        shapes: ['circle'],
        particleCount: 12,
        scalar: 0.38,
        zIndex: 9999,
      });
    }
  }

  function toggleUpvote() {
    if (downvoted) {
      document.getElementById('downvoteBtn').classList.remove('voted');
      downvoted = false;
    }
    upvoted = !upvoted;
    const btn = document.getElementById('upvoteBtn');
    btn.classList.toggle('voted', upvoted);
    triggerVotePulse(btn, ['#009860', '#55CEA1', '#C3FFEA', '#7DD3C0', '#B8E6D9', '#A8D8EA']);
    updateVoteCounter();
  }

  function toggleDownvote() {
    if (upvoted) {
      document.getElementById('upvoteBtn').classList.remove('voted');
      upvoted = false;
    }
    downvoted = !downvoted;
    const btn = document.getElementById('downvoteBtn');
    btn.classList.toggle('voted', downvoted);
    triggerVotePulse(btn, ['#D03F45', '#F18684', '#FFE1DD', '#E8A0A4', '#F5C6C8', '#F8D7DA']);
    updateVoteCounter();
  }

  /* ── On-hold minimodal ── */
  const HOLD_DELAY = 450;
  const MINIMODAL_SEC = 5;
  /** Time to ramp from $0 up to the segment cap while holding (ms); longer = gentler. */
  const HOLD_CHARGE_MAX_MS = 5200;
  /** Lower = more linear / less aggressive acceleration at the end of the hold. */
  const HOLD_CHARGE_EASE = 1.75;
  const LS_JAR_USD = 'kby_jar_balance_usd';
  const LS_JAR_TOKEN_K = 'kby_jar_balance_token_k';
  const LS_WALLET_USD = 'kby_wallet_balance_usd';
  const LS_WALLET_TOKEN_K = 'kby_wallet_balance_token_k';
  const DEFAULT_JAR_BALANCE_USD = 0;
  const DEFAULT_JAR_TOKEN_K = 0;
  const DEFAULT_WALLET_BALANCE_USD = 0;
  const DEFAULT_WALLET_TOKEN_K = 0;
  function getCommentId() {
    const fromCtx = window.KbyTipping?.activeCtx?.()?.commentId;
    if (fromCtx) return fromCtx;
    try {
      return new URLSearchParams(window.location.search || '').get('comment') || 'feed-default';
    } catch (_) {
      return 'feed-default';
    }
  }

  const JAR_SLICE_PCT = 0.1;
  /** After jar slice (10% of ref balance) is used, jar is blocked for this long; wallet still tips. */
  const JAR_CAP_COOLDOWN_MS = 5 * 60 * 1000;
  /** Fast bar flip (wallet layer over jar) */
  const BAR_FLIP_MS = 200;
  const BAR_FLIP_STAGGER_MS = 90;

  let jarCapRecCache = null;

  function jarCapStorageKey() {
    return 'kby_jar_cap_' + getCommentId();
  }

  function roundUsd2(n) {
    return Math.round(Math.max(0, n) * 100) / 100;
  }

  function normalizeJarSliceRec(o) {
    if (!o || typeof o !== 'object') return null;
    if (o.v === 2 || typeof o.refJarUsd === 'number' || typeof o.spentJarUsd === 'number') {
      const refJarUsd = Math.max(0, Number(o.refJarUsd) || 0);
      const spentJarUsd = Math.max(0, Number(o.spentJarUsd) || 0);
      const cu = o.cooldownUntil;
      const cooldownUntil = cu != null && Number.isFinite(Number(cu)) ? Number(cu) : null;
      return { v: 2, refJarUsd, spentJarUsd, cooldownUntil };
    }
    return null;
  }

  function readJarSliceRec() {
    try {
      const raw = localStorage.getItem(jarCapStorageKey());
      if (!raw) {
        return jarCapRecCache ? normalizeJarSliceRec(jarCapRecCache) : null;
      }
      const o = JSON.parse(raw);
      let rec = normalizeJarSliceRec(o);
      if (!rec && o && typeof o.origin === 'number') {
        return null;
      }
      if (!rec) return jarCapRecCache ? normalizeJarSliceRec(jarCapRecCache) : null;
      jarCapRecCache = { ...rec };
      return rec;
    } catch (_) {
      return jarCapRecCache ? normalizeJarSliceRec(jarCapRecCache) : null;
    }
  }

  function saveJarSliceRec(rec) {
    const out = { v: 2, refJarUsd: rec.refJarUsd, spentJarUsd: rec.spentJarUsd, cooldownUntil: rec.cooldownUntil };
    jarCapRecCache = { ...out };
    try {
      localStorage.setItem(jarCapStorageKey(), JSON.stringify(out));
    } catch (_) {}
  }

  function ensureJarSliceRec() {
    let rec = readJarSliceRec();
    if (!rec) {
      rec = {
        v: 2,
        refJarUsd: roundUsd2(jarBalanceUsd),
        spentJarUsd: 0,
        cooldownUntil: null,
      };
      saveJarSliceRec(rec);
    } else if (rec.refJarUsd <= 0) {
      rec.refJarUsd = roundUsd2(jarBalanceUsd);
      saveJarSliceRec(rec);
    }
    return rec;
  }

  function tickJarSliceCooldown() {
    const rec = readJarSliceRec();
    if (!rec || !rec.cooldownUntil) return;
    if (Date.now() < rec.cooldownUntil) return;
    rec.cooldownUntil = null;
    rec.spentJarUsd = 0;
    rec.refJarUsd = roundUsd2(jarBalanceUsd);
    saveJarSliceRec(rec);
  }

  function jarSliceAllowanceUsd(rec) {
    const r = rec || ensureJarSliceRec();
    return roundUsd2(JAR_SLICE_PCT * Math.max(0, r.refJarUsd));
  }

  function jarSliceRemainingUsd(rec) {
    const r = rec || ensureJarSliceRec();
    const allow = jarSliceAllowanceUsd(r);
    return Math.max(0, roundUsd2(allow - Math.min(allow, r.spentJarUsd)));
  }

  function isJarSliceCooldownActive(rec) {
    const r = rec || readJarSliceRec();
    return !!(r && r.cooldownUntil && Date.now() < r.cooldownUntil);
  }

  /** After this hold duration during countdown, smooth ramp (same ease as initial charge). */
  const COUNTDOWN_SMOOTH_HOLD_DELAY_MS = 300;
  /** After closing the minimodal, ignore new hold-open until this elapses (reduces rapid open/close flicker). */
  const MINIMODAL_REOPEN_COOLDOWN_MS = 520;
  /** Min time between odometer "tick" animations on the minimodal (rapid taps). */
  const MINIMODAL_ODOMETER_TICK_MIN_MS = 220;

  let holdTimer = 0;
  let holdChargeRaf = 0;
  let boostDelayTimer = 0;
  let countdownBoostRaf = 0;
  /** True after delay elapses while pointer is still down — smooth ramp active; release does not add $1. */
  let countdownBoostEngaged = false;
  let countdownBoostStartAt = 0;
  let countdownBoostStartUsd = 0;
  /**
   * After entering countdown, first segment (jar-only cap) applies until the next pointer release,
   * then wallet funds can be included (re-engage).
   */
  let countdownWalletRampUnlocked = false;
  /** One-shot haptics when a hold ramp reaches the session cap (not repeated every frame). */
  let chargeRampHitCapNotified = false;
  let countdownBoostHitCapNotified = false;
  /** 0 = never closed (skip cooldown for first open). */
  let minimodalClosedAt = 0;
  let lastMinimodalUsdOdometerTickAt = 0;
  let lastMinimodalTokenOdometerTickAt = 0;
  let minimodalUsdTickTimeout = 0;
  let minimodalTokenTickTimeout = 0;
  let minimodalCountdownRaf = 0;
  let minimodalCountdownDeadline = 0;
  /** 'closed' | 'charging' | 'countdown' | 'nobalance' (click-only zero-balance tooltip) */
  let modalPhase = 'closed';
  /** Flip button pointerdown time — detect tap vs hold when modal is closed */
  let flipPointerDownAt = 0;
  /** After charge ramp hits 100%, countdown starts while pointer is still down — skip duplicate tap on release */
  let ignoreNextCountdownPointerUp = false;
  let modalShownAt = 0;
  let pendingMinimodalUsd = 0;
  /** Persisted jar (bonus free tipping) + wallet (user funds). */
  let jarBalanceUsd = DEFAULT_JAR_BALANCE_USD;
  let jarTokenBalanceK = DEFAULT_JAR_TOKEN_K;
  let walletBalanceUsd = DEFAULT_WALLET_BALANCE_USD;
  let walletTokenBalanceK = DEFAULT_WALLET_TOKEN_K;
  /** Snapshot at start of hold modal — combined cap = jar + wallet for this session. */
  let sessionJarUsd = DEFAULT_JAR_BALANCE_USD;
  let sessionJarTokenK = DEFAULT_JAR_TOKEN_K;
  let sessionWalletUsd = DEFAULT_WALLET_BALANCE_USD;
  let sessionWalletTokenK = DEFAULT_WALLET_TOKEN_K;
  /** Session snapshot: USD from jar allowed for this hold (min(jar balance, per-comment cap)). */
  let sessionAvailJarUsd = 0;
  /** USD in the jar slice for this hold (10% ref); used as bar denominator — 100% = full slice, 0% = slice assigned to tip. */
  let sessionJarSliceUsd = 0;
  let jarOriginKAtPageLoad = DEFAULT_JAR_TOKEN_K;
  let lastRenderedWalletMode = false;
  /** Jar K shown in bottom row after wallet flip (locked) */
  let lockedJarContribK = 0;
  let jarCapResetInterval = 0;

  function loadJarBalance() {
    try {
      const u = parseFloat(localStorage.getItem(LS_JAR_USD), 10);
      const t = parseFloat(localStorage.getItem(LS_JAR_TOKEN_K), 10);
      if (!Number.isNaN(u) && u >= 0) jarBalanceUsd = Math.round(u * 100) / 100;
      if (!Number.isNaN(t) && t >= 0) jarTokenBalanceK = Math.round(t * 100) / 100;
      const wu = parseFloat(localStorage.getItem(LS_WALLET_USD), 10);
      const wt = parseFloat(localStorage.getItem(LS_WALLET_TOKEN_K), 10);
      if (!Number.isNaN(wu) && wu >= 0) walletBalanceUsd = Math.round(wu * 100) / 100;
      if (!Number.isNaN(wt) && wt >= 0) walletTokenBalanceK = Math.round(wt * 100) / 100;
    } catch (_) {}
    jarOriginKAtPageLoad = Math.max(0, jarTokenBalanceK);
  }

  function getAvailableJarUsdForSession() {
    tickJarSliceCooldown();
    if (sessionJarTokenK <= 1e-12) return 0;
    const rec = ensureJarSliceRec();
    if (isJarSliceCooldownActive(rec)) return 0;
    const rem = jarSliceRemainingUsd(rec);
    return Math.min(sessionJarUsd, rem);
  }

  function formatCompactK(k) {
    const r = Math.round(Math.max(0, k) * 100) / 100;
    if (r >= 100) return r.toFixed(0) + 'K';
    const t = Math.round(r * 10) / 10;
    return (t % 1 === 0 ? String(t.toFixed(0)) : t.toFixed(1)) + 'K';
  }

  function resetJarToDefaultsAndPersist() {
    jarBalanceUsd = DEFAULT_JAR_BALANCE_USD;
    jarTokenBalanceK = DEFAULT_JAR_TOKEN_K;
    walletBalanceUsd = DEFAULT_WALLET_BALANCE_USD;
    walletTokenBalanceK = DEFAULT_WALLET_TOKEN_K;
    jarCapRecCache = null;
    try {
      localStorage.removeItem(jarCapStorageKey());
    } catch (_) {}
    saveJarBalance();
  }

  /** Use when a normal refresh can’t clear storage: open tipping-minimodal.html?resetJar once. */
  function initJarBalanceFromUrlOrStorage() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('resetJar')) {
        resetJarToDefaultsAndPersist();
        const u = new URL(window.location.href);
        u.searchParams.delete('resetJar');
        const next = u.pathname + (u.search ? u.search : '') + u.hash;
        window.history.replaceState({}, '', next);
        return;
      }
    } catch (_) {}
    loadJarBalance();
    tickJarSliceCooldown();
    ensureJarSliceRec();
    try {
      const u = new URL(window.location.href);
      if (u.searchParams.has('_cb')) {
        u.searchParams.delete('_cb');
        window.history.replaceState({}, '', u.pathname + (u.search ? u.search : '') + u.hash);
      }
    } catch (_) {}
  }

  /** Cmd+Shift+R / Ctrl+Shift+R: reset jar + reload with cache-bust (file:// pages often ignore normal hard refresh). */
  function hardReloadWithJarReset() {
    resetJarToDefaultsAndPersist();
    try {
      const u = new URL(window.location.href);
      u.searchParams.set('_cb', String(Date.now()));
      window.location.replace(u.toString());
    } catch (_) {
      location.reload();
    }
  }

  function saveJarBalance() {
    try {
      localStorage.setItem(LS_JAR_USD, String(jarBalanceUsd));
      localStorage.setItem(LS_JAR_TOKEN_K, String(jarTokenBalanceK));
      localStorage.setItem(LS_WALLET_USD, String(walletBalanceUsd));
      localStorage.setItem(LS_WALLET_TOKEN_K, String(walletTokenBalanceK));
    } catch (_) {}
  }

  /** Take from jar first (10% slice of ref jar USD per window), then wallet. Cooldown blocks jar 5 min after slice exhausted. */
  function depleteTipBalances(usdAmount) {
    let left = Math.round(Math.max(0, usdAmount) * 100) / 100;
    if (left <= 0) return;
    if (jarBalanceUsd > 0 && jarTokenBalanceK > 1e-12) {
      tickJarSliceCooldown();
      const prevJ = jarBalanceUsd;
      const prevTok = jarTokenBalanceK;
      let rec = ensureJarSliceRec();
      let fromJar = 0;
      if (isJarSliceCooldownActive(rec)) {
        fromJar = 0;
      } else {
        const allowance = jarSliceAllowanceUsd(rec);
        const remUsd = jarSliceRemainingUsd(rec);
        const maxJar = Math.min(prevJ, remUsd);
        fromJar = roundUsd2(Math.min(left, maxJar));
        if (fromJar > 1e-12 && prevJ > 0) {
          rec.spentJarUsd = roundUsd2(rec.spentJarUsd + fromJar);
          if (rec.spentJarUsd >= allowance - 0.005) {
            rec.cooldownUntil = Date.now() + JAR_CAP_COOLDOWN_MS;
            rec.spentJarUsd = 0;
          }
          saveJarSliceRec(rec);
        }
      }

      if (fromJar > 1e-12 && prevJ > 0) {
        jarBalanceUsd = roundUsd2(prevJ - fromJar);
        jarTokenBalanceK = roundUsd2(prevTok * (jarBalanceUsd / prevJ));
      }
      left = roundUsd2(left - fromJar);
    }
    if (left > 0 && walletBalanceUsd > 0) {
      const prevW = walletBalanceUsd;
      const fromW = Math.min(left, walletBalanceUsd);
      walletBalanceUsd = Math.round((prevW - fromW) * 100) / 100;
      walletTokenBalanceK = Math.round(walletTokenBalanceK * (walletBalanceUsd / prevW) * 100) / 100;
    }
    saveJarBalance();
  }

  /** Slow start, then ramps up (0 → 1) */
  function easeHoldCharge(t) {
    const x = Math.min(1, Math.max(0, t));
    return Math.pow(x, HOLD_CHARGE_EASE);
  }

  function chargeRatioFromHoldMs(ms) {
    return easeHoldCharge(ms / HOLD_CHARGE_MAX_MS);
  }

  /** Hold ramp: ratio 0→1 maps to $0 → sessionCapUsd() (same ease curve). */
  function holdUsdFromRatio(r, capUsd) {
    const cap = Math.max(0, capUsd);
    const rClamped = Math.min(1, Math.max(0, r));
    return rClamped * cap;
  }

  function positionMinimodal() {
    const outer = document.getElementById('tipMinimodalOuter');
    const modal = outer || document.getElementById('tipMinimodal');
    const btn = getFlipBtn();
    const btnRect = btn.getBoundingClientRect();
    const w = modal.offsetWidth || 208;
    modal.style.left = Math.max(12, Math.min(btnRect.left + btnRect.width / 2 - w / 2, window.innerWidth - w - 12)) + 'px';
    modal.style.bottom = (window.innerHeight - btnRect.top + 8) + 'px';
    modal.style.top = 'auto';
  }

  function sessionCapUsd() {
    return Math.max(0, sessionAvailJarUsd + sessionWalletUsd);
  }

  /** Live jar (cap-respecting) + wallet — for hold vs tap gating before modal opens */
  function liveTipBalanceCapUsd() {
    return Math.max(0, getAvailableJarUsdLive() + walletBalanceUsd);
  }

  /**
   * Charging hold-ramp stops at jar slice when wallet also exists; wallet after countdown release.
   */
  function getHoldRampCapUsdForCharge() {
    const cap = sessionCapUsd();
    if (cap <= 0) return 0;
    if (sessionAvailJarUsd > 0 && sessionWalletUsd > 0) return Math.min(cap, sessionAvailJarUsd);
    return cap;
  }

  /**
   * Countdown: while jar slice + wallet both exist, spending is capped at jar slice until release re-engages.
   */
  function getCountdownPendingCapUsd() {
    const cap = sessionCapUsd();
    if (cap <= 0) return 0;
    if (sessionAvailJarUsd > 0 && sessionWalletUsd > 0 && !countdownWalletRampUnlocked) {
      return Math.min(cap, sessionAvailJarUsd);
    }
    return cap;
  }

  /** USD shown during charging (matches the ramp bar; hold is continuous up to segment cap). */
  function getChargingDisplayUsd() {
    const rampCap = getHoldRampCapUsdForCharge();
    if (rampCap <= 0) return 0;
    const ms = performance.now() - modalShownAt;
    return Math.min(rampCap, holdUsdFromRatio(chargeRatioFromHoldMs(ms), rampCap));
  }

  function canSendMinimodalTip() {
    const cap = sessionCapUsd();
    if (cap <= 0) return false;
    if (modalPhase === 'charging') {
      const shown = getChargingDisplayUsd();
      const rampCap = getHoldRampCapUsdForCharge();
      const penny = 0.01;
      if (rampCap < penny - 1e-9) return shown > 0;
      return shown >= penny - 1e-6;
    }
    if (modalPhase === 'countdown') {
      const pendCap = getCountdownPendingCapUsd();
      const amt = Math.min(pendCap, pendingMinimodalUsd);
      if (amt <= 0) return false;
      const penny = 0.01;
      if (pendCap >= penny - 1e-9 && amt + 1e-9 < penny) return false;
      return true;
    }
    return false;
  }

  function syncMinimodalSendUi() {
    const send = document.getElementById('minimodalSend');
    if (!send) return;
    send.disabled = false;
    send.setAttribute('aria-disabled', 'false');
  }

  /** True when committed tip uses wallet funds (past jar slice for this hold). */
  function shouldShowWalletMode(pendingUsd) {
    const p = Math.max(0, pendingUsd);
    if (sessionWalletUsd <= 0) return false;
    if (sessionAvailJarUsd <= 1e-9) return p > 1e-6;
    return p > sessionAvailJarUsd - 1e-6;
  }

  function jarBarRemainingPercent(committedUsd) {
    const p = Math.max(0, committedUsd);
    if (sessionJarSliceUsd <= 1e-9) return 0;
    const used = Math.min(p, sessionJarSliceUsd);
    const rem = Math.max(0, sessionJarSliceUsd - used);
    return Math.min(100, (rem / sessionJarSliceUsd) * 100);
  }

  function walletBarRemainingPercent(committedUsd) {
    const p = Math.max(0, committedUsd);
    if (sessionWalletUsd <= 1e-9) return 0;
    const spent = Math.max(0, p - sessionAvailJarUsd);
    const rem = Math.max(0, sessionWalletUsd - spent);
    return Math.min(100, (rem / sessionWalletUsd) * 100);
  }

  /** Token K remaining in active bucket (jar first, then wallet). */
  function sessionRemainingTokenK(committedUsd) {
    const p = Math.max(0, committedUsd);
    if (sessionAvailJarUsd > 0 && p < sessionAvailJarUsd - 1e-6) {
      return sessionJarTokenK * (Math.max(0, sessionAvailJarUsd - p) / sessionAvailJarUsd);
    }
    if (sessionWalletUsd <= 0) return 0;
    const walletSpend = Math.max(0, p - sessionAvailJarUsd);
    const walletRemUsd = Math.max(0, sessionWalletUsd - walletSpend);
    return sessionWalletTokenK * (walletRemUsd / sessionWalletUsd);
  }

  function syncMinimodalWalletUi(walletMode) {
    const outer = document.getElementById('tipMinimodalOuter');
    const inner = document.getElementById('tipMinimodal');
    const usdRow = document.getElementById('minimodalUsdRow');
    const label = document.getElementById('minimodalFromLabel');
    const fromRow = document.querySelector('.tip-minimodal-from');
    if (outer) outer.classList.toggle('tip-minimodal-outer--wallet', walletMode);
    if (inner) inner.classList.toggle('tip-minimodal--wallet', walletMode);
    if (usdRow) usdRow.classList.toggle('tip-minimodal-usd-row--wallet-hot', walletMode);
    if (label) label.textContent = walletMode ? 'From Wallet' : 'From Jar';
    if (fromRow) fromRow.classList.toggle('from-wallet', walletMode);
  }

  function syncMinimodalPhaseUi() {
    const modal = document.getElementById('tipMinimodal');
    if (!modal) return;
    modal.classList.toggle('tip-minimodal--phase-charging', modalPhase === 'charging');
    modal.classList.toggle('tip-minimodal--countdown-phase', modalPhase === 'countdown');
    const ticking = modalPhase === 'countdown' && !!modal._countdownActive;
    modal.classList.toggle('tip-minimodal--countdown-ticking', ticking);
  }

  /** Odometer-style USD (same digit-roll as flip button counter). */
  function renderMinimodalUsdCounter(usd, withTick = true) {
    const container = document.getElementById('minimodalUsdCounter');
    if (!container) return;
    const str = formatAmount(usd);
    const prev = container.dataset.value || '';
    if (prev === str) return;
    if (!prev || prev.length !== str.length) {
      renderCounter(container, usd, formatAmount);
    } else {
      updateCounter(container, usd, formatAmount);
    }
    if (!withTick) {
      container.classList.remove('tick');
      return;
    }
    const now = performance.now();
    if (now - lastMinimodalUsdOdometerTickAt < MINIMODAL_ODOMETER_TICK_MIN_MS) {
      return;
    }
    lastMinimodalUsdOdometerTickAt = now;
    container.classList.remove('tick');
    void container.offsetWidth;
    container.classList.add('tick');
    if (minimodalUsdTickTimeout) clearTimeout(minimodalUsdTickTimeout);
    minimodalUsdTickTimeout = setTimeout(() => {
      container.classList.remove('tick');
      minimodalUsdTickTimeout = 0;
    }, 220);
  }

  /** Odometer-style remaining token K (same digit-roll as USD row). */
  function renderMinimodalTokenCounter(remTok, withTick = true) {
    const container = document.getElementById('minimodalTokenCounter');
    if (!container) return;
    const str = formatAmount(remTok);
    const prev = container.dataset.value || '';
    if (prev === str) return;
    if (!prev || prev.length !== str.length) {
      renderCounter(container, remTok, formatAmount);
    } else {
      updateCounter(container, remTok, formatAmount);
    }
    if (!withTick) {
      container.classList.remove('tick');
      return;
    }
    const now = performance.now();
    if (now - lastMinimodalTokenOdometerTickAt < MINIMODAL_ODOMETER_TICK_MIN_MS) {
      return;
    }
    lastMinimodalTokenOdometerTickAt = now;
    container.classList.remove('tick');
    void container.offsetWidth;
    container.classList.add('tick');
    if (minimodalTokenTickTimeout) clearTimeout(minimodalTokenTickTimeout);
    minimodalTokenTickTimeout = setTimeout(() => {
      container.classList.remove('tick');
      minimodalTokenTickTimeout = 0;
    }, 220);
  }

  function formatResetCountdownLabel(resetAt) {
    if (!resetAt || Date.now() >= resetAt) return '';
    const ms = resetAt - Date.now();
    const s = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r + ' \u23F1';
  }

  /** Left: pending tip USD; dual bars + cap row; token = remaining K in active bucket. */
  function renderModalTipDisplay(pendingTipUsd) {
    tickJarSliceCooldown();
    const pending = Math.max(0, pendingTipUsd);
    const cap = sessionCapUsd();
    const walletMode = shouldShowWalletMode(pending);
    let becameWallet = false;
    syncMinimodalWalletUi(walletMode);

    renderMinimodalUsdCounter(pending);

    const remTok = sessionRemainingTokenK(pending);
    renderMinimodalTokenCounter(remTok);

    const jarFill = document.getElementById('minimodalProgressJarFill');
    const walletFill = document.getElementById('minimodalProgressWalletFill');
    const slot = document.getElementById('minimodalProgressSlot');
    if (jarFill) {
      jarFill.style.width = jarBarRemainingPercent(pending) + '%';
    }
    if (walletFill) {
      if (walletMode) {
        walletFill.style.width = walletBarRemainingPercent(pending) + '%';
      } else {
        walletFill.style.width = '100%';
      }
    }
    if (slot) {
      slot.style.setProperty('--bar-flip-dur', BAR_FLIP_MS + 'ms');
      becameWallet = walletMode && !lastRenderedWalletMode;
      slot.classList.toggle('wallet-front', walletMode);
      if (becameWallet) {
        slot.classList.add('flip-pulse');
        setTimeout(() => slot.classList.remove('flip-pulse'), BAR_FLIP_MS + BAR_FLIP_STAGGER_MS + 120);
        if (sessionJarUsd > 1e-9) {
          lockedJarContribK = sessionJarTokenK * (sessionAvailJarUsd / sessionJarUsd);
        }
      }
      lastRenderedWalletMode = walletMode;
    }

    const capRow = document.getElementById('minimodalCapRow');
    const capLeft = document.getElementById('minimodalCapLeft');
    const capRight = document.getElementById('minimodalCapRight');
    const sliceRec = readJarSliceRec() || ensureJarSliceRec();
    const inJarCooldown = isJarSliceCooldownActive(sliceRec);
    const phaseHold = modalPhase === 'countdown' || modalPhase === 'charging';
    const showCooldownStrip = inJarCooldown && phaseHold;
    const showSliceStrip =
      !inJarCooldown &&
      !walletMode &&
      phaseHold &&
      pending > 1e-6 &&
      sessionJarSliceUsd > 1e-9;
    if (capRow && capLeft && capRight) {
      if (showCooldownStrip) {
        capRow.classList.add('visible');
        capLeft.textContent = 'Jar cools down — tip from wallet';
        capRight.textContent = formatResetCountdownLabel(sliceRec.cooldownUntil);
      } else if (showSliceStrip) {
        capRow.classList.add('visible');
        const sliceLeftUsd = Math.max(
          0,
          sessionJarSliceUsd - Math.min(pending, sessionJarSliceUsd)
        );
        capLeft.textContent = 'Jar slice ~$' + formatAmount(sliceLeftUsd) + ' left';
        capRight.textContent = '';
      } else {
        capRow.classList.remove('visible');
        capLeft.textContent = '';
        capRight.textContent = '';
      }
    }

    const bottom = document.getElementById('minimodalBottomInfo');
    const bJar = document.getElementById('minimodalBottomJarText');
    const bWallet = document.getElementById('minimodalBottomWalletText');
    if (bottom && bJar && bWallet) {
      if (walletMode && sessionWalletUsd > 1e-9) {
        bottom.removeAttribute('hidden');
        bottom.setAttribute('aria-hidden', 'false');
        bottom.classList.add('visible');
        const justShown = becameWallet;
        if (justShown) {
          bottom.classList.remove('fade-in');
          void bottom.offsetWidth;
          bottom.classList.add('fade-in');
        }
        bJar.textContent = formatCompactK(lockedJarContribK);
        const spentW = Math.max(0, pending - sessionAvailJarUsd);
        const wK =
          sessionWalletTokenK * (Math.min(spentW, sessionWalletUsd) / sessionWalletUsd);
        bWallet.textContent = '+' + formatCompactK(wK);
      } else {
        bottom.setAttribute('hidden', '');
        bottom.setAttribute('aria-hidden', 'true');
        bottom.classList.remove('visible', 'fade-in');
        bJar.textContent = '';
        bWallet.textContent = '';
      }
    }

    const modal = document.getElementById('tipMinimodal');
    const noBalance = cap <= 1e-9;
    if (modal) modal.classList.toggle('tip-minimodal--no-balance', noBalance);
    const nbTip = document.getElementById('minimodalNoBalanceTooltip');
    if (nbTip) nbTip.hidden = !noBalance;
    syncMinimodalSendUi();
  }

  function updateMinimodalCommit(usd) {
    renderModalTipDisplay(usd);
  }

  function updatePendingTippingDisplay() {
    renderModalTipDisplay(pendingMinimodalUsd);
  }

  function clearBoostTimers() {
    if (boostDelayTimer) {
      clearTimeout(boostDelayTimer);
      boostDelayTimer = 0;
    }
    if (countdownBoostRaf) {
      cancelAnimationFrame(countdownBoostRaf);
      countdownBoostRaf = 0;
    }
    countdownBoostEngaged = false;
    countdownBoostHitCapNotified = false;
  }

  function countdownBoostLoop() {
    if (modalPhase !== 'countdown' || !countdownBoostEngaged) return;
    const ms = performance.now() - countdownBoostStartAt;
    const ratio = chargeRatioFromHoldMs(ms);
    const cap = getCountdownPendingCapUsd();
    const headroom = Math.max(0, cap - countdownBoostStartUsd);
    const prevPending = pendingMinimodalUsd;
    pendingMinimodalUsd = Math.min(cap, countdownBoostStartUsd + ratio * headroom);
    updatePendingTippingDisplay();
    maybeResetCountdownImmediatelyAtSessionCap(prevPending);
    if (ratio >= 1) {
      if (cap > 0 && pendingMinimodalUsd >= cap - 1e-6 && !countdownBoostHitCapNotified) {
        countdownBoostHitCapNotified = true;
        triggerSessionCapHaptic();
      }
      countdownBoostRaf = 0;
      return;
    }
    countdownBoostRaf = requestAnimationFrame(countdownBoostLoop);
  }

  function startCountdownSmoothHold() {
    if (modalPhase !== 'countdown') return;
    countdownBoostEngaged = true;
    /** One 1%-of-remaining tap for the click portion of click-and-hold; do not resetCountdown here — pointer is still down. */
    addOnePendingUnit();
    const cap = getCountdownPendingCapUsd();
    if (cap <= 0 || pendingMinimodalUsd >= cap - 1e-8) {
      countdownBoostEngaged = false;
      if (countdownBoostRaf) cancelAnimationFrame(countdownBoostRaf);
      countdownBoostRaf = 0;
      return;
    }
    countdownBoostHitCapNotified = false;
    countdownBoostStartAt = performance.now();
    countdownBoostStartUsd = pendingMinimodalUsd;
    if (countdownBoostRaf) cancelAnimationFrame(countdownBoostRaf);
    countdownBoostRaf = requestAnimationFrame(countdownBoostLoop);
  }

  /** Stops the auto-send interval without changing the label (freeze while pointer is down). */
  function stopCountdownAnimation() {
    const modal = document.getElementById('tipMinimodal');
    if (minimodalCountdownRaf) {
      cancelAnimationFrame(minimodalCountdownRaf);
      minimodalCountdownRaf = 0;
    }
    if (modal) modal._countdownActive = false;
    syncMinimodalPhaseUi();
  }

  function pauseCountdown() {
    const sfx = document.getElementById('minimodalCountdownSuffix');
    if (sfx) sfx.textContent = '';
    stopCountdownAnimation();
  }

  /** When pending crosses up to the full session cap, restart auto-send immediately (e.g. while pointer still down). */
  function maybeResetCountdownImmediatelyAtSessionCap(prevPending) {
    if (modalPhase !== 'countdown') return;
    const cap = sessionCapUsd();
    if (cap <= 0) return;
    if (prevPending >= cap - 1e-6) return;
    if (pendingMinimodalUsd < cap - 1e-6) return;
    resetCountdown();
  }

  function resetCountdown() {
    const modal = document.getElementById('tipMinimodal');
    const outer = document.getElementById('tipMinimodalOuter');
    const suffixEl = document.getElementById('minimodalCountdownSuffix');
    if (!modal || modalPhase !== 'countdown') return;
    stopCountdownAnimation();
    modal._countdownActive = true;
    syncMinimodalPhaseUi();
    minimodalCountdownDeadline = performance.now() + MINIMODAL_SEC * 1000;
    if (outer) outer.style.setProperty('--countdown-sweep', '0');
    let lastSec = -1;
    function minimodalCountdownFrame() {
      if (!modal._countdownActive || modalPhase !== 'countdown') return;
      const now = performance.now();
      const remaining = Math.max(0, minimodalCountdownDeadline - now);
      const prog = 1 - remaining / (MINIMODAL_SEC * 1000);
      if (outer) outer.style.setProperty('--countdown-sweep', String(Math.min(1, Math.max(0, prog))));
      const secsLeft = Math.ceil(remaining / 1000);
      if (secsLeft !== lastSec) {
        lastSec = secsLeft;
        if (suffixEl) suffixEl.textContent = 'in ' + secsLeft + 's';
      }
      if (remaining <= 0) {
        minimodalCountdownRaf = 0;
        modal._countdownActive = false;
        syncMinimodalPhaseUi();
        sendMinimodalNow();
        return;
      }
      minimodalCountdownRaf = requestAnimationFrame(minimodalCountdownFrame);
    }
    minimodalCountdownRaf = requestAnimationFrame(minimodalCountdownFrame);
  }

  function triggerSessionCapHaptic() {
    const h = window.__kbyWebHaptics;
    if (h) h.trigger('error', { intensity: 0.45 });
  }

  /** Subtle error pattern (web-haptics array API — see https://haptics.lochie.me/) */
  function triggerNoBalanceHaptic() {
    const h = window.__kbyWebHaptics;
    if (!h) return;
    h.trigger(
      [
        { duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.7 },
        { delay: 40, duration: 40, intensity: 0.9 },
        { delay: 40, duration: 50, intensity: 0.6 },
      ],
      { intensity: 0.55 }
    );
  }

  function showNoBalanceTooltipOnly() {
    const outer = document.getElementById('tipMinimodalOuter');
    const modal = document.getElementById('tipMinimodal');
    if (!outer || !modal) return;
    if (
      minimodalClosedAt > 0 &&
      performance.now() - minimodalClosedAt < MINIMODAL_REOPEN_COOLDOWN_MS
    ) {
      return;
    }
    stopCountdownAnimation();
    stopChargeLoop();
    clearBoostTimers();
    modalPhase = 'nobalance';
    modalShownAt = performance.now();
    tickJarSliceCooldown();
    ensureJarSliceRec();
    sessionJarUsd = jarBalanceUsd;
    sessionJarTokenK = jarTokenBalanceK;
    sessionWalletUsd = walletBalanceUsd;
    sessionWalletTokenK = walletTokenBalanceK;
    sessionAvailJarUsd = getAvailableJarUsdForSession();
    sessionJarSliceUsd = sessionAvailJarUsd;
    positionMinimodal();
    outer.classList.add('visible', 'tip-minimodal-outer--text-only');
    modal.setAttribute('aria-hidden', 'false');
    syncMinimodalPhaseUi();
    updateMinimodalCommit(0);
    requestAnimationFrame(() => positionMinimodal());
    const ctx = window.KbyTipping?.activeCtx?.() || null;
    if (window.KbyTipping?.onNoBalance) window.KbyTipping.onNoBalance(ctx);
  }

  function addOnePendingUnit() {
    const cap =
      modalPhase === 'countdown' ? getCountdownPendingCapUsd() : sessionCapUsd();
    const prevPending = pendingMinimodalUsd;
    const inc =
      modalPhase === 'countdown'
        ? countdownTapIncrementUsd()
        : tipPctIncrementFromRemainingUsd(Math.max(0, cap - pendingMinimodalUsd));
    const next = Math.min(
      cap,
      Math.round((pendingMinimodalUsd + inc) * 100) / 100
    );
    if (next <= pendingMinimodalUsd) {
      triggerSessionCapHaptic();
      return;
    }
    pendingMinimodalUsd = next;
    updatePendingTippingDisplay();
    maybeResetCountdownImmediatelyAtSessionCap(prevPending);
  }

  function addPendingUnitAndRefresh() {
    addOnePendingUnit();
    resetCountdown();
  }

  function stopChargeLoop() {
    if (holdChargeRaf) {
      cancelAnimationFrame(holdChargeRaf);
      holdChargeRaf = 0;
    }
  }

  function chargeLoop() {
    if (modalPhase !== 'charging') return;
    const ms = performance.now() - modalShownAt;
    const ratio = chargeRatioFromHoldMs(ms);
    const rampCap = getHoldRampCapUsdForCharge();
    const raw = holdUsdFromRatio(ratio, rampCap);
    const usd = Math.min(rampCap, raw);
    const atFullRamp = rampCap > 0 && ratio >= 1 - 1e-9 && usd >= rampCap - 1e-6;
    if (atFullRamp) {
      if (!chargeRampHitCapNotified) {
        chargeRampHitCapNotified = true;
        triggerSessionCapHaptic();
      }
      updateMinimodalCommit(usd);
      beginMinimodalCountdown({ fromChargeAtFullRamp: true });
      return;
    }
    updateMinimodalCommit(usd);
    holdChargeRaf = requestAnimationFrame(chargeLoop);
  }

  function initMinimodalSession() {
    stopCountdownAnimation();
    tickJarSliceCooldown();
    ensureJarSliceRec();
    sessionJarUsd = jarBalanceUsd;
    sessionJarTokenK = jarTokenBalanceK;
    sessionWalletUsd = walletBalanceUsd;
    sessionWalletTokenK = walletTokenBalanceK;
    sessionAvailJarUsd = getAvailableJarUsdForSession();
    sessionJarSliceUsd = sessionAvailJarUsd;
    lastRenderedWalletMode = false;
    lockedJarContribK = 0;
    if (jarCapResetInterval) {
      clearInterval(jarCapResetInterval);
      jarCapResetInterval = 0;
    }
  }

  /** Quick tap (modal closed): open minimodal, add one default unit, auto-send after countdown. */
  function showMinimodalQuickTap() {
    initMinimodalSession();
    if (sessionCapUsd() <= 0) return;
    const outer = document.getElementById('tipMinimodalOuter');
    const modal = document.getElementById('tipMinimodal');
    modalPhase = 'countdown';
    modalShownAt = performance.now();
    positionMinimodal();
    if (outer) {
      outer.classList.remove('tip-minimodal-outer--text-only');
      outer.classList.add('visible');
    }
    if (modal) modal.setAttribute('aria-hidden', 'false');
    pendingMinimodalUsd = 0;
    countdownWalletRampUnlocked = false;
    chargeRampHitCapNotified = false;
    syncMinimodalPhaseUi();
    addOnePendingUnit();
    updatePendingTippingDisplay();
    resetCountdown();
    jarCapResetInterval = window.setInterval(() => {
      if (modalPhase !== 'countdown') return;
      updatePendingTippingDisplay();
    }, 500);
    positionCoinPoolAtBtn();
    requestAnimationFrame(() => positionMinimodal());
  }

  function showMinimodalCharging() {
    const outer = document.getElementById('tipMinimodalOuter');
    const modal = document.getElementById('tipMinimodal');
    initMinimodalSession();
    if (sessionCapUsd() <= 0) {
      return;
    }
    modalPhase = 'charging';
    modalShownAt = performance.now();
    positionMinimodal();
    if (outer) outer.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    chargeRampHitCapNotified = false;

    const sfx = document.getElementById('minimodalCountdownSuffix');
    if (sfx) sfx.textContent = '';
    syncMinimodalPhaseUi();
    updateMinimodalCommit(0);

    jarCapResetInterval = window.setInterval(() => {
      if (modalPhase !== 'countdown') return;
      updatePendingTippingDisplay();
    }, 500);

    stopChargeLoop();
    holdChargeRaf = requestAnimationFrame(chargeLoop);
  }

  function beginMinimodalCountdown(opts) {
    if (modalPhase !== 'charging') return;
    stopChargeLoop();

    const modal = document.getElementById('tipMinimodal');
    stopCountdownAnimation();

    const ms = performance.now() - modalShownAt;
    const ratio = chargeRatioFromHoldMs(ms);
    const cap = sessionCapUsd();
    const rampCap = getHoldRampCapUsdForCharge();
    const raw = holdUsdFromRatio(ratio, rampCap);
    pendingMinimodalUsd = Math.min(cap, Math.max(0.01, raw));
    countdownWalletRampUnlocked = false;
    updatePendingTippingDisplay();

    modalPhase = 'countdown';
    resetCountdown();
    if (opts && opts.fromChargeAtFullRamp) {
      ignoreNextCountdownPointerUp = true;
    }
  }

  function hideMinimodal() {
    const outer = document.getElementById('tipMinimodalOuter');
    const modal = document.getElementById('tipMinimodal');
    stopCountdownAnimation();
    if (jarCapResetInterval) {
      clearInterval(jarCapResetInterval);
      jarCapResetInterval = 0;
    }
    if (outer) {
      outer.style.setProperty('--countdown-sweep', '0');
      outer.classList.remove('visible', 'tip-minimodal-outer--wallet', 'tip-minimodal-outer--text-only');
    }
    if (modal) {
      modal.classList.remove(
        'tip-minimodal--wallet',
        'tip-minimodal--no-balance',
        'tip-minimodal--phase-charging',
        'tip-minimodal--countdown-phase',
        'tip-minimodal--countdown-ticking'
      );
    }
    const usdRow = document.getElementById('minimodalUsdRow');
    if (usdRow) usdRow.classList.remove('tip-minimodal-usd-row--wallet-hot');
    const label = document.getElementById('minimodalFromLabel');
    if (label) label.textContent = 'From Jar';
    const fromRow = document.querySelector('.tip-minimodal-from');
    if (fromRow) fromRow.classList.remove('from-wallet');
    const slot = document.getElementById('minimodalProgressSlot');
    if (slot) {
      slot.classList.remove('wallet-front', 'flip-pulse');
    }
    const jarFill = document.getElementById('minimodalProgressJarFill');
    const walletFill = document.getElementById('minimodalProgressWalletFill');
    if (jarFill) jarFill.style.width = '0%';
    if (walletFill) walletFill.style.width = '0%';
    const capRow = document.getElementById('minimodalCapRow');
    if (capRow) {
      capRow.classList.remove('visible');
    }
    const capLeft = document.getElementById('minimodalCapLeft');
    const capRight = document.getElementById('minimodalCapRight');
    if (capLeft) capLeft.textContent = '';
    if (capRight) capRight.textContent = '';
    const bottom = document.getElementById('minimodalBottomInfo');
    if (bottom) {
      bottom.setAttribute('hidden', '');
      bottom.setAttribute('aria-hidden', 'true');
      bottom.classList.remove('visible', 'fade-in');
    }
    const bJar = document.getElementById('minimodalBottomJarText');
    const bWallet = document.getElementById('minimodalBottomWalletText');
    if (bJar) bJar.textContent = '';
    if (bWallet) bWallet.textContent = '';
    lastRenderedWalletMode = false;
    lockedJarContribK = 0;
    sessionAvailJarUsd = 0;
    sessionJarSliceUsd = 0;
    clearBoostTimers();
    stopChargeLoop();
    if (minimodalTokenTickTimeout) clearTimeout(minimodalTokenTickTimeout);
    minimodalTokenTickTimeout = 0;
    renderMinimodalTokenCounter(0, false);
    if (minimodalUsdTickTimeout) clearTimeout(minimodalUsdTickTimeout);
    minimodalUsdTickTimeout = 0;
    renderMinimodalUsdCounter(0, false);
    const sfxHide = document.getElementById('minimodalCountdownSuffix');
    if (sfxHide) sfxHide.textContent = '';
    const nbHide = document.getElementById('minimodalNoBalanceTooltip');
    if (nbHide) nbHide.hidden = true;
    if (modal) modal.setAttribute('aria-hidden', 'true');
    modalPhase = 'closed';
    pendingMinimodalUsd = 0;
    countdownWalletRampUnlocked = false;
    ignoreNextCountdownPointerUp = false;
    minimodalClosedAt = performance.now();
    lastMinimodalUsdOdometerTickAt = 0;
    lastMinimodalTokenOdometerTickAt = 0;
    const sendBtn = document.getElementById('minimodalSend');
    if (sendBtn) {
      sendBtn.disabled = false;
      sendBtn.setAttribute('aria-disabled', 'false');
    }
  }

  function sendMinimodalNow() {
    if (modalPhase === 'nobalance') return;
    if (modalPhase !== 'charging' && modalPhase !== 'countdown') return;
    if (!canSendMinimodalTip()) {
      triggerSessionCapHaptic();
      if (modalPhase === 'countdown') stopCountdownAnimation();
      return;
    }
    if (modalPhase === 'charging') {
      const ms = performance.now() - modalShownAt;
      const cap = sessionCapUsd();
      const rampCap = getHoldRampCapUsdForCharge();
      const raw = holdUsdFromRatio(chargeRatioFromHoldMs(ms), rampCap);
      pendingMinimodalUsd = Math.min(cap, Math.max(0.01, raw));
    }
    stopCountdownAnimation();
    clearBoostTimers();
    stopChargeLoop();
    const amt = Math.min(sessionCapUsd(), pendingMinimodalUsd);
    hideMinimodal();
    triggerFlip(amt);
  }

  let modalActionsBound = false;

  function bindModalActionsOnce() {
    if (modalActionsBound) return;
    modalActionsBound = true;
    document.getElementById('minimodalCancel')?.addEventListener('click', hideMinimodal);
    document.getElementById('minimodalSend')?.addEventListener('click', sendMinimodalNow);
  }

  function positionCoinPoolAtBtn() {
    const btn = getFlipBtn();
    const root = document.getElementById('kbyTipCoinRoot');
    if (!btn || !root) return;
    const r = btn.getBoundingClientRect();
    root.style.left = (r.left + r.width / 2 - 28) + 'px';
    root.style.top = (r.top - 98) + 'px';
    root.style.width = '56px';
    root.style.height = '130px';
  }

  function wireTipButton(btn) {
    if (!btn || btn.dataset.kbyTipBound) return;
    btn.dataset.kbyTipBound = '1';
    bindModalActionsOnce();

    function clearHold() {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = 0;
      }
    }

    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.stopPropagation();
      if (window.KbyTipping?.setActive) window.KbyTipping.setActive(btn);
      if (window.KbyTipping?.onBeforeInteract) {
        const ok = window.KbyTipping.onBeforeInteract(window.KbyTipping.activeCtx?.());
        if (ok === false) return;
      }
      if (window.KbyTipping?.syncBalances) window.KbyTipping.syncBalances();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}

      if (modalPhase === 'nobalance') {
        clearHold();
        flipPointerDownAt = performance.now();
        return;
      }

      if (modalPhase === 'countdown') {
        pauseCountdown();
        countdownBoostEngaged = false;
        boostDelayTimer = setTimeout(() => {
          boostDelayTimer = 0;
          startCountdownSmoothHold();
        }, COUNTDOWN_SMOOTH_HOLD_DELAY_MS);
        return;
      }
      if (modalPhase === 'charging') return;
      clearHold();
      if (modalPhase === 'closed') {
        flipPointerDownAt = performance.now();
      }
      holdTimer = setTimeout(() => {
        holdTimer = 0;
        if (
          minimodalClosedAt > 0 &&
          performance.now() - minimodalClosedAt < MINIMODAL_REOPEN_COOLDOWN_MS
        ) {
          return;
        }
        if (liveTipBalanceCapUsd() <= 0) {
          return;
        }
        showMinimodalCharging();
      }, HOLD_DELAY);
    }

    function onUp(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.stopPropagation();
      clearHold();
      if (modalPhase === 'nobalance') {
        if (e.type === 'pointercancel') return;
        if (e.detail > 1) return;
        hideMinimodal();
        return;
      }
      if (modalPhase === 'charging') {
        beginMinimodalCountdown();
        return;
      }
      if (modalPhase === 'countdown') {
        const aj = sessionAvailJarUsd;
        const wallet = sessionWalletUsd;
        if (aj <= 0 || wallet <= 0) {
          countdownWalletRampUnlocked = true;
        } else if (pendingMinimodalUsd >= aj - 1e-6) {
          countdownWalletRampUnlocked = true;
        }
        const engaged = countdownBoostEngaged;
        clearBoostTimers();
        if (ignoreNextCountdownPointerUp) {
          ignoreNextCountdownPointerUp = false;
          return;
        }
        if (!engaged) {
          addPendingUnitAndRefresh();
        } else {
          resetCountdown();
        }
        return;
      }
      {
        const cap = liveTipBalanceCapUsd();
        const tapMs = performance.now() - flipPointerDownAt;
        if (cap <= 0) {
          if (e.type === 'pointercancel') return;
          if (e.detail > 1) return;
          if (tapMs < HOLD_DELAY) {
            showNoBalanceTooltipOnly();
            triggerNoBalanceHaptic();
          }
          return;
        }
        if (tapMs < HOLD_DELAY) {
          showMinimodalQuickTap();
          return;
        }
      }
    }

    function onLeave() {
      if (modalPhase === 'closed') {
        clearHold();
      }
    }

    btn.addEventListener('pointerdown', onDown);
    btn.addEventListener('pointerup', onUp);
    btn.addEventListener('pointercancel', onUp);
    btn.addEventListener('pointerleave', onLeave);
    btn.addEventListener('dblclick', (ev) => {
      ev.preventDefault();
    });
  }

  function setupHoldToShow() {
    bindModalActionsOnce();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalPhase !== 'closed') {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
      hideMinimodal();
      return;
    }
    const isHardReloadCombo =
      e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === 'r' || e.key === 'R');
    if (!isHardReloadCombo) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    hardReloadWithJarReset();
  }, true);

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const { WebHaptics } = await import('./node_modules/web-haptics/dist/index.mjs');
      window.__kbyWebHaptics = new WebHaptics();
    } catch (_) {}
    if (window.KbyTipping?.syncBalances) window.KbyTipping.syncBalances();
    else initJarBalanceFromUrlOrStorage();
    setupHoldToShow();
    if (window.KbyTipping?._ready) window.KbyTipping._ready();
  });

  window.KbyTipping = window.KbyTipping || {};
  window.KbyTipping._applyBalances = function(walletUsd, jarUsd) {
    walletBalanceUsd = Math.round(Math.max(0, walletUsd || 0) * 100) / 100;
    walletTokenBalanceK = walletBalanceUsd;
    jarBalanceUsd = Math.round(Math.max(0, jarUsd || 0) * 100) / 100;
    jarTokenBalanceK = jarBalanceUsd;
  };
  window.KbyTipping.hide = function() {
    hideMinimodal();
    minimodalClosedAt = 0;
  };
  window.KbyTipping._openQuickTip = function() {
    if (liveTipBalanceCapUsd() <= 0) {
      showNoBalanceTooltipOnly();
      triggerNoBalanceHaptic();
      return;
    }
    showMinimodalQuickTap();
  };

})();
