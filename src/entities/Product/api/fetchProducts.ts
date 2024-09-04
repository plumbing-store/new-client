import { axiosInstance } from '@/shared/api/axiosInstance'
import { quantity as defaultValue } from '@/entities/Category/model/constants'

export const fetchProducts = async (
    categoryId: number,
    params: {
        quantity: number
        skip: number
        filter: Record<string, string>
        sort: string
        sortInverse: boolean
    }
) => {
    try {
        const {
            data: { result: products, total }
        } = await axiosInstance.get(`/categories/${categoryId}/products`, { params })

        return {
            products,
            total
        }
    } catch (error) {
        console.error('Error fetching categories:', error)
    }
}
