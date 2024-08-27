import { gql } from 'graphql-tag';

gql`
    mutation createRepo(
        $visibilityLevel: VisibilityLevel!
        $name: String!
        $repoUrl: String!
        $isPublicRepository: Boolean!
        $credentials: CredentialsInput
    ) {
        createRepo (
            repo: {
                visibilityLevel: $visibilityLevel
                name: $name
                repoUrl: $repoUrl
                isPublicRepository: $isPublicRepository
                credentials: $credentials
            }
        ){
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
    mutation updateRepo(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $name: String
        $isAutoUpdateRepo: Boolean
        $defaultBranch: String
        $defaultCommit: String
        $isOnlyTagUpdate: Boolean
    ) {
        updateRepo (
            uuid: $uuid
            repo: {
                visibilityLevel: $visibilityLevel
                name: $name
                isAutoUpdateRepo: $isAutoUpdateRepo
                defaultBranch: $defaultBranch
                defaultCommit: $defaultCommit
                isOnlyTagUpdate: $isOnlyTagUpdate
            }
        ){
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