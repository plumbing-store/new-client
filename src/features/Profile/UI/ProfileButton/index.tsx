'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import Popover from '@/shared/UI/Popover'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { logOut } from '@/shared/helpers/logout'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const ProfileButton = () => {
    const [isPopoverHidden, setIsPopoverHidden] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    const [storedToken, setStoredToken] = useLocalStorage<string | null>('token', null)

    const { account, setAccount } = useAuthStore()

    const handleOptionClick = (value: string) => {
        setIsPopoverHidden(true)

        if (value === 'LOGOUT') {
            console.log(pathname)

            if (['/cart', '/profile', '/orders', '/cashback'].includes(pathname)) {
                router.push('/')
            }

            setAccount(null)
            setStoredToken(null)

            return
        }

        router.push(value)
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
            setIsPopoverHidden(false)
        } else {
            router.push('/login')
        }
    }

    return (
        <div className={styles.profileWrapper}>
            <button className={styles.button} onClick={() => handleClick()}>
                <PersonIcon style={{ fontSize: 30 }} />
            </button>
            {!isPopoverHidden && (
                <Popover
                    options={profileOptions}
                    isHidden={isPopoverHidden}
                    setIsHidden={setIsPopoverHidden}
                    onClick={handleOptionClick}
                />
            )}
        </div>
    )
}

export default ProfileButton
