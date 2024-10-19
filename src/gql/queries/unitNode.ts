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
                unitUuid: $unitUuid
                searchString: $searchString
                type: $type
                visibilityLevel: $visibilityLevel
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
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
`