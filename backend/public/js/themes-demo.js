(() => {
  const themes = {
    'signal-amber': {
      title: 'Signal Amber Theme',
      description: 'Warm, direct-action marketplace feel inspired by trading stamps and physical shipping tags.',
      dark: {
        accent: '#ff7e36',
        accentHover: '#ff965b',
        accentLight: 'rgba(255, 126, 54, 0.12)',
        accentGlow: 'rgba(255, 126, 54, 0.28)',
        accentContrast: '#0a0d12',
        background: '#0a0d12',
        cardBg: '#121720',
        inputBg: '#181f2b',
        textPrimary: '#f1f5f9',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        cardBorder: 'rgba(255, 255, 255, 0.08)'
      },
      light: {
        accent: '#d45a16',
        accentHover: '#b84c10',
        accentLight: 'rgba(212, 90, 22, 0.08)',
        accentGlow: 'rgba(212, 90, 22, 0.20)',
        accentContrast: '#ffffff',
        background: '#f8f9fa',
        cardBg: '#ffffff',
        inputBg: '#f1f3f5',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#94a3b8',
        cardBorder: 'rgba(15, 23, 42, 0.08)'
      }
    },
    'nordic-petrol': {
      title: 'Nordic Petrol / Baltic Marine Theme',
      description: 'High-trust, Scandinavian precision, calm, and architectural. Clean European tech aesthetic.',
      dark: {
        accent: '#0ea5e9',
        accentHover: '#38bdf8',
        accentLight: 'rgba(14, 165, 233, 0.12)',
        accentGlow: 'rgba(14, 165, 233, 0.28)',
        accentContrast: '#0b1017',
        background: '#0b1017',
        cardBg: '#131b26',
        inputBg: '#1a2433',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        cardBorder: 'rgba(255, 255, 255, 0.08)'
      },
      light: {
        accent: '#0284c7',
        accentHover: '#0369a1',
        accentLight: 'rgba(2, 132, 199, 0.08)',
        accentGlow: 'rgba(2, 132, 199, 0.20)',
        accentContrast: '#ffffff',
        background: '#f8fafc',
        cardBg: '#ffffff',
        inputBg: '#f1f5f9',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#94a3b8',
        cardBorder: 'rgba(15, 23, 42, 0.08)'
      }
    },
    'industrial-brass': {
      title: 'Industrial Brass / Cyber-Bronze Theme',
      description: 'Craftsmanship, utilitarian hardware, and premium collectibles. Inspired by mechanical cameras and audio equipment.',
      dark: {
        accent: '#f59e0b',
        accentHover: '#fbbf24',
        accentLight: 'rgba(245, 158, 11, 0.14)',
        accentGlow: 'rgba(245, 158, 11, 0.30)',
        accentContrast: '#0c0c0e',
        background: '#0c0c0e',
        cardBg: '#15151a',
        inputBg: '#1d1d24',
        textPrimary: '#f5f5f7',
        textSecondary: '#a1a1aa',
        textMuted: '#71717a',
        cardBorder: 'rgba(255, 255, 255, 0.08)'
      },
      light: {
        accent: '#d97706',
        accentHover: '#b45309',
        accentLight: 'rgba(217, 119, 6, 0.08)',
        accentGlow: 'rgba(217, 119, 6, 0.20)',
        accentContrast: '#ffffff',
        background: '#faf9f6',
        cardBg: '#ffffff',
        inputBg: '#f4f3ef',
        textPrimary: '#18181b',
        textSecondary: '#52525b',
        textMuted: '#a1a1aa',
        cardBorder: 'rgba(24, 24, 27, 0.08)'
      }
    },
    'circular-emerald': {
      title: 'Circular Emerald / Sage Foundry Theme',
      description: 'Sustainable secondhand, modern circular economy, refreshing, approachable, and human.',
      dark: {
        accent: '#10b981',
        accentHover: '#34d399',
        accentLight: 'rgba(16, 185, 129, 0.12)',
        accentGlow: 'rgba(16, 185, 129, 0.28)',
        accentContrast: '#090e0c',
        background: '#090e0c',
        cardBg: '#111a16',
        inputBg: '#17241e',
        textPrimary: '#f1f5f3',
        textSecondary: '#9ca3af',
        textMuted: '#6b7280',
        cardBorder: 'rgba(255, 255, 255, 0.08)'
      },
      light: {
        accent: '#059669',
        accentHover: '#047857',
        accentLight: 'rgba(5, 150, 105, 0.08)',
        accentGlow: 'rgba(5, 150, 105, 0.20)',
        accentContrast: '#ffffff',
        background: '#f6f8f6',
        cardBg: '#ffffff',
        inputBg: '#edf2ee',
        textPrimary: '#06281e',
        textSecondary: '#374151',
        textMuted: '#9ca3af',
        cardBorder: 'rgba(6, 40, 30, 0.08)'
      }
    },
    'obsidian-cobalt': {
      title: 'Obsidian Cobalt / High-Velocity Theme (Current)',
      description: 'Razor-sharp precision, fast and modern (Linear / Raycast aesthetic applied to commerce).',
      dark: {
        accent: '#3b82f6',
        accentHover: '#60a5fa',
        accentLight: 'rgba(59, 130, 246, 0.14)',
        accentGlow: 'rgba(59, 130, 246, 0.30)',
        accentContrast: '#08090c',
        background: '#08090c',
        cardBg: '#101318',
        inputBg: '#181d26',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        cardBorder: 'rgba(255, 255, 255, 0.08)'
      },
      light: {
        accent: '#2563eb',
        accentHover: '#1d4ed8',
        accentLight: 'rgba(37, 99, 235, 0.08)',
        accentGlow: 'rgba(37, 99, 235, 0.20)',
        accentContrast: '#ffffff',
        background: '#fafafa',
        cardBg: '#ffffff',
        inputBg: '#f1f5f9',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#94a3b8',
        cardBorder: 'rgba(15, 23, 42, 0.08)'
      }
    }
  };

  let activeThemeKey = 'obsidian-cobalt';
  let isDarkMode = true;

  function applyCurrentTokens() {
    const themeData = themes[activeThemeKey];
    if (!themeData) return;
    const tokens = isDarkMode ? themeData.dark : themeData.light;
    const root = document.documentElement;

    root.style.setProperty('--background', tokens.background);
    root.style.setProperty('--card-bg', tokens.cardBg);
    root.style.setProperty('--input-bg', tokens.inputBg);
    root.style.setProperty('--card-border', tokens.cardBorder);
    root.style.setProperty('--text-primary', tokens.textPrimary);
    root.style.setProperty('--text-secondary', tokens.textSecondary);
    root.style.setProperty('--text-muted', tokens.textMuted);
    root.style.setProperty('--accent', tokens.accent);
    root.style.setProperty('--accent-hover', tokens.accentHover);
    root.style.setProperty('--accent-light', tokens.accentLight);
    root.style.setProperty('--accent-glow', tokens.accentGlow);
    root.style.setProperty('--accent-contrast', tokens.accentContrast);

    const titleElem = document.getElementById('theme-title');
    const descElem = document.getElementById('theme-description');
    const metaElem = document.getElementById('palette-meta');
    if (titleElem) titleElem.innerText = themeData.title;
    if (descElem) descElem.innerText = themeData.description;
    if (metaElem) metaElem.innerText = isDarkMode ? 'Dark Mode Variables' : 'Light Mode Variables';

    // Update Swatches
    const swatchesContainer = document.getElementById('swatches-container');
    if (swatchesContainer) {
      const swatchItems = [
        { label: 'Brand Accent', hex: tokens.accent },
        { label: 'Accent Hover', hex: tokens.accentHover },
        { label: 'Canvas Background', hex: tokens.background },
        { label: 'Card Surface', hex: tokens.cardBg },
        { label: 'Input Surface', hex: tokens.inputBg },
        { label: 'Primary Text', hex: tokens.textPrimary },
        { label: 'Secondary Text', hex: tokens.textSecondary }
      ];

      swatchesContainer.innerHTML = swatchItems.map(item => `
        <div class="swatch-box">
          <div class="swatch-color-pill" style="background-color: ${item.hex};"></div>
          <span class="swatch-label">${item.label}</span>
          <span class="swatch-hex">${item.hex}</span>
        </div>
      `).join('');
    }

    // Generate CSS Code Box
    const codeBox = document.getElementById('css-code-display');
    if (codeBox) {
      codeBox.innerText = `:root {
  --background: ${themeData.light.background};
  --card-bg: ${themeData.light.cardBg};
  --input-bg: ${themeData.light.inputBg};
  --text-primary: ${themeData.light.textPrimary};
  --text-secondary: ${themeData.light.textSecondary};
  --accent: ${themeData.light.accent};
  --accent-hover: ${themeData.light.accentHover};
  --accent-light: ${themeData.light.accentLight};
}

[data-theme="dark"] {
  --background: ${themeData.dark.background};
  --card-bg: ${themeData.dark.cardBg};
  --input-bg: ${themeData.dark.inputBg};
  --text-primary: ${themeData.dark.textPrimary};
  --text-secondary: ${themeData.dark.textSecondary};
  --accent: ${themeData.dark.accent};
  --accent-hover: ${themeData.dark.accentHover};
  --accent-light: ${themeData.dark.accentLight};
}`;
    }
  }

  function switchTheme(key, btnElement) {
    activeThemeKey = key;
    document.querySelectorAll('.theme-chip').forEach(b => b.classList.remove('active'));
    if (btnElement) {
      btnElement.classList.add('active');
    }
    applyCurrentTokens();
  }

  function toggleMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    const btn = document.getElementById('mode-btn');
    if (btn) {
      btn.innerHTML = isDarkMode 
        ? '<i class="fa-solid fa-sun"></i> <span>Dark Mode</span>' 
        : '<i class="fa-solid fa-moon"></i> <span>Light Mode</span>';
    }
    applyCurrentTokens();
  }

  function copyCssCode() {
    const codeElem = document.getElementById('css-code-display');
    if (!codeElem) return;
    navigator.clipboard.writeText(codeElem.innerText).then(() => {
      alert('CSS variables copied to clipboard!');
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = codeElem.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('CSS variables copied to clipboard!');
    });
  }

  function init() {
    // Bind theme chip clicks
    document.querySelectorAll('.theme-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-theme-key');
        if (key) {
          switchTheme(key, btn);
        }
      });
    });

    // Bind mode toggle button
    const modeBtn = document.getElementById('mode-btn');
    if (modeBtn) {
      modeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMode();
      });
    }

    // Bind copy CSS button
    const copyBtn = document.getElementById('copy-css-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        copyCssCode();
      });
    }

    // Initial render
    applyCurrentTokens();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
