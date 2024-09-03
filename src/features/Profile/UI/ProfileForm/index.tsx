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
        [Language.RU]: 'Сохранить'
    },
    logout: {
        [Language.EN]: 'Logout',
        [Language.RU]: 'Выход'
    },
    name: {
        [Language.EN]: 'Name',
        [Language.RU]: 'Имя'
    },
    lastName: {
        [Language.EN]: 'Last Name',
        [Language.RU]: 'Фамилия'
    },
    phone: {
        [Language.EN]: 'Phone number',
        [Language.RU]: 'Номер телефона'
    },
    password: {
        [Language.EN]: 'Password',
        [Language.RU]: 'Пароль'
    },
    confirmPassword: {
        [Language.EN]: 'Confirm password',
        [Language.RU]: 'Подтвердите пароль'
    },
    language: {
        [Language.EN]: 'Language',
        [Language.RU]: 'Язык'
    },
    profileUpdated: {
        [Language.EN]: 'Profile updated',
        [Language.RU]: 'Профиль обновлен'
    },
    updateFailed: {
        [Language.EN]: 'Profile update failed',
        [Language.RU]: 'Профиль не обновлен'
    },
    passwordsDoNotMatch: {
        [Language.EN]: 'Passwords do not match',
        [Language.RU]: 'Пароли не совпадают'
    },
    number: {
        [Language.EN]: 'INN',
        [Language.RU]: 'ИНН'
    },
    address: {
        [Language.EN]: 'Address',
        [Language.RU]: 'Адрес'
    },
    email: {
        [Language.EN]: 'Email',
        [Language.RU]: 'Электронная почта'
    }
}

const ProfileForm = () => {
    const { account } = useAuthStore()

    const { language, setLanguage } = useLanguage()

    const router = useRouter()

    const ProfileSchema = useMemo(
        () =>
            createObjectValidator({
                name: createFieldValidator(language).isRequired(),
                phone: createFieldValidator(language).isRequired().isPhoneNumber(),
                password: createFieldValidator(language),
                confirmPassword: createFieldValidator(language).custom((value, values) => {
                    if (values.password && !value) {
                        return localization.confirmPassword[language]
                    }

                    if ((value || values.password) && value !== values.password) {
                        return localization.passwordsDoNotMatch[language]
                    }

                    return null
                }),
                number: createFieldValidator(language).isRequired().isNumber().min(10).max(12),
                address: createFieldValidator(language).isRequired().min(5).max(100),
                email: createFieldValidator(language).isRequired().isEmail().max(100)
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

    if (!account) {
        return null
    }

    const { values, errors, handleSubmit, handleChange, isLoading } = useFormSubmit(
        {
            initialValues: {
                name: account.name,
                phone: account.phone,
                password: '',
                confirmPassword: '',
                number: account.number,
                address: account.address,
                email: account.email
            }
        },
        ProfileSchema,
        onSubmit
    )

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.fields}>
                    <Input
                        label={localization.name[language]}
                        value={values.name}
                        hint={extractFieldError(errors, 'name')}
                        isValid={!errors.name}
                        onChange={(event) => handleChange('name', event.target.value)}
                    />
                    <Input
                        label={`${localization.phone[language]} (+79005005050)`}
                        value={values.phone}
                        hint={extractFieldError(errors, 'phone')}
                        isValid={!errors.phone}
                        onChange={(event) => handleChange('phone', event.target.value)}
                    />
                    <Input
                        label={localization.number[language]}
                        value={values.number}
                        hint={extractFieldError(errors, 'number')}
                        isValid={!errors.number}
                        onChange={(event) => handleChange('number', event.target.value)}
                    />
                    <Input
                        label={localization.address[language]}
                        value={values.address}
                        hint={extractFieldError(errors, 'address')}
                        isValid={!errors.address}
                        onChange={(event) => handleChange('address', event.target.value)}
                    />
                    <Input
                        label={localization.email[language]}
                        value={values.email}
                        hint={extractFieldError(errors, 'email')}
                        isValid={!errors.email}
                        onChange={(event) => handleChange('email', event.target.value)}
                        type='email'
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
                            onChange={(event) =>
                                handleChange('confirmPassword', event.target.value)
                            }
                            type='password'
                        />
                    </div>
                </div>
                <Button
                    className={styles.button}
                    isLoading={isLoading}
                    onClick={() => handleSubmit()}
                >
                    {localization.save[language]}
                </Button>
            </div>
        </div>
    )
}

export default ProfileForm
