import { ResultType } from '@rootTypes/resultEnum'
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useDeleteUnitMutation, PermissionEntities, useGetAvailablePlatformsLazyQuery, useGetRepoLazyQuery, RepoType, useSendCommandToInputBaseTopicMutation, BackendTopicCommand, useGetTargetVersionLazyQuery } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import UpdateUnitForm from '../forms/unit/updateUnitForm';
import PermissionForm from '../forms/permission/permissionForm';
import UpdateUnitEnvForm from '../forms/unit/updateUnitEnvForm'
import {stringToFormat} from '@utils/stringToFormat'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function UnitContent(){
  const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
  const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null);
  const [targetVersion, setTargetVersion] = useState<string | null>(null);
  
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  let nodeType = PermissionEntities.Unit
    
  const [repoAvailablePlatforms, setRepoAvailablePlatforms] = useState<Array<{
    __typename?: "PlatformType";
    name: string;
    link: string;
  }> | null>(null);

  const [deleteUnit] = useDeleteUnitMutation()
  const [getRepo] = useGetRepoLazyQuery();
  const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();
  const [sendCommandToInputBaseTopic] = useSendCommandToInputBaseTopicMutation();
  const [getTargetVersion] = useGetTargetVersionLazyQuery();

  const fileUpload = (type: string) => {
    let url = import.meta.env.VITE_BACKEND_URI.replace('graphql', '') + 'api/v1/units/firmware/' + type + '/' + currentNodeData?.uuid
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
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          currentNodeData?.name + '.' + type,
        );
        document.body.appendChild(link);
        link.click();
      }).catch((error) => {
        error.json().then( function (data: any) {
            setResultData({ type: ResultType.Angry, message: data.detail})
          }
        )
      })
    }
  }

  const handleSendUnitCommand = (command: BackendTopicCommand) => {
    runAsync(async () => {

      if (currentNodeData){
        let result = await sendCommandToInputBaseTopic(
          {
            variables: {
              uuid: currentNodeData.uuid,
              command: command
            }
          }
        )
        if (result.data){
          handleSuccess("MQTT command " + command + " success send")
        }
      }
    })
  };

  const handleDeleteUnit = () => {
    runAsync(async () => {

      if (currentNodeData){
        let result = await deleteUnit(
          {
            variables: {
              uuid: currentNodeData.uuid
            }
          }
        )
        if (result.data){
          setActiveModal(null)
          removeNodesAndLinks(currentNodeData.uuid)
        }
      }
    })
  };

  function getStateData() {
    if (currentNodeData) {
      let state: any = currentNodeData.unitState
      return JSON.stringify(state, null, 4)
    } else {
      return ''
    }
  }

  useEffect(() => {
    runAsync(async () => {
      if (currentNodeData){
        setCurrentRepoData(null);
        setRepoAvailablePlatforms(null);
  
        const repoResponse = await getRepo({ variables: { uuid: currentNodeData.repoUuid } });
        const repo = repoResponse.data?.getRepo;
  
        if (repo) {
          setCurrentRepoData(repo);
  
          if (repo.isCompilableRepo) {
            const platformsResponse = await getAvailablePlatforms(
              { variables: { uuid: currentNodeData.repoUuid, targetCommit: currentNodeData.repoCommit } }
            );
            const platforms = platformsResponse.data?.getAvailablePlatforms;
  
            if (platforms) {
              setRepoAvailablePlatforms(platforms);
            }
          }
        }

        let result = await getTargetVersion(
          {
            variables: {
              uuid: currentNodeData.uuid,
            }
          }
        )
        if (result.data?.getTargetVersion){
          setTargetVersion(result.data.getTargetVersion.commit)
        }
      }
    })
  }, [currentNodeData]);
  
  return (
    <>
      <BaseModal
        modalName={'Unit'}
        subName={currentNodeData?.name}
        visibilityLevel={stringToFormat(currentNodeData?.visibilityLevel)}
        open={activeModal === 'unitMenu'}
        reloadEntityType={NodeType.Unit}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }

          <div>
            Status - {currentNodeData?.firmwareUpdateStatus}
          </div>
          <div>
            Error - {currentNodeData?.firmwareUpdateError}
          </div>
          <div>
            Query time - {currentNodeData?.lastFirmwareUpdateDatetime}
          </div>
          <div>
            Current Version - {currentNodeData?.currentCommitVersion}
          </div>
          <div>
            Target Version - {targetVersion ? (targetVersion) : (<></>)}
          </div>
          {
            currentNodeData?.unitState ? (
              <pre>
                {getStateData()}
              </pre>
            ) : (<></>)
          }
          {
            user && currentNodeData && user.uuid == currentNodeData.creatorUuid ? (
              <>
                <button className="button_open_alter" onClick={() => handleSendUnitCommand(BackendTopicCommand.Update)}>
                  Firmware Update
                </button>

                <button className="button_open_alter" onClick={() => handleSendUnitCommand(BackendTopicCommand.SchemaUpdate)}>
                  Schema Update
                </button>

                <button className="button_open_alter" onClick={() => handleSendUnitCommand(BackendTopicCommand.EnvUpdate)}>
                  Env Update
                </button>

                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Permission
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("tar")}>
                  tar
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("tgz")}>
                  tgz
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("zip")}>
                  zip
                </button>

                {currentRepoData?.isCompilableRepo && repoAvailablePlatforms?.map(item => (
                  <a key={item.name} href={item.link}>
                    <button className="button_open_alter">Platform - {item.name}</button>
                  </a>
                ))}

                <button className="button_open_alter" onClick={() => openModal('unitSettingsMenu')}>
                  Settings
                </button>
              </>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName={'Permissions'} subName={currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='unitMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeType={PermissionEntities.Unit}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Settings'
        subName={currentNodeData?.name}
        open={activeModal === 'unitSettingsMenu'}
        openModalType='unitMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('unitSetEnv')}>
            Set Env Variable
          </button>
          <button className="button_open_alter" onClick={() => openModal('updateUnit')}>
            Options
          </button>
          <button className="button_open_alter" onClick={handleDeleteUnit}>
            Delete Unit
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal
        modalName='Options Unit'
        subName={currentNodeData?.name}
        open={activeModal === 'updateUnit'}
        openModalType='unitSettingsMenu'
      >
        {
          currentNodeData && (
            <UpdateUnitForm/>
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Env Variable'
        subName={currentNodeData?.name}
        open={activeModal === 'unitSetEnv'}
        openModalType='unitSettingsMenu'
      >
        {
          currentNodeData && (
            <UpdateUnitEnvForm/>
          )
        }
      </BaseModal>
    </>
  )
}
