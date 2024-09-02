'use client'

import { create } from 'zustand'
import { useEffect } from 'react'

export enum ScreenSize {
    XS = 0,
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1400
}

interface IState {
    screenSize: number
    setScreenSize: (screenSize: number) => void
}

export const useScreenSizeStore = create<IState>((set) => ({
    screenSize: 0,
    setScreenSize: (screenSize) => set({ screenSize })
}))
