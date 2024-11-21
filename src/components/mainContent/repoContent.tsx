import { ResultType } from '@rootTypes/resultEnum'
import { useUpdateLocalRepoMutation, PermissionEntities, useUpdateUnitsFirmwareMutation, useDeleteRepoMutation, useGetVersionsLazyQuery } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import CreateUnitForm from '../forms/unit/createUnitForm';
import UpdateRepoForm from '../forms/repo/updateRepoForm';
import PermissionForm from '../forms/permission/permissionForm';
import UpdateRepoCredentialsForm from '../forms/repo/updateRepoCredentialsForm'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import VersionChart from '@primitives/versionChart'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';

import {
  GetVersionsQuery
} from '@rootTypes/compositionFunctions';

export default function RepoContent(){
  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const { openModal } = useModalHandlers();

  const [versions, setVersions] = useState<GetVersionsQuery['getVersions'] | null>(null)

  const { user } = useUserStore();

  let nodeType = PermissionEntities.Repo

  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });

  const [updateLocalRepo] = useUpdateLocalRepoMutation();
  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [deleteRepo] = useDeleteRepoMutation()
  const [getVersions] = useGetVersionsLazyQuery()

  const handleUpdateLocalRepo = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentNodeData){
      updateLocalRepo(
        {
          variables: {
            uuid: currentNodeData.uuid
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

    if (currentNodeData){
      updateUnitsFirmware(
        {
          variables: {
            uuid: currentNodeData.uuid
          }
        }
      ).then(result => {
        if (result.data){
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

    if (currentNodeData){
      deleteRepo(
        {
          variables: {
            uuid: currentNodeData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setIsLoaderActive(false)
          setActiveModal(null)
          removeNodesAndLinks(currentNodeData.uuid)
        }
      }).catch(error => {
        setIsLoaderActive(false)
        setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
      })
    }
  };

  useEffect(() => {
    console.log('test')
    if (currentNodeData){
      console.log(currentNodeData.uuid)
      getVersions({
        variables: {
            uuid: currentNodeData.uuid,
        }
      }).then(result => {
          if (result.data?.getVersions){
              console.log(result.data.getVersions)
              setVersions(result.data.getVersions)
          }
        }
      )
    }
}, [currentNodeData]);

  return (
    <>
      <BaseModal
        modalName={'Repo ' + currentNodeData?.name}
        open={activeModal === 'repoMenu'}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          {
            versions && versions.unitCount > 0 ? (<VersionChart data={versions} />) : (<></>)
          }
          {
            user ? (
              <button className="button_open_alter" onClick={() => openModal('createUnit')}>
              Создать Unit
            </button>
            ) : (<></>)
          }

          {
            user && user.uuid == currentNodeData?.creatorUuid ? (
              <>
                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Доступы
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
              </>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName='Создание Unit' open={activeModal === 'createUnit'} openModalType='repoMenu'>
        {
          currentNodeData && (
            <CreateUnitForm
              currentNodeData={currentNodeData}
            />
          )
        }
      </BaseModal>
      <BaseModal modalName={'Доступы ' + currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='repoMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeData={currentNodeData}
              currentNodeType={nodeType}
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
            currentNodeData && !currentNodeData.isPublicRepository && (
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
          currentNodeData && (
            <UpdateRepoForm
              currentNodeData={currentNodeData}
              setCurrentNodeData={setCurrentNodeData}
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
          currentNodeData && (
            <UpdateRepoCredentialsForm
              currentNodeData={currentNodeData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
