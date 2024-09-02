'use client'

import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'
import { useCategoryStore } from '@/entities/Category/model/store'
import CategoryList from '@/entities/Category/UI/CategoryList'
import CategoryFilter from '@/entities/Category/UI/CategoryFilter'
import CategoryProducts from '@/entities/Category/UI/CategoryProducts'
import CategoryHeader from '@/entities/Category/UI/CategoryHeader'
import Pagination from '@/shared/UI/Pagination/UI'

const CategoryWidget = (category: ICategory) => {
    const { setCategory } = useCategoryStore()

    useEffect(() => {
        setCategory(category)
    }, [])

    const onPageChange = () => {}

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
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
                        currentPage={1}
                        totalPages={100}
                        maxVisiblePages={5}
                        debounceTime={100}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default CategoryWidget
