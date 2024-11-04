import { gql } from 'graphql-tag';

gql`
    query getUnit(
        $uuid: UUID!
    ) {
        getUnit(
            uuid: $uuid
        ) {
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
    }
    query getUnits(
        $creatorUuid: UUID
        $repoUuid: UUID
        $searchString: String
        $isAutoUpdateFromRepoUnit: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                creatorUuid: $creatorUuid
                repoUuid: $repoUuid
                searchString: $searchString
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            units {
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
        }
    }
    query getUnitsWithAllOutput(
        $creatorUuid: UUID
        $repoUuid: UUID
        $searchString: String
        $isAutoUpdateFromRepoUnit: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                creatorUuid: $creatorUuid
                repoUuid: $repoUuid
                searchString: $searchString
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            units {
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
                outputUnitNodes {
                    uuid
                    type
                    visibilityLevel
                    isRewritableInput
                    topicName
                    createDatetime
                    state
                    unitUuid
                    creatorUuid
                }
            }
        }
    }
    query getUnitsOutputByInput(
        $creatorUuid: UUID
        $repoUuid: UUID
        $unitNodeInputUuid: UUID
        $searchString: String
        $isAutoUpdateFromRepoUnit: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                creatorUuid: $creatorUuid
                repoUuid: $repoUuid
                unitNodeInputUuid: $unitNodeInputUuid
                searchString: $searchString
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            units {
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
                outputUnitNodes {
                    uuid
                    type
                    visibilityLevel
                    isRewritableInput
                    topicName
                    createDatetime
                    state
                    unitUuid
                    creatorUuid
                }
            }
        }
    }
    query getUnitEnv(
        $uuid: UUID!
    ) {
        getUnitEnv (
            uuid: $uuid
        )
    }
`