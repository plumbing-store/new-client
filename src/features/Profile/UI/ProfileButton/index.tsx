'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import Popover from '@/shared/UI/Popover'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { logOut } from '@/shared/helpers/logout'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const ProfileButton = () => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const router = useRouter()

    const [storedToken, setStoredToken] = useLocalStorage<string | null>('token', null)

    const { account, setAccount } = useAuthStore()

    const handleOptionClick = (value: string) => {
        if (value === 'LOGOUT') {
            router.push('/')

            setAccount(null)
            setStoredToken(null)

            setIsPopoverVisible(false)

            return
        }

        router.push(value)

        setIsPopoverVisible(false)
    }

    const profileOptions = [
        {
            name: 'Персональные данные',
            value: '/profile'
        },
        {
            name: 'История заказов',
            value: '/orders'
        },
        {
            name: 'Выход',
            value: 'LOGOUT'
        }
    ]

    const handleClick = () => {
        if (account) {
            setIsPopoverVisible(!isPopoverVisible)
        } else {
            router.push('/login')
        }
    }

    return (
        <div className={styles.profileWrapper}>
            <button className={styles.button} onClick={() => handleClick()}>
                <PersonIcon style={{ fontSize: 30 }} />
            </button>
            {isPopoverVisible && (
                <Popover
                    options={profileOptions}
                    isHidden={!isPopoverVisible}
                    setIsHidden={setIsPopoverVisible}
                    onClick={handleOptionClick}
                />
            )}
        </div>
    )
}

export default ProfileButton
