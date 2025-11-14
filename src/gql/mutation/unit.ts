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
                targetFirmwarePlatform: $targetFirmwarePlatform
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
            unitState{
                ifconfig
                millis
                memFree
                memAlloc
                freq
                statvfs
                commitVersion
            }
            currentCommitVersion
            lastUpdateDatetime
            creatorUuid
            repoUuid
            firmwareUpdateStatus
            firmwareUpdateError
            lastFirmwareUpdateDatetime
        }
    }
    mutation updateUnit(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $name: String
        $isAutoUpdateFromRepoUnit: Boolean
        $repoBranch: String
        $repoCommit: String
        $targetFirmwarePlatform: String
    ) {
        updateUnit (
            uuid: $uuid
            unit: {
                visibilityLevel: $visibilityLevel
                name: $name
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                targetFirmwarePlatform: $targetFirmwarePlatform
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
            unitState{
                ifconfig
                millis
                memFree
                memAlloc
                freq
                statvfs
                commitVersion
            }
            currentCommitVersion
            lastUpdateDatetime
            creatorUuid
            repoUuid
            firmwareUpdateStatus
            firmwareUpdateError
            lastFirmwareUpdateDatetime
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
    mutation resetUnitEnv(
        $uuid: UUID!
    ) {
        resetUnitEnv (
            uuid: $uuid
        ){
            isNone
        }
    }
    mutation setStateStorage(
        $uuid: UUID!
        $state: String!
    ) {
        setStateStorage (
            uuid: $uuid
            state: $state
        ){
            isNone
        }
    }
    mutation sendCommandToInputBaseTopic(
        $uuid: UUID!
        $command: BackendTopicCommand!
    ) {
        sendCommandToInputBaseTopic (
            uuid: $uuid
            command: $command
        ){
            isNone
        }
    }
`