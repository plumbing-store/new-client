'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useRouter } from 'next/navigation'
import Loading from '@/shared/UI/Loading'
import { fetchAccount } from '@/features/Authentication/api/fetchAccount'
import { logOut } from '@/shared/helpers/logout'
import { Role, Roles } from '@/shared/enums/roles'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'
import { Language } from '@/shared/types/languages'
import { getCookie } from '@/shared/helpers/getCookie'
import { setCookie } from '@/shared/helpers/setCookie'

const localization = {
    inappropriateRole: {
        [Language.EN]: 'Inappropriate role',
        [Language.RU]: 'Пока недоступно'
    }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { setUser } = useAuthStore()

    const [storedToken, setStoredToken] = useLocalStorage<string | null>('token', null)

    const [isLoading, setIsLoading] = useState(true)

    const logOutAndReset = useCallback(() => {
        logOut(router)
        setIsLoading(false)
    }, [router])

    const notifyInappropriateRole = useCallback(() => {
        const languageCookie = getCookie('language')
        const language = (languageCookie ? languageCookie : 'en') as Language

        notify(NotificationStatus.Danger, localization.inappropriateRole[language])
    }, [])

    const handleRedirect = useCallback(() => {
        notifyInappropriateRole()

        logOutAndReset()
    }, [notifyInappropriateRole, logOutAndReset])

    const checkRoleAndRedirect = useCallback(
        async (role: Role) => {
            if (role !== Roles.Admin) {
                await handleRedirect()
            }
        },
        [handleRedirect]
    )

    const initializeAuth = useCallback(async () => {
        setIsLoading(true)

        if (storedToken) {
            const account = await fetchAccount()

            console.log(account)

            if (account) {
                setUser(account)
                setCookie('role', account.role)

                // await checkRoleAndRedirect(user.role)
            }
        }

        setIsLoading(false)
    }, [storedToken, setUser, checkRoleAndRedirect, logOutAndReset])

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    if (isLoading) {
        return <Loading />
    }

    return <>{children}</>
}

export default AuthProvider
