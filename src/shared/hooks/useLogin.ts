import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { fetchLoginData } from '@/features/Authentication/api/fetchLoginData'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'

export const useLogin = () => {
    const [, setStoredToken] = useLocalStorage<string | null>('token', null)
    const [, setStoredRefreshToken] = useLocalStorage<string | null>('refreshToken', null)

    const logIn = async (login: string, password: string) => {
        try {
            const data = await fetchLoginData(login, password)

            setStoredToken(data.result)

            return data
        } catch (error) {
            console.log(error)

            throw new Error('Login failed')
        }
    }

    return { logIn }
}
