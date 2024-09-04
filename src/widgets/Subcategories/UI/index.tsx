'use client'

import React from 'react'

import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'
import { useRouter } from 'next/navigation'

interface Props {
    categories: ICategory[]
}

const Subcategories = ({ categories }: Props) => {
    const router = useRouter()

    const toCategory = (slug: string) => {
        router.push(`/categories/${slug}`)
    }

    return (
        <div className={styles.categories}>
            {categories.map((category) => {
                return (
                    <div
                        className={styles.card}
                        style={{
                            backgroundImage: `url('/images/raster/${category.externalId}.webp')`
                        }}
                        onClick={() => toCategory(category.slug)}
                    >
                        <div className={styles.overlay} />
                        <h2 className={styles.name}>{category.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default Subcategories
