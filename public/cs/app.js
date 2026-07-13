(function () {
  const nav = document.getElementById('csNav');
  const main = document.getElementById('csMain');
  const catalog = window.CS_CATALOG || [];
  const navItems = window.CS_NAV || [];

  /* ---------- nav ---------- */
  function buildNav() {
    const groups = {};
    navItems.forEach((item) => {
      const g = item.group || 'Components';
      (groups[g] || (groups[g] = [])).push(item);
    });
    nav.innerHTML = Object.entries(groups)
      .map(
        ([title, items]) => `
      <div class="group">
        <div class="group-title">${esc(title)}</div>
        ${items.map((i) => `<a href="#${esc(i.id)}" data-id="${esc(i.id)}">${esc(i.label)}</a>`).join('')}
      </div>`
      )
      .join('');
  }

  /* ---------- render ---------- */
  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMatrix(matrix) {
    if (!matrix?.length) return '';
    return `<div class="cs-panel" style="margin-top:10px;overflow:auto">
      <table class="cs-matrix">
        <thead><tr><th>State</th><th>Desktop</th><th>Mobile</th><th>Selector / API</th></tr></thead>
        <tbody>
          ${matrix
            .map(
              (r) => `<tr>
            <td><b>${esc(r.state)}</b></td>
            <td>${esc(r.desktop)}</td>
            <td>${esc(r.mobile)}</td>
            <td class="mono">${esc(r.selector)}</td>
          </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>`;
  }

  function renderInteractions(list) {
    if (!list?.length) return '';
    return `<div class="cs-note"><b>Microinteractions</b> — ${list.map((x) => esc(x)).join(' · ')}</div>`;
  }

  function codeTabs(code) {
    if (!code) return '';
    const keys = ['html', 'css', 'js'].filter((k) => code[k]);
    if (!keys.length) return '';
    const tabs = keys
      .map((k, i) => `<button type="button" data-lang="${k}" class="${i === 0 ? 'on' : ''}">${k.toUpperCase()}</button>`)
      .join('');
    const panes = keys
      .map(
        (k, i) => `<div class="cs-code-pane" data-pane="${k}" style="display:${i === 0 ? 'block' : 'none'}">
      <span class="lang">${k}</span>
      <pre><code>${esc(code[k].trim())}</code></pre>
    </div>`
      )
      .join('');
    return `<div class="cs-code-tabs">${tabs}</div>${panes}`;
  }

  function previewFrames(section) {
    const p = section.preview || {};
    const dual = p.dual || (p.desktop && p.mobile);
    const desk = p.desktop
      ? `<div class="cs-frame ${esc(p.desktopFrame || '')}">
          <div class="label"><span>Desktop</span><span>≥861px</span></div>
          <div class="stage">${p.desktop}</div>
        </div>`
      : '';
    const mob = p.mobile
      ? `<div class="cs-frame phone ${esc(p.mobileFrame || '')}">
          <div class="label"><span>Mobile</span><span>≤860px</span></div>
          <div class="stage">${p.mobile}</div>
        </div>`
      : '';
    if (dual && desk && mob) return `<div class="cs-frames both">${desk}${mob}</div>`;
    if (desk && mob) {
      return `<div class="cs-frames" data-viewport-root>
        <div data-vp="desktop">${desk}</div>
        <div data-vp="mobile" hidden>${mob}</div>
      </div>`;
    }
    return `<div class="cs-frames">${desk || mob}</div>`;
  }

  function renderSection(section) {
    const tags = (section.tags || [])
      .map((t) => {
        const cls = t === 'desktop' ? 'd' : t === 'mobile' ? 'm' : t === 'interactive' ? 'o' : '';
        return `<span class="cs-tag ${cls}">${esc(t)}</span>`;
      })
      .join('');
    const hasBothViewports = !!(section.preview?.desktop && section.preview?.mobile && !section.preview?.dual);
    const hasCode = section.code && Object.keys(section.code).some((k) => section.code[k]);

    return `<section class="cs-section" id="${esc(section.id)}">
      <header>
        <h3>${esc(section.title)}</h3>
        ${section.blurb ? `<p>${esc(section.blurb)}</p>` : ''}
        ${tags ? `<div class="cs-tags">${tags}</div>` : ''}
      </header>
      <div class="cs-panel" data-section="${esc(section.id)}">
        <div class="cs-toolbar">
          <div class="cs-seg" data-mode role="tablist">
            <button type="button" class="on" data-mode-btn="preview">Preview</button>
            ${hasCode ? `<button type="button" data-mode-btn="code">Code</button>` : ''}
          </div>
          ${
            hasBothViewports
              ? `<div class="cs-seg" data-viewport role="tablist">
                  <button type="button" class="on" data-vp-btn="desktop">Desktop</button>
                  <button type="button" data-vp-btn="mobile">Mobile</button>
                </div>`
              : ''
          }
          <div class="spacer"></div>
          ${hasCode ? `<button type="button" class="cs-copy" data-copy>Copy</button>` : ''}
        </div>
        <div class="cs-body on" data-body="preview">
          <div class="cs-preview">${previewFrames(section)}</div>
        </div>
        ${
          hasCode
            ? `<div class="cs-body" data-body="code">
                <div class="cs-code on" data-code-root>${codeTabs(section.code)}</div>
              </div>`
            : ''
        }
      </div>
      ${renderMatrix(section.matrix)}
      ${renderInteractions(section.interactions)}
    </section>`;
  }

  function renderAll() {
    main.innerHTML = `
      <div class="cs-hero">
        <h2>Component cheatsheet</h2>
        <p>States, microinteractions, and copy-paste snippets from the feed prototype. Preview ↔ code. Desktop ↔ mobile.</p>
        <div class="meta">
          <span class="cs-chip"><b>Source</b> feed.html</span>
          <span class="cs-chip"><b>Theme</b> html.dark</span>
          <span class="cs-chip"><b>Sections</b> ${catalog.length}</span>
        </div>
      </div>
      ${catalog.map(renderSection).join('')}`;
  }

  /* ---------- interactions ---------- */
  function bindPanels() {
    main.querySelectorAll('.cs-panel').forEach((panel) => {
      const modeSeg = panel.querySelector('[data-mode]');
      const vpSeg = panel.querySelector('[data-viewport]');
      const copyBtn = panel.querySelector('[data-copy]');
      const codeRoot = panel.querySelector('[data-code-root]');

      modeSeg?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-mode-btn]');
        if (!btn) return;
        modeSeg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
        const mode = btn.dataset.modeBtn;
        panel.querySelectorAll('[data-body]').forEach((b) => b.classList.toggle('on', b.dataset.body === mode));
      });

      vpSeg?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-vp-btn]');
        if (!btn) return;
        vpSeg.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
        const vp = btn.dataset.vpBtn;
        panel.querySelectorAll('[data-vp]').forEach((el) => {
          el.hidden = el.dataset.vp !== vp;
        });
      });

      codeRoot?.querySelector('.cs-code-tabs')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-lang]');
        if (!btn) return;
        const lang = btn.dataset.lang;
        codeRoot.querySelectorAll('.cs-code-tabs button').forEach((b) => b.classList.toggle('on', b === btn));
        codeRoot.querySelectorAll('.cs-code-pane').forEach((p) => {
          p.style.display = p.dataset.pane === lang ? 'block' : 'none';
        });
      });

      copyBtn?.addEventListener('click', async () => {
        const activePane =
          panel.querySelector('[data-body="code"].on .cs-code-pane[style*="block"] code') ||
          panel.querySelector('[data-body="code"].on .cs-code-pane code');
        const text = activePane?.textContent || '';
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied';
          copyBtn.classList.add('ok');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('ok');
          }, 1200);
        } catch (_) {
          copyBtn.textContent = 'Failed';
        }
      });
    });
  }

  function bindHaptics() {
    let webHaptics = null;
    import('https://esm.sh/web-haptics@0.0.6')
      .then((m) => {
        try {
          webHaptics = new m.WebHaptics();
        } catch (_) {}
      })
      .catch(() => {});

    const map = {
      light: 'light',
      selection: 'selection',
      nudge: 'nudge',
      settle: 'success',
      attach: 'success',
      dragtick: 'soft',
      toggle: 'rigid',
      open: 'medium',
      comment: 'success',
      share: 'soft',
      tip: 'success',
      like: 'medium',
      dislike: 'warning',
    };

    main.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-haptic]');
      if (!btn) return;
      const preset = btn.dataset.haptic;
      try {
        webHaptics?.trigger(map[preset] || preset);
      } catch (_) {}
      if (navigator.vibrate) {
        try {
          navigator.vibrate([10, 30, 12]);
        } catch (_) {}
      }
      btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'scale(1)' }], {
        duration: 180,
        easing: 'ease-out',
      });
    });
  }

  function bindDemoReacts() {
    main.addEventListener('click', (e) => {
      const btn = e.target.closest('.demo-react button[data-kind]');
      if (!btn) return;
      const kind = btn.dataset.kind;
      const group = btn.closest('.demo-react')?.parentElement;
      if (kind === 'tip') {
        btn.classList.add('active', 'pulse');
        setTimeout(() => btn.classList.remove('pulse'), 420);
        return;
      }
      if (kind === 'like' || kind === 'dislike') {
        const other = group?.querySelector(`button[data-kind="${kind === 'like' ? 'dislike' : 'like'}"]`);
        const on = !btn.classList.contains('active');
        btn.classList.toggle('active', on);
        if (on) other?.classList.remove('active');
        btn.classList.add('pulse');
        setTimeout(() => btn.classList.remove('pulse'), 420);
      }
    });

    main.addEventListener('click', (e) => {
      const sw = e.target.closest('.demo-switch');
      if (!sw) return;
      sw.classList.toggle('on');
      sw.setAttribute('aria-checked', sw.classList.contains('on') ? 'true' : 'false');
    });
  }

  /* ---------- scroll spy + chrome ---------- */
  function bindScrollSpy() {
    const links = [...nav.querySelectorAll('a[data-id]')];
    const map = new Map(links.map((a) => [a.dataset.id, a]));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.remove('active'));
          map.get(en.target.id)?.classList.add('active');
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    catalog.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
  }

  document.getElementById('themeBtn')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
  document.getElementById('navToggle')?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) nav.classList.remove('open');
  });

  buildNav();
  renderAll();
  bindPanels();
  bindHaptics();
  bindDemoReacts();
  bindScrollSpy();
})();
