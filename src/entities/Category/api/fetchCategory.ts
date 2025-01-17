import { axiosInstance } from '@/shared/api/axiosInstance'
import { quantity } from '@/entities/Category/model/constants'

export const fetchCategory = async (identity: string) => {
    try {
        const { data } = await axiosInstance.get(
            `/categories/${identity}?quantity=${quantity}&sort=price&sortInverse=true`
        )

        return data
    } catch (error) {
        console.error('Error fetching category:', error)
    }
}
