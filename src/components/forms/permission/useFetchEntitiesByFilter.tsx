import { useCallback } from "react";
import { 
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery, 
  useGetUnitNodesLazyQuery, 
  useGetUsersLazyQuery 
} from '@rootTypes/compositionFunctions';
import { PermissionEntities } from '@rootTypes/compositionFunctions';

export default function useFetchEntitiesByFilter() {
  const [getRepos] = useGetReposLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUnitNodes] = useGetUnitNodesLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();

  const fetchEntitiesByFilter = useCallback(async (searchString: string, agentType: PermissionEntities, limit: number, offset: number) => {
    try {
      const queryVariables = { searchString: searchString, limit: limit, offset: offset };

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
    } catch (error) {
      console.error("Error fetching entities by search string:", error);
    }
  }, [getRepos, getUnits, getUnitNodes, getUsers]);

  return { fetchEntitiesByFilter };
}
