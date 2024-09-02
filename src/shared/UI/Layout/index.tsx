'use client'

import React, { useEffect } from 'react'

import Notification from '@/shared/UI/Notification'
import { useScreenSize } from '@/shared/hooks/useScreenSize'
import { useNavbarStore } from '@/widgets/Navbar/model/store'
import { usePathname } from 'next/navigation'
import Overlay from '@/features/Overlay/UI'
import Providers from '@/app/providers'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    const { setIsNavbarHidden } = useNavbarStore()

    useEffect(() => {
        setIsNavbarHidden(true)
    }, [pathname])

    useScreenSize()

    return (
        <Providers>
            {children}
            <Notification />
            <Overlay />
        </Providers>
    )
}

export default Layout
