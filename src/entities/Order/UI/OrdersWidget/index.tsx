'use client'

import React from 'react'
import styles from './styles.module.scss'
import OrdersHeader from '@/entities/Order/UI/OrdersHeader'
import { useOrdersStore } from '@/entities/Order/model/store'
import OrdersList from '@/entities/Order/UI/OrdersList'
import Order from '@/entities/Order/UI/Order'

const map = {
    orders: OrdersList,
    order: Order,
    products: OrdersList
}

const OrdersWidget = () => {
    const { section } = useOrdersStore()

    const Component = map[section]

    return (
        <div className={styles.wrapper}>
            {section !== 'order' && <OrdersHeader />}
            <Component />
        </div>
    )
}

export default OrdersWidget
