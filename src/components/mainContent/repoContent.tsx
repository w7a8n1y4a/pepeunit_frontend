import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useUpdateUnitsFirmwareMutation, useDeleteRepoMutation, useGetVersionsLazyQuery, VisibilityLevel } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import CreateUnitForm from '../forms/unit/createUnitForm';
import UpdateRepoForm from '../forms/repo/updateRepoForm';
import PermissionForm from '../forms/permission/permissionForm';
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import VersionChart from '@primitives/versionChart'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import useModalHandlers from '@handlers/useModalHandlers';

import {
  GetVersionsQuery
} from '@rootTypes/compositionFunctions';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function RepoContent(){
  const { setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const { openModal } = useModalHandlers();

  const [versions, setVersions] = useState<GetVersionsQuery['getVersions'] | null>(null)

  const { user } = useUserStore();

  const [updateUnitsFirmware] = useUpdateUnitsFirmwareMutation()
  const [deleteRepo] = useDeleteRepoMutation()
  const [getVersions] = useGetVersionsLazyQuery()

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
          setHappy("Unit`s update query send")
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
          setHappy("Repo success update")
        }
      }
    })
  };

  useEffect(() => {
    if (!currentNodeData || currentNodeData.__typename == "RepoType"){
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
    }
  }, [currentNodeData]);

return (
    <>
      <BaseModal
        modalName={'Repo'}
        subName={currentNodeData?.name}
        visibilityLevel={currentNodeData?.visibilityLevel}
        open={activeModal === 'RepoMenu'}
        copyLink={window.location.origin + '/repo/' + currentNodeData?.uuid}
        reloadEntityType={NodeType.Repo}
        showParentEntityButton
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          {
            versions && versions.unitCount > 0 && (<VersionChart data={versions} />)
          }
          {
            user && (
              <button className="button_add_alter" onClick={() => openModal('createUnit')}>
                Create Unit
              </button>
            )
          }
          {
            user && user.uuid == currentNodeData?.creatorUuid && (
              <>
                <div className='div_statistics'>
                  {
                    currentNodeData.visibilityLevel == VisibilityLevel.Private && (
                      <button className="button_open_alter" onClick={() => openModal('permissionMenu' + NodeType.Repo)}>
                        Permission
                      </button>
                    )
                  }
                  <button className="button_open_alter" onClick={() => openModal('repoSettingsMenu')}>
                    Settings
                  </button>
                </div>
                <div className='div_statistics'>
                  <button className="button_open_alter_send" onClick={handleUpdateUnitsFirmware}>
                    Update related Unit
                  </button>
                </div>
              </>
            )
          }
        </div>
      </BaseModal>
      <BaseModal
        modalName='Create Unit'
        subName={currentNodeData?.name}
        open={activeModal === 'createUnit'}
        openModalType='RepoMenu'
      >
        {
          currentNodeData && (
            <CreateUnitForm/>
          )
        }
      </BaseModal>
      <BaseModal
        modalName={'Permission'}
        subName={currentNodeData?.name}
        open={activeModal === 'permissionMenu' + NodeType.Repo}
        openModalType='RepoMenu'
      >
        {
          currentNodeData && currentNodeData.__typename == "RepoType" && (
            <PermissionForm
              currentNodeType={NodeType.Repo}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Settings'
        subName={currentNodeData?.name}
        open={activeModal === 'repoSettingsMenu'}
        openModalType='RepoMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('updateRepo')}>
            Options
          </button>
          <button className="button_del_alter" onClick={handleDeleteRepo}>
            Delete Repo
          </button>
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
    </>
  )
}
