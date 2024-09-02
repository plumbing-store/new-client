import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchProperties = async (categoryId: string) => {
    try {
        const {
            data: { result: data }
        } = await axiosInstance.get(`/properties?categoryId=${categoryId}`)

        return data
    } catch (error) {
        console.error('Error fetching properties:', error)
    }
}
