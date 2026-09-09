import { gql } from 'graphql-tag';

gql`
    query getOperationTask(
        $uuid: UUID!
    ) {
        getOperationTask (
            uuid: $uuid
        ){
            uuid
            creatorUuid
            createDatetime
            startDatetime
            finishDatetime
            status
            result
            taskType
        }
    }

    query getOperationTasks(
        $creatorUuid: UUID
        $status: [OperationTaskStatus!]
        $taskType: [OperationTaskType!]
        $offset: Int
        $limit: Int
    ) {
        getOperationTasks (
            filters: {
                creatorUuid: $creatorUuid
                status: $status
                taskType: $taskType
                offset: $offset
                limit: $limit
            }
        ){
            count
            operationTasks {
                uuid
                creatorUuid
                createDatetime
                startDatetime
                finishDatetime
                status
                result
                taskType
            }
        }
    }
`
