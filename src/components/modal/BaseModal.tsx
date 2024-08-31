import React from 'react'
import ReactDOM from 'react-dom'
import close_img from '/images/close.svg'
import back_img from '/images/back.svg'
import './BaseModal.css'

interface ModalProps {
    modalName: string
    children: React.ReactNode
    open: boolean
    closeModal: () => void
    openModal?: (modalType: string) => void
    openModalType?: string
}

export default function BaseModal({modalName, children, open, closeModal, openModal, openModalType}: ModalProps) {
    return ReactDOM.createPortal(
        <dialog open={open}>
            <div className="modal_name">
                {modalName}
            </div>
            {
                openModalType && openModal && (
                    <button className="back_modal" onClick={() => openModal(openModalType)}>
                        <img src={back_img} width="20" height="20" alt="Back"/>
                    </button>
                )
            }
            <button className="close_modal" onClick={closeModal}>
                <img src={close_img} width="16" height="16" alt="Close"/>
            </button>
            {children}
        </dialog>,
        document.body
    )
}
