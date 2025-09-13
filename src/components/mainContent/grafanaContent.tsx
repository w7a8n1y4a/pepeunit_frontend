import BaseModal from '../modal/baseModal'
import Spinner from '@primitives/spinner'

import { useSyncDashboardMutation, useDeleteDashboardMutation } from '@rootTypes/compositionFunctions'

import { useModalStore, useNodeStore, useDashboardPanelStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import {stringToFormat} from '@utils/stringToFormat'
import copyToClipboard from '@utils/copyToClipboard'
import { useUserStore } from '@stores/userStore';
import useModalHandlers from '@handlers/useModalHandlers';

import CreateDashboardForm from '../forms/grafana/createDashboardForm'
import CreateDashboardPanelForm from '../forms/grafana/createDashboardPanelForm'
import DashboardPanelsForm from '../forms/grafana/dashboardPanelsForm'
import UnitNodesPanelForm from '../forms/grafana/unitNodesPanelForm'
import copy_img from '/images/copy.svg'
import angry_img from '/images/pepe/angry.svg'

export default function GrafanaContent(){
  const { setHappy } = useErrorStore();
  const { activeModal, setActiveModal } = useModalStore();
  const { isLoaderActive, runAsync } = useAsyncHandler();

  const { user } = useUserStore();
  const { currentNodeData, setCurrentNodeData } = useNodeStore();
  const { currentDashboardPanelData } = useDashboardPanelStore();
  const { openModal } = useModalHandlers();

  const [ syncDashboard ] = useSyncDashboardMutation()
  const [ deleteDashboard ] = useDeleteDashboardMutation()

  const handleSyncDashboard = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await syncDashboard(
          {
            variables: {
              uuid: currentNodeData.uuid
            }
          }
        )
        if (result.data){
          setCurrentNodeData(result.data.syncDashboard)
        }
      }
    })
  };

  const handleDeleteDashboard = () => {
    runAsync(async () => {
      if (currentNodeData){
        let result = await deleteDashboard(
          {
            variables: {
              uuid: currentNodeData.uuid
            }
          }
        )
        if (result.data){
          setActiveModal(null)
          setHappy("Dashboard success delete")
        }
      }
    })
  };

return (
    <>
      <BaseModal
        modalName={'Dashboard'}
        subName={currentNodeData?.name}
        lastUpdateDatetime={currentNodeData?.syncLastDatetime}
        open={activeModal === 'DashboardMenu'}
        copyLink={window.location.origin + '/dashboard/' + currentNodeData?.uuid}
        reloadEntityType={NodeType.Dashboard}
        openModalType='graphSearch'
      >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          {
            currentNodeData && currentNodeData.dashboardUrl && (
              <>
                <div className='repo_link'>
                  <a style={{color: "#0077ff"}} target="_blank" href={(import.meta.env.VITE_SELF_URI || window.env.VITE_SELF_URI) + currentNodeData.dashboardUrl.slice(1)}>Grafana Link</a>
                  <button className='repo_link_button' onClick={() => (copyToClipboard((import.meta.env.VITE_SELF_URI || window.env.VITE_SELF_URI) + currentNodeData.dashboardUrl.slice(1)))}>
                    <img src={copy_img} width="24" height="24" alt="Back"/>
                  </button>
                </div>
              </>
            )
          }
          {
            currentNodeData && currentNodeData.incLastVersion && (
                <div className='div_unit_message'>
                    Version: {currentNodeData.incLastVersion}
                </div>
            )
          }
          {
            currentNodeData && currentNodeData.syncStatus && (
                <div className='div_unit_message'>
                    Sync status: {stringToFormat(currentNodeData.syncStatus)}
                </div>
            )
          }
          {
            currentNodeData && currentNodeData.syncError && (
                <div className="result_angry">
                    <img src={angry_img} width="36" height="36" />
                    <div className={"result_angry_message"}>
                        {stringToFormat(currentNodeData.syncError)}
                    </div>
                </div>
            )
          }
          <button className="button_add_alter" onClick={() => openModal('panelManagment')}>
            Panels Managment
          </button>
          {
            user && currentNodeData && (
              <>

                {
                  user.uuid == currentNodeData.creatorUuid && (
                    <div className='div_statistics'>
                      <button className="button_open_alter" onClick={() => openModal('dashboardSettingsMenu')}>
                        Settings
                      </button>
                    </div>
                  )
                }

              </>
            )
          }
          {
            currentNodeData && (
              <button className="button_add_alter" onClick={() => handleSyncDashboard()}>
                Send Dashboard to Grafana
              </button>
            )
          }
        </div>
      </BaseModal>
      <BaseModal
        modalName='Create Dashboard'
        open={activeModal === 'createDashboard'}
        openModalType='graphSearch'
      >
        <CreateDashboardForm/>
      </BaseModal>
      <BaseModal
        modalName='Create Dashboard Panel'
        open={activeModal === 'createDashboardPanel'}
        openModalType='panelManagment'
      >
        <CreateDashboardPanelForm/>
      </BaseModal>
      <BaseModal
        modalName='Settings'
        subName={currentNodeData?.name}
        open={activeModal === 'dashboardSettingsMenu'}
        openModalType='DashboardMenu'
        >
        <div className="modal_menu_content">
          {
            isLoaderActive && (<Spinner/>)
          }
          <button className="button_del_alter" onClick={handleDeleteDashboard}>
            Delete Dashboard
          </button>
        </div>
      </BaseModal>
      <BaseModal
        modalName={'Panels Managment'}
        subName={currentNodeData?.name}
        open={activeModal === 'panelManagment'}
        openModalType='DashboardMenu' 
      >
        <DashboardPanelsForm/>
      </BaseModal>
      <BaseModal
        modalName={'Panel'}
        subName={currentDashboardPanelData?.title}
        open={activeModal === 'unitNodesPanel'}
        openModalType='panelManagment' 
      >
        <UnitNodesPanelForm/>
      </BaseModal>
    </>
  )
}
