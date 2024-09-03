import { create } from 'zustand'
import { PriceName } from '@/entities/Price/model/types'

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
    phone: string
    passwordHash: string
    address: string
    email: string
    createdAt: string
    updatedAt: string
    orders: any[]
    priceName: PriceName
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
