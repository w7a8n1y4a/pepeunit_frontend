interface PermissionListProps {
    nodeOutputs: any[] | null;
    currentNodeData: any;
    currentNodeType: string;
    handleDeletePermission?: (permissionUuid: string, nodeUuid: string) => void;
    handleCreatePermission?: (permissionUuid: string) => void;
    openModal?: (modalType: string) => void;
}

const PermissionList: React.FC<PermissionListProps> = ({
    nodeOutputs,
    currentNodeData,
    currentNodeType,
    handleDeletePermission,
    handleCreatePermission,
    openModal,
}) => {
    return (
        <div className="unit-list">
            {nodeOutputs ? (
                nodeOutputs.map((permissionOutput: any) => {
                    if (permissionOutput.length === 0) return null;

                    return (
                        <div key={permissionOutput.uuid} className="unit-item">
                            <button className="unit-header">
                                <h3>{permissionOutput.name} {permissionOutput.visibilityLevel}</h3>
                                {handleDeletePermission ? (
                                    <button
                                        className="unit-node-del-button"
                                        onClick={() => handleDeletePermission(permissionOutput.uuid, currentNodeData.uuid)}
                                    >
                                        delete
                                    </button>
                                ) : ( <></>)}
                                {handleCreatePermission ? (
                                    <button
                                        className="unit-node-add-button"
                                        onClick={() => handleCreatePermission(permissionOutput.uuid)}
                                    >
                                        add
                                    </button>
                                ) : ( <></>)}
                            </button>
                        </div>
                    );
                })
            ) : (<></>)}
            {handleDeletePermission && openModal ? (
                <div
                    className="unit-item"
                    onClick={() => openModal('permissionCreate' + currentNodeType)}
                >
                    <h3>Добавить доступ</h3>
                </div>
            ) : (<></>)}
        </div>
    );
};

export default PermissionList;
