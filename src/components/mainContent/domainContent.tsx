import { useAsyncHandler } from '@handlers/useAsyncHandler';
import {
  FetchResult,
} from '@apollo/client'
import {
  useBulkUpdateMutation,
  useRunIntegrationTestsMutation,
  useScanInstancesMutation,
  useUpdateAllRegistriesMutation,
  UserRole,
} from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import Spinner from '@primitives/spinner'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import { FEDERATION_ENABLE_FLAG, isFeatureEnabled, useBackendInfoStore } from '@stores/backendInfoStore';
import { useOperationTaskStore } from '@stores/operationTaskStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function DomainContent(){
  const { setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();
  const { backendInfo, loading: backendInfoLoading } = useBackendInfoStore();
  const { notifyTaskStarted } = useOperationTaskStore();
  const metrics = backendInfo?.metrics;
  const isFederationEnabled = isFeatureEnabled(backendInfo, FEDERATION_ENABLE_FLAG);

  const [bulkUpdate] = useBulkUpdateMutation()
  const [runIntegrationTests] = useRunIntegrationTestsMutation()
  const [scanInstances] = useScanInstancesMutation()
  const [updateAllRegistries] = useUpdateAllRegistriesMutation()

  const startTask = (mutation: () => Promise<FetchResult>, message: string) => {
    runAsync(async () => {
      const result = await mutation()
      if (result.data){
        notifyTaskStarted()
        setHappy(message)
      }
    })
  };

  return (
    <>
      <BaseModal
        modalName={'Instance'}
        subName={currentNodeData?.name}
        copyLink={window.location.origin + '/domain/' + (import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME)}
        open={activeModal === 'DomainMenu'}
      >
        <div className="modal_menu_content">
          {
            (isLoaderActive || backendInfoLoading) && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('statistics')}>
            Statistics
          </button>
          
          {
            user?.role === UserRole.Admin && (
              <>
                <button
                  className="button_open_alter_send"
                  onClick={() => startTask(runIntegrationTests, 'Started Integration Tests, it takes 3 minutes or more')}
                >
                  Integration Tests
                </button>
                {isFederationEnabled && (
                  <button
                    className="button_open_alter_send"
                    onClick={() => startTask(scanInstances, 'Started Scan All Instances')}
                  >
                    Scan All Instances
                  </button>
                )}
                <button
                  className="button_open_alter_send"
                  onClick={() => startTask(updateAllRegistries, 'Started Update All Registries')}
                >
                  Update All Registries
                </button>
                <button
                  className="button_open_alter_send"
                  onClick={() => startTask(bulkUpdate, 'Started Update All Units Firmware')}
                >
                  Update All Units Firmware
                </button>
              </>
            )
          }
        </div>
      </BaseModal>
      <BaseModal modalName='Statistics' subName={currentNodeData?.name} open={activeModal === 'statistics'} openModalType='DomainMenu'>
          <div className='div_statistics'>
            <div className='div_statistics_text'>
              User - {metrics?.user_count}
            </div>
            <div className='div_statistics_text'>
              RegistryCount - {metrics?.repository_registry_count}
            </div>
            <div className='div_statistics_text'>
              Repo - {metrics?.repo_count}
            </div>
            <div className='div_statistics_text'>
              Unit - {metrics?.unit_count}
            </div>
            <div className='div_statistics_text'>
              UnitNode - {metrics?.unit_node_count}
            </div>
            <div className='div_statistics_text'>
              UnitNodeEdge - {metrics?.unit_node_edge_count}
            </div>
          </div>
      </BaseModal>
    </>
  )
}
