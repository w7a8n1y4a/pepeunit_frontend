import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
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
  const { resultData, handleError, handleSuccess } = useResultHandler();
  const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const { openModal } = useModalHandlers();

  const [versions, setVersions] = useState<GetVersionsQuery['getVersions'] | null>(null)

  const { user } = useUserStore();

  let nodeType = PermissionEntities.Repo

  const [updateLocalRepo] = useUpdateLocalRepoMutation();
  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [deleteRepo] = useDeleteRepoMutation()
  const [getVersions] = useGetVersionsLazyQuery()

  const handleUpdateLocalRepo = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await updateLocalRepo({
          variables: {
            uuid: currentNodeData.uuid
          }
        })
        if (result.data){
          handleSuccess("Git Repo update request send")
        }
      }
    })
  };

  const handleUpdateUnitsFirmware = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await updateUnitsFirmware(
          {
            variables: {
              uuid: currentNodeData.uuid
            }
          }
        )
        if (result.data){
          handleSuccess("Unit`s update query send")
        }
      }
    })
  };

  const handleDeleteRepo = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await deleteRepo(
          {
            variables: {
              uuid: currentNodeData.uuid
            }
          }
        )
        if (result.data){
          setActiveModal(null)
          removeNodesAndLinks(currentNodeData.uuid)
          handleSuccess("Repo success update")
        }
      }
    })
  };

  useEffect(() => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await getVersions({
          variables: {
              uuid: currentNodeData.uuid,
          }
        })
        if (result.data?.getVersions){
            setVersions(result.data.getVersions)
        }
      }
    })
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
