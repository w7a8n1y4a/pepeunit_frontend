import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'
import { useGetReposLazyQuery, useGetUnitsLazyQuery} from '@rootTypes/composition-functions'
import { ForceGraph3D } from 'react-force-graph';
import { RepoType, UnitType } from '@rootTypes/composition-functions'
import SpriteText from 'three-spritetext';
import { useState, useMemo, useEffect } from 'react';
import DomainContent from './DomainContent'
import RepoContent from './RepoContent'
import UnitContent from './UnitContent';

import { useGraphStore } from '@stores/graphStore';
import useModalHandlers from '@handlers/useModalHandlers';

interface GraphContentProps {
  currentRepoData: RepoType | null
  setCurrentRepoData: (repo: RepoType | null) => void;
}

export default function GraphContent({currentRepoData, setCurrentRepoData}: GraphContentProps){
  const { openModal } = useModalHandlers();
  
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  const { graphData, setGraphData } = useGraphStore();

  const [currentUnitData, setCurrentUnitData] = useState<UnitType | null>(null)
  const [currentDomainData, setCurrentDomainData] = useState<UnitType | null>(null)

  const processedData = useMemo(() => {
    return {
      nodes: graphData.nodes,
      links: graphData.links,
    };
  }, [graphData]);

  useEffect(() => {
    getRepos().then(reposData => {
      if (reposData.data?.getRepos){
        getUnits().then(unitsData => {
          if (unitsData.data?.getUnits && reposData.data?.getRepos){
            setGraphData({
                nodes: [
                  ...graphData.nodes,
                  ...reposData.data.getRepos.map((repo) => ({
                    id: repo.uuid,
                    type: NodeType.Repo,
                    color: getNodeColor(NodeType.Repo),
                    data: repo
                  }
                )),
                  ...unitsData.data.getUnits.map((unit) => ({
                    id: unit.uuid,
                    type: NodeType.Unit,
                    color: getNodeColor(NodeType.Unit),
                    data: unit
                  }
                ))],
                links: [
                  ...graphData.links,
                  ...reposData.data.getRepos.map((repo) => ({source: import.meta.env.VITE_INSTANCE_NAME, target: repo.uuid})),
                  ...unitsData.data.getUnits.map((unit) => ({source: unit.repoUuid, target: unit.uuid}))
                ]
              }
            )
          }
        })
      }
    })
  }, []);

  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();

  function pickMenu(node: any){
    if (node.type == NodeType.Domain) {
      openModal("domainMenu")
      setCurrentDomainData(node.data)
    }
    if (node.type == NodeType.Repo) {
      console
      openModal("repoMenu")
      setCurrentRepoData(node.data)
    }
    if (node.type == NodeType.Unit) {
      openModal("unitMenu")
      setCurrentUnitData(node.data)
    }
  }

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  return (
    <>
      <ForceGraph3D
        backgroundColor='rgba(10,10,10, 20)'
        width={displayWidth}
        height={displayHeight}
        graphData={processedData}
        enableNodeDrag={false}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.data.name) as any;
          sprite.color = "#fff";
          sprite.textHeight = 4;
          sprite.position.y = 10;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        showNavInfo={false}
        onNodeClick={(node) => pickMenu(node)}
      />
      
      <DomainContent
        currentDomainData={currentDomainData}
      />

      <RepoContent
        currentRepoData={currentRepoData}
        setCurrentRepoData={setCurrentRepoData}
        currentUnitData={currentUnitData}
        setCurrentUnitData={setCurrentUnitData}
      />

      <UnitContent
        currentRepoData={currentRepoData}
        setCurrentRepoData={setCurrentRepoData}
        currentUnitData={currentUnitData}
        setCurrentUnitData={setCurrentUnitData}
      />
    </>
  )
}
