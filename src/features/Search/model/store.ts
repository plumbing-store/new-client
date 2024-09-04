import { create } from 'zustand'
import { IProduct } from '@/entities/Product/model/types'

interface IState {
    query: string
    setQuery: (query: string) => void

    prevQuery: string
    setPrevQuery: (query: string) => void

    products: IProduct[]
    setProducts: (value: IProduct[] | ((prevState: IProduct[]) => IProduct[])) => void

    total: number
    setTotal: (total: number) => void
}

export const useSearchStore = create<IState>((set) => ({
    query: '',
    setQuery: (query: string) => set({ query }),

    prevQuery: '',
    setPrevQuery: (query: string) => set({ prevQuery: query }),

    products: [],
    setProducts: (value) =>
        set((state) => ({ products: typeof value === 'function' ? value(state.products) : value })),

    total: 0,
    setTotal: (total: number) => set({ total })
}))
