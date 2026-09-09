import { useEffect, useRef, useState } from 'react';
import attention_img from '/images/attention.svg';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import PaginationControls from '@primitives/pagination';
import Spinner from '@primitives/spinner';
import {
    GetInstancesQuery,
    InstanceCollectionStatus,
    InstanceFilterInput,
    InstanceTrustStatus,
    UserRole,
    useDeleteInstanceMutation,
    useGetInstancesLazyQuery,
    useScanInstanceMutation,
    useScanInstancesMutation,
    useUpdateInstanceMutation,
} from '@rootTypes/compositionFunctions';
import {
    enumToLabel,
    formatCount,
    formatPing,
    instanceDomain,
    instanceOrigin,
    parseInstanceState,
} from '@utils/instanceHelpers';
import '../form.css';

import useModalHandlers from '@handlers/useModalHandlers';
import { useModalStore } from '@stores/baseStore';
import { FEDERATION_ENABLE_FLAG, isFeatureEnabled, useBackendInfoStore } from '@stores/backendInfoStore';
import { useErrorStore } from '@stores/errorStore';
import { useOperationTaskStore } from '@stores/operationTaskStore';
import { useUserStore } from '@stores/userStore';

type InstanceRow = GetInstancesQuery['getInstances']['instances'][number];

const ALL_TRUST_STATUSES = [
    InstanceTrustStatus.Trust,
    InstanceTrustStatus.Pending,
    InstanceTrustStatus.Blocking,
];

function trustClass(status: InstanceTrustStatus): string {
    if (status === InstanceTrustStatus.Trust) return 'cmp_status_trust';
    if (status === InstanceTrustStatus.Pending) return 'cmp_status_pending';
    return 'cmp_status_blocking';
}

function collectionClass(status?: InstanceCollectionStatus | null): string {
    if (status === InstanceCollectionStatus.Success) return 'cmp_status_success';
    if (status === InstanceCollectionStatus.Error) return 'cmp_status_error';
    if (status === InstanceCollectionStatus.Timeout) return 'cmp_status_timeout';
    if (status === InstanceCollectionStatus.Blocking) return 'cmp_status_blocking';
    return '';
}

interface InstancesListFormProps {
    refreshNonce?: number
    onOpenDetails: (instance: InstanceRow) => void
}

export default function InstancesListForm({ refreshNonce = 0, onOpenDetails }: InstancesListFormProps) {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { activeModal } = useModalStore();
    const { openModal } = useModalHandlers();
    const { user } = useUserStore();
    const { backendInfo } = useBackendInfoStore();
    const { notifyTaskStarted } = useOperationTaskStore();

    const isAdmin = user?.role === UserRole.Admin;
    const isFederationEnabled = isFeatureEnabled(backendInfo, FEDERATION_ENABLE_FLAG);

    const [selectedTrust, setSelectedTrust] = useState<InstanceTrustStatus[]>(ALL_TRUST_STATUSES);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 8;

    const [instances, setInstances] = useState<InstanceRow[]>([]);

    const [getInstances] = useGetInstancesLazyQuery({
        fetchPolicy: 'no-cache',
    });
    const [updateInstance] = useUpdateInstanceMutation();
    const [deleteInstance] = useDeleteInstanceMutation();
    const [scanInstance] = useScanInstanceMutation();
    const [scanInstances] = useScanInstancesMutation();

    const loadSeq = useRef(0);
    const selectedTrustRef = useRef(selectedTrust);
    selectedTrustRef.current = selectedTrust;

    const fetchInstances = async (
        page: number,
        statuses: InstanceTrustStatus[] = selectedTrustRef.current,
    ) => {
        const requestId = ++loadSeq.current;
        const filters: InstanceFilterInput = {
            offset: page * itemsPerPage,
            limit: itemsPerPage,
        };
        if (statuses.length > 0 && statuses.length < ALL_TRUST_STATUSES.length) {
            filters.trustStatus = statuses;
        }

        const result = await getInstances({
            fetchPolicy: 'no-cache',
            variables: { filters },
        });
        if (requestId !== loadSeq.current) return;
        if (result.data?.getInstances) {
            setInstances(result.data.getInstances.instances);
            setTotalCount(result.data.getInstances.totalCount);
        }
    };

    const loadEntities = (page: number, statuses?: InstanceTrustStatus[]) => {
        runAsync(() => fetchInstances(page, statuses));
    };

    useEffect(() => {
        if (activeModal !== 'instancesList') return;
        loadEntities(currentPage, selectedTrust);
        // Intentionally reload on modal/filter/page/reload changes only.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeModal, selectedTrust, currentPage, refreshNonce]);

    const toggleTrust = (status: InstanceTrustStatus) => {
        setSelectedTrust((prev) => {
            const next = prev.includes(status)
                ? prev.filter((item) => item !== status)
                : [...prev, status];
            return next.length === 0 ? prev : next;
        });
        setCurrentPage(0);
    };

    const handleUpdateTrust = (uuid: string, trustStatus: InstanceTrustStatus) => {
        runAsync(async () => {
            const result = await updateInstance({
                variables: { uuid, trustStatus }
            });
            const updated = result.data?.updateInstance;
            if (!updated) return;
            setHappy(`Instance ${enumToLabel(trustStatus).toLowerCase()}`);
            setInstances((prev) => prev.map((item) => (
                item.uuid === updated.uuid ? updated : item
            )));
            await fetchInstances(currentPage, selectedTrustRef.current);
        });
    };

    const handleDelete = (uuid: string) => {
        runAsync(async () => {
            const result = await deleteInstance({
                variables: { uuid }
            });
            if (result.data) {
                setHappy('Instance deleted');
                await fetchInstances(currentPage, selectedTrustRef.current);
            }
        });
    };

    const handleScanOne = (uuid: string) => {
        runAsync(async () => {
            const result = await scanInstance({
                variables: { uuid }
            });
            if (result.data) {
                notifyTaskStarted();
                setHappy('Started instance scan');
            }
        });
    };

    const handleScanAll = () => {
        runAsync(async () => {
            const result = await scanInstances();
            if (result.data) {
                notifyTaskStarted();
                setHappy('Started scan all instances');
            }
        });
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}
            <div className="entity-type-selector">
                {ALL_TRUST_STATUSES.map((status) => (
                    <button
                        key={status}
                        className={`entity-button ${selectedTrust.includes(status) ? 'active' : ''}`}
                        onClick={() => toggleTrust(status)}
                    >
                        {enumToLabel(status)}
                    </button>
                ))}
            </div>
            {isAdmin && (
                <div className="cmp_toolbar">
                    <button className="button_add_alter" onClick={() => openModal('createInstance')}>
                        Add Instance
                    </button>
                    {isFederationEnabled && (
                        <button className="button_open_alter_send" onClick={handleScanAll}>
                            Scan All
                        </button>
                    )}
                </div>
            )}
            <div className="cmp_table_wrap">
                    <table className="cmp_table">
                        <thead>
                            <tr>
                                <th>Domain</th>
                                <th>Trust</th>
                                <th>Collection</th>
                                <th>Ping</th>
                                <th>Version</th>
                                <th>Units</th>
                                <th>Users</th>
                                <th>Tests</th>
                                <th></th>
                                {isAdmin && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {instances.length === 0 ? (
                                <tr>
                                    <td colSpan={isAdmin ? 10 : 9} className="iteration-empty">
                                        No instances found
                                    </td>
                                </tr>
                            ) : instances.map((instance) => {
                                const state = parseInstanceState(instance.state);
                                const tests = state?.integrationTestsStatus
                                    ? `${enumToLabel(state.integrationTestsStatus)}${
                                        state.integrationTestsSuccessPercentage != null
                                            ? ` ${Math.round(state.integrationTestsSuccessPercentage)}%`
                                            : ''
                                    }`
                                    : '—';

                                return (
                                    <tr key={instance.uuid}>
                                        <td>
                                            <a
                                                href={instanceOrigin(instance.url)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="cmp_domain_link"
                                            >
                                                {instanceDomain(instance.url)}
                                            </a>
                                        </td>
                                        <td className={trustClass(instance.trustStatus)}>
                                            {enumToLabel(instance.trustStatus)}
                                        </td>
                                        <td className={collectionClass(instance.lastCollectionStatus)}>
                                            {enumToLabel(instance.lastCollectionStatus)}
                                        </td>
                                        <td>{formatPing(instance.lastPing)}</td>
                                        <td>{state?.version ?? '—'}</td>
                                        <td>{formatCount(state?.unitCount)}</td>
                                        <td>{formatCount(state?.userCount)}</td>
                                        <td>{tests}</td>
                                        <td>
                                            <button
                                                className="instance_info_button"
                                                onClick={() => onOpenDetails(instance)}
                                            >
                                                <img src={attention_img} width="20" height="20" alt="Info" />
                                            </button>
                                        </td>
                                        {isAdmin && (
                                            <td>
                                                <div className="iteration-actions">
                                                    {instance.trustStatus === InstanceTrustStatus.Pending && (
                                                        <button
                                                            className="iteration-node-add-button"
                                                            onClick={() => handleUpdateTrust(instance.uuid, InstanceTrustStatus.Trust)}
                                                        >
                                                            Trust
                                                        </button>
                                                    )}
                                                    {instance.trustStatus !== InstanceTrustStatus.Blocking && (
                                                        <button
                                                            className="iteration-node-del-button"
                                                            onClick={() => handleUpdateTrust(instance.uuid, InstanceTrustStatus.Blocking)}
                                                        >
                                                            Block
                                                        </button>
                                                    )}
                                                    {instance.trustStatus === InstanceTrustStatus.Blocking && (
                                                        <button
                                                            className="iteration-node-add-button"
                                                            onClick={() => handleUpdateTrust(instance.uuid, InstanceTrustStatus.Trust)}
                                                        >
                                                            Trust
                                                        </button>
                                                    )}
                                                    {isFederationEnabled && instance.trustStatus === InstanceTrustStatus.Trust && (
                                                        <button
                                                            className="iteration-node-add-button"
                                                            onClick={() => handleScanOne(instance.uuid)}
                                                        >
                                                            Scan
                                                        </button>
                                                    )}
                                                    <button
                                                        className="iteration-node-del-button"
                                                        onClick={() => handleDelete(instance.uuid)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        )}
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
