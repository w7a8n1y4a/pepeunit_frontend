import { gql } from 'graphql-tag';

gql`
    mutation updateUnitNode(
        $uuid: UUID!
        $visibilityLevel: VisibilityLevel
        $isRewritableInput: Boolean
        $isDataPipeActive: Boolean
    ) {
        updateUnitNode (
            uuid: $uuid
            unitNode: {
                visibilityLevel: $visibilityLevel
                isRewritableInput: $isRewritableInput
                isDataPipeActive: $isDataPipeActive
            }
        ){
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
    mutation setDataPipeConfig(
        $uuid: UUID!
        $file: Upload!
    ) {
        setDataPipeConfig (
            uuid: $uuid
            file: $file
        ){
            isNone
        }
    }
    mutation deleteDataPipeData(
        $uuid: UUID!
    ) {
        deleteDataPipeData (
            uuid: $uuid
        ){
            isNone
        }
    }
`