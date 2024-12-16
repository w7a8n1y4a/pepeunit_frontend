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
            targetFirmwarePlatform
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
        $uuids: [UUID!]
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
                uuids: $uuids
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
    query getUnitsWithUnitNodes(
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
        $unitNodeType: [UnitNodeTypeEnum!]
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
                unitNodeType: $unitNodeType
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
                unitNodes {
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
        $unitNodeInputUuid: UUID
        $searchString: String
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                creatorUuid: $creatorUuid
                unitNodeInputUuid: $unitNodeInputUuid
                searchString: $searchString
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
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
                unitNodes {
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