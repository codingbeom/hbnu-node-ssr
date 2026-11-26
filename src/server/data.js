const timeFormat = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'full',
  timeStyle: 'medium',
  timeZone: 'Asia/Seoul',
});

export async function loadPageData(pathname) {
  // 학생 과제에서는 이 함수 안에서 DB나 API를 await 하면 됩니다.
  // 시각은 서버에서 문자열로 만든 뒤 넘깁니다. 브라우저가 다시 포맷하면
  // 서버 HTML과 클라이언트가 어긋나 hydration이 실패할 수 있습니다.
  const fetchedAt = new Date();

  return {
    university: '한밭대학교',
    universityEn: 'Hanbat National University',
    course: 'Node.js 웹 서버와 React SSR',
    message:
      '이 객체는 Express가 요청마다 만든 뒤 HTML에 넣습니다. 클라이언트는 같은 객체를 읽어 hydrate 합니다.',
    path: pathname,
    fetchedAt: fetchedAt.toISOString(),
    fetchedAtLabel: timeFormat.format(fetchedAt),
  };
}
