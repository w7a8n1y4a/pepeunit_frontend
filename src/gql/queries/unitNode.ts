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
    query getOutputUnitNodes(
        $unitNodeInputUuid: UUID!
        $searchString: String
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getOutputUnitNodes(
            filters: {
                unitNodeInputUuid: $unitNodeInputUuid
                searchString: $searchString
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            unit {
                uuid
                visibilityLevel
                name
                createDatetime
                isAutoUpdateFromRepoUnit
                repoBranch
                repoCommit
                unitStateDict
                currentCommitVersion
                lastUpdateDatetime
                creatorUuid
                repoUuid
            }
            unitOutputNodes {
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