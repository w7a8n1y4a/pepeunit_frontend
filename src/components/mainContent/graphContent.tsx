import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'
import { useGetReposLazyQuery, useGetUnitsLazyQuery, useGetUnitNodesLazyQuery, UnitNodeTypeEnum} from '@rootTypes/compositionFunctions'
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { useState, useMemo, useEffect, useRef } from 'react';
import DomainContent from './domainContent'
import RepoContent from './repoContent'
import UnitContent from './unitContent';
import UnitNodeContent from './unitNodeContent';

import { useGraphStore } from '@stores/graphStore';
import { useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Vector2 } from 'three'; 

export default function GraphContent(){
  const { openModal } = useModalHandlers();
  const { setCurrentNodeData } = useNodeStore();
  const { graphData, setGraphData, removeNodesAndLinks } = useGraphStore();

  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

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
                  ...reposData.data.getRepos.map((repo) => ({source: import.meta.env.VITE_INSTANCE_NAME, target: repo.uuid, value: 1})),
                  ...unitsData.data.getUnits.map((unit) => ({source: unit.repoUuid, target: unit.uuid, value: 1}))
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
  const [getUnitNodes] = useGetUnitNodesLazyQuery();

  function handleNodeRightClick(node: any) {
    if (node.type == NodeType.Unit) {
      const relatedNodes = graphData.links.filter(
        (link) =>  (typeof link.source === 'object' ? link.source.id : link.source) === node.id
      ).map(
        (fLink) => (typeof fLink.target === 'object' ? String(fLink.target.id) : fLink.target)
      );

      if (relatedNodes.length > 0) {
        removeNodesAndLinks(relatedNodes)
      } else {
        getUnitNodes(
          {
            variables: {
              unitUuid: node.id
            }
          }
        )
        .then((unitNodesData) => {
          if (unitNodesData.data?.getUnitNodes){
            setGraphData({
                nodes: [
                  ...graphData.nodes,
                  ...unitNodesData.data.getUnitNodes.map((unitNode) => ({
                    id: unitNode.uuid,
                    type: unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output,
                    color: getNodeColor(unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output),
                    data: {...unitNode, name: unitNode.topicName}
                  }
                ))],
                links: [
                  ...graphData.links,
                  ...unitNodesData.data.getUnitNodes.map((unitNode) => ({source: unitNode.unitUuid, target: unitNode.uuid, value: 1})),
                ]
              }
            )
          }
        });
      }
    }
  }

  function pickMenu(node: any){
    openModal(node.type + "Menu")
    setCurrentNodeData(node.data)
  }

  window.addEventListener('resize', () => {
    setDisplayWidth(window.innerWidth);
    setDisplayHeight(window.innerHeight);
  });

  const fgRef = useRef<any>(null);

  useEffect(() => {
    if (fgRef.current) {
      const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 4, 1, 0);
      const composer = fgRef.current.postProcessingComposer();
      if (composer) {
        composer.addPass(bloomPass);
      }
    }
  }, []);

  return (
    <>
      <ForceGraph3D
        ref={fgRef}
        backgroundColor='rgba(10,10,10, 15)'
        width={displayWidth}
        height={displayHeight}
        graphData={processedData}
        enableNodeDrag={false}
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.data.name) as any;
          sprite.color = "#fff";
          sprite.textHeight = 5.5;
          sprite.position.y = 10;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        showNavInfo={false}
        onNodeClick={(node) => pickMenu(node)}
        onNodeRightClick={(node) => handleNodeRightClick(node)}
        nodeResolution={15}
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={d => d.value * 0.0005}
        linkDirectionalParticleWidth={1}
      />
      
      <DomainContent/>
      <RepoContent/>
      <UnitContent/>
      <UnitNodeContent/>
    </>
  )
}
