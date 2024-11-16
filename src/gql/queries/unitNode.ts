import { gql } from 'graphql-tag';

gql`
    query getUnitNode(
        $uuid: UUID!
    ) {
        getUnitNode(
            uuid: $uuid
        ) {
            uuid
            type
            visibilityLevel
            isRewritableInput
            topicName
            state
            unitUuid
        }
    }
    query getUnitNodes(
        $uuids: [UUID!]
        $unitUuid: UUID
        $searchString: String
        $type: [UnitNodeTypeEnum!]
        $visibilityLevel: [VisibilityLevel!]
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnitNodes(
            filters: {
                uuids: $uuids
                unitUuid: $unitUuid
                searchString: $searchString
                type: $type
                visibilityLevel: $visibilityLevel
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            unitNodes {
                uuid
                type
                visibilityLevel
                isRewritableInput
                topicName
                state
                unitUuid
            }
        }
    }
`