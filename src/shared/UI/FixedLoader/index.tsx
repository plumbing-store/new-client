import React from 'react'
import styles from './styles.module.scss'
import Loader from '@/shared/UI/Loader'
import { useScreenSizeStore } from '@/shared/store/screenSize'

const FixedLoader = () => {
    const { screenSize } = useScreenSizeStore()

    return (
        <div className={styles.wrapper}>
            <Loader size={screenSize > 992 ? 50 : 30} />
        </div>
    )
}

export default FixedLoader
