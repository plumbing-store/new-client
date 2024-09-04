import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { PriceName } from '@/entities/Price/model/types'

export const useAuthorization = () => {
    const { account } = useAuthStore()

    const hasPermission = (requiredPriceName: PriceName): boolean => {
        return account?.priceName === requiredPriceName
    }

    return { hasPermission }
}
