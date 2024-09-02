import { create } from 'zustand'
import { ICategory } from '@/entities/Category/model/types'

interface IState {
    categories: ICategory[]
    setCategories: (categories: ICategory[]) => void
}

export const useCategoriesStore = create<IState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories })
}))
