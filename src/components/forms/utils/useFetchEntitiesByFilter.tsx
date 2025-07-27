import { useCallback } from "react";
import {
  useGetRepositoriesRegistryLazyQuery,
  useGetReposLazyQuery, 
  useGetUnitsLazyQuery,
  useGetUsersLazyQuery,
  useGetUnitsWithUnitNodesLazyQuery,
  VisibilityLevel
} from '@rootTypes/compositionFunctions';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import {PrivateRegistry} from '@primitives/privateRegistrySelector';

export default function useFetchEntitiesByFilter() {
  const [getRepositoriesRegistry] = useGetRepositoriesRegistryLazyQuery();
  const [getRepos] = useGetReposLazyQuery();
  const [getUnitsWithUnitNodes] = useGetUnitsWithUnitNodesLazyQuery();
  const [getUnits] = useGetUnitsLazyQuery();
  const [getUsers] = useGetUsersLazyQuery();

  function isPublicRegistrySet(selectedPrivateRegistry?: PrivateRegistry[]){
    let isPublicRepository: null | boolean = null
    if (selectedPrivateRegistry && selectedPrivateRegistry.length > 0){
      if (selectedPrivateRegistry.includes(PrivateRegistry.Private) && !(selectedPrivateRegistry.includes(PrivateRegistry.Public))){
        isPublicRepository = false
      } else if (selectedPrivateRegistry.includes(PrivateRegistry.Public) && !(selectedPrivateRegistry.includes(PrivateRegistry.Private))){
        isPublicRepository = true
      }
    }
    console.log(isPublicRepository)
    return isPublicRepository
  }

  const fetchEntitiesByFilter = useCallback(
    async (
      searchString: string,
      agentType: NodeType,
      limit: number,
      offset: number,
      visibilityLevel?: VisibilityLevel[],
      selectedPrivateRegistry?: PrivateRegistry[],
      creatorUuid?: string
    ) => {
    try {
      const queryVariables = {
        searchString: searchString,
        limit: limit,
        offset: offset,
        visibilityLevel: visibilityLevel,
        isPublicRepository: isPublicRegistrySet(selectedPrivateRegistry),
        creatorUuid: creatorUuid
      };

      switch (agentType) {
        case NodeType.Registry:
          return getRepositoriesRegistry({ variables: queryVariables });
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
