import GraphContent from './components/mainContent/graphContent'
import './App.css'
import { useParams } from "react-router-dom";
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { isAuthTokenExpired } from './utils/isAuthTokenExpired';
import Header from './components/header/header';
import { useEffect } from 'react';

import { useUserStore } from '@stores/userStore';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  if (token && isAuthTokenExpired(token)) {
      localStorage.removeItem('token');

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
          console.log('401')
      }

      if (graphQLErrors[0]?.extensions?.code === 403) {
          console.log('403')
      }
  }

  if (networkError) console.error(`[Network error]: ${networkError.message}`);
});

const uploadLink = createUploadLink({
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
  const { routerType, routerUuid } = useParams();
  const { setUser } = useUserStore();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <Header/>
        <GraphContent routerType={routerType} routerUuid={routerUuid}/>
      </ApolloProvider>
    </>
  )
}

export default App
