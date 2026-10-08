import { useEffect, useState } from 'react';
import attention_img from '/images/attention.svg';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import PaginationControls from '@primitives/pagination';
import Spinner from '@primitives/spinner';
import {
    GetNotificationsQuery,
    NotificationFilterInput,
    NotificationType,
    useGetNotificationsLazyQuery,
    useMarkAllNotificationsReadMutation,
    useMarkNotificationReadMutation,
} from '@rootTypes/compositionFunctions';
import formatDateTime from '@utils/formatDateTime';
import { enumToLabel } from '@utils/instanceHelpers';
import '../form.css';

import { useModalStore } from '@stores/baseStore';
import { useNotificationStore } from '@stores/notificationStore';
import { useErrorStore } from '@stores/errorStore';

const ALL_TYPES = [
    NotificationType.InstanceDailyState,
    NotificationType.UnitDailySummary,
    NotificationType.DataPipeAlert,
];

const READ_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' },
] as const;

type ReadFilter = (typeof READ_FILTERS)[number]['id'];
type NotificationRow = GetNotificationsQuery['getNotifications']['notifications'][number];

const PREVIEW_LIMIT = 96;

function notificationPreview(text: string): { preview: string; isLarge: boolean } {
    const singleLine = text.replace(/\s+/g, ' ').trim();
    const isLarge = text.includes('\n') || singleLine.length > PREVIEW_LIMIT;
    const preview = singleLine.length > PREVIEW_LIMIT
        ? `${singleLine.slice(0, PREVIEW_LIMIT)}…`
        : singleLine;
    return { preview, isLarge };
}

interface NotificationsListFormProps {
    onOpenText: (notification: NotificationRow) => void
}

export default function NotificationsListForm({ onOpenText }: NotificationsListFormProps) {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setError } = useErrorStore();
    const { activeModal } = useModalStore();
    const { unreadCount, refreshNonce, notifyChanged } = useNotificationStore();

    const [readFilter, setReadFilter] = useState<ReadFilter>('all');
    const [selectedTypes, setSelectedTypes] = useState<NotificationType[]>(ALL_TYPES);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [notifications, setNotifications] = useState<NotificationRow[]>([]);
    const itemsPerPage = 6;

    const [getNotifications] = useGetNotificationsLazyQuery();
    const [markNotificationRead] = useMarkNotificationReadMutation();
    const [markAllNotificationsRead] = useMarkAllNotificationsReadMutation();

    const loadEntities = (page: number) => {
        runAsync(async () => {
            const filters: NotificationFilterInput = {
                limit: itemsPerPage,
                offset: page * itemsPerPage,
            };
            if (readFilter === 'unread') filters.isRead = false;
            if (readFilter === 'read') filters.isRead = true;
            if (selectedTypes.length > 0 && selectedTypes.length < ALL_TYPES.length) {
                filters.type = selectedTypes;
            }

            const result = await getNotifications({
                variables: { filters },
            });

            if (result.error) {
                setError(result.error);
                return;
            }

            if (result.data?.getNotifications) {
                setNotifications(result.data.getNotifications.notifications);
                setTotalCount(result.data.getNotifications.count);
            }
        });
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [readFilter, selectedTypes]);

    useEffect(() => {
        const pages = Math.ceil(totalCount / itemsPerPage);
        if (pages > 0 && currentPage > pages - 1) {
            setCurrentPage(pages - 1);
        }
    }, [totalCount, currentPage, itemsPerPage]);

    useEffect(() => {
        if (activeModal !== 'notificationsList') return;
        loadEntities(currentPage);
        // Reload when the modal, page, filters, or a live update changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeModal, currentPage, readFilter, selectedTypes, refreshNonce]);

    const toggleType = (type: NotificationType) => {
        setSelectedTypes((prev) => (
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type]
        ));
    };

    const markRead = async (uuid: string) => {
        try {
            const result = await markNotificationRead({ variables: { uuid } });
            if (result.data?.markNotificationRead) {
                notifyChanged();
            }
        } catch (error) {
            setError(error);
        }
    };

    const markAllRead = async () => {
        try {
            const result = await markAllNotificationsRead();
            if (result.data) {
                notifyChanged();
            }
        } catch (error) {
            setError(error);
        }
    };

    const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

    return (
        <>
            {isLoaderActive && <Spinner />}
            <div className="ntf_toolbar">
                <button
                    className="ntf_action_button"
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                >
                    Mark all read
                </button>
            </div>
            <div className="ntf_filters">
                {READ_FILTERS.map((filter) => (
                    <button
                        key={filter.id}
                        className={`entity-button ${readFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setReadFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            <div className="ntf_filters">
                {ALL_TYPES.map((type) => (
                    <button
                        key={type}
                        className={`entity-button ${selectedTypes.includes(type) ? 'active' : ''}`}
                        onClick={() => toggleType(type)}
                    >
                        {enumToLabel(type)}
                    </button>
                ))}
            </div>
            <div className="cmp_table_wrap">
                <table className="cmp_table">
                    <thead>
                        <tr>
                            <th className="cmp_col_task">Type</th>
                            <th>Text</th>
                            <th className="cmp_col_time">Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="iteration-empty">
                                    No notifications found
                                </td>
                            </tr>
                        ) : notifications.map((notification) => {
                            const { preview, isLarge } = notificationPreview(notification.text);
                            return (
                            <tr key={notification.uuid} className={notification.isRead ? 'ntf_read' : 'ntf_unread'}>
                                <td className="cmp_col_task">{enumToLabel(notification.type)}</td>
                                <td className="ntf_text_cell">
                                    <div className="ntf_text_row">
                                        <span className="ntf_preview">{preview}</span>
                                        {isLarge && (
                                            <button
                                                className="instance_info_button"
                                                onClick={() => onOpenText(notification)}
                                            >
                                                <img src={attention_img} width="20" height="20" alt="Open text" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="cmp_col_time">
                                    {formatDateTime(notification.createDatetime, false, true)}
                                </td>
                                <td>
                                    {notification.isRead ? (
                                        <span className="cmp_status_success">Read</span>
                                    ) : (
                                        <button
                                            className="ntf_action_button"
                                            onClick={() => markRead(notification.uuid)}
                                        >
                                            Mark read
                                        </button>
                                    )}
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage((prev) => prev + 1)}
                goToPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            />
        </>
    );
}
