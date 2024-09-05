'use client'

import React from 'react'

import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props {
    categories: ICategory[]
}

const Subcategories = ({ categories }: Props) => {
    const router = useRouter()

    const toCategory = (slug: string) => {
        router.push(`/categories/${slug}`)
    }

    console.log(categories)

    return (
        <div className={styles.categories}>
            {categories.map((category) => {
                return (
                    <Link
                        href={`/categories/${category.slug}`}
                        target='_blank'
                        className={styles.card}
                        style={{
                            backgroundImage: `url('/images/raster/${category.externalId}.png')`
                        }}
                    >
                        <div className={styles.overlay} />
                        <h2 className={styles.name}>{category.name}</h2>
                    </Link>
                )
            })}
        </div>
    )
}

export default Subcategories
