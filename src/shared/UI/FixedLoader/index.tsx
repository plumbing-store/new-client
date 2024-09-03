import React from 'react'
import styles from './styles.module.scss'
import Loader from '@/shared/UI/Loader'

const FixedLoader = () => {
    return (
        <div className={styles.wrapper}>
            <Loader />
        </div>
    )
}

export default FixedLoader
