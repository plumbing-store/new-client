'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const ProfileButton = () => {
    const router = useRouter()

    return (
        <button onClick={() => router.push('/profile')}>
            <AccountCircleIcon />
        </button>
    )
}

export default ProfileButton
