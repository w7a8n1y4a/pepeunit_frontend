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
import {stringToFormat} from '@utils/stringToFormat'

import copy_img from '/images/copy.svg'

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

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(currentNodeData.repoUrl);

    // Сбрасываем состояние "скопировано" через 2 секунды
  } catch (error) {
    console.error('Failed to copy text:', error);
  }
};

  return (
    <>
      <BaseModal
        modalName={'Repo'}
        subName={currentNodeData?.name}
        visibilityLevel={stringToFormat(currentNodeData?.visibilityLevel)}
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
            currentNodeData && (
              <>
                <div className='repo_link'>
                  <a style={{color: "#0077ff"}} target="_blank" href={currentNodeData.repoUrl}>{stringToFormat(currentNodeData.platform)} {currentNodeData.isPublicRepository ? 'public' : 'private'} Link</a>
                  <button className='repo_link_button' onClick={handleCopy}>
                    <img src={copy_img} width="24" height="24" alt="Back"/>
                  </button>
                </div>
              </>
            )
          }
          {
            user ? (
              <button className="button_add_alter" onClick={() => openModal('createUnit')}>
                Create Unit
              </button>
            ) : (<></>)
          }
          {
            user && user.uuid == currentNodeData?.creatorUuid ? (
              <>
                <div className='div_statistics'>
                  <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                    Permission
                  </button>
                  <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
                    Settings
                  </button>
                </div>
                <div className='div_statistics'>
                  <button className="button_open_alter" onClick={handleUpdateLocalRepo}>
                    Update local Repo
                  </button>
                  <button className="button_open_alter" onClick={handleUpdateUnitsFirmware}>
                    Update related Unit
                  </button>
                </div>
              </>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Create Unit'
        subName={currentNodeData?.name}
        open={activeModal === 'createUnit'}
        openModalType='repoMenu'
      >
        {
          currentNodeData && (
            <CreateUnitForm/>
          )
        }
      </BaseModal>
      <BaseModal modalName={'Permission'} subName={currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='repoMenu'>
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
        subName={currentNodeData?.name}
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
          <button className="button_del_alter" onClick={handleDeleteRepo}>
            Delete Repo
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Options Repo'
        subName={currentNodeData?.name}
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
        subName={currentNodeData?.name}
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
