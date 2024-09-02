import { axiosInstance } from '@/shared/api/axiosInstance'

export interface IProfileUpdateData {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    password?: string
    confirmPassword?: string
}

export const updateProfile = async (profileData: IProfileUpdateData) => {
    try {
        const { data } = await axiosInstance.patch('/users/me', profileData)
        return data
    } catch (error) {
        throw new Error('Error updating profile')
    }
}
