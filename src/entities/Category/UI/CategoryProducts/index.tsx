import React from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import ProductCard from '@/entities/Product/UI/ProductCard'
import { DisplayState } from '@/entities/Product/model/types'
import classNames from 'classnames'

const CategoryProducts = () => {
    const { category, displayState } = useCategoryStore()

    if (!category || !category.products) {
        return
    }

    return (
        <div className={classNames(styles.wrapper, styles[displayState])}>
            {category.products.map((product) => {
                return <ProductCard state={displayState} {...product} />
            })}
        </div>
    )
}

export default CategoryProducts
