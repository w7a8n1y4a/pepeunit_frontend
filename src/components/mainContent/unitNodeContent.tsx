import BaseModal from '../modal/baseModal'

import { UnitNodeTypeEnum } from '@rootTypes/compositionFunctions'
import { useModalStore, useNodeStore } from '@stores/baseStore';
import UpdateUnitNodeForm from '../forms/unitNode/updateUnitNodeForm';
import UnitNodeSetStateForm from '../forms/unitNode/unitNodeSetStateForm';
import useModalHandlers from '@handlers/useModalHandlers';


export default function UnitNodeContent(){
  const { activeModal } = useModalStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();

  return (
    <>
      <BaseModal
        modalName={currentNodeData?.type + ' ' + currentNodeData?.name}
        open={activeModal === 'inputMenu' || activeModal === 'outputMenu'}
      >
        <div className="modal_menu_content">
          <div>
            {currentNodeData?.state || "Данных нет"}
          </div>

          {
            currentNodeData?.type == UnitNodeTypeEnum.Input ? (
                <button className="button_open_alter" onClick={() => openModal('unitNodeSetState')}>
                    Установить значение
                </button>
            ) : (<></>)
          }
          <button className="button_open_alter" onClick={() => openModal('unitNodeUpdate')}>
            Настройки
          </button>
        </div>
      </BaseModal>

      <BaseModal
        modalName={'Настройки ' + currentNodeData?.type}
        open={activeModal === 'unitNodeUpdate'}
        openModalType={"outputMenu"} 
      >
        {
          currentNodeData && (
            <UpdateUnitNodeForm
              currentNodeData={currentNodeData}
              setCurrentNodeData={setCurrentNodeData}
            />
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
            <UnitNodeSetStateForm
              currentNodeData={currentNodeData}
              setCurrentNodeData={setCurrentNodeData}
            />
          )
        }
      </BaseModal>
    </>
  )
}
