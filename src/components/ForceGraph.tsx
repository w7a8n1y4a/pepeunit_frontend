import { ForceGraph3D } from 'react-force-graph';


export default function ForceGraph(){

    function genRandomTree(N = 500, reverse = false) {
        return {
          nodes: [...Array(N)].map((_, i) => ({ id: i })),
          links: [...Array(N)]
            .map((_, i) => i)
            .filter((id) => id)
            .map((id) => ({
              [reverse ? 'target' : 'source']: id,
              [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
            })),
        }
      }

    return (
      <ForceGraph3D
          graphData={genRandomTree()}
      />
    )
}
