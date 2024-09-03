import React from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import ProductCard from '@/entities/Product/UI/ProductCard'

const CategoryProducts = () => {
    const { category } = useCategoryStore()

    if (!category || !category.products) {
        return
    }

    return (
        <div className={styles.wrapper}>
            {category.products.map((product) => {
                return <ProductCard {...product} />
            })}
        </div>
    )
}

export default CategoryProducts
