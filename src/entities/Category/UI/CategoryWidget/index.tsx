'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'
import { IProperty, useCategoryStore } from '@/entities/Category/model/store'
import CategoryList from '@/entities/Category/UI/CategoryList'
import CategoryFilter from '@/entities/Category/UI/CategoryFilter'
import CategoryProducts from '@/entities/Category/UI/CategoryProducts'
import CategoryHeader from '@/entities/Category/UI/CategoryHeader'
import Pagination from '@/shared/UI/Pagination/UI'
import { breadcrumbsClasses } from '@mui/material'
import { fetchProducts } from '@/entities/Product/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import { generateFilter, updateProducts } from '@/entities/Category/model/helpers'
import CategoryBreadcrumbs from '@/entities/Category/UI/CategoryBreadcrumbs'

interface Props {
    depth: number
    total: number
    breadcrumbs: { name: string; slug: string }[]
    category: ICategory
    properties: IProperty[]
}

const CategoryWidget = ({ depth, total, breadcrumbs, category, properties }: Props) => {
    const {
        setCategory,
        setProperties,
        setBreadcrumbs,
        page,
        total: totalValue,
        setTotal,
        setDepth,
        setPage
    } = useCategoryStore()

    useEffect(() => {
        setCategory(category)
        setDepth(depth)
        setBreadcrumbs(breadcrumbs)
        setProperties(properties)
        setTotal(total)
    }, [])

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
        </div>
    )
}

export default CategoryWidget
