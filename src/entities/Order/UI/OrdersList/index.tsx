import React from 'react'
import styles from './styles.module.scss'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { formatPrice } from '@/shared/helpers/formatPrice'
import { formatDate } from '@/shared/helpers/formatDate'
import { IOrder } from '@/entities/Order/model/types'
import { useOrdersStore } from '@/entities/Order/model/store'

const OrderList = () => {
    const { account } = useAuthStore()
    const { order, setOrder, setSection } = useOrdersStore()

    if (!account) {
        return
    }

    const handleClick = (order: IOrder) => {
        setOrder(order)
        setSection('order')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.orders}>
                {account.orders.map((order) => {
                    const sum = order.products.reduce((acc, product) => {
                        const price = determinePrice(product.prices, account.priceName).price

                        return acc + price
                    }, 0)

                    return (
                        <div
                            key={order.id}
                            className={styles.order}
                            onClick={() => handleClick(order)}
                        >
                            <div className={styles.top}>
                                <h2 className={styles.heading}>
                                    Заказ от {formatDate(order.createdAt)}
                                </h2>
                                <p className={styles.sum}>
                                    {formatPrice(Number(sum.toFixed(2)))} ₽
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OrderList
