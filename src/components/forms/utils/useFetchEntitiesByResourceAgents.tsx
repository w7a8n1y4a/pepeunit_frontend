import { useCallback } from "react";
import { 
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery, 
  useGetUnitsWithUnitNodesLazyQuery, 
  useGetUsersLazyQuery,
  useGetResourceAgentsLazyQuery
} from '@rootTypes/compositionFunctions';
import { PermissionEntities } from '@rootTypes/compositionFunctions';

export default function useFetchEntitiesByResourceAgents() {
  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUnitsWithUnitNodes] = useGetUnitsWithUnitNodesLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();
  const [getResourceAgentsLazyQuery] = useGetResourceAgentsLazyQuery();

  const fetchEntitiesByResourceAgents = useCallback(async (agentType: PermissionEntities, limit: number, offset: number, agentUuids: string[] | null) => {
    try {
      if (agentUuids) {
        if (agentUuids.length === 0) {
          return {data: null};
        }

        const queryVariables = { uuids: agentUuids, limit: limit, offset: offset};

        switch (agentType) {
          case PermissionEntities.Repo:
            return getRepos({ variables: queryVariables });
          case PermissionEntities.Unit:
            return getUnits({ variables: queryVariables });
          case PermissionEntities.UnitNode:
            return getUnitsWithUnitNodes({ variables: {} });
          case PermissionEntities.User:
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
  }, [getRepos, getUnits, getUnitsWithUnitNodes, getUsers, getResourceAgentsLazyQuery]);

  return { fetchEntitiesByResourceAgents };
}
