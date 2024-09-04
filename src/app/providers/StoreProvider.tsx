'use client'

import { ReactNode, useEffect } from 'react'
import { fetchCategories } from '@/entities/Category/api/fetchCategories'
import { useCategoriesStore, useCategoryStore } from '@/entities/Category/model/store'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { DisplayState } from '@/entities/Product/model/types'

interface Props {
    children: ReactNode
}

const StoreProvider = ({ children }: Props) => {
    const { setCategories } = useCategoriesStore()
    const { setDisplayState } = useCategoryStore()

    const [storedDisplayState, setStoredDisplayState] = useLocalStorage<string | null>(
        'displayState',
        null
    )

    useEffect(() => {
        if (storedDisplayState) {
            setDisplayState(storedDisplayState as DisplayState)
        }

        const fetch = async () => {
            const data = await fetchCategories()

            if (!data) {
                return
            }

            setCategories(data)
        }

        fetch()
    }, [])

    return <>{children}</>
}

export default StoreProvider
