import BaseModal from '../modal/baseModal'

import { UnitNodeTypeEnum, PermissionEntities, VisibilityLevel } from '@rootTypes/compositionFunctions'
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
import {stringToFormat} from '@utils/stringToFormat'

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
        subName={currentNodeData?.topicName}
        visibilityLevel={stringToFormat(currentNodeData?.visibilityLevel)}
        lastUpdateDatetime={currentNodeData?.lastUpdateDatetime}
        open={activeModal === 'InputMenu' || activeModal === 'OutputMenu'}
        copyLink={window.location.origin + '/unit-node/' + currentNodeData?.uuid}
        reloadEntityType={currentNodeData?.type}
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <div className='div_unit_message'>
            {currentNodeData?.state || "No Data"}
          </div>
          {
            user && currentNodeData && (
              <>
                {
                  currentNodeData?.type == UnitNodeTypeEnum.Input && (
                    <>
                      <button className="button_add_alter" onClick={() => openModal('unitNodeSetState')}>
                        Set State
                      </button>
                      <button className="button_add_alter" onClick={() => openModal('unitNodeAddOutputToInput')}>
                        Related Output
                      </button>
                    </>
                  )
                }
                {
                  user.uuid == currentNodeData.creatorUuid && (
                    <div className='div_statistics'>
                      {
                        currentNodeData.visibilityLevel == VisibilityLevel.Private && (
                          <button className="button_open_alter" onClick={() => openModal('permissionMenu' + nodeType)}>
                            Permission
                          </button>
                        )
                      }
                      <button className="button_core_function" onClick={() => openModal('unitNodeDataPipe')}>
                        Data Pipeline
                      </button>
                      <button className="button_open_alter" onClick={() => openModal('unitNodeUpdate')}>
                        Options
                      </button>
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      </BaseModal>

      <BaseModal modalName={'Permission'} subName={currentNodeData?.name} open={activeModal === 'permissionMenu' + nodeType} openModalType='inputMenu'>
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
        subName={currentNodeData?.name}
        open={activeModal === 'unitNodeAddOutputToInput'}
        openModalType={stringToFormat(currentNodeData?.type) + "Menu"} 
      >
        {
          currentNodeData && (
            <UnitNodeEdgeForm/>
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Data Pipeline ' + currentNodeData?.type}
        subName={currentNodeData?.name}
        open={activeModal === 'unitNodeDataPipe'}
        openModalType={stringToFormat(currentNodeData?.type) + "Menu"} 
      >
        {
          currentNodeData && (
            <UpdateUnitNodeForm/>
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Options ' + currentNodeData?.type}
        subName={currentNodeData?.name}
        open={activeModal === 'unitNodeUpdate'}
        openModalType={stringToFormat(currentNodeData?.type) + "Menu"}
      >
        {
          currentNodeData && (
            <UpdateUnitNodeForm/>
          )
        }
      </BaseModal>

      <BaseModal
        modalName={'Set State ' + currentNodeData?.type}
        subName={currentNodeData?.name}
        open={activeModal === 'unitNodeSetState'}
        openModalType={stringToFormat(currentNodeData?.type) + "Menu"} 
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
