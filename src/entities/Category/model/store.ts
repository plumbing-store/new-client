import { create } from 'zustand'
import { ICategory } from '@/entities/Category/model/types'

export interface IProperty {
    id: number
    name: string
    values: string[]
}

interface ICategoriesState {
    categories: ICategory[]
    setCategories: (categories: ICategory[]) => void
}

interface ICategoryState {
    category: ICategory
    setCategory: (value: ICategory | ((prevState: ICategory) => ICategory)) => void

    depth: number
    setDepth: (depth: number) => void

    total: number
    setTotal: (total: number) => void

    breadcrumbs: { name: string; slug: string }[]
    setBreadcrumbs: (breadcrumbs: { name: string; slug: string }[]) => void

    properties: IProperty[]
    setProperties: (properties: IProperty[]) => void

    selectedProperties: Record<string, string>[]
    setSelectedProperties: (
        value:
            | Record<string, string>[]
            | ((prevState: Record<string, string>[]) => Record<string, string>[])
    ) => void

    sortOptions: { name: string; value: boolean }
    setSortOptions: (
        value:
            | { name: string; value: boolean }
            | ((prevState: { name: string; value: boolean }) => { name: string; value: boolean })
    ) => void
}

export const useCategoriesStore = create<ICategoriesState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories })
}))

export const useCategoryStore = create<ICategoryState>((set) => ({
    category: {} as ICategory,
    setCategory: (value) =>
        set((state) => ({ category: typeof value === 'function' ? value(state.category) : value })),

    properties: [],
    setProperties: (properties) => set({ properties }),

    depth: 0,
    setDepth: (depth) => set({ depth }),

    total: 0,
    setTotal: (total) => set({ total }),

    breadcrumbs: [],
    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

    sortOptions: { name: 'price', value: false },
    setSortOptions: (value) =>
        set((state) => ({
            sortOptions: typeof value === 'function' ? value(state.sortOptions) : value
        })),

    selectedProperties: [],
    setSelectedProperties: (value) =>
        set((state) => ({
            selectedProperties:
                typeof value === 'function' ? value(state.selectedProperties) : value
        }))
}))
