import { gql } from 'graphql-tag';

gql`
    mutation createRepo(
        $visibilityLevel: VisibilityLevel!
        $name: String!
        $repoUrl: String!
        $platform: GitPlatform! 
        $isPublicRepository: Boolean!
        $credentials: CredentialsInput
        $isCompilableRepo: Boolean!
    ) {
        createRepo (
            repo: {
                visibilityLevel: $visibilityLevel
                name: $name
                repoUrl: $repoUrl
                platform: $platform
                isPublicRepository: $isPublicRepository
                credentials: $credentials
                isCompilableRepo: $isCompilableRepo
            }
        ){
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
    mutation updateRepo(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $name: String
        $isAutoUpdateRepo: Boolean
        $defaultBranch: String
        $defaultCommit: String
        $isOnlyTagUpdate: Boolean
        $isCompilableRepo: Boolean
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
                isCompilableRepo: $isCompilableRepo
            }
        ){
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
    mutation updateRepoCredentials(
        $uuid: UUID!
        $data: CredentialsInput!
    ) {
        updateRepoCredentials (
            uuid: $uuid
            data: $data
        ){
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
    mutation updateLocalRepo(
        $uuid: UUID!
    ) {
        updateLocalRepo (
            uuid: $uuid
        ){
            isNone
        }
    }
    mutation updateUnitsFirmware(
        $uuid: UUID!
    ) {
        updateUnitsFirmware (
            uuid: $uuid
        ){
            isNone
        }
    }
    mutation deleteRepo(
        $uuid: UUID!
    ) {
        deleteRepo (
            uuid: $uuid
        ){
            isNone
        }
    }
    mutation bulkUpdate{
        bulkUpdate{
            isNone
        }
    }
`