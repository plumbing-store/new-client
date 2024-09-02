import axios, { AxiosResponse } from 'axios'

// import { toCamelCase, toSnakeCase } from '@/shared/helpers/convertCase'
// import { refresh } from '@/features/Authentication/api/refresh'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const tokenPaths = ['/account']

        if (tokenPaths.includes(config.url || '')) {
            const token = JSON.parse(localStorage.getItem('token') || 'null')

            if (token) {
                config.headers.Authorization = token
            }
        } else {
            delete config.headers.Authorization
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const storedRefreshToken = JSON.parse(
                    localStorage.getItem('refreshToken') || 'null'
                )
                if (!storedRefreshToken) {
                    return Promise.reject(error)
                }

                // const { accessToken, refreshToken } = await refresh(storedRefreshToken)
                //
                // localStorage.setItem('token', JSON.stringify(accessToken))
                // localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
                //
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                //
                // originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)
