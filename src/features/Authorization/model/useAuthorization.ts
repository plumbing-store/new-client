import { useAuthStore } from '@/features/Authentication/model/useAuthStore'

export const useAuthorization = () => {
    const { user } = useAuthStore()

    const hasPermission = (requiredRole: string): boolean => {
        return user?.role === requiredRole
    }

    return { hasPermission }
}
