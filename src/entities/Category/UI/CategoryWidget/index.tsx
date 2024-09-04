'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'
import { IProperty, useCategoryStore } from '@/entities/Category/model/store'
import CategoryList from '@/entities/Category/UI/CategoryList'
import CategoryFilter from '@/entities/Category/UI/CategoryFilter'
import CategoryProducts from '@/entities/Category/UI/CategoryProducts'
import CategoryHeader from '@/entities/Category/UI/CategoryHeader'
import Pagination from '@/shared/UI/Pagination/UI'
import { updateProducts } from '@/entities/Category/model/helpers'
import CategoryBreadcrumbs from '@/entities/Category/UI/CategoryBreadcrumbs'
import FixedLoader from '@/shared/UI/FixedLoader'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import ScrollToTop from '@/features/ScrollToTop/UI'
import { debounce } from 'lodash'

interface Props {
    depth: number
    total: number
    breadcrumbs: { name: string; slug: string }[]
    category: ICategory
    properties: IProperty[]
}

let timeout: NodeJS.Timeout

const CategoryWidget = ({ depth, total, breadcrumbs, category, properties }: Props) => {
    const [isLoading, setIsLoading] = useState(false)

    const [_, setIsStoredAutoLoadDisabled] = useLocalStorage<boolean | null>(
        'isAutoLoadDisabled',
        null
    )

    const observerRef = useRef<HTMLDivElement | null>(null)

    const {
        history,
        setCategory,
        setProperties,
        setBreadcrumbs,
        page,
        total: totalValue,
        setTotal,
        setDepth,
        setPage,
        setSelectedProperties,
        isAutoLoadDisabled
    } = useCategoryStore()

    // При первой загрузке
    useEffect(() => {
        const storedCategory = history.find((item) => item.categoryId === category.id)

        setCategory(category)
        setBreadcrumbs(breadcrumbs)
        setProperties(properties)
        setDepth(depth)
        setTotal(total)

        if (storedCategory) {
            setPage(storedCategory.page)
            setSelectedProperties(storedCategory.selectedProperties)

            const fetch = async () => {
                setIsLoading(true)

                await updateProducts()

                setIsLoading(false)
            }

            fetch()
        }
    }, [])

    const loadMoreProducts = async (
        isLoading: boolean,
        isAutoLoadDisabled: boolean,
        page: number,
        totalValue: number
    ) => {
        if (isLoading || isAutoLoadDisabled || page >= totalValue) return

        setIsLoading(true)

        setPage((prevState) => {
            return prevState + 1
        })

        await updateProducts(true)

        setIsLoading(false)
    }

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries

            if (entry.isIntersecting) {
                timeout = setTimeout(
                    () => loadMoreProducts(isLoading, isAutoLoadDisabled, page, totalValue),
                    1000
                )
            }
        }

        const observer = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        })

        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current)
            }

            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [observerRef.current, isLoading, isAutoLoadDisabled, page, totalValue])

    useEffect(() => {
        setIsStoredAutoLoadDisabled(isAutoLoadDisabled)
    }, [isAutoLoadDisabled])

    const onPageChange = async (page: number) => {
        setPage(page)
        await updateProducts()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <CategoryBreadcrumbs />
                <CategoryHeader />
            </div>
            <div className={styles.core}>
                <div className={styles.panel}>
                    <CategoryList />
                    <CategoryFilter />
                </div>
                <div className={styles.content}>
                    <CategoryProducts />
                    <Pagination
                        currentPage={page}
                        totalPages={totalValue}
                        maxVisiblePages={10}
                        debounceTime={340}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>

            <div ref={observerRef} className={styles.observerElement} />

            {isLoading && <FixedLoader />}

            <ScrollToTop />
        </div>
    )
}

export default CategoryWidget
