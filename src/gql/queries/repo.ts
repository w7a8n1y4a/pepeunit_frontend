import { gql } from 'graphql-tag';

gql`
    query getRepo(
        $uuid: UUID!
    ) {
        getRepo(
            uuid: $uuid
        ) {
            uuid
            visibilityLevel
            name
            createDatetime
            defaultBranch
            isAutoUpdateRepo
            defaultCommit
            isOnlyTagUpdate
            isCompilableRepo
            lastUpdateDatetime
            creatorUuid
            repositoryRegistryUuid
        }
    }
    query getRepos(
        $repositoryRegistryUuid: UUID
        $uuids: [UUID!]
        $creatorUuid: UUID
        $creatorsUuids: [UUID!]
        $searchString: String
        $isAutoUpdateRepo: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getRepos(
            filters: {
                repositoryRegistryUuid: $repositoryRegistryUuid
                uuids: $uuids
                creatorUuid: $creatorUuid
                creatorsUuids: $creatorsUuids
                searchString: $searchString
                isAutoUpdateRepo: $isAutoUpdateRepo
                visibilityLevel: $visibilityLevel
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            repos {
                uuid
                visibilityLevel
                name
                createDatetime
                defaultBranch
                isAutoUpdateRepo
                defaultCommit
                isOnlyTagUpdate
                isCompilableRepo
                lastUpdateDatetime
                creatorUuid
                repositoryRegistryUuid
            }
        }
    }

    query getAvailablePlatforms(
        $uuid: UUID!
        $targetTag: String
        $targetCommit: String
    ) {
        getAvailablePlatforms (
            uuid: $uuid
            targetTag: $targetTag
            targetCommit: $targetCommit
        ) {
            name
            link
        }
    }

    query getVersions(
        $uuid: UUID!
    ) {
        getVersions (
            uuid: $uuid
        ) {
            unitCount
            versions {
                commit
                unitCount
                tag
            }
        }
    }
`