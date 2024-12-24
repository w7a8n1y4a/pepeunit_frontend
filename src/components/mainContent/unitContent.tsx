import { ResultType } from '@rootTypes/resultEnum'
import { useDeleteUnitMutation, PermissionEntities, useGetAvailablePlatformsLazyQuery, useGetRepoLazyQuery, RepoType } from '@rootTypes/compositionFunctions'
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
  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const [currentRepoData, setCurrentRepoData] = useState<RepoType | null>(null);
  
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  let nodeType = PermissionEntities.Unit
    
  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });

  const [repoAvailablePlatforms, setRepoAvailablePlatforms] = useState<Array<{
    __typename?: "PlatformType";
    name: string;
    link: string;
  }> | null>(null);

  const [deleteUnit] = useDeleteUnitMutation()
  const [getRepo] = useGetRepoLazyQuery();
  const [getAvailablePlatforms] = useGetAvailablePlatformsLazyQuery();

  const fileUpload = (type: string) => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

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
        setIsLoaderActive(false)
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
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: data.detail})
          }
        )
      });
    }
  }

  const handleDeleteUnit = () => {
    setIsLoaderActive(true)
    setResultData({
      ...resultData,
      message: null
    })

    if (currentNodeData){
      deleteUnit(
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
      console.error("Ошибка загрузки данных:", error);
      setResultData({ type: ResultType.Angry, message: "Ошибка загрузки данных" });
    } finally {
      setIsLoaderActive(false);
    }
  };

  // Эффект: Перезагрузка данных при смене currentNodeData
  useEffect(() => {
    fetchRepoAndPlatforms();
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
