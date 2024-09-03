'use client'

import React, { useState } from 'react'
import Input from '@/shared/UI/Input'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchStore } from '@/features/Search/model/store'
import { fetchProducts } from '@/features/Search/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import { useRouter } from 'next/navigation'

const Search = () => {
    const { query, setQuery } = useSearchStore()

    const router = useRouter()

    const search = async () => {
        if (!query) {
            return
        }

        const params = {
            search: query,
            quantity,
            skip: 0
        }

        const data = await fetchProducts(params)

        router.push('/search')

        if (!data) {
            return
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            search()
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <Input placeholder='Поиск' onChange={onChange} onKeyDown={onKeyDown} />
            <button className={styles.button} onClick={() => search()}>
                <SearchIcon />
            </button>
        </div>
    )
}

export default Search
