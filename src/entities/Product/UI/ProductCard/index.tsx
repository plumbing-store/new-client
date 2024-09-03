import React from 'react'
import styles from './styles.module.scss'
import { IProduct, DisplayState } from '@/entities/Product/model/types'
import CardState from '@/entities/Product/UI/CardState'
import Link from 'next/link'
import GridState from '@/entities/Product/UI/GridState'

const componentMap = {
    [DisplayState.Grid]: GridState,
    [DisplayState.List]: CardState,
    [DisplayState.Card]: CardState
}

interface Props extends IProduct {
    state: DisplayState
}

const ProductCard = ({ state, ...props }: Props) => {
    const Variant = componentMap[state]

    const onClick = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).closest('.noLink')) {
            event.preventDefault()
        }
    }

    return (
        <Link className={styles.wrapper} href={`/products/${props.slug}`} onClick={onClick}>
            <Variant {...props} />
        </Link>
    )
}

export default ProductCard
