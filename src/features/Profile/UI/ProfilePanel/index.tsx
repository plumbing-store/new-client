'use client'

import React from 'react'

import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'
import ProfileForm from '@/features/Profile/UI/ProfileForm'
import { Language } from '@/shared/types/languages'
import { useLanguage } from '@/app/providers/LanguageProvider'

const localization = {
    profile: {
        [Language.EN]: 'Profile',
        [Language.RU]: 'Профиль',
        [Language.TR]: 'Profil'
    }
}

const ProfilePanel = () => {
    const { language } = useLanguage()

    return (
        <div className={styles.wrapper}>
            <PageTitle>{localization.profile[language]}</PageTitle>
            <ProfileForm />
        </div>
    )
}

export default ProfilePanel
