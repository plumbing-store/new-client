import { axiosInstance } from '@/shared/api/axiosInstance'

export const fetchLoginData = async (login: string, password: string) => {
    try {
        const { data } = await axiosInstance.post('/login', {
            login,
            password
        })

        return data
    } catch (error) {
        console.log(error)

        throw new Error('Login failed')
    }
}
