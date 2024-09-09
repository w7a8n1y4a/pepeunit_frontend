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

  const fileUpload = (type: string) => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    let url = import.meta.env.VITE_BACKEND_URI.replace('graphql', '') + 'api/v1/units/firmware/' + type + '/' + currentUnitData?.uuid
    let token = localStorage.getItem('token')

    if (token){
      fetch(url, 
        {
          method: 'GET',
          headers: new Headers(
            {
              'accept': 'application/json',
              'x-auth-token': token,
            }
          ),
          mode: 'cors'
        }
      ).then(resp => resp.ok ? resp.blob() : Promise.reject(resp)).then(blob => {
        setIsLoaderActive(false)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          currentUnitData?.name + '.' + type,
        );
        document.body.appendChild(link);
        link.click();
      }).catch((error) => {
        error.json().then( function (data: any) {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: data.detail})
          }
        )
      });
    }
  }

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
          <button className="button_open_alter" onClick={() => fileUpload("tar")}>
            Скачать tar
          </button>
          <button className="button_open_alter" onClick={() => fileUpload("tgz")}>
            Скачать tgz
          </button>
          <button className="button_open_alter" onClick={() => fileUpload("zip")}>
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
