import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    children: React.ReactNode
    open: boolean
}

export default function BaseModal({children, open}: ModalProps) {
    return ReactDOM.createPortal(
        <dialog open={open}>{children}</dialog>,
        document.body
    )
}
