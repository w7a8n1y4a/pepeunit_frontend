import { NodeType } from '@rootTypes/nodeTypeEnum'
import {
    PermissionEntities
} from '@rootTypes/compositionFunctions';


export const nodeTypeToPermissionEntity: Record<NodeType, PermissionEntities | null> = {
  [NodeType.Domain]: null,
  [NodeType.User]: PermissionEntities.User,
  [NodeType.Registry]: null,
  [NodeType.Repo]: PermissionEntities.Repo,
  [NodeType.Unit]: PermissionEntities.Unit,
  [NodeType.UnitNode]: PermissionEntities.UnitNode,
  [NodeType.Input]: null,
  [NodeType.Output]: null,
};

export const permissionEntityToNodeType: Record<PermissionEntities, NodeType> = {
  [PermissionEntities.Repo]: NodeType.Repo,
  [PermissionEntities.Unit]: NodeType.Unit,
  [PermissionEntities.UnitNode]: NodeType.UnitNode,
  [PermissionEntities.User]: NodeType.User,
};

export function convertNodeTypeToPermissionEntity(nodeType: NodeType): PermissionEntities {
  const result = nodeTypeToPermissionEntity[nodeType];
  if (result === null) {
    throw new Error(`No corresponding PermissionEntities for NodeType: ${nodeType}`);
  }
  return result;
}

export function convertPermissionEntityToNodeType(permissionEntity: PermissionEntities): NodeType {
  const result = permissionEntityToNodeType[permissionEntity];
  if (!result) {
    throw new Error(`No corresponding NodeType for PermissionEntities: ${permissionEntity}`);
  }
  return result;
}