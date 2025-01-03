import React from 'react'
import ReactDOM from 'react-dom'
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { UnitNodeTypeEnum } from '@rootTypes/compositionFunctions'
import close_img from '/images/close.svg'
import back_img from '/images/back.svg'
import reload_img from '/images/reload.svg'
import './baseModal.css'

import useModalHandlers from '@handlers/useModalHandlers';

interface ModalProps {
    modalName: string
    children: React.ReactNode
    open: boolean
    openModalType?: string
    reloadEntityType?: NodeType | UnitNodeTypeEnum
}

export default function BaseModal({modalName, children, open, openModalType, reloadEntityType}: ModalProps) {
    const { openModal, closeModal } = useModalHandlers();
    
    return ReactDOM.createPortal(
        <dialog open={open}>
            {}
            <div className="modal_header">
                <div className="modal_name">
                    {modalName}
                </div>
                <div className="div_modal_buttons">
                    {
                        reloadEntityType && openModal && (
                            <button className="modal_menu_button" onClick={() => openModal(reloadEntityType)}>
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
                </div>
            </div>
            {children}
        </dialog>,
        document.body
    )
}
