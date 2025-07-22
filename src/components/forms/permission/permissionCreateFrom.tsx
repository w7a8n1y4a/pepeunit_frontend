import {
    useCreatePermissionMutation,
} from '@rootTypes/compositionFunctions';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { convertNodeTypeToPermissionEntity } from '@utils/mappersNodeTypeToPermissions';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import SearchPrimitives from '@primitives/searchPrimitives';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


interface PermissionCreateFormProps {
    currentNodeType: NodeType;
    selectedEntityType: NodeType;
    setSelectedEntityType: (show: NodeType) => void;
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
                    agentType: convertNodeTypeToPermissionEntity(selectedEntityType),
                    resourceUuid: currentNodeData.uuid,
                    resourceType: convertNodeTypeToPermissionEntity(currentNodeType)
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
            availableEntities={[NodeType.Unit, NodeType.User]}
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
            handleCreatePermission={handleCreatePermission}
        />
    );
}
