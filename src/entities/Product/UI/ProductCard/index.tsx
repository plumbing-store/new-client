import React from 'react'
import styles from './styles.module.scss'
import { IProduct, DisplayState } from '@/entities/Product/model/types'
import CardState from '@/entities/Product/UI/CardState'

const componentMap = {
    [DisplayState.Card]: CardState
}

interface Props extends IProduct {}

const ProductCard = (props: Props) => {
    const Variant = componentMap[DisplayState.Card]

    return (
        <div className={styles.wrapper}>
            <Variant {...props} />
        </div>
    )
}

export default ProductCard
