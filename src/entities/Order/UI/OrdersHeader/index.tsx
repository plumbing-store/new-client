'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useOrdersStore } from '@/entities/Order/model/store'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import classNames from 'classnames'

const OrdersHeader = () => {
    const { section, setSection } = useOrdersStore()
    const { account } = useAuthStore()

    if (!account) {
        return false
    }

    console.log(account)

    const numberOfOrders = account.orders.length
    const numberOfProducts = account.orders.reduce((acc, order) => acc + order.products.length, 0)

    const map = [
        {
            name: 'Заказы',
            section: 'orders',
            point: numberOfOrders
        },
        {
            name: 'Товары',
            section: 'products',
            point: numberOfProducts
        }
    ]

    return (
        <div className={styles.wrapper}>
            {map.map(({ name, section: item, point }) => (
                <button
                    key={name}
                    className={classNames(styles.item, {
                        [styles.active]: section === item
                    })}
                    onClick={() => setSection(item as 'orders' | 'products' | 'order')}
                >
                    <div className={styles.name}>{name}</div>
                    <div className={styles.point}>{point}</div>
                </button>
            ))}
        </div>
    )
}

export default OrdersHeader
