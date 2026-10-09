import { gql } from 'graphql-tag';

gql`
    mutation markNotificationRead(
        $uuid: UUID!
    ) {
        markNotificationRead (
            uuid: $uuid
        ) {
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

    mutation markAllNotificationsRead {
        markAllNotificationsRead
    }

    mutation updateNotificationSettings(
        $data: NotificationSettingsUpdateInput!
    ) {
        updateNotificationSettings (
            data: $data
        ) {
            uuid
            userUuid
            isScheduledAlertEnable
            scheduledNotificationTime
            isDataPipeAlertEnable
            isTelegramAlertEnable
        }
    }
`
