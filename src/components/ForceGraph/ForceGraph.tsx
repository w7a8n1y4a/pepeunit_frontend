import { ForceGraph3D } from 'react-force-graph';
import { useState } from 'react';

export default function ForceGraph(){
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

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
      width={displayWidth}
      height={displayHeight}
      graphData={genRandomTree()}
    />
  )
}
