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
            repoUrl
            platform
            isPublicRepository
            defaultBranch
            isAutoUpdateRepo
            defaultCommit
            isOnlyTagUpdate
            isCompilableRepo
            lastUpdateDatetime
            branches
            creatorUuid
        }
    }
    query getRepos(
        $uuids: [UUID!]
        $creatorUuid: UUID
        $creatorsUuids: [UUID!]
        $searchString: String
        $isPublicRepository: Boolean
        $isAutoUpdateRepo: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getRepos(
            filters: {
                uuids: $uuids
                creatorUuid: $creatorUuid
                creatorsUuids: $creatorsUuids
                searchString: $searchString
                isPublicRepository: $isPublicRepository
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
                repoUrl
                platform
                isPublicRepository
                defaultBranch
                isAutoUpdateRepo
                defaultCommit
                isOnlyTagUpdate
                isCompilableRepo
                lastUpdateDatetime
                branches
                creatorUuid
            }
        }
    }

    query getBranchCommits(
        $uuid: UUID!
        $repoBranch: String!
        $onlyTag: Boolean!
        $offset: Int
        $limit: Int
    ) {
        getBranchCommits (
            uuid: $uuid
            filters: {
                repoBranch: $repoBranch
                onlyTag: $onlyTag
                offset: $offset
                limit: $limit
            }
        ) {
            commit
            summary
            tag
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