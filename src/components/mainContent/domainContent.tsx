import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useBulkUpdateMutation, UserRole } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import Spinner from '@primitives/spinner'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import { useBackendInfoStore } from '@stores/backendInfoStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function DomainContent(){
  const { setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();
  const { backendInfo, loading: backendInfoLoading } = useBackendInfoStore();
  const metrics = backendInfo?.metrics;

  const [bulkUpdate] = useBulkUpdateMutation()

  const handleBulkUpdate = () => {
    runAsync(async () => {
      const result = await bulkUpdate()
      if (result.data){
        setHappy("Unit and Repo update query send")
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
                <button className="button_open_alter_send" onClick={handleBulkUpdate}>
                  Update all Repo and Unit
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
