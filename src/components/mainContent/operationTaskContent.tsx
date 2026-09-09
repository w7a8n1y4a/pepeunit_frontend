import { useEffect, useState } from 'react';
import BaseModal from '../modal/baseModal';
import OperationTasksListForm from '../forms/operationTask/operationTasksListForm';
import TaskResultEditor from '../forms/operationTask/taskResultEditor';
import {
    GetOperationTasksQuery,
    OperationTaskStatus,
    useGetOperationTasksLazyQuery,
} from '@rootTypes/compositionFunctions';
import { enumToLabel } from '@utils/instanceHelpers';

import { useModalStore } from '@stores/baseStore';
import { useOperationTaskStore } from '@stores/operationTaskStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';

type OperationTaskRow = GetOperationTasksQuery['getOperationTasks']['operationTasks'][number];

export default function OperationTaskContent() {
    const { activeModal } = useModalStore();
    const { openModal } = useModalHandlers();
    const { user } = useUserStore();
    const { refreshNonce, setRunningCount, notifyTaskStarted } = useOperationTaskStore();
    const [getOperationTasks] = useGetOperationTasksLazyQuery();
    const [selectedTask, setSelectedTask] = useState<OperationTaskRow | null>(null);

    useEffect(() => {
        if (!user) {
            setRunningCount(0);
            return;
        }

        let cancelled = false;

        const pollRunning = async () => {
            const result = await getOperationTasks({
                variables: {
                    filters: {
                        status: [OperationTaskStatus.Running],
                        offset: 0,
                        limit: 1,
                    },
                }
            });

            if (!cancelled) {
                setRunningCount(result.data?.getOperationTasks?.count ?? 0);
            }
        };

        pollRunning();
        const delayedId = window.setTimeout(pollRunning, 1500);
        const intervalId = window.setInterval(pollRunning, 7000);

        return () => {
            cancelled = true;
            window.clearTimeout(delayedId);
            window.clearInterval(intervalId);
        };
    }, [user, refreshNonce, getOperationTasks, setRunningCount]);

    return (
        <>
            <BaseModal
                modalName="Operation Tasks"
                open={activeModal === 'operationTasksList'}
                wide
                onReload={notifyTaskStarted}
            >
                <OperationTasksListForm
                    onOpenResult={(task) => {
                        setSelectedTask(task);
                        openModal('operationTaskResult');
                    }}
                />
            </BaseModal>
            <BaseModal
                modalName="Task Result"
                subName={selectedTask ? enumToLabel(selectedTask.taskType) : undefined}
                open={activeModal === 'operationTaskResult'}
                openModalType="operationTasksList"
                extraWide
            >
                {selectedTask && (
                    <TaskResultEditor
                        taskUuid={selectedTask.uuid}
                        fallbackResult={selectedTask.result}
                    />
                )}
            </BaseModal>
        </>
    );
}
