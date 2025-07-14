import { gql } from 'graphql-tag';

gql`

    query getRepositoryRegistry(
        $uuid: UUID!
    ) {
        getRepositoryRegistry(
            uuid: $uuid
        ) {
            uuid
            platform
            repositoryUrl
            isPublicRepository
            releasesData
            localRepositorySize
            syncStatus
            syncError
            syncLastDatetime
            createDatetime
            lastUpdateDatetime
            creatorUuid
            branches
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

    query getCredentials(
        $uuid: UUID!
    ) {
        getCredentials (
            uuid: $uuid
        ) {
            credentials {
                username
                patToken
            }
            status
        }
    }

    query getRepositoriesRegistry(
        $uuids: [UUID!]
        $creatorUuid: UUID
        $searchString: String
        $isPublicRepository: Boolean
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getRepositoriesRegistry(
            filters: {
                uuids: $uuids
                creatorUuid: $creatorUuid
                searchString: $searchString
                isPublicRepository: $isPublicRepository
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            repositoriesRegistry {
                uuid
                platform
                repositoryUrl
                isPublicRepository
                releasesData
                localRepositorySize
                syncStatus
                syncError
                syncLastDatetime
                createDatetime
                lastUpdateDatetime
                creatorUuid
                branches
            }
        }
    }
`