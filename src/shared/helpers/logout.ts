import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'

export const logOut = (router: AppRouterInstance) => {
    localStorage.removeItem('token')

    router.push('/')
}
