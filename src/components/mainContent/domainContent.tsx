import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useBulkUpdateMutation, useGetBaseMetricsLazyQuery, BaseMetricsType, UserRole } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function DomainContent(){
  const { setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  const [baseMetrics, setBaseMetrics] = useState<BaseMetricsType | null>(null)

  const [bulkUpdate] = useBulkUpdateMutation()
  const [getBaseMetrics] = useGetBaseMetricsLazyQuery()

  useEffect(() => {
    runAsync(async () => {
      let result = await getBaseMetrics()
      if (result.data?.getBaseMetrics){
        setBaseMetrics(result.data.getBaseMetrics)
      }
    })
  }, []);

  const handleBulkUpdate = () => {
    runAsync(async () => {
      let result = await bulkUpdate()
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
            isLoaderActive && (<Spinner/>)
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
              User - {baseMetrics?.userCount}
            </div>
            <div className='div_statistics_text'>
              RegistryCount - {baseMetrics?.repositoryRegistryCount}
            </div>
            <div className='div_statistics_text'>
              Repo - {baseMetrics?.repoCount}
            </div>
            <div className='div_statistics_text'>
              Unit - {baseMetrics?.unitCount}
            </div>
            <div className='div_statistics_text'>
              UnitNode - {baseMetrics?.unitNodeCount}
            </div>
            <div className='div_statistics_text'>
              UnitNodeEdge - {baseMetrics?.unitNodeEdgeCount}
            </div>
          </div>
      </BaseModal>
    </>
  )
}
