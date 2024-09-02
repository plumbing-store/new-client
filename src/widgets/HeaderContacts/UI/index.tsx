import React from 'react'
import styles from './styles.module.scss'
import { workEmail, workPhoneNumber } from '@/shared/constants'

const HeaderContacts = () => {
    return (
        <div className={styles.wrapper}>
            <div>{workPhoneNumber}</div>
            <div>{workEmail}</div>
        </div>
    )
}

export default HeaderContacts
