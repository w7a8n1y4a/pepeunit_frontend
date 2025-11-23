import { gql } from 'graphql-tag';

gql`
    query getUnit(
        $uuid: UUID!
    ) {
        getUnit(
            uuid: $uuid
        ) {
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
                puCommitVersion
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
    query getUnits(
        $uuids: [UUID!]
        $creatorUuid: UUID
        $repoUuid: UUID
        $reposUuids: [UUID!]
        $searchString: String
        $isAutoUpdateFromRepoUnit: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                uuids: $uuids
                creatorUuid: $creatorUuid
                repoUuid: $repoUuid
                reposUuids: $reposUuids
                searchString: $searchString
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            units {
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
                    puCommitVersion
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
    }
    query getUnitsWithUnitNodes(
        $uuids: [UUID!]
        $creatorUuid: UUID
        $repoUuid: UUID
        $reposUuids: [UUID!]
        $searchString: String
        $isAutoUpdateFromRepoUnit: Boolean
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $orderByLastUpdate: OrderByDate
        $offset: Int
        $limit: Int
        $unitNodeType: [UnitNodeTypeEnum!]
    ) {
        getUnits(
            filters: {
                uuids: $uuids
                creatorUuid: $creatorUuid
                repoUuid: $repoUuid
                reposUuids: $reposUuids
                searchString: $searchString
                isAutoUpdateFromRepoUnit: $isAutoUpdateFromRepoUnit
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                orderByLastUpdate: $orderByLastUpdate
                offset: $offset
                limit: $limit
                unitNodeType: $unitNodeType
            }
        ) {
            count
            units {
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
                    puCommitVersion
                }
                currentCommitVersion
                lastUpdateDatetime
                creatorUuid
                repoUuid
                firmwareUpdateStatus
                firmwareUpdateError
                lastFirmwareUpdateDatetime
                unitNodes {
                    uuid
                    type
                    visibilityLevel
                    isRewritableInput
                    topicName
                    lastUpdateDatetime
                    isDataPipeActive
                    dataPipeYml
                    dataPipeStatus
                    dataPipeError
                    createDatetime
                    state
                    unitUuid
                    creatorUuid
                }
            }
        }
    }
    query getUnitsOutputByInput(
        $creatorUuid: UUID
        $unitNodeInputUuid: UUID
        $searchString: String
        $visibilityLevel: [VisibilityLevel!]
        $orderByUnitName: OrderByText
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnits(
            filters: {
                creatorUuid: $creatorUuid
                unitNodeInputUuid: $unitNodeInputUuid
                searchString: $searchString
                visibilityLevel: $visibilityLevel
                orderByUnitName: $orderByUnitName
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            units {
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
                    puCommitVersion
                }
                currentCommitVersion
                lastUpdateDatetime
                creatorUuid
                repoUuid
                firmwareUpdateStatus
                firmwareUpdateError
                lastFirmwareUpdateDatetime
                unitNodes {
                    uuid
                    type
                    visibilityLevel
                    isRewritableInput
                    topicName
                    lastUpdateDatetime
                    isDataPipeActive
                    dataPipeYml
                    dataPipeStatus
                    dataPipeError
                    createDatetime
                    state
                    unitUuid
                    creatorUuid
                }
            }
        }
    }

    query getUnitLogs(
        $uuid: UUID!
        $level: [LogLevel!]
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnitLogs(
            filters: {
                uuid: $uuid
                level: $level
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            unitLogs {
                uuid
                level
                unitUuid
                text
                createDatetime
                expirationDatetime
            }
        }
    }

    query getUnitEnv(
        $uuid: UUID!
    ) {
        getUnitEnv (
            uuid: $uuid
        )
    }

    query getUnitCurrentSchema(
        $uuid: UUID!
    ) {
        getUnitCurrentSchema (
            uuid: $uuid
        )
    }

    query getTargetVersion(
        $uuid: UUID!
    ){
        getTargetVersion(
            uuid: $uuid
        ){
            commit
            tag
        }
    }

    query getStateStorage(
        $uuid: UUID!
    ) {
        getStateStorage (
            uuid: $uuid
        )
    }

    query getConvertTomlToMd(
        $file: Upload!
    ) {
        getConvertTomlToMd(
            file: $file
        )
    }
`