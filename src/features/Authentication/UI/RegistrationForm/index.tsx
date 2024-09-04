'use client'

import React, { ChangeEvent, useMemo, useState } from 'react'
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
import { useLanguage } from '@/app/providers/LanguageProvider'
import { Language } from '@/shared/types/languages'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { register } from '@/features/Authentication/api/register'

const localization = {
    register: {
        [Language.EN]: 'Register',
        [Language.RU]: 'Регистрация'
    },
    continue: {
        [Language.EN]: 'Continue',
        [Language.RU]: 'Продолжить'
    },
    name: {
        [Language.EN]: 'Name',
        [Language.RU]: 'Имя'
    },
    phone: {
        [Language.EN]: 'Phone',
        [Language.RU]: 'Телефон'
    },
    address: {
        [Language.EN]: 'Address',
        [Language.RU]: 'Адрес'
    },
    email: {
        [Language.EN]: 'Email',
        [Language.RU]: 'Электронная почта'
    },
    password: {
        [Language.EN]: 'Password',
        [Language.RU]: 'Пароль'
    },
    confirmPassword: {
        [Language.EN]: 'Confirm Password',
        [Language.RU]: 'Подтвердите пароль'
    },
    login: {
        [Language.EN]: 'Login',
        [Language.RU]: 'Логин'
    },
    passwordsDoNotMatch: {
        [Language.EN]: 'Passwords do not match',
        [Language.RU]: 'Пароли не совпадают'
    },
    registrationWasSuccessful: {
        [Language.EN]: 'Registration was successful',
        [Language.RU]: 'Регистрация прошла успешно'
    },
    somethingWentWrong: {
        [Language.EN]: 'Something went wrong',
        [Language.RU]: 'Что-то пошло не так'
    }
}

const RegistrationForm = () => {
    const router = useRouter()
    const { language } = useLanguage()

    // Состояние для переключения между этапами
    const [step, setStep] = useState(1)

    // Валидация для первого этапа (логин и пароли)
    const FirstStepSchema = useMemo(
        () =>
            createObjectValidator({
                login: createFieldValidator(language).isRequired().min(10).max(12),
                password: createFieldValidator(language).isRequired().min(10).max(100),
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

    // Валидация для второго этапа (остальные поля)
    const SecondStepSchema = useMemo(
        () =>
            createObjectValidator({
                name: createFieldValidator(language).isRequired().min(2).max(100),
                phone: createFieldValidator(language)
                    .isRequired()
                    .isPhoneNumber('Некорректный номер телефона'),
                address: createFieldValidator(language).isRequired().max(200),
                email: createFieldValidator(language).isRequired().isEmail('Некорректный email')
            }),
        [language]
    )

    const onSubmit = async () => {
        try {
            await register({
                login: firstStepValues.login,
                password: firstStepValues.password,
                phone: secondStepValues.phone,
                name: secondStepValues.name,
                address: secondStepValues.address,
                email: secondStepValues.email
            })

            notify(NotificationStatus.Success, localization.registrationWasSuccessful[language])

            router.push('/login')
        } catch (error) {
            notify(NotificationStatus.Danger, localization.somethingWentWrong[language])
        }
    }

    // Работа с формой для первого этапа (логин и пароли)
    const {
        values: firstStepValues,
        errors: firstStepErrors,
        isLoading: isFirstStepLoading,
        handleChange: handleFirstStepChange,
        handleSubmit: handleFirstStepSubmit
    } = useFormSubmit(
        { initialValues: { login: '', password: '', confirmPassword: '' } },
        FirstStepSchema,
        async () => setStep(2) // Переход ко второму этапу после успешной валидации первого
    )

    // Работа с формой для второго этапа (остальные поля)
    const {
        values: secondStepValues,
        errors: secondStepErrors,
        isLoading: isSecondStepLoading,
        handleChange: handleSecondStepChange,
        handleSubmit: handleSecondStepSubmit
    } = useFormSubmit(
        {
            initialValues: {
                name: '',
                phone: '',
                address: '',
                email: ''
            }
        },
        SecondStepSchema,
        onSubmit // Отправка всех данных на втором этапе
    )

    return (
        <div className={styles.form}>
            {step === 1 && (
                <>
                    <h2 className={styles.heading}>{localization.register[language]}</h2>
                    <div className={styles.fields}>
                        <Input
                            placeholder={localization.login[language]}
                            value={firstStepValues.login}
                            hint={extractFieldError(firstStepErrors, 'login')}
                            type='text'
                            isValid={!firstStepErrors.login}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleFirstStepChange('login', event.target.value)
                            }
                        />
                        <Input
                            placeholder={localization.password[language]}
                            value={firstStepValues.password}
                            hint={extractFieldError(firstStepErrors, 'password')}
                            type='password'
                            isValid={!firstStepErrors.password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleFirstStepChange('password', event.target.value)
                            }
                        />
                        <Input
                            placeholder={localization.confirmPassword[language]}
                            value={firstStepValues.confirmPassword}
                            hint={extractFieldError(firstStepErrors, 'confirmPassword')}
                            type='password'
                            isValid={!firstStepErrors.confirmPassword}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleFirstStepChange('confirmPassword', event.target.value)
                            }
                        />
                    </div>
                    <Button onClick={() => handleFirstStepSubmit()} isLoading={isFirstStepLoading}>
                        {localization.continue[language]}
                    </Button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className={styles.heading}>{localization.register[language]}</h2>
                    <div className={styles.fields}>
                        <Input
                            placeholder={localization.name[language]}
                            value={secondStepValues.name}
                            hint={extractFieldError(secondStepErrors, 'name')}
                            type='text'
                            isValid={!secondStepErrors.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSecondStepChange('name', event.target.value)
                            }
                        />
                        <Input
                            placeholder={localization.phone[language]}
                            value={secondStepValues.phone}
                            hint={extractFieldError(secondStepErrors, 'phone')}
                            type='tel'
                            isValid={!secondStepErrors.phone}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSecondStepChange('phone', event.target.value)
                            }
                        />
                        <Input
                            placeholder={localization.address[language]}
                            value={secondStepValues.address}
                            hint={extractFieldError(secondStepErrors, 'address')}
                            type='text'
                            isValid={!secondStepErrors.address}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSecondStepChange('address', event.target.value)
                            }
                        />
                        <Input
                            placeholder={localization.email[language]}
                            value={secondStepValues.email}
                            hint={extractFieldError(secondStepErrors, 'email')}
                            type='email'
                            isValid={!secondStepErrors.email}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSecondStepChange('email', event.target.value)
                            }
                        />
                    </div>
                    <div className={styles.bottom}>
                        <button className={styles.button} onClick={() => setStep(1)}>
                            <ArrowBackIcon />
                        </button>
                        <Button
                            onClick={() => handleSecondStepSubmit()}
                            isLoading={isSecondStepLoading}
                        >
                            {localization.continue[language]}
                        </Button>
                    </div>
                </>
            )}

            {step === 1 && (
                <div className={styles.hint}>
                    Уже есть аккаунт? <Link href='/login'>Войти</Link>
                </div>
            )}
        </div>
    )
}

export default RegistrationForm
