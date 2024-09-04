import { axiosInstance } from '@/shared/api/axiosInstance'

export const createOrder = async (payload: { name: string; cartId: number }) => {
    try {
        const {
            data: { result: order }
        } = await axiosInstance.post('/orders', payload)

        return order
    } catch (error) {
        console.log('Error creating orders', error)
    }
}
