import { useCallback } from "react";
import { 
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery,
  useGetUsersLazyQuery,
  useGetUnitsWithUnitNodesLazyQuery,
  VisibilityLevel
} from '@rootTypes/compositionFunctions';
import { NodeType } from '@rootTypes/nodeTypeEnum'

export default function useFetchEntitiesByFilter() {
  const [getRepos] = useGetReposLazyQuery();
  const [getUnitsWithUnitNodes] = useGetUnitsWithUnitNodesLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();

  const fetchEntitiesByFilter = useCallback(
    async (
      searchString: string,
      agentType: NodeType,
      limit: number,
      offset: number,
      visibilityLevel?: VisibilityLevel[],
      creatorUuid?: string
    ) => {
    try {
      const queryVariables = {
        searchString: searchString,
        limit: limit,
        offset: offset,
        visibilityLevel: visibilityLevel,
        creatorUuid: creatorUuid
      };

      switch (agentType) {
        case NodeType.Repo:
          return getRepos({ variables: queryVariables });
        case NodeType.Unit:
          return getUnits({ variables: queryVariables });
        case NodeType.UnitNode:
          return getUnitsWithUnitNodes({ variables: queryVariables });
        case NodeType.User:
          return getUsers({ variables: queryVariables });
        default:
          throw new Error(`Unsupported entity type: ${agentType}`);
      }
    } catch (error) {
      console.error("Error fetching entities by search string:", error);
    }
  }, [getRepos, getUnitsWithUnitNodes, getUnits, getUsers]);

  return { fetchEntitiesByFilter };
}
