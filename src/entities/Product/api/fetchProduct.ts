import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchProduct = async (identity: string) => {
    try {
        const {
            data: { result: product, breadcrumbs }
        } = await axiosInstance.get(`/products/${identity}`)

        return {
            product,
            breadcrumbs
        }
    } catch (error) {
        console.error('An error occurred while fetching product data:', error)
    }
}
