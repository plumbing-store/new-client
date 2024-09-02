import { create } from 'zustand'

interface IState {
    isNavbarHidden: boolean
    setIsNavbarHidden: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export const useNavbarStore = create<IState>((set) => ({
    isNavbarHidden: true,
    setIsNavbarHidden: (value) =>
        set((state) => ({
            isNavbarHidden: typeof value === 'function' ? value(state.isNavbarHidden) : value
        }))
}))
