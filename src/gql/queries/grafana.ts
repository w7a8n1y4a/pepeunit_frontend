import { gql } from 'graphql-tag';

gql`
    query getDashboard(
        $uuid: UUID!
    ) {
        getDashboard(
            uuid: $uuid
        ) {
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
    query getDashboards(
        $searchString: String
        $orderByCreateDate: OrderByDate
        $offset: Int
        $limit: Int
    ) {
        getDashboards(
            filters: {
                searchString: $searchString
                orderByCreateDate: $orderByCreateDate
                offset: $offset
                limit: $limit
            }
        ) {
            count
            dashboards {
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
    }
    query getDashboardPanels(
        $uuid: UUID!
    ) {
        getDashboardPanels(
            uuid: $uuid
        ) {
            count
            panels {
                uuid
                type
                title
                createDatetime
                creatorUuid
                dashboardUuid
                unitNodesForPanel {
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
        }
    }
`