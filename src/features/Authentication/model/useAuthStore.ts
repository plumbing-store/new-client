import { create } from 'zustand'

export type IUser = any

interface IState {
    user: IUser | null
    setUser: (user: IUser) => void
}

export const useAuthStore = create<IState>((set) => ({
    user: null,
    setUser: (user) => set({ user })
}))
