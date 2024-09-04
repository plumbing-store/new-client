import { IOrder } from '@/entities/Order/model/types'
import { create } from 'zustand'

interface IState {
    section: 'orders' | 'products' | 'order'
    setSection: (section: 'orders' | 'products' | 'order') => void

    order: IOrder | null
    setOrder: (order: IOrder) => void
}

export const useOrdersStore = create<IState>((set) => ({
    section: 'orders',
    setSection: (section) => set({ section }),

    order: null,
    setOrder: (order) => set({ order })
}))
