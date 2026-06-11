/**
 * shared.js — mrjones.org.uk
 * Injects a consistent nav bar and base styles into every page.
 * Usage: <script src="/shared.js"></script>  (anywhere in <body>)
 */

(function () {
  const NAV_ITEMS = [
    { label: '🏠 Home',        href: '/'            },
    { label: '🎯 Nim',         href: '/nim/'         },
    { label: '🗼 Hanoi',       href: '/hanoi/'       },
    { label: '🔵 Mastermind',  href: '/mastermind/'  },
  ];

  /* ── Styles ─────────────────────────────────────────────────────── */
  const css = `
    #mrj-nav {
      --nav-bg:       #fdf8dc;
      --nav-border:   #e8d87a;
      --nav-text:     #1e1e1e;
      --nav-muted:    #888880;
      --nav-green:    #2a9648;
      --nav-hover-bg: #fef6c0;
      --nav-active-bg: #e8d87a;
      font-family: Arial, Helvetica, sans-serif;
      background: var(--nav-bg);
      border-bottom: 2.5px solid var(--nav-border);
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 4px;
      min-height: 52px;
      flex-wrap: wrap;
    }

    #mrj-nav a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--nav-text);
      white-space: nowrap;
      transition: background 0.13s;
    }

    #mrj-nav a:hover {
      background: var(--nav-hover-bg);
    }

    #mrj-nav a.mrj-active {
      background: var(--nav-active-bg);
      color: var(--nav-text);
    }

    #mrj-nav a.mrj-home {
      color: var(--nav-green);
      margin-right: 8px;
    }

    @media (max-width: 480px) {
      #mrj-nav {
        padding: 6px 12px;
        gap: 2px;
      }
      #mrj-nav a {
        padding: 6px 10px;
        font-size: 0.8rem;
      }
    }
  `;

  /* ── Inject stylesheet ──────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Build nav element ──────────────────────────────────────────── */
  const nav = document.createElement('nav');
  nav.id = 'mrj-nav';

  // Work out which page we're on so we can highlight the active link
  const currentPath = window.location.pathname.replace(/\/?$/, '/');

  NAV_ITEMS.forEach(({ label, href }) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;

    const normHref = href.replace(/\/?$/, '/');

    if (href === '/' && currentPath === '/') {
      a.classList.add('mrj-active');
    } else if (href !== '/' && currentPath.startsWith(normHref)) {
      a.classList.add('mrj-active');
    }

    if (href === '/') a.classList.add('mrj-home');

    nav.appendChild(a);
  });

  /* ── Insert before the first element in <body> ──────────────────── */
  document.body.insertBefore(nav, document.body.firstChild);
})();
