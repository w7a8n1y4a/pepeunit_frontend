import {
    PermissionEntities
} from '@rootTypes/compositionFunctions';
import { useState } from 'react';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';
import { useUserStore } from '@stores/userStore';

  
  interface SearchFormProps {
    onFocusNode?: (uuid: string, nodeType: string) => void
  }

  export default function SearchForm({ onFocusNode }: SearchFormProps){
    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Unit);
    const { user } = useUserStore();
  
    return (
        <SearchPrimitives 
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
  