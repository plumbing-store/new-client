'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import Popover from '@/shared/UI/Popover'
import { useRouter } from 'next/navigation'

const ProfileButton = () => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const router = useRouter()

    const handleOptionClick = (value: string) => {
        if (value === 'LOGOUT') {
            // Логика выхода
            console.log('Logging out...')
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

    return (
        <div className={styles.profileWrapper}>
            <button
                className={styles.button}
                onClick={() => setIsPopoverVisible(!isPopoverVisible)}
            >
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
