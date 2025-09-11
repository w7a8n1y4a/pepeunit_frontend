import { gql } from 'graphql-tag';

gql`
    mutation createDashboard(
        $name: String!
    ) {
        createDashboard (
            dashboard: {
                name: $name
            }
        ){
            uuid
            grafanaUuid
            name
            createDatetime
            dashboardUrl
            incLastVersion
            syncStatus
            syncError
            syncLastDatetime
            creatorUuid
        }
    }

    mutation createDashboardPanel(
        $dashboardUuid: UUID!
        $title: String!
        $type: DashboardPanelTypeEnum!
    ) {
        createDashboardPanel (
            dashboardPanel: {
                dashboardUuid: $dashboardUuid
                title: $title
                type: $type
            }
        ){
            uuid
            type
            title
            createDatetime
            creatorUuid
            dashboardUuid
            unitNodesForPanel {
                unitNode{
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
                isLastData
                isForcedToJson
                unitWithUnitNodeName
            }
        }
    }

    mutation linkUnitNodeToPanel(
        $unitNodeUuid: UUID!
        $dashboardPanelsUuid: UUID!
        $isLastData: Boolean!
        $isForcedToJson: Boolean!
    ) {
        linkUnitNodeToPanel (
            dashboard: {
                unitNodeUuid: $unitNodeUuid
                dashboardPanelsUuid: $dashboardPanelsUuid
                isLastData: $isLastData
                isForcedToJson: $isForcedToJson
            }
        ){
            unitNode {
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
            isLastData
            isForcedToJson
            unitWithUnitNodeName
        }
    }

    mutation syncDashboard(
        $uuid: UUID!
    ) {
        syncDashboard (
            uuid: $uuid
        ){
            uuid
            grafanaUuid
            name
            createDatetime
            dashboardUrl
            incLastVersion
            syncStatus
            syncError
            syncLastDatetime
            creatorUuid
        }
    }

    mutation deleteDashboard(
        $uuid: UUID!
    ) {
        deleteDashboard (
            uuid: $uuid
        ){
            isNone
        }
    }

    mutation deletePanel(
        $uuid: UUID!
    ) {
        deletePanel (
            uuid: $uuid
        ){
            isNone
        }
    }

    mutation deleteLink(
        $unitNodeUuid: UUID!
        $dashboardPanelUuid: UUID!
    ) {
        deleteLink (
            unitNodeUuid: $unitNodeUuid
            dashboardPanelUuid: $dashboardPanelUuid
        ){
            isNone
        }
    }
`