import { create } from 'zustand'

interface IState {
    isOverlayHidden: boolean
    setIsOverlayHidden: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export const useOverlayStore = create<IState>((set) => ({
    isOverlayHidden: true,
    setIsOverlayHidden: (value) =>
        set((state) => ({
            isOverlayHidden: typeof value === 'function' ? value(state.isOverlayHidden) : value
        }))
}))
