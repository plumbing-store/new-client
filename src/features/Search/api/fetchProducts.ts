import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchProducts = async (params: { search: string; quantity: number; skip: number }) => {
    try {
        const {
            data: { result: products, total }
        } = await axiosInstance.get(`/products`, { params })

        return {
            products,
            total
        }
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}
