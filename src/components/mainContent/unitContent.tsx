import { ResultType } from '@rootTypes/resultEnum'
import { useDeleteUnitMutation, PermissionEntities } from '@rootTypes/compositionFunctions'
import BaseModal from '../modal/baseModal'
import { useState } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import UpdateUnitForm from '../forms/unit/updateUnitForm';
import PermissionForm from '../forms/permission/permissionForm';
import UpdateUnitEnvForm from '../forms/unit/updateUnitEnvForm'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';


export default function UnitContent(){
  const { activeModal, setActiveModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { removeNodesAndLinks } = useGraphStore();
  const { openModal } = useModalHandlers();
    
  const [isLoaderActive, setIsLoaderActive] = useState(false)
  const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
    type: ResultType.Happy,
    message: null
  });

  const [deleteUnit] = useDeleteUnitMutation()

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
          <button className="button_open_alter" onClick={() => openModal('permissionUnitMenu')}>
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
          <button className="button_open_alter" onClick={() => openModal('unitSettingsMenu')}>
            Настройки
          </button>
          <ResultQuery
            resultData={resultData}
          />
        </div>
      </BaseModal>
      <BaseModal modalName={'Доступы ' + currentNodeData?.name } open={activeModal === 'permissionUnitMenu'} openModalType='unitMenu'>
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
