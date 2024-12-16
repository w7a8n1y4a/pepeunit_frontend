import { gql } from 'graphql-tag';

gql`
    mutation createUnit(
        $repoUuid: UUID!
        $visibilityLevel: VisibilityLevel!
        $name: String!
        $isAutoUpdateFromRepoUnit: Boolean!
        $repoBranch: String
        $repoCommit: String
        $targetFirmwarePlatform: String
    ) {
        createUnit (
            unit: {
                repoUuid: $repoUuid
                visibilityLevel: $visibilityLevel
                name: $name
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                repoBranch: $repoBranch
                repoCommit: $repoCommit
            }
        ){
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
    mutation updateUnit(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $name: String
        $isAutoUpdateFromRepoUnit: Boolean
        $repoBranch: String
        $repoCommit: String
    ) {
        updateUnit (
            uuid: $uuid
            unit: {
                visibilityLevel: $visibilityLevel
                name: $name
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                repoBranch: $repoBranch
                repoCommit: $repoCommit
            }
        ){
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
    mutation deleteUnit(
        $uuid: UUID!
    ) {
        deleteUnit (
            uuid: $uuid
        ){
            isNone
        }
    }
    mutation updateUnitEnv(
        $uuid: UUID!
        $envJsonStr: String!
    ) {
        updateUnitEnv (
            uuid: $uuid
            envJsonStr: $envJsonStr
        ){
            isNone
        }
    }
`