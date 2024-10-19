import { gql } from 'graphql-tag';

gql`
    query getResourceAgents(
        $resourceUuid: UUID!
        $resourceType: PermissionEntities!
    ) {
        getResourceAgents (
            data: {
                resourceUuid: $resourceUuid
                resourceType: $resourceType
            }
        ) {
            uuid
            agentUuid
            agentType
            resourceUuid
            resourceType
        }
    }
`