import BaseModal from '../modal/baseModal'

import { UnitNodeTypeEnum, PermissionEntities } from '@rootTypes/compositionFunctions'
import { useModalStore, useNodeStore } from '@stores/baseStore';
import UpdateUnitNodeForm from '../forms/unitNode/updateUnitNodeForm';
import UnitNodeSetStateForm from '../forms/unitNode/unitNodeSetStateForm';
import UnitNodeEdgeForm from '../forms/unitNode/unitNodeEdgeForm'
import PermissionForm from '../forms/permission/permissionForm';
import useModalHandlers from '@handlers/useModalHandlers';

import { useUserStore } from '@stores/userStore';

export default function UnitNodeContent(){
  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();

  let nodeType = PermissionEntities.UnitNode

  return (
    <>
      <BaseModal
        modalName={currentNodeData?.type}
        open={activeModal === 'inputMenu' || activeModal === 'outputMenu'}
      >
        <div className="modal_menu_content">
          <div>
            {currentNodeData?.name}
          </div>
          <div>
            Состояние: {currentNodeData?.state || "Данных нет"}
          </div>
          {
            user && currentNodeData && user.uuid == currentNodeData.creatorUuid ? (
              <>
                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Доступы
                </button>
                {
                  currentNodeData?.type == UnitNodeTypeEnum.Input ? (
                    <>
                      <button className="button_open_alter" onClick={() => openModal('unitNodeSetState')}>
                        Установить значение
                      </button>
                      <button className="button_open_alter" onClick={() => openModal('unitNodeAddOutputToInput')}>
                        Связи
                      </button>
                    </>
                  ) : (<></>)
                }
                <button className="button_open_alter" onClick={() => openModal('unitNodeUpdate')}>
                  Настройки
                </button>
              </>
            ) : (<></>)
          }
        </div>
      </BaseModal>

      <BaseModal modalName={'Доступы ' + currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='inputMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeType={PermissionEntities.UnitNode}
            />
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Подключенные выходы'}
        open={activeModal === 'unitNodeAddOutputToInput'}
        openModalType={"outputMenu"} 
      >
        {
          currentNodeData && (
            <UnitNodeEdgeForm/>
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Настройки ' + currentNodeData?.type}
        open={activeModal === 'unitNodeUpdate'}
        openModalType={"outputMenu"} 
      >
        {
          currentNodeData && (
            <UpdateUnitNodeForm/>
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Установить ' + currentNodeData?.type}
        open={activeModal === 'unitNodeSetState'}
        openModalType={"inputMenu"} 
      >
        {
          currentNodeData && (
            <UnitNodeSetStateForm/>
          )
        }
      </BaseModal>
    </>
  )
}
