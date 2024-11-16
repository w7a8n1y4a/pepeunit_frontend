import { useCallback } from "react";
import { 
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery, 
  useGetUnitNodesLazyQuery, 
  useGetUsersLazyQuery,
  useGetResourceAgentsLazyQuery
} from '@rootTypes/compositionFunctions';
import { PermissionEntities } from '@rootTypes/compositionFunctions';

export default function useFetchEntitiesByResourceAgents() {
  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUnitNodes] = useGetUnitNodesLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();
  const [getResourceAgentsLazyQuery] = useGetResourceAgentsLazyQuery();

  const fetchEntitiesByResourceAgents = useCallback(async (resourceUuid: string, agentType: PermissionEntities, resourceType: PermissionEntities, limit: number, offset: number) => {
    try {
      const resourceAgentsResult = await getResourceAgentsLazyQuery({
        variables: {
          agentType: agentType,
          resourceUuid: resourceUuid,
          resourceType: resourceType
        },
      });

      if (resourceAgentsResult.data?.getResourceAgents?.permissions) {
        const agentUuids = resourceAgentsResult.data.getResourceAgents.permissions.map(
          (permission) => permission.agentUuid
        );

        console.log('agent permission', agentUuids)

        if (agentUuids.length === 0) {
          return {data: null};
        }

        const queryVariables = { uuids: agentUuids, limit: limit, offset: offset};

        // Определяем функцию запроса на основе entityType
        switch (agentType) {
          case PermissionEntities.Repo:
            return getRepos({ variables: queryVariables });
          case PermissionEntities.Unit:
            return getUnits({ variables: queryVariables });
          case PermissionEntities.UnitNode:
            return getUnitNodes({ variables: queryVariables });
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
  }, [getRepos, getUnits, getUnitNodes, getUsers, getResourceAgentsLazyQuery]);

  return { fetchEntitiesByResourceAgents };
}
