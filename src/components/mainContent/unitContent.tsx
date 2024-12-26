import { ResultType } from '@rootTypes/resultEnum'
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useDeleteUnitMutation, PermissionEntities, useGetAvailablePlatformsLazyQuery, useGetRepoLazyQuery, RepoType, useSendCommandToInputBaseTopicMutation, BackendTopicCommand, useGetTargetVersionLazyQuery } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import UpdateUnitForm from '../forms/unit/updateUnitForm';
import PermissionForm from '../forms/permission/permissionForm';
import UpdateUnitEnvForm from '../forms/unit/updateUnitEnvForm'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function UnitContent(){
  const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();

  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null);
  const [targetVersion, setTargetVersion] = useState<string | null>(null);
  
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  let nodeType = PermissionEntities.Unit
    
  const [isLoaderActive, setIsLoaderActive] = useState(false)

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
    setIsLoaderActive(true)

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
      }).finally(() => {
          setIsLoaderActive(false);
      });
    }
  }

  const handleSendUnitCommand = (command: BackendTopicCommand) => {
    setIsLoaderActive(true)

    if (currentNodeData){
      sendCommandToInputBaseTopic(
        {
          variables: {
            uuid: currentNodeData.uuid,
            command: command
          }
        }
      ).then(result => {
        if (result.data){
          handleSuccess("MQTT command " + command + " success send")
        }
      }).catch(error => {
          handleError(error);
      }).finally(() => {
          setIsLoaderActive(false);
      });
    }
  };

  const handleDeleteUnit = () => {
    setIsLoaderActive(true)

    if (currentNodeData){
      deleteUnit(
        {
          variables: {
            uuid: currentNodeData.uuid
          }
        }
      ).then(result => {
        if (result.data){
          setActiveModal(null)
          removeNodesAndLinks(currentNodeData.uuid)
        }
      }).catch(error => {
          handleError(error);
      }).finally(() => {
          setIsLoaderActive(false);
      });
    }
  };

  function getStateData() {
    if (currentNodeData) {
      let state: any = currentNodeData.unitState
      return JSON.stringify(state, null, 4)
    } else {
      return ''
    }
  }

  // Функция для загрузки данных
  const fetchRepoAndPlatforms = async () => {
    try {
      if (!currentNodeData) return;

      setIsLoaderActive(true);
      setCurrentRepoData(null); // Сброс репозитория
      setRepoAvailablePlatforms(null); // Сброс платформ

      // 1. Получение данных репозитория
      const repoResponse = await getRepo({ variables: { uuid: currentNodeData.repoUuid } });
      const repo = repoResponse.data?.getRepo;

      if (repo) {
        setCurrentRepoData(repo);

        // 2. Проверка и загрузка платформ
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
    } catch (error) {
      setResultData({ type: ResultType.Angry, message: "Ошибка загрузки данных" });
    } finally {
      setIsLoaderActive(false);
    }
  };

  useEffect(() => {
    fetchRepoAndPlatforms();
    if (currentNodeData){
      getTargetVersion(
        {
          variables: {
            uuid: currentNodeData.uuid,
          }
        }
      ).then(result => {
        if (result.data?.getTargetVersion){
          setTargetVersion(result.data.getTargetVersion.commit)
        }
      })
    }
  }, [currentNodeData]);
  
  return (
    <>
      <BaseModal
        modalName={'Unit ' + currentNodeData?.name}
        open={activeModal === 'unitMenu'}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }

          <div>
            Статус - {currentNodeData?.firmwareUpdateStatus}
          </div>
          <div>
            Ошибка - {currentNodeData?.firmwareUpdateError}
          </div>
          <div>
            Запрос был в - {currentNodeData?.lastFirmwareUpdateDatetime}
          </div>
          <div>
            Текущая версия - {currentNodeData?.currentCommitVersion}
          </div>
          <div>
            Target версия - {targetVersion ? (targetVersion) : (<></>)}
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
                  Обновить Firmware
                </button>

                <button className="button_open_alter" onClick={() => handleSendUnitCommand(BackendTopicCommand.SchemaUpdate)}>
                  Обновить Schema
                </button>

                <button className="button_open_alter" onClick={() => handleSendUnitCommand(BackendTopicCommand.EnvUpdate)}>
                  Обновить Env
                </button>

                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Доступы
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("tar")}>
                  Скачать tar
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("tgz")}>
                  Скачать tgz
                </button>
                <button className="button_open_alter" onClick={() => fileUpload("zip")}>
                  Скачать zip
                </button>

                {currentRepoData?.isCompilableRepo && repoAvailablePlatforms?.map(item => (
                  <a key={item.name} href={item.link}>
                    <button className="button_open_alter">Platform - {item.name}</button>
                  </a>
                ))}

                <button className="button_open_alter" onClick={() => openModal('unitSettingsMenu')}>
                  Настройки
                </button>
              </>
            ) : (<></>)
          }
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName={'Доступы ' + currentNodeData?.name } open={activeModal === 'permissionMenu' + nodeType} openModalType='unitMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeData={currentNodeData}
              currentNodeType={PermissionEntities.Unit}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Настройки'
        open={activeModal === 'unitSettingsMenu'}
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
        openModalType='unitSettingsMenu'
      >
        {
          currentNodeData && (
            <UpdateUnitForm
              currentNodeData={currentNodeData}
              setCurrentNodeData={setCurrentNodeData}
            />
          )
        }
      </BaseModal>
      <BaseModal
        modalName='Env Unit'
        open={activeModal === 'unitSetEnv'}
        openModalType='unitSettingsMenu'
      >
        {
          currentNodeData && (
            <UpdateUnitEnvForm
              currentNodeData={currentNodeData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
