import {
    PermissionEntities,
    useCreatePermissionMutation,
 } from '@rootTypes/compositionFunctions';
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';


interface PermissionCreateFormProps {
    currentNodeType: PermissionEntities;
    selectedEntityType: PermissionEntities;
    setSelectedEntityType: (show: PermissionEntities) => void;
}

export default function PermissionCreateForm({ currentNodeType, selectedEntityType, setSelectedEntityType }: PermissionCreateFormProps) {
    const { handleError, handleSuccess } = useResultHandler();
    const { runAsync } = useAsyncHandler(handleError);

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
                handleSuccess("Permission success create")
            }
        })
    };

    return (
        <SearchPrimitives 
            availableEntities={[PermissionEntities.Unit, PermissionEntities.User]}
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            handleCreatePermission={handleCreatePermission}
        />
    );
}
