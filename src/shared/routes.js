import { AboutPage } from './pages/AboutPage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

export const routes = [
  { path: '/', title: '홈', nav: '홈', page: HomePage },
  { path: '/about', title: '소개', nav: '소개', page: AboutPage },
];

export function normalizePath(url = '/') {
  const withSlash = url.startsWith('/') ? url : `/${url}`;
  const pathname = withSlash.split('?')[0] || '/';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function matchRoute(url) {
  const path = normalizePath(url);
  return (
    routes.find((route) => route.path === path) ?? {
      path,
      title: '페이지를 찾을 수 없습니다',
      page: NotFoundPage,
      statusCode: 404,
    }
  );
}
