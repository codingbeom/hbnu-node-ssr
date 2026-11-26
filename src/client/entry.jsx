import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '../shared/App.jsx';
import { normalizePath } from '../shared/routes.js';

const root = document.getElementById('root');
const data = window.__INITIAL_DATA__;

if (!root) {
  throw new Error('#root 요소가 없습니다.');
}

if (!data) {
  throw new Error('window.__INITIAL_DATA__가 없습니다. 서버 HTML의 스크립트를 확인하세요.');
}

// 서버 HTML은 그대로 두고 클릭 같은 이벤트만 연결한다.
hydrateRoot(
  root,
  <StrictMode>
    <App url={normalizePath(window.location.pathname)} data={data} />
  </StrictMode>,
);
