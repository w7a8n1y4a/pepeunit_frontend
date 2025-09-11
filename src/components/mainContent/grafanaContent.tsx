import BaseModal from '../modal/baseModal'
import Spinner from '@primitives/spinner'

import { useModalStore, useNodeStore } from '@stores/baseStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';
import { useAsyncHandler } from '@handlers/useAsyncHandler';

import CreateDashboardForm from '../forms/grafana/createDashboardForm'


export default function GrafanaContent(){

  const { activeModal } = useModalStore();
  const { isLoaderActive } = useAsyncHandler();

  const { currentNodeData } = useNodeStore();


return (
    <>
      <BaseModal
        modalName={'Repo'}
        subName={currentNodeData?.name}
        open={activeModal === 'DashboardMenu'}
        copyLink={window.location.origin + '/dashboard/' + currentNodeData?.uuid}
        reloadEntityType={NodeType.Dashboard}
        openModalType='graphSearch'
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
            test
        </div>
      </BaseModal>
      <BaseModal
        modalName='Create Dashboard'
        open={activeModal === 'createDashboard'}
        openModalType='graphSearch'
      >
        <CreateDashboardForm/>
      </BaseModal>
    </>
  )
}
