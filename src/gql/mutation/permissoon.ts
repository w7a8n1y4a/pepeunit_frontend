import { gql } from 'graphql-tag';

gql`
    mutation createPermission(
        $agentUuid: UUID!
        $agentType: PermissionEntities!
        $resourceUuid: UUID!
        $resourceType: PermissionEntities!
    ) {
        createPermission (
            permission: {
                agentUuid: $agentUuid
                agentType: $agentType
                resourceUuid: $resourceUuid
                resourceType: $resourceType
            }
        ){
            uuid
            agentUuid
            agentType
            resourceUuid
            resourceType
        }
    }
    mutation deletePermission(
        $uuid: UUID!
    ) {
        deletePermission (
            uuid: $uuid
        ){
            isNone
        }
    }
`