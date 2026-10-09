import { gql } from 'graphql-tag';

gql`
    query getNotifications(
        $filters: NotificationFilterInput!
    ) {
        getNotifications (
            filters: $filters
        ) {
            count
            notifications {
                uuid
                createDatetime
                type
                smallText
                tableText
                bigText
                isRead
                readDatetime
                userUuid
            }
        }
    }

    query getNotificationSettings {
        getNotificationSettings {
            uuid
            userUuid
            isScheduledAlertEnable
            scheduledNotificationTime
            isDataPipeAlertEnable
            isTelegramAlertEnable
        }
    }
`
