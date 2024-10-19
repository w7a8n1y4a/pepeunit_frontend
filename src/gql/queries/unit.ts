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
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
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
    query getUnitEnv(
        $uuid: UUID!
    ) {
        getUnitEnv (
            uuid: $uuid
        )
    }
`