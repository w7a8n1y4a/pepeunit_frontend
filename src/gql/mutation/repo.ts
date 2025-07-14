import { gql } from 'graphql-tag';

gql`
    mutation createRepo(
        $repositoryRegistryUuid: UUID!
        $visibilityLevel: VisibilityLevel!
        $name: String!
        $isCompilableRepo: Boolean!
    ) {
        createRepo (
            repo: {
                repositoryRegistryUuid: $repositoryRegistryUuid
                visibilityLevel: $visibilityLevel
                name: $name
                isCompilableRepo: $isCompilableRepo
            }
        ){
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
    mutation updateUnitsFirmware(
        $uuid: UUID!
    ) {
        updateUnitsFirmware (
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
    mutation deleteRepo(
        $uuid: UUID!
    ) {
        deleteRepo (
            uuid: $uuid
        ){
            isNone
        }
    }
`