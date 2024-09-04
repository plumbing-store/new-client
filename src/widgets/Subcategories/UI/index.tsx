'use client'

import React from 'react'

import styles from './styles.module.scss'
import { ICategory } from '@/entities/Category/model/types'

interface Props {
    categories: ICategory[]
}

const Subcategories = ({ categories }: Props) => {
    console.log(categories)

    return (
        <div className={styles.categories}>
            {categories.map((category) => {
                return (
                    <div
                        className={styles.card}
                        style={{
                            backgroundImage: `url('/images/raster/${category.externalId}.webp')`
                        }}
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
