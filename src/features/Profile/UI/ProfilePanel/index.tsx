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
        [Language.RU]: 'Профиль'
    }
}

const ProfilePanel = () => {
    const { language } = useLanguage()

    return (
        <div className={styles.wrapper}>
            {/*<PageTitle>{localization.profile[language]}</PageTitle>*/}
            <ProfileForm />
            <div className={styles.notification}>
                Уважаемый клиент! Обращаем ваше внимание, что в связи с волатильностью курса валют и
                частыми изменениями цен у производителей, цены на сайте могут отличаться. Актуальная
                цена указана в коммерческом предложении. Спасибо за понимание!
            </div>
        </div>
    )
}

export default ProfilePanel
