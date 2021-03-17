import { Provider } from 'next-auth/client';

import '../styles/globals.css';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
