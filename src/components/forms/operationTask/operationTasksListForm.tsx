import { useEffect, useState } from 'react';
import attention_img from '/images/attention.svg';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import PaginationControls from '@primitives/pagination';
import Spinner from '@primitives/spinner';
import {
    GetOperationTasksQuery,
    OperationTaskFilterInput,
    OperationTaskStatus,
    OperationTaskType,
    useGetOperationTasksLazyQuery,
} from '@rootTypes/compositionFunctions';
import formatDateTime, { parseUtcDate } from '@utils/formatDateTime';
import { enumToLabel } from '@utils/instanceHelpers';
import '../form.css';

import { useModalStore } from '@stores/baseStore';
import { useOperationTaskStore } from '@stores/operationTaskStore';

const ALL_STATUSES = [
    OperationTaskStatus.Running,
    OperationTaskStatus.Success,
    OperationTaskStatus.Error,
];

const POLL_INTERVAL_MS = 7000;

type OperationTaskRow = GetOperationTasksQuery['getOperationTasks']['operationTasks'][number];

interface OperationTasksListFormProps {
    onOpenResult: (task: OperationTaskRow) => void
}

function statusClass(status: OperationTaskStatus): string {
    if (status === OperationTaskStatus.Running) return 'cmp_status_running';
    if (status === OperationTaskStatus.Success) return 'cmp_status_success';
    return 'cmp_status_error';
}

function formatDuration(start?: string | null, finish?: string | null): string {
    if (!start) return '—';
    const startDate = parseUtcDate(start);
    const endDate = finish ? parseUtcDate(finish) : new Date();
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return '—';

    const seconds = Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 1000));
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    if (minutes < 60) return `${minutes}m ${rest}s`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
}

function isIntegrationTests(task: OperationTaskRow): boolean {
    return task.taskType === OperationTaskType.IntegrationTests;
}

export default function OperationTasksListForm({ onOpenResult }: OperationTasksListFormProps) {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { activeModal } = useModalStore();
    const { refreshNonce } = useOperationTaskStore();

    const [selectedStatuses, setSelectedStatuses] = useState<OperationTaskStatus[]>(ALL_STATUSES);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [tasks, setTasks] = useState<OperationTaskRow[]>([]);
    const [secondsLeft, setSecondsLeft] = useState(Math.ceil(POLL_INTERVAL_MS / 1000));
    const itemsPerPage = 6;

    const [getOperationTasks] = useGetOperationTasksLazyQuery();

    const loadEntities = (page: number, silent = false) => {
        const fetchTasks = async () => {
            const filters: OperationTaskFilterInput = {
                limit: itemsPerPage,
                offset: page * itemsPerPage,
            };
            if (selectedStatuses.length > 0 && selectedStatuses.length < ALL_STATUSES.length) {
                filters.status = selectedStatuses;
            }

            const result = await getOperationTasks({
                variables: { filters },
            });

            if (result.data?.getOperationTasks) {
                setTasks(result.data.getOperationTasks.operationTasks);
                setTotalCount(result.data.getOperationTasks.count);
            }
        };

        if (silent) {
            fetchTasks();
            return;
        }

        runAsync(fetchTasks);
    };

    useEffect(() => {
        setCurrentPage(0);
    }, [selectedStatuses]);

    useEffect(() => {
        if (activeModal !== 'operationTasksList') return;

        loadEntities(currentPage);
        const startedAt = Date.now();
        setSecondsLeft(Math.ceil(POLL_INTERVAL_MS / 1000));

        const tickId = window.setInterval(() => {
            const elapsed = Date.now() - startedAt;
            const cycle = elapsed % POLL_INTERVAL_MS;
            setSecondsLeft(Math.max(1, Math.ceil((POLL_INTERVAL_MS - cycle) / 1000)));
        }, 250);

        const pollId = window.setInterval(() => {
            loadEntities(currentPage, true);
        }, POLL_INTERVAL_MS);

        return () => {
            window.clearInterval(tickId);
            window.clearInterval(pollId);
        };
        // Intentionally reload on modal/filter/page/task-start/reload only.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeModal, currentPage, selectedStatuses, refreshNonce]);

    const toggleStatus = (status: OperationTaskStatus) => {
        setSelectedStatuses((prev) => (
            prev.includes(status)
                ? prev.filter((item) => item !== status)
                : [...prev, status]
        ));
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}
            <div className="entity-type-selector">
                {ALL_STATUSES.map((status) => (
                    <button
                        key={status}
                        className={`entity-button ${selectedStatuses.includes(status) ? 'active' : ''}`}
                        onClick={() => toggleStatus(status)}
                    >
                        {enumToLabel(status)}
                    </button>
                ))}
            </div>
            <div className="cmp_table_wrap">
                <table className="cmp_table">
                        <thead>
                            <tr>
                                <th className="cmp_col_task">Task</th>
                                <th>Status</th>
                                <th className="cmp_col_time">Started</th>
                                <th className="cmp_col_time">Duration</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="iteration-empty">
                                    No tasks found
                                </td>
                            </tr>
                        ) : tasks.map((task) => (
                            <tr key={task.uuid}>
                                <td className="cmp_col_task">{enumToLabel(task.taskType)}</td>
                                <td className={statusClass(task.status)}>
                                    {enumToLabel(task.status)}
                                </td>
                                <td className="cmp_col_time">
                                    {formatDateTime(task.startDatetime || task.createDatetime, false, true)}
                                </td>
                                <td className="cmp_col_time">
                                    {formatDuration(task.startDatetime || task.createDatetime, task.finishDatetime)}
                                </td>
                                <td>
                                    {isIntegrationTests(task) && task.result ? (
                                        <button
                                            className="instance_info_button"
                                            onClick={() => onOpenResult(task)}
                                        >
                                            <img src={attention_img} width="20" height="20" alt="Result" />
                                        </button>
                                    ) : task.result ? (
                                        <span className="cmp_result_text">{task.result}</span>
                                    ) : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage((prev) => prev + 1)}
                goToPreviousPage={() => setCurrentPage((prev) => prev - 1)}
            />
            <div className="cmp_poll_countdown">next update in {secondsLeft}s</div>
        </>
    );
}
