'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useOverlayStore } from '@/features/Overlay/model/store'

const Overlay = () => {
    const { isOverlayHidden, setIsOverlayHidden } = useOverlayStore()

    if (isOverlayHidden) {
        return null
    }

    return <div className={styles.overlay} onClick={() => setIsOverlayHidden(true)} />
}

export default Overlay
