import { axiosInstance } from '@/shared/api/axiosInstance'

export const deleteProduct = async (
    id: number,
    payload: { productId: number; priceId: number }
) => {
    try {
        const { data } = await axiosInstance.delete(`/carts/${id}/products`, {
            data: payload
        })

        return data
    } catch (error) {
        console.log('Error deleting product:', error)
    }
}
