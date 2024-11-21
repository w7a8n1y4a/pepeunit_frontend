import { ResultType } from '@rootTypes/resultEnum'
import { useBulkUpdateMutation, useGetBaseMetricsLazyQuery, BaseMetricsType, UserRole } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function DomainContent(){
  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  const [baseMetrics, setBaseMetrics] = useState<BaseMetricsType | null>(null)
  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });
  const [bulkUpdate] = useBulkUpdateMutation()
  const [getBaseMetrics] = useGetBaseMetricsLazyQuery()

  useEffect(() => {
    getBaseMetrics().then(metrics => {
      if (metrics.data?.getBaseMetrics){
        setBaseMetrics(metrics.data.getBaseMetrics)
      }
    })
  }, []);

  const handleBulkUpdate = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    bulkUpdate().then(result => {
      if (result.data){
        console.log(result.data)
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Happy, message: "Запрос обновления Repo и Unit отправлен"})
      }
    }).catch(error => {
      setIsLoaderActive(false)
      setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
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
