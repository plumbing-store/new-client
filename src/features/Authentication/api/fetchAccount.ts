import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchAccount = async () => {
    try {
        const {
            data: { result: data }
        } = await axiosInstance.get('/account')

        return data
    } catch (error) {
        throw new Error('Error receiving the account')
    }
}
