'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ProfileButton = () => {
    const router = useRouter()

    return (
        <button className={styles.button} onClick={() => router.push('/profile')}>
            <AccountCircleIcon style={{ fontSize: 36 }} />
        </button>
    )
}

export default ProfileButton
