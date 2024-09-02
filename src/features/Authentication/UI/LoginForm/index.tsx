'use client'

import React, { ChangeEvent, useMemo } from 'react'
import Input from '@/shared/UI/Input'
import {
    createFieldValidator,
    createObjectValidator,
    extractFieldError
} from '@/shared/helpers/validators'
import styles from './styles.module.scss'
import Button from '@/shared/UI/Button'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'
import { useRouter } from 'next/navigation'
import useFormSubmit from '@/shared/hooks/useFormSubmit'
import { useLogin } from '@/shared/hooks/useLogin'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { Language } from '@/shared/types/languages'

const localization = {
    enter: {
        [Language.EN]: 'Enter',
        [Language.RU]: 'Войти'
    },
    continue: {
        [Language.EN]: 'Continue',
        [Language.RU]: 'Продолжить'
    },
    login: {
        [Language.EN]: 'Login',
        [Language.RU]: 'Логин'
    },
    password: {
        [Language.EN]: 'Password',
        [Language.RU]: 'Пароль'
    },
    authorizationWasSuccessful: {
        [Language.EN]: 'Authorization was successful',
        [Language.RU]: 'Авторизация прошла успешно'
    },
    somethingWentWrong: {
        [Language.EN]: 'Something went wrong',
        [Language.RU]: 'Что-то пошло не так'
    }
}

const LoginForm = () => {
    const router = useRouter()

    const { logIn } = useLogin()

    const { language } = useLanguage()

    const Schema = useMemo(
        () =>
            createObjectValidator({
                login: createFieldValidator(language)
                    .isRequired()
                    .isNumber('Неверный формат ИНН')
                    .min(10)
                    .max(12),
                password: createFieldValidator(language).isRequired().max(100)
            }),
        [language]
    )

    const onSubmit = async (values: { login: string; password: string }) => {
        try {
            await logIn(values.login, values.password)

            notify(NotificationStatus.Success, localization.authorizationWasSuccessful[language])

            router.push('/')
        } catch (error) {
            notify(NotificationStatus.Danger, localization.somethingWentWrong[language])
        }
    }

    const { values, errors, isLoading, handleChange, handleSubmit } = useFormSubmit(
        { initialValues: { login: '', password: '' } },
        Schema,
        onSubmit
    )

    const fields = useMemo(
        () => [
            {
                placeholder: localization.login[language],
                value: values.login,
                hint: extractFieldError(errors, 'login'),
                type: 'text',
                isValid: !errors.login,
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleChange('login', event.target.value)
            },
            {
                placeholder: localization.password[language],
                value: values.password,
                hint: extractFieldError(errors, 'password'),
                type: 'password',
                isValid: !errors.password,
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleChange('password', event.target.value)
            }
        ],
        [values, errors, language]
    )

    return (
        <div className={styles.form}>
            <h2 className={styles.heading}>{localization.enter[language]}</h2>
            <div className={styles.fields}>
                {fields.map((field, index) => (
                    <Input key={index} {...field} />
                ))}
            </div>
            <Button onClick={() => handleSubmit()} isLoading={isLoading}>
                {localization.continue[language]}
            </Button>
        </div>
    )
}

export default LoginForm
