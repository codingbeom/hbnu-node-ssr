import { Writable } from 'node:stream';
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { App } from '../shared/App.jsx';
import { escapeHtml, serializeForHtml } from '../shared/serialize.js';
import { matchRoute } from '../shared/routes.js';

export function renderPage(res, { url, data }) {
  const route = matchRoute(url);
  const title = escapeHtml(`${route.title} · 한밭대학교`);
  const prefix = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="한밭대학교 과제용 Express와 React SSR 예제">
<title>${title}</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/styles.css">
</head>
<body>
<noscript><p class="noscript">자바스크립트가 꺼져 있어 서버가 그린 화면만 보입니다. 카운터는 동작하지 않습니다.</p></noscript>
<div id="root">`;
  const suffix = `</div>
<script>window.__INITIAL_DATA__ = ${serializeForHtml(data)};</script>
<script type="module" src="/assets/client.js"></script>
</body>
</html>
`;

  let didError = false;
  let stream;

  const abortTimer = setTimeout(() => {
    stream?.abort();
  }, 10_000);

  stream = renderToPipeableStream(
    <StrictMode>
      <App url={url} data={data} />
    </StrictMode>,
    {
      onShellReady() {
        // 문서 앞부분을 먼저 보내고, React가 그린 HTML을 #root 안에 잇는다.
        res.status(didError ? 500 : (route.statusCode ?? 200));
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write(prefix);

        const sink = new Writable({
          write(chunk, _encoding, callback) {
            if (res.write(chunk)) callback();
            else res.once('drain', callback);
          },
          final(callback) {
            res.end(suffix);
            callback();
          },
        });

        sink.on('error', (error) => {
          console.error(error);
          stream.abort();
        });

        stream.pipe(sink);
      },
      onShellError(error) {
        console.error(error);
        if (res.headersSent) return;
        res
          .status(500)
          .type('html')
          .send(
            '<!DOCTYPE html><html lang="ko"><meta charset="utf-8"><body><p>페이지를 그리지 못했습니다.</p></body></html>',
          );
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    },
  );

  res.on('finish', () => clearTimeout(abortTimer));
  res.on('close', () => {
    clearTimeout(abortTimer);
    if (!res.writableEnded) stream.abort();
  });
}
