import React from 'react'
import ReactDOM from 'react-dom'
import close_img from '/images/close.svg'

interface ModalProps {
    children: React.ReactNode
    open: boolean
    closeModal: () => void
}

export default function BaseModal({children, open, closeModal}: ModalProps) {
    return ReactDOM.createPortal(
        <dialog open={open}>
            <button className="close" onClick={closeModal}>
                <img src={close_img} width="16" height="16" alt="Close"/>
            </button>
            {children}
        </dialog>,
        document.body
    )
}
