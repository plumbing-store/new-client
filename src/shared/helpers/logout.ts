import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const logOut = (router: AppRouterInstance) => {
    localStorage.removeItem('token')

    router.push('/login')
}
