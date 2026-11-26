import { normalizePath, routes } from '../routes.js';

export function Layout({ url, children }) {
  const path = normalizePath(url);

  return (
    <div className="page">
      <a className="skip" href="#content">
        본문으로 건너뛰기
      </a>
      <header className="site-header">
        <div className="brand">
          <p className="mark">HBNU</p>
          <div>
            <p className="eyebrow">Hanbat National University</p>
            <p className="brand-name">한밭대학교</p>
          </div>
        </div>
        <nav aria-label="주요">
          <ul>
            {routes.map((route) => (
              <li key={route.path}>
                <a
                  href={route.path}
                  aria-current={path === route.path ? 'page' : undefined}
                >
                  {route.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className="site-footer">
        <p>Express가 React를 HTML로 그린 뒤, 브라우저가 hydrateRoot로 이벤트를 붙입니다.</p>
      </footer>
    </div>
  );
}
