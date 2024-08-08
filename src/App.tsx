import ForceGraph from './components/ForceGraph'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://devunit.pepeunit.com/pepeunit/graphql',
  cache,
  defaultOptions: {
    watchQuery: {
        fetchPolicy: 'network-only',
    },
    query: {
        fetchPolicy: 'network-only',
        partialRefetch: true,
    },
  },
});

function App() {

  client
  .query({ 
    query: gql`{
      query getToken (data: { credentials: "string", password: "string" }) {
        ...UserType
      }
    }
    `,
  })
  .then((result) => console.log(result));

  return (
    <>
      <ApolloProvider client={client}>
        <ForceGraph></ForceGraph>
      </ApolloProvider>
    </>
  )
}

export default App
