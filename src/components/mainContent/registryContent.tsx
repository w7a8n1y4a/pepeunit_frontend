import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useUpdateLocalRepositoryMutation, useDeleteRepositoryRegistryMutation } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import UpdateRepositoryRegistryCredentialsForm from '../forms/registry/updateRepositoryRegistryCredentialsForm'
import CreateRepositoryRegistryForm from '../forms/registry/createRepositoryRegistryForm'
import Spinner from '@primitives/spinner'
import {stringToFormat} from '@utils/stringToFormat'
import byteConverter from '@utils/byteConverter'

import copyToClipboard from '@utils/copyToClipboard'
import copy_img from '/images/copy.svg'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import useModalHandlers from '@handlers/useModalHandlers';
import SearchForm from '../forms/search/searchForm';

import { NodeType } from '@src/rootTypes/nodeTypeEnum';

import angry_img from '/images/pepe/angry.svg'

export default function RegistryContent(){
  const { setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const { openModal } = useModalHandlers();

  const { user } = useUserStore();

  const [updateLocalRepository] = useUpdateLocalRepositoryMutation();
  const [deleteRepositoryRegistry] = useDeleteRepositoryRegistryMutation()

  const handleUpdateLocalRepository = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await updateLocalRepository({
          variables: {
            uuid: currentNodeData.uuid
          }
        })
        if (result.data){
          setHappy("Git Repo update request send")
        }
      }
    })
  };

  const handleDeleteRepository = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await deleteRepositoryRegistry(
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


return (
    <>
      <BaseModal
        modalName={'Registry'}
        subName={currentNodeData?.name}
        lastUpdateDatetime={currentNodeData?.syncLastDatetime}
        open={activeModal === 'RegistryMenu'}
        copyLink={window.location.origin + '/registry/' + currentNodeData?.uuid}
        reloadEntityType={NodeType.Registry}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          {
            currentNodeData && (
              <>
                <div className='repo_link'>
                  <a style={{color: "#0077ff"}} target="_blank" href={currentNodeData.repositoryUrl}>{stringToFormat(currentNodeData.platform)} {currentNodeData.isPublicRepository ? 'public' : 'private'} Link</a>
                  <button className='repo_link_button' onClick={() => (copyToClipboard(currentNodeData.repositoryUrl))}>
                    <img src={copy_img} width="24" height="24" alt="Back"/>
                  </button>
                </div>
              </>
            )
          }
          {
            currentNodeData && currentNodeData.syncStatus && (
                <div className='div_unit_message'>
                    Sync status: {stringToFormat(currentNodeData.syncStatus)}
                </div>
            )
          }
          {
            currentNodeData && currentNodeData.syncError && (
                <div className="result_angry">
                    <img src={angry_img} width="36" height="36" />
                    <div className={"result_angry_message"}>
                        {stringToFormat(currentNodeData.syncError)}
                    </div>
                </div>
            )
          }
          {
            currentNodeData && currentNodeData.localRepositorySize && (
              <div className='div_unit_message'>
                  Local Size: {byteConverter(currentNodeData.localRepositorySize)}
              </div>
            )
          }
          {
            user && (
              <button className="button_add_alter" onClick={() => openModal('createRepo')}>
                Create Repo
              </button>
            )
          }
          {
            user && currentNodeData && (
              <>
                {
                  !currentNodeData.isPublicRepository && (
                    <button className="button_open_alter" onClick={() => openModal('changeCredentials')}>
                      Change GIT Credentials
                    </button>
                  )
                }
                {
                  user.uuid == currentNodeData.creatorUuid && (
                    <div className='div_statistics'>
                      <button className="button_open_alter" onClick={() => openModal('registrySettingsMenu')}>
                        Settings
                      </button>
                    </div>
                  )
                }
                <div className='div_statistics'>
                  <button className="button_open_alter_send" onClick={handleUpdateLocalRepository}>
                    Update local Repository
                  </button>
                </div>
              </>
            )
          }
        </div>
      </BaseModal>

      <BaseModal
        modalName='Settings'
        subName={currentNodeData?.name}
        open={activeModal === 'registrySettingsMenu'}
        openModalType='RegistryMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_del_alter" onClick={handleDeleteRepository}>
            Delete Repository
          </button>
        </div>
      </BaseModal>
      <BaseModal
        modalName='External Auth GIT'
        subName={currentNodeData?.name}
        open={activeModal === 'changeCredentials'}
        openModalType='RegistryMenu'
      >
        {
          currentNodeData && (
            <UpdateRepositoryRegistryCredentialsForm/>
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Create Registry'
        open={activeModal === 'createRepositoryRegistry'}
        openModalType='RegistryMenu'
      >
        <CreateRepositoryRegistryForm/>
      </BaseModal>
      <BaseModal
        modalName={"Search"}
        open={activeModal === 'registrySearch'}
      >
        <SearchForm targetSearch={NodeType.Registry} />
      </BaseModal>
    </>
  )
}
