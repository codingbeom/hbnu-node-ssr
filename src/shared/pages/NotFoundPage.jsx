export function NotFoundPage({ data }) {
  return (
    <header className="intro">
      <p className="eyebrow">404</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p className="lede">
        <code>{data.path}</code> 경로에는 페이지가 없습니다.
      </p>
      <p>
        <a className="text-link" href="/">
          홈으로 돌아가기
        </a>
      </p>
    </header>
  );
}
