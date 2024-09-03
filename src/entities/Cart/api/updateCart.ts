import { axiosInstance } from '@/shared/api/axiosInstance'

export const updateCart = async (
    id: number,
    payload: {
        productId: number
        priceId: number
        quantity: number
    }
) => {
    try {
        const { data } = await axiosInstance.patch(`/carts/${id}/products`, payload)

        return data
    } catch (error) {
        console.log('Error updating cart:', error)
    }
}
