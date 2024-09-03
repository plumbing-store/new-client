import { create } from 'zustand'

interface IState {
    query: string
    setQuery: (query: string) => void
}

export const useSearchStore = create<IState>((set) => ({
    query: '',
    setQuery: (query: string) => set({ query })
}))
