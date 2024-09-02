import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchCategories = async () => {
    try {
        const {
            data: { result: data }
        } = await axiosInstance.get('/categories?highest=true')

        return data
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}
