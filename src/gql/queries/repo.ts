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
            isCredentialsSet
            defaultBranch
            isAutoUpdateRepo
            lastUpdateDatetime
            branches
            creatorUuid
        }
    }
`