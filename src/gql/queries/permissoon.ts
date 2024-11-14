import { gql } from 'graphql-tag';

gql`
    query getResourceAgents(
        $resourceUuid: UUID!
        $resourceType: PermissionEntities!
        $agentType: PermissionEntities
        $offset: Int
        $limit: Int
    ) {
        getResourceAgents (
            filters: {
                resourceUuid: $resourceUuid
                resourceType: $resourceType
                agentType: $agentType
                offset: $offset
                limit: $limit
            }
        ) { 
            count
            permissions {
                uuid
                agentUuid
                agentType
                resourceUuid
                resourceType
            }
        }
    }
`