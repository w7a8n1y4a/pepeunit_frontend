import React from 'react'
import ReactDOM from 'react-dom'
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { 
    UnitNodeTypeEnum,
    useGetRepoLazyQuery,
    useGetUnitLazyQuery,
    useGetUnitNodeLazyQuery,
    useGetRepositoryRegistryLazyQuery,
    useGetDashboardLazyQuery
} from '@rootTypes/compositionFunctions'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import ResultQuery from '@primitives/resultQuery'
import close_img from '/images/close.svg'
import back_img from '/images/back.svg'
import reload_img from '/images/reload.svg'
import copy_img from '/images/copy.svg'
import copyToClipboard from '@utils/copyToClipboard'
import './baseModal.css'

import { useGraphStore } from '@stores/graphStore';

import useModalHandlers from '@handlers/useModalHandlers';
import { useNodeStore } from '@stores/baseStore';

interface ModalProps {
    modalName: string
    subName?: string
    visibilityLevel?: string
    lastUpdateDatetime?: string
    children: React.ReactNode
    open: boolean
    openModalType?: string
    reloadEntityType?: NodeType | UnitNodeTypeEnum
    copyLink?: string
}

export default function BaseModal({modalName, subName, visibilityLevel, lastUpdateDatetime, children, open, openModalType, reloadEntityType, copyLink}: ModalProps) {
    const { openModal, closeModal } = useModalHandlers();
    const { runAsync } = useAsyncHandler();
    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const { updateNodeDataById } = useGraphStore();

    const [getDashboard] = useGetDashboardLazyQuery();
    const [getRepositoryRegistry] = useGetRepositoryRegistryLazyQuery();
    const [getRepo] = useGetRepoLazyQuery();
    const [getUnit] = useGetUnitLazyQuery();
    const [getUnitNode] = useGetUnitNodeLazyQuery();

    function updateData(reloadEntityType: NodeType | UnitNodeTypeEnum) {
        runAsync(async () => {
            let targetdata = null

            if (reloadEntityType == NodeType.Dashboard){
                let result = await getDashboard({
                    variables: {uuid: currentNodeData.uuid}
                })
                targetdata = result.data?.getDashboard
            }

            if (reloadEntityType == NodeType.Registry){
                let result = await getRepositoryRegistry({
                    variables: {uuid: currentNodeData.uuid}
                })
                targetdata = result.data?.getRepositoryRegistry
            }

            if (reloadEntityType == NodeType.Repo){
                let result = await getRepo({
                    variables: {uuid: currentNodeData.uuid}
                })
                targetdata = result.data?.getRepo
            }
    
            if (reloadEntityType == NodeType.Unit){
                let result = await getUnit({
                    variables: {uuid: currentNodeData.uuid}
                })
                targetdata = result.data?.getUnit
            }
    
            if (reloadEntityType == UnitNodeTypeEnum.Input || reloadEntityType == UnitNodeTypeEnum.Output){
                let result = await getUnitNode({
                    variables: {uuid: currentNodeData.uuid}
                })
                targetdata = result.data?.getUnitNode
                targetdata = {...targetdata, name: targetdata?.topicName}
            }

            if (targetdata?.uuid){
                if (targetdata.__typename != 'RepositoryRegistryType'){
                    updateNodeDataById(targetdata.uuid, targetdata)
                }
                setCurrentNodeData(targetdata)
            }

        })
    }
    return ReactDOM.createPortal(
        <dialog open={open}>
            <div className="modal_header">
                <div className="modal_name">
                    {modalName}
                    {
                        subName && (
                            <div className="modal_sub_name">
                                {subName}
                            </div>
                        )
                    }
                </div>
                <div className="div_modal_buttons">
                    {
                        copyLink && currentNodeData && (
                            <button className="modal_menu_button" onClick={() => (copyToClipboard(copyLink))}>
                                <img src={copy_img} width="20" height="20" alt="Reload"/>
                            </button>
                        )
                    }
                    {
                        reloadEntityType && currentNodeData && (
                            <button className="modal_menu_button" onClick={() => updateData(reloadEntityType)}>
                                <img src={reload_img} width="20" height="20" alt="Reload"/>
                            </button>
                        )
                    }
                    {
                        openModalType && openModal && (
                            <button className="modal_menu_button" onClick={() => openModal(openModalType)}>
                                <img src={back_img} width="20" height="20" alt="Back"/>
                            </button>
                        )
                    }
                    <button className="modal_menu_button" onClick={closeModal}>
                        <img src={close_img} width="18" height="18" alt="Close"/>
                    </button>
                    {
                        visibilityLevel && (
                            <div className="modal_sub_name">
                                {visibilityLevel}
                            </div>
                        )
                    }
                </div>
            </div>
            {children}
            {
                lastUpdateDatetime && (
                    <div className="modal_last_update">
                        last update: {lastUpdateDatetime.replace("T", " ").split(".")[0]}
                    </div>
                )
            }
            <ResultQuery/>
        </dialog>,
        document.body
    )
}
