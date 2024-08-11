import ForceGraph from './components/ForceGraph'
import './App.css'
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, from } from '@apollo/client';
import { isAuthTokenExpired } from './utils/isAuthTokenExpired';
import Header from './components/header/Header';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('newToken');

  if (token && isAuthTokenExpired(token)) {
      localStorage.removeItem('newToken');

      return {
          headers: { ...headers },
      };
  }
  return {
    headers: {
      ...headers,
      'x-auth-token': token || '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
      if (graphQLErrors[0]?.extensions?.code === 401) {
          // localStorage.removeItem('newToken');
          // router.replace({
          //     name: 'projects',
          //     query: { redirect: router.currentRoute.value.path },
          // });
          console.log('kek')
      }

      if (graphQLErrors[0]?.extensions?.code === 403) {
          // toast.warning('Ваш аккаунт не верифицирован!');
          console.log('kekv')
      }
  }

  if (networkError) console.error(`[Network error]: ${networkError.message}`);
});

const uploadLink = createUploadLink({
  // You should use an absolute URL here
  uri: `${import.meta.env.VITE_BACKEND_URI}`,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink, errorLink, uploadLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
  },
});

function App() {

  client
  .query({ 
    query: gql`{
      getToken (data: { credentials: "string", password: "string" })
    }
    `,
  })
  .then((result) => console.log(result));

  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <ForceGraph></ForceGraph>
      </ApolloProvider>
    </>
  )
}

export default App
