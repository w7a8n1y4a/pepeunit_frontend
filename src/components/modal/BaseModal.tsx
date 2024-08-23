import React from 'react'
import ReactDOM from 'react-dom'
import close_img from '/images/close.svg'
import './BaseModal.css'

interface ModalProps {
    modalName: string
    children: React.ReactNode
    open: boolean
    closeModal: () => void
}

export default function BaseModal({modalName, children, open, closeModal}: ModalProps) {
    return ReactDOM.createPortal(
        <dialog open={open}>
            <div className="modal_name">
                {modalName}
            </div>
            <button className="close_modal" onClick={closeModal}>
                <img src={close_img} width="16" height="16" alt="Close"/>
            </button>
            {children}
        </dialog>,
        document.body
    )
}
