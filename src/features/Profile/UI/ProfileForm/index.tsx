'use client'

import React, { useEffect, useMemo, useState } from 'react'

import styles from './styles.module.scss'
import Input from '@/shared/UI/Input'
import {
    createFieldValidator,
    createObjectValidator,
    extractFieldError
} from '@/shared/helpers/validators'
import Button from '@/shared/UI/Button'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'
import { IProfileUpdateData, updateProfile } from '@/features/Profile/api/updateProfile'
import useFormSubmit from '@/shared/hooks/useFormSubmit'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { logOut } from '@/shared/helpers/logout'
import { useRouter } from 'next/navigation'
import Select from '@/shared/UI/Select'
import { Language } from '@/shared/types/languages'
import { useLanguage } from '@/app/providers/LanguageProvider'

const localization = {
    save: {
        [Language.EN]: 'Save',
        [Language.RU]: 'Сохранить',
        [Language.TR]: 'Kaydet'
    },
    logout: {
        [Language.EN]: 'Logout',
        [Language.RU]: 'Выход',
        [Language.TR]: 'Cikis Yap'
    },
    name: {
        [Language.EN]: 'Name',
        [Language.RU]: 'Имя',
        [Language.TR]: 'Ad'
    },
    lastName: {
        [Language.EN]: 'Last Name',
        [Language.RU]: 'Фамилия',
        [Language.TR]: 'Soyad'
    },
    phoneNumber: {
        [Language.EN]: 'Phone number',
        [Language.RU]: 'Номер телефона',
        [Language.TR]: 'Telefon numarası'
    },
    password: {
        [Language.EN]: 'Password',
        [Language.RU]: 'Пароль',
        [Language.TR]: 'Sifre'
    },
    confirmPassword: {
        [Language.EN]: 'Confirm password',
        [Language.RU]: 'Подтвердите пароль',
        [Language.TR]: 'Sifreyi Onayla'
    },
    language: {
        [Language.EN]: 'Language',
        [Language.RU]: 'Язык',
        [Language.TR]: 'Dil'
    },
    profileUpdated: {
        [Language.EN]: 'Profile updated',
        [Language.RU]: 'Профиль обновлен',
        [Language.TR]: 'Profil bilgileri guncellendi'
    },
    updateFailed: {
        [Language.EN]: 'Profile update failed',
        [Language.RU]: 'Профиль не обновлен',
        [Language.TR]: 'Profil bilgileri guncellenemedi'
    },
    passwordsDoNotMatch: {
        [Language.EN]: 'Passwords do not match',
        [Language.RU]: 'Пароли не совпадают',
        [Language.TR]: 'Sifreler ayni degildir'
    }
}

const ProfileForm = () => {
    const { user } = useAuthStore()

    const { language, setLanguage } = useLanguage()

    const router = useRouter()

    const ProfileSchema = useMemo(
        () =>
            createObjectValidator({
                firstName: createFieldValidator(language).isRequired(),
                lastName: createFieldValidator(language).isRequired(),
                phoneNumber: createFieldValidator(language).isRequired().isPhoneNumber(),
                password: createFieldValidator(language),
                confirmPassword: createFieldValidator(language).custom((value, values) => {
                    if (values.password && !value) {
                        return localization.confirmPassword[language]
                    }

                    if ((value || values.password) && value !== values.password) {
                        return localization.passwordsDoNotMatch[language]
                    }

                    return null
                })
            }),
        [language]
    )

    const onSubmit = async (values: IProfileUpdateData) => {
        try {
            // check

            if (values.password === '') {
                delete values.password
                delete values.confirmPassword
            }

            await updateProfile(values)

            notify(NotificationStatus.Success, localization.profileUpdated[language])
        } catch (error) {
            notify(NotificationStatus.Danger, localization.updateFailed[language])
        }
    }

    const { values, errors, handleSubmit, handleChange, isLoading } = useFormSubmit(
        {
            initialValues: {
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                password: '',
                confirmPassword: ''
            }
        },
        ProfileSchema,
        onSubmit
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.fields}>
                <Input
                    label={localization.name[language]}
                    value={values.firstName}
                    hint={extractFieldError(errors, 'firstName')}
                    isValid={!errors.firstName}
                    onChange={(event) => handleChange('firstName', event.target.value)}
                />
                <Input
                    label={localization.lastName[language]}
                    value={values.lastName}
                    hint={extractFieldError(errors, 'lastName')}
                    isValid={!errors.lastName}
                    onChange={(event) => handleChange('lastName', event.target.value)}
                />
                <Input
                    label={`${localization.phoneNumber[language]} (+79005005050)`}
                    value={values.phoneNumber}
                    hint={extractFieldError(errors, 'phoneNumber')}
                    isValid={!errors.phoneNumber}
                    onChange={(event) => handleChange('phoneNumber', event.target.value)}
                />
                <div className={styles.horizontalFields}>
                    <Input
                        label={localization.password[language]}
                        value={values.password}
                        hint={extractFieldError(errors, 'password')}
                        isValid={!errors.password}
                        onChange={(event) => handleChange('password', event.target.value)}
                        type='password'
                    />
                    <Input
                        label={localization.confirmPassword[language]}
                        value={values.confirmPassword}
                        hint={extractFieldError(errors, 'confirmPassword')}
                        isValid={!errors.confirmPassword}
                        onChange={(event) => handleChange('confirmPassword', event.target.value)}
                        type='password'
                    />
                </div>
                {/* check it */}
                <div className={styles.fields}>
                    <Select
                        label={localization.language[language]}
                        value={language}
                        options={Object.values(Language).map((language) => ({
                            name: language.toUpperCase(),
                            value: language
                        }))}
                        onChange={(value) => setLanguage(value)}
                    />
                </div>
            </div>
            <Button isLoading={isLoading} onClick={() => handleSubmit()}>
                {localization.save[language]}
            </Button>
        </div>
    )
}

export default ProfileForm
