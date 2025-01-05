import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
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
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function RepoContent(){
  const { resultData, handleError, handleSuccess } = useResultHandler();
  const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
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
        reloadEntityType={NodeType.Repo}
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
              Create Unit
            </button>
            ) : (<></>)
          }

          {
            user && user.uuid == currentNodeData?.creatorUuid ? (
              <>
                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Permission
                </button>
                <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
                  Settings
                </button>
                <button className="button_open_alter" onClick={handleUpdateLocalRepo}>
                  Update branch and commits
                </button>
                <button className="button_open_alter" onClick={handleUpdateUnitsFirmware}>
                  Update related Unit
                </button>
              </>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName='Create Unit' open={activeModal === 'createUnit'} openModalType='repoMenu'>
        {
          currentNodeData && (
            <CreateUnitForm/>
          )
        }
      </BaseModal>
      <BaseModal modalName={'Permission ' + currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='repoMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeType={nodeType}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Settings'
        open={activeModal === 'repoSettingsMenu'}
        openModalType='repoMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('updateRepo')}>
            Options
          </button>
          {
            currentNodeData && !currentNodeData.isPublicRepository && (
              <button className="button_open_alter" onClick={() => openModal('changeCredentials')}>
                Change GIT Credentials
              </button>
            )
          }
          <button className="button_open_alter" onClick={handleDeleteRepo}>
            Delete Repo
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Options Repo'
        open={activeModal === 'updateRepo'}
        openModalType='repoSettingsMenu'  
      >
        {
          currentNodeData && (
            <UpdateRepoForm/>
          )
        }
      </BaseModal>
      <BaseModal
        modalName='External Auth GIT'
        open={activeModal === 'changeCredentials'}
        openModalType='repoSettingsMenu'
      >
        {
          currentNodeData && (
            <UpdateRepoCredentialsForm/>
          )
        }
      </BaseModal>
    </>
  )
}
