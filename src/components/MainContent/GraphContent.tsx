import { NodeType } from '../../types/nodeTypeEnum'
import { getNodeColor } from '../../utils/getNodeColor'
import { useGetReposLazyQuery, useGetUnitsLazyQuery} from '../../types/composition-functions'
import { ForceGraph3D } from 'react-force-graph';
import { RepoType, UnitType } from '../../types/composition-functions'
import SpriteText from 'three-spritetext';
import { useState, useMemo, useCallback, useEffect } from 'react';
import DomainContent from './DomainContent'
import RepoContent from './RepoContent'
import UnitContent from './UnitContent';

interface GraphContentProps {
  activeModal: string | null
  setActiveModal: (show: string | null) => void;
  currentRepoData: RepoType | null
  setCurrentRepoData: (repo: RepoType | null) => void;
}

export default function GraphContent({activeModal, setActiveModal, currentRepoData, setCurrentRepoData}: GraphContentProps){
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  const [currentUnitData, setCurrentUnitData] = useState<UnitType | null>(null)
  const [currentDomainData, setCurrentDomainData] = useState<UnitType | null>(null)
  
  type GraphDataType = {
    nodes: Array<{
      id: string | number;
      type: string;
      color: string; 
      data: any | RepoType; 
    }>,
    links: Array<{
      source: string;
      target: string; 
    }>
  }; 
  const [graphData, setGraphData] = useState<GraphDataType>(
    {
      nodes: [
        {
          id: import.meta.env.VITE_INSTANCE_NAME,
          type: NodeType.Domain,
          color: getNodeColor(NodeType.Domain),
          data: {
            name: import.meta.env.VITE_INSTANCE_NAME
          }
        }
      ],
      links: []
    }
  )

  const forceData = useMemo(() => test(), [graphData])

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
                  ...reposData.data.getRepos.map((all) => ({source: import.meta.env.VITE_INSTANCE_NAME, target: all.uuid})),
                  ...unitsData.data.getUnits.map((all) => ({source: all.repoUuid, target: all.uuid}))
                ]
              }
            )
          }
        })
      }
    })
  }, []);

  function test() {
    console.log(graphData)
    return {
      nodes: graphData.nodes,
      links: graphData.links
    }
  }

  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();

  const openModal = useCallback((modalType: string) => {
    setActiveModal(modalType);
  }, []);

  function kek(node: any){
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
        graphData={forceData}
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
        onNodeClick={(node) => kek(node)}
      />
      
      <DomainContent
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        currentDomainData={currentDomainData}
      />

      <RepoContent
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        currentRepoData={currentRepoData}
        setCurrentRepoData={setCurrentRepoData}
        currentUnitData={currentUnitData}
        setCurrentUnitData={setCurrentUnitData}
      />

      <UnitContent
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        currentRepoData={currentRepoData}
        setCurrentRepoData={setCurrentRepoData}
        currentUnitData={currentUnitData}
        setCurrentUnitData={setCurrentUnitData}
      />
    </>
  )
}
