import { create } from 'zustand'
import { ICategory } from '@/entities/Category/model/types'

interface ICategoriesState {
    categories: ICategory[]
    setCategories: (categories: ICategory[]) => void
}

interface ICategoryState {
    category: ICategory | null
    setCategory: (category: ICategory) => void
}

export const useCategoriesStore = create<ICategoriesState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories })
}))

export const useCategoryStore = create<ICategoryState>((set) => ({
    category: null,
    setCategory: (category) => set({ category })
}))
