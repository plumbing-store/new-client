'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import PersonIcon from '@mui/icons-material/Person'

const ProfileButton = () => {
    const router = useRouter()

    return (
        <button className={styles.button} onClick={() => router.push('/profile')}>
            <PersonIcon style={{ fontSize: 30 }} />
        </button>
    )
}

export default ProfileButton
