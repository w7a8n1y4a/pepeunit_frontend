import { ResultType } from '../../types/resultEnum'
import { useDeleteUnitMutation} from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import { RepoType, UnitType } from '../../types/composition-functions'
import { useState, useCallback } from 'react';
import Spinner from '../forms/primitives/Spinner'
import ResultQuery from '../forms/primitives/ResultQuery'
import UpdateUnitForm from '../forms/unit/UpdateUnitForm';

interface UnitContentProps {
  activeModal: string | null
  setActiveModal: (show: string | null) => void;
  currentRepoData: RepoType | null;
  setCurrentRepoData: (repo: RepoType | null) => void;
  currentUnitData: UnitType | null;
  setCurrentUnitData: (repo: UnitType | null) => void;
}

export default function UnitContent({
    activeModal,
    setActiveModal,
    currentRepoData,
    setCurrentRepoData,
    currentUnitData,
    setCurrentUnitData
}: UnitContentProps){
    
  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });

  const [deleteUnit] = useDeleteUnitMutation()

  const handleDeleteUnit = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentUnitData){
      deleteUnit(
        {
          variables: {
            uuid: currentUnitData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setActiveModal(null)
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const openModal = useCallback((modalType: string) => {
    setActiveModal(modalType);
  }, []);

  const closeModal = useCallback(() => {
      setActiveModal(null);
  }, []);

  return (
    <>
      <BaseModal
        modalName={'Unit ' + currentUnitData?.name}
        open={activeModal === 'unitMenu'}
        closeModal={closeModal}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter">
            Скачать tar
          </button>
          <button className="button_open_alter">
            Скачать tgz
          </button>
          <button className="button_open_alter">
            Скачать zip
          </button>
          <button className="button_open_alter" onClick={() => openModal('unitSettingsMenu')}>
            Настройки
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>

      <BaseModal
        modalName='Настройки'
        open={activeModal === 'unitSettingsMenu'}
        closeModal={closeModal}
        openModal={openModal} 
        openModalType='unitMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('unitSetEnv')}>
            Установить окружение
          </button>
          <button className="button_open_alter" onClick={() => openModal('updateUnit')}>
            Параметры
          </button>
          <button className="button_open_alter" onClick={handleDeleteUnit}>
            Удалить
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Параметры Unit'
        open={activeModal === 'updateUnit'}
        closeModal={closeModal}
        openModal={openModal} 
        openModalType='unitSettingsMenu'
      >
        {
          currentUnitData && (
            <UpdateUnitForm
              currentRepoData={currentRepoData}
              setCurrentRepoData={setCurrentRepoData}
              currentUnitData={currentUnitData}
              setCurrentUnitData={setCurrentUnitData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
