import { ResultType } from '@rootTypes/resultEnum'
import { useBulkUpdateMutation, useGetBaseMetricsLazyQuery, BaseMetricsType, UnitType } from '@rootTypes/composition-functions'
import BaseModal from '../modal/BaseModal'
import { useState, useEffect } from 'react';
import Spinner from '../forms/primitives/Spinner'
import ResultQuery from '../forms/primitives/ResultQuery'

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

interface DomainContentProps {
  currentDomainData: UnitType | null
}

export default function DomainContent({currentDomainData}: DomainContentProps){
  const { activeModal } = useModalStore();
  const { openModal } = useModalHandlers();

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
        modalName={'' + currentDomainData?.name}
        open={activeModal === 'domainMenu'}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('statistics')}>
            Статистики
          </button>
          <button className="button_open_alter" onClick={handleBulkUpdate}>
            Обновить все Repo и связанные Unit
          </button>
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
