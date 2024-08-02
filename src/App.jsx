import { useState } from 'react'
import { Helmet } from 'react-helmet';
import ForceGraph from './components/ForceGraph'
import './App.css'

// import request from 'graphql-request'
// import { useQuery } from '@tanstack/react-query'
// import { graphql } from './gql/gql'
// const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
//   query allFilmsWithVariablesQuery($first: Int!) {
//     allFilms(first: $first) {
//       edges {
//         node {
//           id
//           title
//         }
//       }
//     }
//   }
// `)

function App() {
  const [count, setCount] = useState(0)

  // const { data } = useQuery({
  //   queryKey: ['films'],
  //   queryFn: async () =>
  //     request(
  //       import.meta.env.VITE_BACKEND_URI,
  //       allFilmsWithVariablesQueryDocument,
  //       // variables are type-checked too!
  //       { first: 10 },
  //     ),
  // })

  return (
    <>
      <Helmet>
        <title>Pepeunit</title>
        <link rel="icon" type="image/png" href="/favicon.ico"></link>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico"></link>
        <meta name="theme-color" content="#00bf30"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:locale" content="en"></meta>
        <meta property="og:title" content="Pepeunit | Federative IoT Platform"></meta>
        <meta property="og:site_name" content="Pepeunit"></meta>
        <meta property="og:description" content="Federative IoT Platform"></meta>
        <meta property="og:image" content={import.meta.env.VITE_SELF_URI + "images/pepeunit-og.jpg"}></meta>
        <meta property="og:url" content={import.meta.env.VITE_SELF_URI}></meta>
      </Helmet>
      <ForceGraph></ForceGraph>
    </>
  )
}

export default App
