import { create } from 'zustand'
import { PriceName } from '@/entities/Price/model/types'

export interface ICart {
    id: number
    companyId: number
    data: any[] // Лучше заменить any на конкретный тип, если это возможно
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
    orders: any[] // Лучше заменить any на конкретный тип, если это возможно
    priceName: PriceName
    cart: ICart
}

interface IState {
    account: IAccount | null
    setAccount: (value: IAccount | null | ((prevState: IAccount | null) => IAccount | null)) => void
}

export const useAuthStore = create<IState>((set) => ({
    account: null,
    setAccount: (value) =>
        set((state) => ({
            account: typeof value === 'function' ? value(state.account) : value
        }))
}))
