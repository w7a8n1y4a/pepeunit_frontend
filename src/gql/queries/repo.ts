import { gql } from 'graphql-tag';

gql`
    query getRepos(
        $creatorUuid: UUID
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
                creatorUuid: $creatorUuid
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
            uuid
            visibilityLevel
            name
            createDatetime
            repoUrl
            isPublicRepository
            defaultBranch
            isAutoUpdateRepo
            defaultCommit
            isOnlyTagUpdate
            lastUpdateDatetime
            branches
            creatorUuid
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
`