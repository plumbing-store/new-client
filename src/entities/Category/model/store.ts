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

    page: number
    setPage: (page: number) => void

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

    sortOptions: { sort: 'name' | 'price'; sortInverse: boolean }
    setSortOptions: (
        value:
            | { sort: 'name' | 'price'; sortInverse: boolean }
            | ((prevState: { sort: 'name' | 'price'; sortInverse: boolean }) => {
                  sort: 'name' | 'price'
                  sortInverse: boolean
              })
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

    page: 1,
    setPage: (page) => set({ page }),

    breadcrumbs: [],
    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

    sortOptions: { sort: 'price', sortInverse: false },
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
