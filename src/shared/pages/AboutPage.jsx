import { ServerData } from '../components/ServerData.jsx';

export function AboutPage({ data }) {
  return (
    <>
      <header className="intro">
        <p className="eyebrow">한밭대학교 · HBNU</p>
        <h1>이 서버가 하는 일</h1>
        <p className="lede">
          화면 컴포넌트는 <code>src/shared</code>에 하나만 있습니다. 서버와 브라우저가
          그 컴포넌트를 같이 씁니다.
        </p>
      </header>
      <section className="panel" aria-labelledby="flow-title">
        <h2 id="flow-title">요청 한 번의 흐름</h2>
        <ol className="steps">
          <li>Express가 경로에 맞는 페이지를 고릅니다.</li>
          <li>서버가 초기 데이터를 만들고 React를 HTML로 그립니다.</li>
          <li>브라우저는 그 HTML을 먼저 보여 줍니다.</li>
          <li>
            <code>hydrateRoot</code>가 같은 데이터로 이벤트를 연결합니다.
          </li>
        </ol>
      </section>
      <ServerData data={data} />
    </>
  );
}
