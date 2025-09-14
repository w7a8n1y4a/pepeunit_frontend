import { useCallback } from "react";
import { 
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery, 
  useGetUnitsWithUnitNodesLazyQuery, 
  useGetUsersLazyQuery,
} from '@rootTypes/compositionFunctions';
import { NodeType } from '@rootTypes/nodeTypeEnum'

export default function useFetchEntitiesByResourceAgents() {
  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUnitsWithUnitNodes] = useGetUnitsWithUnitNodesLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();

  const fetchEntitiesByResourceAgents = useCallback(async (agentType: NodeType, limit: number, offset: number, agentUuids: string[] | null) => {
    try {
      if (!agentUuids) {
        return {data: null};
      }
      if (agentUuids) {
        const queryVariables = { uuids: agentUuids, limit: limit, offset: offset};

        switch (agentType) {
          case NodeType.Repo:
            return getRepos({ variables: queryVariables });
          case NodeType.Unit:
            return getUnits({ variables: queryVariables });
          case NodeType.UnitNode:
            return getUnitsWithUnitNodes({ variables: {} });
          case NodeType.User:
            return getUsers({ variables: queryVariables });
          default:
            throw new Error(`Unsupported entity type: ${agentType}`);
        }
      } else {
        throw new Error("No permissions found");
      }
    } catch (error) {
      console.error("Error fetching entities by resource agents:");
    }
  }, [getRepos, getUnits, getUnitsWithUnitNodes, getUsers]);

  return { fetchEntitiesByResourceAgents };
}
