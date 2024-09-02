import { useEffect } from 'react'
import { ScreenSize, useScreenSizeStore } from '@/shared/store/screenSize'

export const useScreenSize = () => {
    useEffect(() => {
        const { setScreenSize } = useScreenSizeStore.getState()

        const handle = () => {
            setScreenSize(window.innerWidth)
        }

        handle()

        window.addEventListener('resize', handle)

        return () => window.removeEventListener('resize', handle)
    }, [])
}
