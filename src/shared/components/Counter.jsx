import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section className="panel" aria-labelledby="counter-title">
      <h2 id="counter-title">클라이언트 카운터</h2>
      <p>
        숫자는 서버 HTML에 0으로 들어 있습니다. 브라우저에서 hydration이 끝나면
        버튼이 이 값을 바꿉니다.
      </p>
      <p className="count" aria-live="polite">
        현재 값 <strong id="count">{count}</strong>
      </p>
      <div className="actions">
        <button type="button" id="decrement" onClick={() => setCount((value) => value - 1)}>
          감소
        </button>
        <button type="button" id="increment" onClick={() => setCount((value) => value + 1)}>
          증가
        </button>
      </div>
    </section>
  );
}
