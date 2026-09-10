import GraphContent from './components/mainContent/graphContent'
import './App.css'
import { useParams } from "react-router-dom";
import { ErrorLink } from '@apollo/client/link/error';
import { SetContextLink } from '@apollo/client/link/context';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  InMemoryCache,
} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { isAuthTokenExpired } from './utils/isAuthTokenExpired';
import Header from './components/header/header';
import { useEffect } from 'react';

import { useUserStore } from '@stores/userStore';
import { useBackendInfoStore, GRAFANA_INTEGRATION_ENABLE_FLAG } from '@stores/backendInfoStore';
import { useSetGrafanaCookiesMutation } from '@rootTypes/compositionFunctions';

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem('token');

  if (token && isAuthTokenExpired(token)) {
      localStorage.removeItem('token');

      return {
          ...prevContext,
          headers: { ...prevContext.headers },
      };
  }
  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      'x-auth-token': token || '',
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
      if (error.errors[0]?.extensions?.code === 401) {
          console.log('401')
      }

      if (error.errors[0]?.extensions?.code === 403) {
          console.log('403')
      }
  } else if (error) {
      console.error(`[Network error]: ${error.message}`);
  }
});

const uploadLink = new UploadHttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI}`,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, uploadLink]),
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

function GrafanaCookieInitializer() {
	const [setGrafanaCookies] = useSetGrafanaCookiesMutation();
	const { backendInfo, error, loading } = useBackendInfoStore();

	useEffect(() => {
		if (loading || (!backendInfo && !error)) return;
		if (backendInfo?.feature_flags?.[GRAFANA_INTEGRATION_ENABLE_FLAG] === false) return;
		setGrafanaCookies();
	}, [setGrafanaCookies, backendInfo, error, loading]);

	return null;
}

function App() {
  const { routerType, routerUuid } = useParams();
  const { setUser } = useUserStore();
  const { fetchBackendInfo } = useBackendInfoStore();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [setUser]);

  useEffect(() => {
    fetchBackendInfo();
  }, [fetchBackendInfo]);

  return (
    <>
      <ApolloProvider client={client}>
        <GrafanaCookieInitializer/>
        <Header/>
        <GraphContent routerType={routerType} routerUuid={routerUuid}/>
      </ApolloProvider>
    </>
  )
}

export default App
