'use client'

import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loading from '@/shared/UI/Loading'

const AuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
    const { account } = useAuthStore()

    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        if (!account) {
            router.push('/')
        }

        setIsLoading(false)
    }, [account])

    if (isLoading) {
        return <Loading />
    }

    return <>{children}</>
}

export default AuthGuardProvider
