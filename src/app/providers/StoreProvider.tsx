'use client'

import { ReactNode, useEffect } from 'react'
import { fetchCategories } from '@/entities/Category/api/fetchCategories'
import { useCategoriesStore } from '@/entities/Category/model/store'

interface Props {
    children: ReactNode
}

const StoreProvider = ({ children }: Props) => {
    const { setCategories } = useCategoriesStore()

    useEffect(() => {
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
