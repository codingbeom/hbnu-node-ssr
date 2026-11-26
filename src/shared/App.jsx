import { Layout } from './components/Layout.jsx';
import { matchRoute } from './routes.js';

export function App({ url, data }) {
  const route = matchRoute(url);
  const Page = route.page;

  return (
    <Layout url={route.path}>
      <Page data={data} />
    </Layout>
  );
}
