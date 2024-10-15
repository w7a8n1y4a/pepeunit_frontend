import { ResultType } from '@rootTypes/resultEnum'
import { useUpdateLocalRepoMutation, useUpdateUnitsFirmwareMutation, useDeleteRepoMutation, RepoType, UnitType} from '@rootTypes/composition-functions'
import BaseModal from '../modal/BaseModal'
import CreateUnitForm from '../forms/unit/CreateUnitForm';
import UpdateRepoForm from '../forms/repo/UpdateRepoForm';
import UpdateRepoCredentialsForm from '../forms/repo/UpdateRepoCredentialsForm'
import { useState } from 'react';
import Spinner from '../forms/primitives/Spinner'
import ResultQuery from '../forms/primitives/ResultQuery'

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';

interface RepoContentProps {
  currentRepoData: RepoType | null
  setCurrentRepoData: (repo: RepoType | null) => void;
  currentUnitData: UnitType | null
  setCurrentUnitData: (repo: UnitType | null) => void;
}

export default function RepoContent({
    currentRepoData,
    setCurrentRepoData,
    currentUnitData,
    setCurrentUnitData
}: RepoContentProps){
  const { activeModal, setActiveModal } = useModalStore();
  const { openModal } = useModalHandlers();

  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });

  const [updateLocalRepo] = useUpdateLocalRepoMutation();
  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [deleteRepo] = useDeleteRepoMutation()

  const handleUpdateLocalRepo = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      updateLocalRepo(
        {
          variables: {
            uuid: currentRepoData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setResultData({ type: ResultType.Happy, message: "Запрос обновления отправлен"})
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const handleUpdateUnitsFirmware = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      updateUnitsFirmware(
        {
          variables: {
            uuid: currentRepoData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          console.log(currentUnitData)
          setIsLoaderActive(false)
          setResultData({ type: ResultType.Happy, message: "Запрос обновления связанных Unit отправлен"})
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  const handleDeleteRepo = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentRepoData){
      deleteRepo(
        {
          variables: {
            uuid: currentRepoData.uuid
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

  return (
    <>
      <BaseModal
        modalName={'Repo ' + currentRepoData?.name}
        open={activeModal === 'repoMenu'}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('createUnit')}>
            Создать Unit
          </button>
          <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
            Настройки
          </button>
          <button className="button_open_alter" onClick={handleUpdateLocalRepo}>
            Обновить доступные версии
          </button>
          <button className="button_open_alter" onClick={handleUpdateUnitsFirmware}>
            Обновить связанные Unit
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName='Создание Unit' open={activeModal === 'createUnit'} openModalType='repoMenu'>
        {
          currentRepoData && (
            <CreateUnitForm
              currentRepoData={currentRepoData}
              setCurrentUnitData={setCurrentUnitData}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Настройки'
        open={activeModal === 'repoSettingsMenu'}
        openModalType='repoMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('updateRepo')}>
            Параметры
          </button>
          {
            currentRepoData && !currentRepoData.isPublicRepository && (
              <button className="button_open_alter" onClick={() => openModal('changeCredentials')}>
                Авторизация GIT
              </button>
            )
          }
          <button className="button_open_alter" onClick={handleDeleteRepo}>
            Удалить
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Параметры Repo'
        open={activeModal === 'updateRepo'}
        openModalType='repoSettingsMenu'  
      >
        {
          currentRepoData && (
            <UpdateRepoForm
              currentRepoData={currentRepoData}
              setCurrentRepoData={setCurrentRepoData}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Авторизация GIT'
        open={activeModal === 'changeCredentials'}
        openModalType='repoSettingsMenu'
      >
        {
          currentRepoData && (
            <UpdateRepoCredentialsForm
              currentRepoData={currentRepoData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
