import { useGetReposLazyQuery } from '../../types/composition-functions'
import { ForceGraph3D } from 'react-force-graph';
import { useState, useEffect } from 'react';

export default function ForceGraph(){
  const [reposData, setReposData] = useState(Array);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
  const [getRepos] = useGetReposLazyQuery();


  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  useEffect(() => {
    getRepos().then(reposData => {
      if (reposData.data?.getRepos){
        setReposData(reposData.data.getRepos)
      }
    })
  }, []);
  
  console.log(reposData)

  let test = {
    nodes: reposData !== null ? reposData.map((all, i) => ({id:i, data: all})) : [],
    links: []
  }

  console.log(test)

  return (
    <ForceGraph3D
      backgroundColor='rgba(10,10,10, 1)'
      width={displayWidth}
      height={displayHeight}
      graphData={test}
      showNavInfo={false}
    />
  )
}
