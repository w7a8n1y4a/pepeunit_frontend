import { useState } from 'react';
import SearchPrimitives from '@primitives/searchPrimitives';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import '../form.css';
import { useUserStore } from '@stores/userStore';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
  
interface SearchFormProps {
  targetSearch: NodeType
  onFocusNode?: (uuid: string, nodeType: string) => void
}

export default function SearchForm({ targetSearch, onFocusNode }: SearchFormProps){
  const { isLoaderActive, runAsync } = useAsyncHandler();
  
  const [selectedEntityType, setSelectedEntityType] = useState<NodeType>(targetSearch);
  const { user } = useUserStore();
  
  let availableEntities = user
    ? [NodeType.Registry, NodeType.Unit, NodeType.Repo, NodeType.User, NodeType.Dashboard]
    : [NodeType.Registry, NodeType.Unit, NodeType.Repo]

  if (targetSearch == NodeType.Registry) {
    availableEntities = [NodeType.Registry]
  }
  
  return (
      <SearchPrimitives
          isLoaderActive={isLoaderActive}
          runAsync={runAsync}
          availableEntities={availableEntities}
          selectedEntityType={selectedEntityType}
          setSelectedEntityType={setSelectedEntityType}
          onFocusNode={onFocusNode}
      />
  )
}
  