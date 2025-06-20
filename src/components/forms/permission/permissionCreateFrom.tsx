import {
    PermissionEntities,
    useCreatePermissionMutation,
 } from '@rootTypes/compositionFunctions';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


interface PermissionCreateFormProps {
    currentNodeType: PermissionEntities;
    selectedEntityType: PermissionEntities;
    setSelectedEntityType: (show: PermissionEntities) => void;
}

export default function PermissionCreateForm({ currentNodeType, selectedEntityType, setSelectedEntityType }: PermissionCreateFormProps) {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const [createPermissionMutation] = useCreatePermissionMutation();

    const handleCreatePermission = (entityUuid: string) => {
        runAsync(async () => {
            let result = await createPermissionMutation({
                variables: {
                    agentUuid: entityUuid,
                    agentType: selectedEntityType,
                    resourceUuid: currentNodeData.uuid,
                    resourceType: currentNodeType
                }
            })
            if (result.data){
                setHappy("Permission success create")
            }
        })
    };

    return (
        <SearchPrimitives
            isLoaderActive={isLoaderActive}
            runAsync={runAsync}
            availableEntities={[PermissionEntities.Unit, PermissionEntities.User]}
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            handleCreatePermission={handleCreatePermission}
        />
    );
}
