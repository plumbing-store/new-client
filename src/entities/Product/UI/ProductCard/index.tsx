import React from 'react'
import styles from './styles.module.scss'
import { IProduct, DisplayState } from '@/entities/Product/model/types'
import CardState from '@/entities/Product/UI/CardState'
import Link from 'next/link'
import GridState from '@/entities/Product/UI/GridState'
import ListState from '@/entities/Product/UI/ListState'

const componentMap = {
    [DisplayState.Grid]: GridState,
    [DisplayState.List]: ListState,
    [DisplayState.Card]: CardState
}

interface Props extends IProduct {
    isStatic?: boolean
    state?: DisplayState
}

const ProductCard = ({ isStatic = false, state = DisplayState.Card, ...props }: Props) => {
    const Variant = componentMap[state]

    const onClick = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).closest('.noLink')) {
            event.preventDefault()
        }
    }

    return (
        <Link className={styles.wrapper} href={`/products/${props.slug}`} onClick={onClick}>
            <Variant isStatic={isStatic} {...props} />
        </Link>
    )
}

export default ProductCard
