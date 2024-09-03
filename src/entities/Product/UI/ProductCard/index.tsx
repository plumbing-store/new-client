import React from 'react'
import styles from './styles.module.scss'
import { IProduct, DisplayState } from '@/entities/Product/model/types'
import CardState from '@/entities/Product/UI/CardState'
import Link from 'next/link'

const componentMap = {
    [DisplayState.Card]: CardState,
    [DisplayState.List]: CardState,
    [DisplayState.Grid]: CardState
}

interface Props extends IProduct {
    state: DisplayState
}

const ProductCard = ({ state, ...props }: Props) => {
    const Variant = componentMap[state]

    return (
        <Link className={styles.wrapper} href={`/products/${props.slug}`}>
            <Variant {...props} />
        </Link>
    )
}

export default ProductCard
