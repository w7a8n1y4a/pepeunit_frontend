import { ForceGraph3D } from 'react-force-graph';
import { useWindowSize } from '@react-hook/window-size';

export default function ForceGraph(){

  const [width, height] = useWindowSize();

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
      backgroundColor='rgba(10,10,10, 1)'
      width={width}
      height={height}
      graphData={genRandomTree()}
    />
  )
}
