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
        $filters: OperationTaskFilterInput!
    ) {
        getOperationTasks (
            filters: $filters
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
