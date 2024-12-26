import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
import { useBulkUpdateMutation, useGetBaseMetricsLazyQuery, BaseMetricsType, UserRole } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function DomainContent(){
  const { resultData, handleError, handleSuccess } = useResultHandler();
  const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

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
        handleSuccess("Unit and Repo update query send")
      }
    })
  };

  return (
    <>
      <BaseModal
        modalName={'' + currentNodeData?.name}
        open={activeModal === 'domainMenu'}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('statistics')}>
            Статистики
          </button>

          {
            user?.role === UserRole.Admin ? (
              <button className="button_open_alter" onClick={handleBulkUpdate}>
                Обновить все Repo и связанные Unit
              </button>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName='Метрики' open={activeModal === 'statistics'} openModalType='domainMenu'>
          <div>
            <div>
              Число User: {baseMetrics?.userCount}
            </div>
            <div>
              Число Repo: {baseMetrics?.repoCount}
            </div>
            <div>
              Число Unit: {baseMetrics?.unitCount}
            </div>
            <div>
              Число UnitNode: {baseMetrics?.unitNodeCount}
            </div>
            <div>
              Число UnitNodeEdge: {baseMetrics?.unitNodeEdgeCount}
            </div>
          </div>
      </BaseModal>
    </>
  )
}
