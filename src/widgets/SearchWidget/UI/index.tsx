'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'
import { useSearchStore } from '@/features/Search/model/store'
import CardState from '@/entities/Product/UI/CardState'
import ProductCard from '@/entities/Product/UI/ProductCard'
import { DisplayState } from '@/entities/Product/model/types'
import Plug from '@/shared/UI/Plug'
import { fetchProducts } from '@/features/Search/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import Loader from '@/shared/UI/Loader'
import ScrollToTop from '@/features/ScrollToTop/UI'

const SearchWidget = () => {
    const { prevQuery, query, products, setProducts } = useSearchStore()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    const [isEnd, setIsEnd] = useState<boolean>(false)

    const observerRef = useRef<HTMLDivElement | null>(null)

    const loadMoreProducts = async () => {
        if (isLoading || isEnd || products.length === 0) return

        setIsLoading(true)

        const data = await fetchProducts({ search: query, quantity, skip: page * quantity })

        setIsLoading(false)

        if (!data) return

        if (data.products.length === 0) {
            setIsEnd(true)

            return
        }

        setPage(page + 1)
        setProducts([...products, ...data.products])
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(loadMoreProducts, 500)
                }
            },
            { root: null, rootMargin: '0px', threshold: 1.0 }
        )

        if (observerRef.current) observer.observe(observerRef.current)

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current)
        }
    }, [observerRef.current, loadMoreProducts])

    useEffect(() => {
        setIsEnd(false)
    }, [query])

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

            <div ref={observerRef} className={styles.observerElement} />

            {isLoading && (
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            )}

            <ScrollToTop />
        </div>
    )
}

export default SearchWidget
