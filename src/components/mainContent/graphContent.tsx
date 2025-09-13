import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useNavigate } from 'react-router-dom';
import {
  useGetReposLazyQuery,
  useGetUnitsLazyQuery,
  useGetUnitNodesLazyQuery,
  useGetUserLazyQuery,
  useGetRepoLazyQuery,
  useGetUnitLazyQuery,
  UnitNodeTypeEnum,
  useGetUnitNodeLazyQuery,
  useGetUsersLazyQuery,
  useGetRepositoryRegistryLazyQuery,
  useGetDashboardLazyQuery
} from '@rootTypes/compositionFunctions'
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import { useState, useMemo, useEffect, useRef } from 'react';
import DomainContent from './domainContent'
import RegistryContent from './registryContent'
import RepoContent from './repoContent'
import UnitContent from './unitContent';
import UnitNodeContent from './unitNodeContent';
import GrafanaContent from './grafanaContent'
import BaseModal from '../modal/baseModal'
import SearchForm from '../forms/search/searchForm';

import { useGraphStore } from '@stores/graphStore';
import { useNodeStore, useSearchNodeStore, useReloadBaseGraphDataStore, useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Vector2 } from 'three';

import { useUserStore } from '@stores/userStore';

interface GraphContentProps {
  routerType: any;
  routerUuid: any;
}

export default function GraphContent({routerType, routerUuid}: GraphContentProps){
  const { runAsync } = useAsyncHandler();

  const { user } = useUserStore();

  const navigate = useNavigate();

  const { openModal } = useModalHandlers();
  const { activeModal, setActiveModal } = useModalStore();
  const { setCurrentNodeData } = useNodeStore();
  const { setCurrentSearchNodeData } = useSearchNodeStore();
  const { graphData, setGraphData, removeNodesAndLinks } = useGraphStore();
  const { reloadState } = useReloadBaseGraphDataStore();

  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [displayHeight, setDisplayHeight] = useState(window.innerHeight);

  const processedData = useMemo(() => {
    return {
      nodes: graphData.nodes,
      links: graphData.links,
    };
  }, [graphData]);

  const [getUsers] = useGetUsersLazyQuery();
  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUnitNodes] = useGetUnitNodesLazyQuery();

  const [getUser] = useGetUserLazyQuery();
  const [getRepositoryRegistry] = useGetRepositoryRegistryLazyQuery();
  const [getRepo] = useGetRepoLazyQuery();
  const [getUnit] = useGetUnitLazyQuery();
  const [getUnitNode] = useGetUnitNodeLazyQuery();
  const [getDashboard] = useGetDashboardLazyQuery();

  useEffect(() => {
    if (routerType === 'registry' || routerType === 'dashboard' || (!routerType && !routerUuid)){
      runAsync(async () => {
        let reposData = await getRepos()
        if (reposData.data?.getRepos){
          let unitsData = await getUnits()
          if (unitsData.data?.getUnits && reposData.data?.getRepos){
            setGraphData({
              nodes: [
                {
                  id: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                  type: NodeType.Domain,
                  color: getNodeColor(NodeType.Domain),
                  data: {
                    name: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                    __typename: 'DomainType'
                  }
                },
                ...reposData.data.getRepos.repos.map((repo) => ({
                  id: repo.uuid,
                  type: NodeType.Repo,
                  color: getNodeColor(NodeType.Repo),
                  data: repo
                }
              )),
                ...unitsData.data.getUnits.units.map((unit) => ({
                  id: unit.uuid,
                  type: NodeType.Unit,
                  color: getNodeColor(NodeType.Unit),
                  data: unit
                }
              ))],
              links: [
                ...reposData.data.getRepos.repos.map((repo) => ({source: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME, target: repo.uuid, value: 1})),
                ...unitsData.data.getUnits.units.map((unit) => ({source: unit.repoUuid, target: unit.uuid, value: 1}))
              ]
            })
          }
        }
        setCurrentSearchNodeData(null)
      })
    }
  }, [reloadState, routerType, routerUuid, user]);

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
        runAsync(async () => {
          let result = await getUnitNodes({
            variables: {
              unitUuid: node.id
            }
          })
          if (result.data?.getUnitNodes){
            setGraphData({
              nodes: [
                ...graphData.nodes,
                ...result.data.getUnitNodes.unitNodes.map((unitNode) => ({
                  id: unitNode.uuid,
                  type: unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output,
                  color: getNodeColor(unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output),
                  data: {...unitNode, name: unitNode.topicName}
                }
              ))],
              links: [
                ...graphData.links,
                ...result.data.getUnitNodes.unitNodes.map((unitNode) => ({source: unitNode.unitUuid, target: unitNode.uuid, value: 1})),
              ]
            })
          }
        })
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

  function focusNode(uuid: string, nodeType: string) {
    navigate('/' + nodeType + '/' + uuid);

    if (nodeType == 'domain') {
      const currentDomain = {
        name: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
        __typename: 'DomainType'
      }
      runAsync(async () => {
        let users = await getUsers({
          variables: {
              offset: 0
          }
        })
        if (users.data?.getUsers){
          let usersData = users.data?.getUsers
          setCurrentSearchNodeData(currentDomain)
          setGraphData({
            nodes: [
              {
                id: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                type: NodeType.Domain,
                color: getNodeColor(NodeType.Domain),
                data: currentDomain
              },
              ...usersData.users.map((user) => ({
                  id: user.uuid,
                  type: NodeType.User,
                  color: getNodeColor(NodeType.User),
                  data: user
              }))
            ],
            links: [
              ...graphData.links,
              ...usersData.users.map((user)  => ({source: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME, target: user.uuid, value: 1})),
            ]
          })
        }
      })
    }

    if (nodeType == 'user') {
      runAsync(async () => {
        let user = await getUser({
          variables: {
            uuid: uuid
          }
        })
        if (user.data?.getUser){
          let reposData = await getRepos({
            variables: {
              creatorUuid: uuid
            }
          })
          if (reposData.data?.getRepos){
            let searchTarget = user.data.getUser
            setCurrentSearchNodeData(searchTarget)
            setGraphData({
              nodes: [
                {
                  id: searchTarget.uuid,
                  type: NodeType.User,
                  color: getNodeColor(NodeType.User),
                  data: searchTarget
                },
                {
                  id: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                  type: NodeType.Domain,
                  color: getNodeColor(NodeType.Domain),
                  data: {
                    name: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                    __typename: 'DomainType'
                  }
                },
                ...reposData.data.getRepos.repos.map((repo) => ({
                  id: repo.uuid,
                  type: NodeType.Repo,
                  color: getNodeColor(NodeType.Repo),
                  data: repo
                }))
              ],
              links: [
                {source: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME, target: searchTarget.uuid, value: 1},
                ...reposData.data.getRepos.repos.map((repo) => ({source: searchTarget.uuid, target: repo.uuid, value: 1})),
              ]
            })
          }
        }
      })
    }
    if (nodeType == 'registry'){
      runAsync(async () => {
        let registry = await getRepositoryRegistry({
          variables: {
              uuid: uuid
          }
        })
        if (registry.data?.getRepositoryRegistry){
          openModal(NodeType.Registry + "Menu")
          setCurrentNodeData(registry.data.getRepositoryRegistry)
        }
      })
    }

    if (nodeType == 'dashboard'){
      runAsync(async () => {
        let dashboard = await getDashboard({
          variables: {
              uuid: uuid
          }
        })
        if (dashboard.data?.getDashboard){
          openModal(NodeType.Dashboard + "Menu")
          setCurrentNodeData(dashboard.data.getDashboard)
        }
      })
    }

    if (nodeType == 'repo') {
      runAsync(async () => {
        let repo = await getRepo({
          variables: {
            uuid: uuid
          }
        })
        if (repo.data?.getRepo){
          let user = await getUser({
            variables: {
              uuid: repo.data?.getRepo.creatorUuid
            }
          })
          let unitsData = await getUnits({
            variables: {
              repoUuid: uuid
            }
          })
          if (unitsData.data?.getUnits){
            let searchTarget = repo.data.getRepo
            setCurrentSearchNodeData(searchTarget)
            setGraphData({
              nodes: [
                {
                  id: searchTarget.uuid,
                  type: NodeType.Repo,
                  color: getNodeColor(NodeType.Repo),
                  data: searchTarget
                },
                ...unitsData.data.getUnits.units.map((unit) => ({
                  id: unit.uuid,
                  type: NodeType.Unit,
                  color: getNodeColor(NodeType.Unit),
                  data: unit
                }))
              ],
              links: [
                ...unitsData.data.getUnits.units.map((unit) => ({source: unit.repoUuid, target: unit.uuid, value: 1}))
              ]
            })
          }
          if (unitsData.data?.getUnits && user.data?.getUser){
            let searchTarget = repo.data.getRepo
            let userData = user.data.getUser
            setCurrentSearchNodeData(searchTarget)
            setGraphData({
              nodes: [
                {
                  id: userData.uuid,
                  type: NodeType.User,
                  color: getNodeColor(NodeType.User),
                  data: userData
                },
                {
                  id: searchTarget.uuid,
                  type: NodeType.Repo,
                  color: getNodeColor(NodeType.Repo),
                  data: searchTarget
                },
                ...unitsData.data.getUnits.units.map((unit) => ({
                  id: unit.uuid,
                  type: NodeType.Unit,
                  color: getNodeColor(NodeType.Unit),
                  data: unit
                }))
              ],
              links: [
                {source: userData.uuid, target: searchTarget.uuid, value: 1},
                ...unitsData.data.getUnits.units.map((unit) => ({source: unit.repoUuid, target: unit.uuid, value: 1}))
              ]
            })
          }
        }
      })
    }

    if (nodeType == 'unit') {
      runAsync(async () => {
        let unit = await getUnit({
          variables: {
            uuid: uuid
          }
        })
        
        if (unit.data?.getUnit){
          let searchTarget = unit.data.getUnit
          setCurrentSearchNodeData(searchTarget)
          let repo = await getRepo({
            variables: {
              uuid: searchTarget.repoUuid
            }
          })
          if (repo.data?.getRepo){
            let repoResult = repo.data.getRepo

            let unitNodesData = await getUnitNodes({
              variables: {
                unitUuid: uuid
              }
            })
            if (unitNodesData.data?.getUnitNodes){
              setGraphData({
                nodes: [
                  {
                    id: searchTarget.uuid,
                    type: NodeType.Unit,
                    color: getNodeColor(NodeType.Unit),
                    data: searchTarget
                  },
                  {
                    id: repoResult.uuid,
                    type: NodeType.Repo,
                    color: getNodeColor(NodeType.Repo),
                    data: repoResult
                  },
                  ...unitNodesData.data.getUnitNodes.unitNodes.map((unitNode) => ({
                    id: unitNode.uuid,
                    type: unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output,
                    color: getNodeColor(unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output),
                    data: {...unitNode, name: unitNode.topicName}
                  }))
                ],
                links: [
                  {source: repoResult.uuid, target: searchTarget.uuid, value: 1},
                  ...unitNodesData.data.getUnitNodes.unitNodes.map((unitNode) => ({source: unitNode.unitUuid, target: unitNode.uuid, value: 1})),
                ]
              })
            }
          }
        }
      })
    }
    if (nodeType == 'unit-node') {
      runAsync(async () => {
        let unitNode = await getUnitNode({
          variables: {
            uuid: uuid
          }
        })
        
        if (unitNode.data?.getUnitNode){
          let searchTarget = unitNode.data.getUnitNode
          setCurrentSearchNodeData(searchTarget)

          let unit = await getUnit({
            variables: {
              uuid: searchTarget.unitUuid
            }
          })
          
          if (unit.data?.getUnit){
            let unitResult = unit.data.getUnit

            setGraphData({
              nodes: [
                {
                  id: searchTarget.uuid,
                  type: searchTarget.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output,
                  color: getNodeColor(searchTarget.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output),
                  data: {...searchTarget, name: searchTarget.topicName}
                },
                {
                  id: unitResult.uuid,
                  type: NodeType.Unit,
                  color: getNodeColor(NodeType.Unit),
                  data: unitResult
                }
              ],
              links: [
                {source: unitResult.uuid, target: searchTarget.uuid, value: 1},
              ]
            })
          }
        }
      })
    }
    setActiveModal(null)
  }

  useEffect(() => {
    if (routerType && routerUuid){
      focusNode(routerUuid, routerType)
    }
  }, [routerUuid, routerType])

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
          const sprite = new SpriteText(node.data.name ? node.data.name : node.data.login ) as any;
          sprite.color = "#fff";
          sprite.textHeight = 4;
          sprite.position.y = 10;
          return sprite;
        }}
        nodeThreeObjectExtend={true}
        showNavInfo={false}
        onNodeClick={(node) => pickMenu(node)}
        onNodeRightClick={(node) => handleNodeRightClick(node)}
        nodeResolution={15}
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={d => (d.value === undefined ? 1 : d.value) * 0.001}
        linkDirectionalParticleWidth={1}
        cooldownTicks={100}
        onEngineStop={() => fgRef.current.zoomToFit(500)}
      />
      <BaseModal
        modalName={"Search"}
        open={activeModal === 'graphSearch'}
      >
        <SearchForm targetSearch={NodeType.Unit} onFocusNode={focusNode} />
      </BaseModal>
      <DomainContent/>
      <RegistryContent/>
      <RepoContent/>
      <UnitContent/>
      <UnitNodeContent/>
      <GrafanaContent/>
    </>
  )
}
