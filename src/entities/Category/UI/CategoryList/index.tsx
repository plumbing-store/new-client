import React from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import Link from 'next/link'

const CategoryList = () => {
    const { category, depth } = useCategoryStore()

    if (!category || !category.children || depth === 2) return

    return (
        <div className={styles.links}>
            {category.children.map((child) => {
                return (
                    <div className={styles.item}>
                        <Link className={styles.link} href={`/categories/${child.slug}`}>
                            {child.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryList
