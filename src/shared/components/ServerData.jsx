export function ServerData({ data }) {
  return (
    <section className="panel" aria-labelledby="data-title">
      <h2 id="data-title">서버에서 넘긴 초기 데이터</h2>
      <dl className="facts">
        <div>
          <dt>학교</dt>
          <dd>{data.university}</dd>
        </div>
        <div>
          <dt>과목</dt>
          <dd>{data.course}</dd>
        </div>
        <div>
          <dt>서버 시각</dt>
          <dd>
            <time dateTime={data.fetchedAt}>{data.fetchedAtLabel}</time>
          </dd>
        </div>
        <div>
          <dt>요청 경로</dt>
          <dd>
            <code>{data.path}</code>
          </dd>
        </div>
      </dl>
      <p>{data.message}</p>
    </section>
  );
}
