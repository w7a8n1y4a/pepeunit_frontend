import BaseModal from '../modal/baseModal'

import { UnitNodeTypeEnum, PermissionEntities } from '@rootTypes/compositionFunctions'
import { useModalStore, useNodeStore } from '@stores/baseStore';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import UpdateUnitNodeForm from '../forms/unitNode/updateUnitNodeForm';
import UnitNodeSetStateForm from '../forms/unitNode/unitNodeSetStateForm';
import UnitNodeEdgeForm from '../forms/unitNode/unitNodeEdgeForm'
import PermissionForm from '../forms/permission/permissionForm';
import useModalHandlers from '@handlers/useModalHandlers';
import Spinner from '@primitives/spinner'
import { useUserStore } from '@stores/userStore';

export default function UnitNodeContent(){
  const { activeModal } = useModalStore();
  const { currentNodeData } = useNodeStore();
  const { openModal } = useModalHandlers();
  const { user } = useUserStore();
  const { handleError } = useResultHandler();
  const { isLoaderActive } = useAsyncHandler(handleError);

  let nodeType = PermissionEntities.UnitNode

  return (
    <>
      <BaseModal
        modalName={currentNodeData?.type}
        open={activeModal === 'inputMenu' || activeModal === 'outputMenu'}
        reloadEntityType={currentNodeData?.type}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <div>
            {currentNodeData?.name}
          </div>
          <div>
            State: {currentNodeData?.state || "No Data"}
          </div>
          {
            user && currentNodeData && user.uuid == currentNodeData.creatorUuid ? (
              <>
                <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                  Permission
                </button>
                {
                  currentNodeData?.type == UnitNodeTypeEnum.Input ? (
                    <>
                      <button className="button_open_alter" onClick={() => openModal('unitNodeSetState')}>
                        Set State
                      </button>
                      <button className="button_open_alter" onClick={() => openModal('unitNodeAddOutputToInput')}>
                        Related Output
                      </button>
                    </>
                  ) : (<></>)
                }
                <button className="button_open_alter" onClick={() => openModal('unitNodeUpdate')}>
                  Options
                </button>
              </>
            ) : (<></>)
          }
        </div>
      </BaseModal>

      <BaseModal modalName={'Permission ' + currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='inputMenu'>
        {
          currentNodeData && (
            <PermissionForm
              currentNodeType={PermissionEntities.UnitNode}
            />
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Related Output'}
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
        modalName={'Options ' + currentNodeData?.type}
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
        modalName={'Set State ' + currentNodeData?.type}
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
