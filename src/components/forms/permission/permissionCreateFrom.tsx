import {
    PermissionEntities,
    useCreatePermissionMutation,
 } from '@rootTypes/compositionFunctions';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';


interface PermissionCreateFormProps {
    currentNodeType: PermissionEntities;
    selectedEntityType: PermissionEntities;
    setSelectedEntityType: (show: PermissionEntities) => void;
}

export default function PermissionCreateForm({ currentNodeType, selectedEntityType, setSelectedEntityType }: PermissionCreateFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

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
            isLoaderActive={isLoaderActive}
            runAsync={runAsync}
            resultData={resultData}
            setResultData={setResultData}
            availableEntities={[PermissionEntities.Unit, PermissionEntities.User]}
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            handleCreatePermission={handleCreatePermission}
        />
    );
}
