import { useEffect, useState } from 'react';
import BaseModal from '../modal/baseModal';
import NotificationsListForm from '../forms/notification/notificationsListForm';
import NotificationTextView from '../forms/notification/notificationTextView';
import { GetNotificationsQuery, useGetNotificationsLazyQuery } from '@rootTypes/compositionFunctions';
import { enumToLabel } from '@utils/instanceHelpers';
import { NOTIFICATION_ENABLE_FLAG, useBackendInfoStore } from '@stores/backendInfoStore';
import { useModalStore } from '@stores/baseStore';
import { useNotificationStore } from '@stores/notificationStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { followNotificationStream } from '@utils/notificationStream';

type NotificationRow = GetNotificationsQuery['getNotifications']['notifications'][number];

export default function NotificationContent() {
    const { activeModal } = useModalStore();
    const { openModal } = useModalHandlers();
    const [selectedNotification, setSelectedNotification] = useState<NotificationRow | null>(null);
    const { user } = useUserStore();
    const { backendInfo } = useBackendInfoStore();
    const { refreshNonce, setUnreadCount, notifyChanged } = useNotificationStore();
    const [getNotifications] = useGetNotificationsLazyQuery();
    const notificationsEnabled = backendInfo?.feature_flags?.[NOTIFICATION_ENABLE_FLAG] === true;

    useEffect(() => {
        if (!user || !notificationsEnabled) {
            setUnreadCount(0);
            return;
        }

        let cancelled = false;

        const loadUnread = async () => {
            const result = await getNotifications({
                variables: {
                    filters: {
                        isRead: false,
                        offset: 0,
                        limit: 1,
                    },
                },
            });

            if (!cancelled) {
                setUnreadCount(result.data?.getNotifications?.count ?? 0);
            }
        };

        loadUnread();

        return () => {
            cancelled = true;
        };
    }, [user, notificationsEnabled, refreshNonce, getNotifications, setUnreadCount]);

    useEffect(() => {
        if (!user || !notificationsEnabled) return;

        const token = localStorage.getItem('token');
        if (!token) return;

        const controller = new AbortController();
        void followNotificationStream(token, controller.signal, notifyChanged).catch(() => undefined);

        return () => {
            controller.abort();
        };
    }, [user, notificationsEnabled, notifyChanged]);

    if (!notificationsEnabled) return null;

    return (
        <>
            <BaseModal
                modalName="Notifications"
                open={activeModal === 'notificationsList'}
                wide
                onReload={notifyChanged}
            >
                <NotificationsListForm
                    onOpenText={(notification) => {
                        setSelectedNotification(notification);
                        openModal('notificationText');
                    }}
                />
            </BaseModal>
            <BaseModal
                modalName="Notification"
                subName={selectedNotification ? enumToLabel(selectedNotification.type) : undefined}
                open={activeModal === 'notificationText'}
                openModalType="notificationsList"
                extraWide
            >
                {selectedNotification?.bigText && (
                    <NotificationTextView text={selectedNotification.bigText} />
                )}
            </BaseModal>
        </>
    );
}
