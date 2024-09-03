import { create } from 'zustand'

export interface ICart {
    id: number
    companyId: number
    data: any[]
    createdAt: string
    updatedAt: string
}

export interface IAccount {
    id: number
    externalId: string
    number: number
    name: string
    priceName: string
    phone: string
    passwordHash: string
    address: string
    email: string
    createdAt: string
    updatedAt: string
    orders: any[]
    cart: ICart
}

interface IState {
    account: IAccount | null
    setAccount: (account: IAccount) => void
}

export const useAuthStore = create<IState>((set) => ({
    account: null,
    setAccount: (account) => set({ account })
}))
