window.__ModuleLoader__.load({
  id: '@local/theme-skin',
  factory(require) {
    // The only platform seed word this plugin needs is React.
    const React = require('react');
    const h = React.createElement;
    const STORAGE_KEY = 'theme-skin.selected';
    const LAYER = '@local/theme-skin';

    // Every skin overrides all 14 alias tokens, each with a light and a dark value.
    const TOKENS = [
      '--dsw-alias-bg-base',
      '--dsw-alias-bg-layer-1',
      '--dsw-alias-bg-layer-2',
      '--dsw-alias-bg-overlay',
      '--dsw-alias-border-l1',
      '--dsw-alias-border-l2',
      '--dsw-alias-brand-primary',
      '--dsw-alias-label-primary',
      '--dsw-alias-label-secondary',
      '--dsw-alias-state-error-primary',
      '--dsw-alias-state-idle-primary',
      '--dsw-alias-state-success-primary',
      '--dsw-alias-state-warn-primary',
      '--dsw-specific-sidebar-fill',
    ];

    const SKINS = [
      {
        id: 'ocean',
        name: '深海蓝 Ocean',
        swatch: ['#2563eb', '#3b82f6'],
        light: ['#f4f7fb', '#ffffff', '#eef3f9', '#ffffff', '#dbe4ee', '#c3d0de', '#2563eb', '#17263b', '#5b6b80', '#dc2626', '#94a3b8', '#16a34a', '#d97706', '#e8eff7'],
        dark: ['#0b1220', '#111a2b', '#18233a', '#16203a', '#24314d', '#33436a', '#3b82f6', '#e6edf7', '#93a3ba', '#f87171', '#64748b', '#4ade80', '#fbbf24', '#0e1626'],
      },
      {
        id: 'violet',
        name: '紫夜 Violet',
        swatch: ['#7c3aed', '#a78bfa'],
        light: ['#f7f5fc', '#ffffff', '#f0ecf9', '#ffffff', '#e4def0', '#cfc6e3', '#7c3aed', '#241a3d', '#6b5f85', '#dc2626', '#a99fc2', '#16a34a', '#d97706', '#efe9f9'],
        dark: ['#120f1e', '#1a1530', '#241d42', '#201a3a', '#2f2750', '#423768', '#a78bfa', '#ece7f9', '#a496c4', '#f87171', '#6f6490', '#4ade80', '#fbbf24', '#161129'],
      },
      {
        id: 'forest',
        name: '森绿 Forest',
        swatch: ['#059669', '#34d399'],
        light: ['#f3f7f3', '#ffffff', '#e9f1ea', '#ffffff', '#d8e4da', '#bfd2c3', '#059669', '#14261b', '#56705f', '#dc2626', '#9ab2a1', '#15803d', '#d97706', '#e6f0e8'],
        dark: ['#0d1512', '#14211b', '#1c2e25', '#182921', '#263c31', '#35513f', '#34d399', '#e7f2ec', '#93ae9d', '#f87171', '#5f7a6c', '#4ade80', '#fbbf24', '#111c16'],
      },
      {
        id: 'sunset',
        name: '暖沙 Sunset',
        swatch: ['#ea580c', '#fb923c'],
        light: ['#faf4ec', '#fffdf9', '#f4ebdf', '#fffdf9', '#e9dcc9', '#d6c2a6', '#ea580c', '#3a2a18', '#8a7358', '#dc2626', '#b09a7e', '#16a34a', '#b45309', '#f6ecdd'],
        dark: ['#191310', '#221a15', '#2d221b', '#281e18', '#3d2f25', '#55412f', '#fb923c', '#f5e9dd', '#bfa288', '#f87171', '#8a7358', '#4ade80', '#fbbf24', '#1f1712'],
      },
      {
        id: 'rose',
        name: '玫瑰 Rose',
        swatch: ['#e11d48', '#fb7185'],
        light: ['#fbf4f6', '#ffffff', '#f7eaee', '#ffffff', '#efdbe1', '#dfc2cc', '#e11d48', '#331520', '#84586a', '#be123c', '#bd93a3', '#16a34a', '#d97706', '#f6e7ec'],
        dark: ['#1a1116', '#241820', '#30202b', '#2a1c26', '#3f2a37', '#583c4d', '#fb7185', '#f7e8ee', '#c39aab', '#fda4af', '#8a6076', '#4ade80', '#fbbf24', '#201519'],
      },
    ];

    function findSkin(id) {
      return SKINS.find((skin) => skin.id === id);
    }

    // Token-name -> { light, dark } pairs, the shape ThemeRuntime.overrideTokens validates.
    function tokenPairs(skin) {
      const pairs = {};
      TOKENS.forEach((token, i) => {
        pairs[token] = { light: skin.light[i], dark: skin.dark[i] };
      });
      return pairs;
    }

    function currentSelection() {
      try {
        return window.localStorage.getItem(STORAGE_KEY) || '';
      } catch {
        return '';
      }
    }

    function saveSelection(id) {
      try {
        if (id) window.localStorage.setItem(STORAGE_KEY, id);
        else window.localStorage.removeItem(STORAGE_KEY);
      } catch { /* private mode: session-only skin */ }
    }

    function PaletteIcon() {
      return h('svg', {
        viewBox: '0 0 64 64', width: 20, height: 20, 'aria-hidden': true,
        style: { display: 'block' },
      },
        h('path', {
          d: 'M32 10a22 22 0 1 0 0 44c4 0 5.6-2.7 4.4-5.4-1.7-3.7 1-7.6 5-7.6h5.4a7 7 0 0 0 7-7C53.8 21 44 10 32 10z',
          fill: 'currentColor',
        }),
        h('circle', { cx: 24, cy: 26, r: 3.2, fill: 'var(--dsw-alias-bg-overlay, #fff)' }),
        h('circle', { cx: 34, cy: 20, r: 3.2, fill: 'var(--dsw-alias-bg-overlay, #fff)' }),
        h('circle', { cx: 43, cy: 28, r: 3.2, fill: 'var(--dsw-alias-bg-overlay, #fff)' }),
      );
    }

    function rowStyle(active) {
      return {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 8px', borderRadius: 8, cursor: 'pointer',
        fontWeight: active ? 600 : 400,
        background: active ? 'var(--dsw-alias-bg-layer-2, transparent)' : 'transparent',
      };
    }

    function SkinSwitcher({ onApply }) {
      const [open, setOpen] = React.useState(false);
      const [selected, setSelected] = React.useState(currentSelection());

      const choose = (id) => {
        setSelected(id);
        saveSelection(id);
        onApply(id);
        setOpen(false); // 选完即收起菜单
      };

      return h('div', { style: { position: 'fixed', right: 18, bottom: 18, zIndex: 2147483000 } },
        h('div', {
          role: 'button', tabIndex: 0,
          'aria-label': 'Theme skin',
          'data-theme-skin-toggle': '',
          title: 'Theme skin / 换肤',
          onClick: () => setOpen((v) => !v),
          onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') setOpen((v) => !v); },
          style: {
            width: 40, height: 40, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--dsw-alias-brand-primary)',
            color: 'var(--dsw-alias-bg-overlay, #fff)',
            border: '1px solid var(--dsw-alias-border-l2)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
          },
        }, h(PaletteIcon)),
        open && h('div', {
          role: 'menu',
          style: {
            position: 'absolute', right: 0, bottom: 50, width: 224, padding: 8,
            background: 'var(--dsw-alias-bg-overlay, var(--dsw-alias-bg-layer-1))',
            border: '1px solid var(--dsw-alias-border-l1)',
            borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,0.3)',
            fontFamily: 'inherit', fontSize: 13, color: 'var(--dsw-alias-label-primary)',
          },
        },
          h('div', {
            style: {
              padding: '4px 8px 8px', color: 'var(--dsw-alias-label-secondary)',
              fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase',
            },
          }, 'Theme skin / 换肤'),
          h('div', {
            role: 'menuitem', tabIndex: 0,
            onClick: () => choose(''),
            onKeyDown: (e) => { if (e.key === 'Enter') choose(''); },
            style: rowStyle(!selected),
          },
            h('span', { style: { width: 14, height: 14, borderRadius: '50%', border: '1px dashed var(--dsw-alias-border-l2)', display: 'inline-block' } }),
            h('span', null, '默认 Default'),
          ),
          ...SKINS.map((skin) => h('div', {
            key: skin.id,
            role: 'menuitem', tabIndex: 0,
            onClick: () => choose(skin.id),
            onKeyDown: (e) => { if (e.key === 'Enter') choose(skin.id); },
            style: rowStyle(selected === skin.id),
          },
            h('span', {
              style: {
                width: 14, height: 14, borderRadius: '50%', display: 'inline-block',
                background: `linear-gradient(135deg, ${skin.swatch[0]} 50%, ${skin.swatch[1]} 50%)`,
              },
            }),
            h('span', null, skin.name),
          )),
        ),
      );
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // Optional service: present in this build, but never fatal if it is not.
        let theme;
        try {
          theme = typeof ctx.get === 'function' ? ctx.get('theme') : undefined;
        } catch {
          theme = undefined;
        }

        let removeLayer;

        const removeLayerSafe = () => {
          if (typeof removeLayer !== 'function') return;
          try { removeLayer(); } catch { /* already replaced */ }
          removeLayer = undefined;
        };

        const applySkin = (id) => {
          const skin = findSkin(id);
          if (theme && typeof theme.overrideTokens === 'function') {
            removeLayerSafe();
            if (skin) removeLayer = theme.overrideTokens(LAYER, tokenPairs(skin));
            return;
          }
          // Fallback for a build without the theme service.
          const el = document.documentElement;
          if (!skin) {
            el.removeAttribute('data-tskin');
            return;
          }
          el.setAttribute('data-tskin', skin.id);
        };

        // Register first: the picker must exist even if the restoring step fails.
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay', id: 'theme-skin', order: 900,
        }, () => h(SkinSwitcher, { onApply: applySkin })));

        // Best-effort: restore the saved skin on activation.
        try {
          ctx.effect(() => {
            applySkin(currentSelection());
            return () => removeLayerSafe();
          }, 'theme-skin restore');
        } catch {
          applySkin(currentSelection());
        }
      },
    };
  },
});
