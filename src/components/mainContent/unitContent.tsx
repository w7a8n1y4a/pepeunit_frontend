import { ResultType } from '@rootTypes/resultEnum'
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import {
  useDeleteUnitMutation,
  useGetAvailablePlatformsLazyQuery,
  useGetRepoLazyQuery,
  RepoType,
  useSendCommandToInputBaseTopicMutation,
  BackendTopicCommand,
  useGetTargetVersionLazyQuery,
  VisibilityLevel,
  useGetUnitCurrentSchemaLazyQuery,
  RepositoryRegistryType,
  useGetRepositoryRegistryLazyQuery
} from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import UnitUpdateState from '@primitives/unitUpdateState'
import UnitMicroState from '@primitives/unitMicroState'
import UpdateUnitForm from '../forms/unit/updateUnitForm';
import PermissionForm from '../forms/permission/permissionForm';
import UpdateUnitEnvForm from '../forms/unit/updateUnitEnvForm'
import LogUnitForm from '../forms/unit/logUnitForm'
import copyToClipboard from '@utils/copyToClipboard'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import useModalHandlers from '@handlers/useModalHandlers';

import copy_img from '/images/copy.svg'


export default function UnitContent(){
  const { setState, setHappy } = useErrorStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null);
  const [targetVersion, setTargetVersion] = useState<string | null>(null);
  const [availableCommand, setAvailableCommand] = useState<any | null>(null);
  const [baseOutputTopics, setBaseOutputTopics] = useState<any | null>(null);

  const [ currentRepositoryRegistryData, setCurrentRepositoryRegistryData ] = useState<RepositoryRegistryType | null>(null);

  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  const [repoAvailablePlatforms, setRepoAvailablePlatforms] = useState<Array<{
    __typename?: "PlatformType";
    name: string;
    link: string;
  }> | null>(null);

  const [deleteUnit] = useDeleteUnitMutation()
  const [getRepo] = useGetRepoLazyQuery();
  const [getRepositoryRegistry] = useGetRepositoryRegistryLazyQuery();
  const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();
  const [sendCommandToInputBaseTopic] = useSendCommandToInputBaseTopicMutation();
  const [getTargetVersion] = useGetTargetVersionLazyQuery();
  const [getUnitCurrentSchema] = useGetUnitCurrentSchemaLazyQuery();

  const fileUpload = (type: string) => {
    let url = (import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI).replace('graphql', '') + 'api/v1/units/firmware/' + type + '/' + currentNodeData?.uuid
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
            setState(ResultType.Angry, data.detail)
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
          setHappy("MQTT command " + command + " success send")
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

  useEffect(() => {
    if (!currentNodeData || currentNodeData.__typename == "UnitType"){
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
            setCurrentRepositoryRegistryData(null)
            if (repo != null) {
                let repo_registry = await getRepositoryRegistry(
                    {
                        variables: {
                            uuid: repo.repositoryRegistryUuid
                        }
                    }
                )
                if (repo_registry.data?.getRepositoryRegistry){
                    setCurrentRepositoryRegistryData(repo_registry.data.getRepositoryRegistry)
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

          let currentSchema = await getUnitCurrentSchema({variables: {uuid: currentNodeData.uuid}})

          if (currentSchema.data?.getUnitCurrentSchema){

            const inputCommand = JSON.parse(currentSchema.data?.getUnitCurrentSchema)['input_base_topic']

            let state = {
              'Firmware': "update/pepeunit" in inputCommand,
              'Schema': "schema_update/pepeunit" in inputCommand,
              'Env': "env_update/pepeunit" in inputCommand,
              'Log': "log_sync/pepeunit" in inputCommand
            }

            const outputTopics = JSON.parse(currentSchema.data?.getUnitCurrentSchema)['output_base_topic']
            
            setAvailableCommand(state)

            let outputState = {
              'State': "state/pepeunit" in outputTopics,
              'Log': "log/pepeunit" in outputTopics
            }

            setBaseOutputTopics(outputState)
          }

        }
      })
    }
  }, [currentNodeData]);
  
  return (
    <>
      <BaseModal
        modalName={'Unit'}
        subName={currentNodeData?.name}
        visibilityLevel={currentNodeData?.visibilityLevel}
        lastUpdateDatetime={currentNodeData?.lastUpdateDatetime}
        open={activeModal === 'UnitMenu'}
        copyLink={window.location.origin + '/unit/' + currentNodeData?.uuid}
        reloadEntityType={NodeType.Unit}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          {
            baseOutputTopics && baseOutputTopics['State'] && (
              <>
                <UnitUpdateState targetVersion={targetVersion}/>
                <UnitMicroState/>
              </>
            )
          }

          {
            user && currentNodeData && user.uuid == currentNodeData.creatorUuid && (
              <>
                <button className="button_add_alter" onClick={() => openModal('unitSetEnv')}>
                  Set Env Variable
                </button>
                <div className='div_unit_message'>
                  Firmware with env.json and schema.json
                </div>
                <div className='buttons_load_firmware'>
                  <button className="button_load_data_grid" onClick={() => fileUpload("tar")}>
                    tar
                  </button>
                  <button className="button_load_data_grid" onClick={() => fileUpload("tgz")}>
                    tgz
                  </button>
                  <button className="button_load_data_grid" onClick={() => fileUpload("zip")}>
                    zip
                  </button>
                </div>

                {
                  currentRepoData?.isCompilableRepo && (
                    <>
                      <div className='div_unit_message'>
                        Compiled Firmware Platforms
                      </div>
                      <div className='buttons_platforms'>
                        {
                          repoAvailablePlatforms?.slice().reverse().map(item => (
                            <a className="button_load_data_grid" key={item.name} href={item.link}>
                                {item.name}
                            </a>
                          ))
                        }
                      </div>
                    </>
                )}
                {
                  availableCommand && (
                    <>
                      <div className='div_unit_message'>
                        Send update MQTT message
                      </div>
                      <div className='buttons_load_firmware'>
                        {
                          availableCommand['Firmware'] && (
                            <button className="button_load_data_grid" onClick={() => handleSendUnitCommand(BackendTopicCommand.Update)}>
                              Firmware
                            </button>
                          )
                        }
                        {
                          availableCommand['Schema'] && (
                            <button className="button_load_data_grid" onClick={() => handleSendUnitCommand(BackendTopicCommand.SchemaUpdate)}>
                              Schema
                            </button>
                          )
                        }
                        {
                          availableCommand['Env'] && (
                            <button className="button_load_data_grid" onClick={() => handleSendUnitCommand(BackendTopicCommand.EnvUpdate)}>
                              Env
                            </button>
                          )
                        }
                        {
                          availableCommand['Log'] && (
                            <button className="button_load_data_grid" onClick={() => handleSendUnitCommand(BackendTopicCommand.LogSync)}>
                              Log
                            </button>
                          )
                        }
                      </div>
                    </>
                  )
                }

                {
                  baseOutputTopics && baseOutputTopics['Log'] && (
                    <button className="button_open_alter" onClick={() => openModal('unitLogsMenu')}>
                      Logs
                    </button>
                  )
                }
                <div className='div_statistics'>
                  {
                    currentNodeData.visibilityLevel == VisibilityLevel.Private && (
                      <button className="button_open_alter" onClick={() => openModal('permissionMenu' + NodeType.Unit)}>
                        Permission
                      </button>
                    )
                  }
                  <button className="button_open_alter" onClick={() => openModal('unitSettingsMenu')}>
                    Settings
                  </button>
                </div>
              </>
            )
          }
        </div>
      </BaseModal>
      <BaseModal
        modalName='Logs'
        subName={currentNodeData?.name}
        open={activeModal === 'unitLogsMenu'}
        openModalType='UnitMenu'
        >
        {
          currentNodeData && (
            <LogUnitForm/>
          )
        }
      </BaseModal>
      <BaseModal modalName={'Permissions'} subName={currentNodeData?.name} open={activeModal === 'permissionMenu' + NodeType.Unit} openModalType='UnitMenu'>
        {
          currentNodeData && currentNodeData.__typename == "UnitType" && (
            <PermissionForm
              currentNodeType={NodeType.Unit}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Settings'
        subName={currentNodeData?.name}
        open={activeModal === 'unitSettingsMenu'}
        openModalType='UnitMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_open_alter" onClick={() => openModal('updateUnit')}>
            Options
          </button>
          <button className="button_del_alter" onClick={handleDeleteUnit}>
            Delete Unit
          </button>
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
        openModalType='UnitMenu'
      > 
      {
        currentRepositoryRegistryData && (
          <>
            <div className='repo_link'>
              <a style={{color: "#0077ff"}} target="_blank" href={currentRepositoryRegistryData.repositoryUrl}>Documentation Link</a>
              <button className='repo_link_button' onClick={() => (copyToClipboard(currentRepositoryRegistryData.repositoryUrl))}>
                <img src={copy_img} width="24" height="24" alt="Back"/>
              </button>
            </div>
          </>
        )
      }
        {
          currentNodeData && (
            <UpdateUnitEnvForm/>
          )
        }
      </BaseModal>
    </>
  )
}
