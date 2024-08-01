import { useState } from 'react'
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
      <ForceGraph></ForceGraph>
    </>
  )
}

export default App
