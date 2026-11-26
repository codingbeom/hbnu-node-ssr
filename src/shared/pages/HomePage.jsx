import { Counter } from '../components/Counter.jsx';
import { ServerData } from '../components/ServerData.jsx';

export function HomePage({ data }) {
  return (
    <>
      <header className="intro">
        <p className="eyebrow">과제 스타터</p>
        <h1>서버가 먼저 그린 페이지</h1>
        <p className="lede">
          이 문장은 브라우저 자바스크립트 없이 HTML에 들어 있습니다. 페이지 소스를
          열어도 같은 문장이 보여야 합니다.
        </p>
      </header>
      <ServerData data={data} />
      <Counter />
    </>
  );
}
