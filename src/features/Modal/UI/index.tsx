'use client'

import React, { ReactNode, useEffect } from 'react'
import styles from './styles.module.scss'
import { useOverlayStore } from '@/features/Overlay/model/store'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    children: ReactNode
    isHidden: boolean
    onClose: () => void
}

const Modal = ({ children, isHidden, onClose }: Props) => {
    const { isOverlayHidden, setIsOverlayHidden } = useOverlayStore()

    useEffect(() => {
        if (isOverlayHidden) {
            onClose()
        }
    }, [isOverlayHidden])

    useEffect(() => {
        setIsOverlayHidden(isHidden)
    }, [isHidden])

    if (isHidden) {
        return null
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <button className={styles.closeButton} onClick={() => onClose()}>
                    <CloseIcon className={styles.icon} />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
