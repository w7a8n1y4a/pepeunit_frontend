import ForceGraph from './components/ForceGraph'
import './App.css'


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

// const queryClient = new QueryClient()

function App() {

  // const { data } = useQuery({
  //   queryKey: ['films'],
  //   queryFn: async () =>
  //     request(
  //       'https://swapi-graphql.netlify.app/.netlify/functions/index',
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
