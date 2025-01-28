import {
    PermissionEntities
} from '@rootTypes/compositionFunctions';
import { useState } from 'react';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';
import { useUserStore } from '@stores/userStore';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
  
interface SearchFormProps {
  onFocusNode?: (uuid: string, nodeType: string) => void
}

export default function SearchForm({ onFocusNode }: SearchFormProps){
  const { resultData, setResultData, handleError } = useResultHandler();
  const { isLoaderActive, runAsync } = useAsyncHandler(handleError);
  
  const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Unit);
  const { user } = useUserStore();
  
  return (
      <SearchPrimitives
          isLoaderActive={isLoaderActive}
          runAsync={runAsync}
          resultData={resultData}
          setResultData={setResultData}
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
  