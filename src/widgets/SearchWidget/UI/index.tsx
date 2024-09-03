'use client'

import React from 'react'
import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'
import { useSearchStore } from '@/features/Search/model/store'
import CardState from '@/entities/Product/UI/CardState'
import ProductCard from '@/entities/Product/UI/ProductCard'
import { DisplayState } from '@/entities/Product/model/types'
import Plug from '@/shared/UI/Plug'

const SearchWidget = () => {
    const { prevQuery, query, products } = useSearchStore()

    return (
        <div className={styles.wrapper}>
            <PageTitle>Поиск</PageTitle>
            <Plug>
                {prevQuery
                    ? `${prevQuery}: ${products.length} результатов по запросу`
                    : 'Вы ещё ничего не искали'}
            </Plug>
            <div className={styles.list}>
                {products.map((product) => {
                    return <ProductCard state={DisplayState.Card} {...product} />
                })}
            </div>
        </div>
    )
}

export default SearchWidget
