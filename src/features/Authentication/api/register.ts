import { axiosInstance } from '@/shared/api/axiosInstance'

export const register = async (payload: {
    login: string
    password: string
    phone: string
    name: string
    address: string
    email: string
}) => {
    try {
        const values = {
            password: payload.password,
            number: payload.login,
            phone: payload.phone,
            name: payload.name,
            address: payload.address,
            email: payload.email
        }

        const { data } = await axiosInstance.post('/update', values)

        return data
    } catch (error) {
        console.error(`Error while registering: ${error}`)
    }
}
