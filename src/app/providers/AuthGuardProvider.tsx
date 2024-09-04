'use client'

import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useRouter } from 'next/navigation'

const AuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
    const { account } = useAuthStore()

    const router = useRouter()

    if (!account) {
        router.push('/login')

        return
    }

    return <>{children}</>
}

export default AuthGuardProvider
