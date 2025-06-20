import {
    PermissionEntities
} from '@rootTypes/compositionFunctions';
import { useState } from 'react';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';
import { useUserStore } from '@stores/userStore';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
  
interface SearchFormProps {
  onFocusNode?: (uuid: string, nodeType: string) => void
}

export default function SearchForm({ onFocusNode }: SearchFormProps){
  const { isLoaderActive, runAsync } = useAsyncHandler();
  
  const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Unit);
  const { user } = useUserStore();
  
  return (
      <SearchPrimitives
          isLoaderActive={isLoaderActive}
          runAsync={runAsync}
          availableEntities={
              user
              ? [PermissionEntities.Unit, PermissionEntities.Repo, PermissionEntities.User]
              : [PermissionEntities.Unit, PermissionEntities.Repo]
          }
          selectedEntityType={selectedEntityType}
          setSelectedEntityType={setSelectedEntityType}
          onFocusNode={onFocusNode}
      />
  )
}
  