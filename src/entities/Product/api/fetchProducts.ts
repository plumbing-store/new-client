import { axiosInstance } from '@/shared/api/axiosInstance'
import { quantity as defaultValue } from '@/entities/Category/model/constants'

export const fetchProducts = async (
    categoryId: number,
    quantity: number = defaultValue,
    skip: number = 0,
    filter: Record<string, string> = {} as Record<string, string>,
    sort: 'price' | 'name' = 'price',
    sortInverse: boolean = false
) => {
    try {
        const params: Record<string, any> = {
            quantity,
            skip,
            filter,
            sort,
            sortInverse
        }

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
