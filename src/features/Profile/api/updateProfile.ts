import { axiosInstance } from '@/shared/api/axiosInstance'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'

export interface IProfileUpdateData {
    name?: string
    phone?: string
    number?: string
    address?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export const updateProfile = async (profileData: IProfileUpdateData) => {
    try {
        const { data } = await axiosInstance.post('/update', profileData)

        return data
    } catch (error) {
        throw new Error('Error updating profile')
    }
}
