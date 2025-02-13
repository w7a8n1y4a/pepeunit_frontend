import { gql } from 'graphql-tag';

gql`
    mutation updateUnitNode(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $isRewritableInput: Boolean
    ) {
        updateUnitNode (
            uuid: $uuid
            unitNode: {
                visibilityLevel: $visibilityLevel
                isRewritableInput: $isRewritableInput
            }
        ){
            uuid
            type
            visibilityLevel
            isRewritableInput
            topicName
            lastUpdateDatetime
            createDatetime
            state
            unitUuid
        }
    }
    mutation setStateUnitNodeInput(
        $uuid: UUID!
        $state: String!
    ) {
        setStateUnitNodeInput (
            uuid: $uuid
            unitNode: {
                state: $state
            }
        ){
            uuid
            type
            visibilityLevel
            isRewritableInput
            topicName
            lastUpdateDatetime
            createDatetime
            state
            unitUuid
        }
    }
    mutation createUnitNodeEdge(
        $nodeOutputUuid: UUID!
        $nodeInputUuid: UUID!
    ) {
        createUnitNodeEdge (
            unitNodeEdge: {
                nodeOutputUuid: $nodeOutputUuid
                nodeInputUuid: $nodeInputUuid
            }
        ){
            uuid
            nodeOutputUuid
            nodeInputUuid
        }
    }
    mutation deleteUnitNodeEdge(
        $inputUuid: UUID!
        $outputUuid: UUID!
    ) {
        deleteUnitNodeEdge (
            inputUuid: $inputUuid
            outputUuid: $outputUuid
        ){
            isNone
        }
    }
`