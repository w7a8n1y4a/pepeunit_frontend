import { create } from 'zustand';
import { NodeType } from '@rootTypes/nodeTypeEnum';
import { getNodeColor } from '@utils/getNodeColor'
import {
    useGetReposLazyQuery,
    useGetUnitsLazyQuery,
    useGetUnitsWithUnitNodesLazyQuery,
    useGetUserLazyQuery,
    useGetRepoLazyQuery,
    UnitNodeTypeEnum,
    useGetUnitLazyQuery,
    useGetUsersLazyQuery
} from '@rootTypes/compositionFunctions'
import { useSearchNodeStore, useNodeStore } from '@stores/baseStore';
import { useGraphStore } from '@stores/graphStore';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import useModalHandlers from '@handlers/useModalHandlers';

interface Button {
    id: number;
    nodeType: NodeType;
    isActive: boolean;
    isVisible: boolean;
}

interface ButtonStore {
    buttons: Button[];
    initialize: (initialActiveIds: number[]) => void;
    toggleButtonState: (id: number) => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
    buttons: [
        { id: 1, nodeType: NodeType.Domain, isActive: false, isVisible: false },
        { id: 2, nodeType: NodeType.User, isActive: false, isVisible: false },
        { id: 3, nodeType: NodeType.Repo, isActive: false, isVisible: false },
        { id: 4, nodeType: NodeType.Unit, isActive: false, isVisible: false },
        { id: 5, nodeType: NodeType.UnitNode, isActive: false, isVisible: false },
    ],

    initialize: (initialActiveIds) => set((state) => {
        const buttons = state.buttons.map((button) => {
            const isActive = initialActiveIds.includes(button.id);
            const isVisible = isActive || initialActiveIds.some((id) => Math.abs(id - button.id) === 1);
            return { ...button, isActive, isVisible };
        });
        return { buttons };
    }),

    toggleButtonState: (id) => set((state) => {
        const buttons = state.buttons.map((button) => {
            if (button.id === id) {
                const isActive = !button.isActive;
                return { ...button, isActive };
            }
            return button;
        });

        const updatedButtons = buttons.map((button) => {
            const isNeighbor = buttons.some(
                (b) => b.isActive && Math.abs(b.id - button.id) === 1
            );
            const isVisible = button.isActive || isNeighbor;
            return { ...button, isVisible };
        });

        return { buttons: updatedButtons };
    }),
}));

export const useButtonHandlers = () => {
    const { toggleButtonState } = useButtonStore();
    const { openModal } = useModalHandlers();
    const { setCurrentNodeData } = useNodeStore();
    const { currentSearchNodeData } = useSearchNodeStore();
    const { graphData, setGraphData, removeNodesByTypes, getNodesByType } = useGraphStore();
    const { handleError } = useResultHandler();
    const { runAsync } = useAsyncHandler(handleError);

    const [getUsers] = useGetUsersLazyQuery();
    const [getRepos] = useGetReposLazyQuery();
    const [getUnits] = useGetUnitsLazyQuery();
    const [getUnitWithNodes] = useGetUnitsWithUnitNodesLazyQuery();

    const [getRepo] = useGetRepoLazyQuery();
    const [getUser] = useGetUserLazyQuery();
    const [getUnit] = useGetUnitLazyQuery();

    function isButtonConditionMet(id: number) {
        const buttons = useButtonStore.getState().buttons;
    
        const targetIndex = buttons.findIndex((button) => button.id === id);
        if (targetIndex === -1) return false;
    
        const targetButton = buttons[targetIndex];
        const prevButton = buttons[targetIndex - 1];
        const nextButton = buttons[targetIndex + 1];
    
        if (!targetButton.isActive) return false;
    
        if (!prevButton || !nextButton) return false;
    
        const prevIsActive = prevButton.isActive;
        const nextIsActive = nextButton.isActive;
    
        if (prevIsActive && nextIsActive) return true;
    
        return false;
    }
    

    const toggleButton = (id: number) => {
        const button = useButtonStore.getState().buttons.find((btn) => btn.id === id);
        if (!button) return;

        if (button.nodeType === currentSearchNodeData.__typename.slice(0, -4)) {
            setCurrentNodeData(currentSearchNodeData);
            console.log(currentSearchNodeData)
            if (currentSearchNodeData.__typename === 'UnitNodeType'){
                openModal((currentSearchNodeData.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output) + 'Menu')
            } else {
                openModal(currentSearchNodeData.__typename.slice(0, -4) + 'Menu');
            }
            return;
        }

        if (isButtonConditionMet(id)) return;

        if (button.isVisible && button.isActive){
            let targetTypes: NodeType[] = button.nodeType === NodeType.UnitNode ? [NodeType.Input, NodeType.Output] : [button.nodeType]
            removeNodesByTypes(targetTypes)
        }

        if (button.isVisible && !button.isActive){
            if (button.nodeType === NodeType.Domain){
                let user = getNodesByType(NodeType.User)[0]
                setGraphData({
                    nodes: [
                        ...graphData.nodes,
                        {
                            id: import.meta.env.VITE_INSTANCE_NAME,
                            type: NodeType.Domain,
                            color: getNodeColor(NodeType.Domain),
                            data: {
                            name: import.meta.env.VITE_INSTANCE_NAME,
                            __typename: 'DomainType'
                            }
                        }
                    ],
                    links: [
                        ...graphData.links,
                        {source: import.meta.env.VITE_INSTANCE_NAME, target: user.data.uuid, value: 1},
                    ]
                })
            }
            if (button.nodeType === NodeType.User){
                let repos = getNodesByType(NodeType.Repo)
                if (repos.length > 0) {
                    runAsync(async () => {
                        let user = await getUser({
                            variables: {
                                uuid: repos[0].data.creatorUuid
                            }
                        })
                        if (user.data?.getUser){
                            let searchTarget = user.data.getUser
                            setGraphData({
                                nodes: [
                                    ...graphData.nodes,
                                    {
                                        id: user.data.getUser.uuid,
                                        type: NodeType.User,
                                        color: getNodeColor(NodeType.User),
                                        data: user.data.getUser
                                    }
                                ],
                                links: [
                                    ...graphData.links,
                                    ...repos.map((repo) => ({source: searchTarget.uuid, target: repo.data.uuid, value: 1})),
                                ]
                            })
                        }
                    })
                }
                let domains = getNodesByType(NodeType.Domain)

                if (domains.length > 0){
                    runAsync(async () => {
                        let users = await getUsers({
                            variables: {
                                offset: 0
                            }
                        })
                        if (users.data?.getUsers){
                            let usersData = users.data?.getUsers
                            setGraphData({
                                nodes: [
                                    ...graphData.nodes,
                                    ...usersData.users.map((user) => ({
                                        id: user.uuid,
                                        type: NodeType.User,
                                        color: getNodeColor(NodeType.User),
                                        data: user
                                    }))
                                ],
                                links: [
                                    ...graphData.links,
                                    ...usersData.users.map((user)  => ({source: import.meta.env.VITE_INSTANCE_NAME, target: user.uuid, value: 1})),
                                ]
                            })
                        }
                    })
                }
            }
            if (button.nodeType === NodeType.Repo){

                let users = getNodesByType(NodeType.User)
                let units = getNodesByType(NodeType.Unit)

                if (users.length > 0 || units.length > 0){
                    runAsync(async () => {
                        if (users.length > 0) {
                            let reposData = await getRepos({
                                variables: {
                                  creatorsUuids: users.map((user) => (user.data.uuid))
                                }
                            })
                            if (reposData.data?.getRepos){
                                setGraphData({
                                    nodes: [
                                        ...graphData.nodes,
                                        ...reposData.data.getRepos.repos.map((repo) => ({
                                          id: repo.uuid,
                                          type: NodeType.Repo,
                                          color: getNodeColor(NodeType.Repo),
                                          data: repo
                                        }))
                                    ],
                                    links: [
                                        ...graphData.links,
                                        ...reposData.data.getRepos.repos.map((repo) => ({source: repo.uuid, target: repo.creatorUuid, value: 1})),
                                    ]
                                })
                            }
                        } else {
                            let repoData = await getRepo({
                                variables: {
                                  uuid: units[0].data.repoUuid
                                }
                            })
                            if (repoData.data?.getRepo){
                                let searchTarget = repoData.data.getRepo
                                setGraphData({
                                    nodes: [
                                        ...graphData.nodes,
                                        {
                                          id: searchTarget.uuid,
                                          type: NodeType.Repo,
                                          color: getNodeColor(NodeType.Repo),
                                          data: searchTarget
                                        }
                                    ],
                                    links: [
                                        ...graphData.links,
                                        {source: searchTarget.uuid, target: units[0].data.uuid, value: 1},
                                    ]
                                })
                            }
                        }
                    })
                }

                let repos = getNodesByType(NodeType.Repo)
                runAsync(async () => {
                    let user = await getUser({
                        variables: {
                            uuid: repos[0].data.creatorUuid
                        }
                    })
                    if (user.data?.getUser){
                        let searchTarget = user.data.getUser
                        setGraphData({
                            nodes: [
                                ...graphData.nodes,
                                {
                                    id: user.data.getUser.uuid,
                                    type: NodeType.User,
                                    color: getNodeColor(NodeType.User),
                                    data: user.data.getUser
                                }
                            ],
                            links: [
                                ...graphData.links,
                                ...repos.map((repo) => ({source: searchTarget.uuid, target: repo.data.uuid, value: 1})),
                            ]
                        })
                    }
                })
            }
            if (button.nodeType === NodeType.Unit){
                let repos = getNodesByType(NodeType.Repo)

                if (repos.length > 0){
                    runAsync(async () => {
                        let units = await getUnits({
                            variables: {
                                reposUuids: repos.map((repo) => (repo.data.uuid))
                            }
                        })
                        if (units.data?.getUnits){
                            let unitsData = units.data.getUnits
                            setGraphData({
                                nodes: [
                                    ...graphData.nodes,
                                    ...unitsData.units.map((unit) => ({
                                        id: unit.uuid,
                                        type: NodeType.Unit,
                                        color: getNodeColor(NodeType.Unit),
                                        data: unit
                                    }
                                    ))
                                ],
                                links: [
                                    ...graphData.links,
                                    ...unitsData.units.map((unit) => ({source: unit.repoUuid, target: unit.uuid, value: 1}))
                                ]
                            })
                        }
                    })
                }

                let unitInputs = getNodesByType(NodeType.Input)
                let unitOutputs = getNodesByType(NodeType.Output)

                if (unitInputs.length > 0 || unitOutputs.length > 0){
                    const targetUnitUuid = unitInputs.length > 0 ? unitInputs[0].data.unitUuid : unitOutputs[0].data.unitUuid
                    const targetUnitNodeUuid = unitInputs.length > 0 ? unitInputs[0].data.uuid : unitOutputs[0].data.uuid

                    runAsync(async () => {
                        let unit = await getUnit({
                            variables: {
                                uuid: targetUnitUuid
                            }
                        })
                        if (unit.data?.getUnit){
                            let unitData = unit.data.getUnit
                            setGraphData({
                                nodes: [
                                    ...graphData.nodes,
                                    {
                                        id: unitData.uuid,
                                        type: NodeType.Unit,
                                        color: getNodeColor(NodeType.Unit),
                                        data: unitData
                                    }
                                ],
                                links: [
                                    ...graphData.links,
                                    {source: unitData.uuid, target: targetUnitNodeUuid, value: 1}
                                ]
                            })
                        }
                    })
                }
            }
            if (button.nodeType === NodeType.UnitNode){
                let units = getNodesByType(NodeType.Unit)
                if (units.length > 0) {
                    runAsync(async () => {
                        let unitsWithNodes = await getUnitWithNodes({
                            variables: {
                                uuids: units.map((unit) => (unit.data.uuid))
                            }
                        })
                        if (unitsWithNodes.data?.getUnits){
                            let unitsWithNodesData = unitsWithNodes.data.getUnits

                            setGraphData({
                                nodes: [
                                    ...graphData.nodes,
                                    ...unitsWithNodesData.units.flatMap((unit) => (unit.unitNodes.map((unitNode) => ({
                                                id: unitNode.uuid,
                                                type: unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output,
                                                color: getNodeColor(unitNode.type == UnitNodeTypeEnum.Input ? NodeType.Input : NodeType.Output),
                                                data: {...unitNode, name: unitNode.topicName}
                                            }
                                        ))
                                    ))
                                ],
                                links: [
                                    ...graphData.links,
                                    ...unitsWithNodesData.units.flatMap(
                                        (unit) => (unit.unitNodes.map(
                                            (unitNode) => ({source: unit.uuid, target: unitNode.uuid, value: 1})
                                        ))
                                    )
                                ]
                            })
                        }
                    })
                }
            }
        }

        toggleButtonState(id);
    };

    return { toggleButton };
};

export default useButtonStore;
