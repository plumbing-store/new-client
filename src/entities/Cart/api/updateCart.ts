import { axiosInstance } from '@/shared/api/axiosInstance'

export const updateCart = async (
    id: number,
    productId: number,
    priceId: number,
    quantity: number
) => {
    try {
        const { data } = await axiosInstance.patch(`/carts/${id}/products`, {
            productId,
            priceId,
            quantity
        })

        return data
    } catch (error) {
        console.log('Error updating cart', error)
    }
}
