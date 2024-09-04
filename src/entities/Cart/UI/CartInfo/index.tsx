'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { formatPrice } from '@/shared/helpers/formatPrice'
import Button from '@/shared/UI/Button'
import { createOrder } from '@/entities/Order/api/createOrder'

const CartInfo = () => {
    const { account, setAccount } = useAuthStore()

    if (!account || !account.cart.data.length) {
        return
    }

    const quantity = account.cart.data.reduce((acc, item) => acc + item.quantity, 0)
    const sum = account.cart.data.reduce(
        (acc, item) => acc + Number((item.quantity * item.price.price).toFixed(2)),
        0
    )
    const discount = account.cart.data.reduce(
        (acc, item) =>
            acc +
            item.oldPrice.price * item.quantity -
            Number((item.price.price * item.quantity).toFixed(2)),
        0
    )

    const items = [
        { name: 'Товаров', value: quantity },
        { name: 'Сумма', value: formatPrice(Number(sum.toFixed(2))) },
        { name: 'Скидка', value: formatPrice(Number(discount.toFixed(2))) }
    ]

    const handleOrder = async () => {
        if (!account) {
            return
        }

        const order = await createOrder({
            name: account.name,
            cartId: account.cart.id
        })

        if (!order) {
            return
        }

        // TODO: Refactor same things

        setAccount((prevState) => {
            if (prevState === null) {
                throw new Error('Account should not be null')
            }

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    data: []
                },
                orders: [...prevState.orders, order]
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <Button className={styles.button} onClick={() => handleOrder()}>
                Оформить заказ
            </Button>
            {/*<h3 className={styles.heading}>Сводка</h3>*/}
            <div className={styles.items}>
                {items.map(({ name, value }, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.value}>{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CartInfo
