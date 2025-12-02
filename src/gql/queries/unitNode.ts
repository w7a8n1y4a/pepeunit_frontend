import { gql } from 'graphql-tag';

gql`
    query getUnitNode(
        $uuid: UUID!
    ) {
        getUnitNode(
            uuid: $uuid
        ) {
            uuid
            type
            visibilityLevel
            isRewritableInput
            topicName
            maxConnections
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
    query getUnitNodes(
        $uuids: [UUID!]
        $unitUuid: UUID
        $searchString: String
        $type: [UnitNodeTypeEnum!]
        $visibilityLevel: [VisibilityLevel!]
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getUnitNodes(
            filters: {
                uuids: $uuids
                unitUuid: $unitUuid
                searchString: $searchString
                type: $type
                visibilityLevel: $visibilityLevel
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            unitNodes {
                uuid
                type
                visibilityLevel
                isRewritableInput
                topicName
                maxConnections
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
    
    query checkDataPipeConfig(
        $file: Upload!
    ) {
        checkDataPipeConfig(
            file: $file
        ) {
            stage
            message
        }
    }

    query getPipeData(
        $uuid: UUID!
        $type: ProcessingPolicyType!
        $searchString: String
        $aggregationType: [AggregationFunctions!]
        $timeWindowSize: Int
        $startAggWindowDatetime: DateTime
        $endAggWindowDatetime: DateTime
        $startCreateDatetime: DateTime
        $endCreateDatetime: DateTime
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getPipeData(
            filters: {
                uuid: $uuid
                type: $type
                searchString: $searchString
                aggregationType: $aggregationType
                timeWindowSize: $timeWindowSize
                startAggWindowDatetime: $startAggWindowDatetime
                endAggWindowDatetime: $endAggWindowDatetime
                startCreateDatetime: $startCreateDatetime
                endCreateDatetime: $endCreateDatetime
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            pipeData {
                __typename
                ... on LastValueType{
                    unitNodeUuid
                    state: state
                    lastUpdateDatetime
                }
                ... on NRecordsType{
                    unitNodeUuid
                    state: state
                    stateType
                    createDatetime
                    maxCount
                    size
                }
                ... on TimeWindowType{
                    unitNodeUuid
                    state: state
                    stateType
                    createDatetime
                    expirationDatetime
                    size
                }
                ... on AggregationType{
                    unitNodeUuid
                    state_float: state
                    aggregationType
                    timeWindowSize
                    createDatetime
                    startWindowDatetime
                }
            }
        }
    }

    query getDataPipeConfig(
        $uuid: UUID!
    ) {
        getDataPipeConfig (
            uuid: $uuid
        )
    }
`