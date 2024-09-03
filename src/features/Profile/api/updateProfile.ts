import { axiosInstance } from '@/shared/api/axiosInstance'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'

export interface IProfileUpdateData {
    name?: string
    phone?: string
    password?: string
    confirmPassword?: string
}

export const updateProfile = async (profileData: IProfileUpdateData) => {
    try {
        const { account } = useAuthStore.getState()

        if (!account) return

        const { data } = await axiosInstance.post('/update', {
            ...profileData,
            number: account.number
        })

        return data
    } catch (error) {
        throw new Error('Error updating profile')
    }
}
