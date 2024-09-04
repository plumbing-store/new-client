import { create } from 'zustand'
import { ICategory } from '@/entities/Category/model/types'
import { DisplayState, IProduct } from '@/entities/Product/model/types'

interface ISortOptions {
    sort: 'price' | 'name'
    sortInverse: boolean
}

export interface IHistoryItem {
    categoryId: number
    page: number

    sortOptions: ISortOptions
    selectedProperties: IProperty[]
}

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
    setPage: (page: number | ((prevState: number) => number)) => void

    breadcrumbs: { name: string; slug: string }[]
    setBreadcrumbs: (breadcrumbs: { name: string; slug: string }[]) => void

    properties: IProperty[]
    setProperties: (properties: IProperty[]) => void

    history: IHistoryItem[]
    setHistory: (value: IHistoryItem[] | ((prevState: IHistoryItem[]) => IHistoryItem[])) => void

    selectedProperties: IProperty[]
    setSelectedProperties: (value: IProperty[] | ((prevState: IProperty[]) => IProperty[])) => void

    sortOptions: ISortOptions
    setSortOptions: (value: ISortOptions | ((prevState: ISortOptions) => ISortOptions)) => void

    displayState: DisplayState
    setDisplayState: (displayState: DisplayState) => void

    isAutoLoadDisabled: boolean
    setIsAutoLoadDisabled: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export const useCategoriesStore = create<ICategoriesState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories })
}))

export const useCategoryStore = create<ICategoryState>((set) => ({
    isAutoLoadDisabled: false,
    setIsAutoLoadDisabled: (value) =>
        set((state) => ({
            isAutoLoadDisabled:
                typeof value === 'function' ? value(state.isAutoLoadDisabled) : value
        })),

    category: {} as ICategory,
    setCategory: (value) =>
        set((state) => ({ category: typeof value === 'function' ? value(state.category) : value })),

    displayState: DisplayState.Card,
    setDisplayState: (displayState) => set({ displayState }),

    properties: [],
    setProperties: (properties) => set({ properties }),

    depth: 0,
    setDepth: (depth) => set({ depth }),

    total: 0,
    setTotal: (total) => set({ total }),

    page: 1,
    setPage: (value) =>
        set((state) => ({ page: typeof value === 'function' ? value(state.page) : value })),

    breadcrumbs: [],
    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

    sortOptions: { sort: 'price', sortInverse: true },
    setSortOptions: (value) =>
        set((state) => ({
            sortOptions: typeof value === 'function' ? value(state.sortOptions) : value
        })),

    history: [],
    setHistory: (value) =>
        set((state) => ({ history: typeof value === 'function' ? value(state.history) : value })),

    selectedProperties: [],
    setSelectedProperties: (value) =>
        set((state) => ({
            selectedProperties:
                typeof value === 'function' ? value(state.selectedProperties) : value
        }))
}))
