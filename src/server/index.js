import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPageData } from './data.js';
import { loadEnvFile, readPort } from './env.js';
import { renderPage } from './render.jsx';
import { normalizePath } from '../shared/routes.js';

await loadEnvFile();

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = readPort();
const app = express();

app.disable('x-powered-by');

app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    next();
    return;
  }
  res
    .status(405)
    .set('Allow', 'GET, HEAD')
    .type('text/plain; charset=utf-8')
    .send('GET과 HEAD만 지원합니다.');
});

app.use(
  '/assets',
  express.static(path.join(distDir, 'client'), {
    index: false,
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  }),
);

app.use('/assets', (_req, res) => {
  res.status(404).type('text/plain; charset=utf-8').send('정적 파일을 찾을 수 없습니다.');
});

app.use(
  express.static(path.join(distDir, 'public'), {
    index: false,
  }),
);

app.get('/favicon.ico', (_req, res) => {
  res.redirect(302, '/favicon.svg');
});

app.use(async (req, res, next) => {
  try {
    const url = normalizePath(req.path);
    const data = await loadPageData(url);
    renderPage(res, { url, data });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    next(error);
    return;
  }
  res
    .status(500)
    .type('html')
    .send(
      '<!DOCTYPE html><html lang="ko"><meta charset="utf-8"><body><p>요청을 처리하지 못했습니다.</p></body></html>',
    );
});

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
