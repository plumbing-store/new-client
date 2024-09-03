'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { formatPrice } from '@/shared/helpers/formatPrice'

const CartInfo = () => {
    const { account } = useAuthStore()

    if (!account || !account.cart.data.length) {
        return
    }

    const quantity = account.cart.data.reduce((acc, item) => acc + item.quantity, 0)
    const sum = account.cart.data.reduce((acc, item) => acc + item.total, 0)
    const discount = account.cart.data.reduce(
        (acc, item) => acc + item.oldPrice.price * item.quantity - item.price.price * item.quantity,
        0
    )

    const items = [
        { name: 'Товаров', value: quantity },
        { name: 'Сумма', value: formatPrice(Math.round(sum)) },
        { name: 'Скидка', value: formatPrice(Math.round(discount)) }
    ]

    return (
        <div className={styles.wrapper}>
            {items.map(({ name, value }, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.value}>{value}</div>
                </div>
            ))}
        </div>
    )
}

export default CartInfo
