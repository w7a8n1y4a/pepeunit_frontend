import { useState } from 'react';
import BaseModal from '../modal/baseModal';
import CreateInstanceForm from '../forms/instance/createInstanceForm';
import InstanceDetailsForm from '../forms/instance/instanceDetailsForm';
import InstancesListForm from '../forms/instance/instancesListForm';
import { GetInstancesQuery } from '@rootTypes/compositionFunctions';
import { instanceDomain } from '@utils/instanceHelpers';

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

type InstanceRow = GetInstancesQuery['getInstances']['instances'][number];

export default function InstanceContent() {
    const { activeModal } = useModalStore();
    const { openModal } = useModalHandlers();
    const [refreshNonce, setRefreshNonce] = useState(0);
    const [selectedInstance, setSelectedInstance] = useState<InstanceRow | null>(null);

    return (
        <>
            <BaseModal
                modalName="Instances"
                open={activeModal === 'instancesList'}
                wide
                onReload={() => setRefreshNonce((prev) => prev + 1)}
            >
                <InstancesListForm
                    refreshNonce={refreshNonce}
                    onOpenDetails={(instance) => {
                        setSelectedInstance(instance);
                        openModal('instanceDetails');
                    }}
                />
            </BaseModal>
            <BaseModal
                modalName="Instance"
                subName={selectedInstance ? instanceDomain(selectedInstance.url) : undefined}
                open={activeModal === 'instanceDetails'}
                openModalType="instancesList"
                wide
            >
                <InstanceDetailsForm instance={selectedInstance} />
            </BaseModal>
            <BaseModal
                modalName="Add Instance"
                open={activeModal === 'createInstance'}
                openModalType="instancesList"
            >
                <CreateInstanceForm />
            </BaseModal>
        </>
    );
}
