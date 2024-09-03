'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import CartItem from '@/entities/Cart/UI/CartItem'
import Plug from '@/shared/UI/Plug'

const CartList = () => {
    const { account } = useAuthStore()

    if (!account) {
        return
    }

    const items = account.cart.data

    return (
        <div className={styles.list}>
            {items.map((item) => {
                const props = {
                    ...item,
                    priceId: item.price.id,
                    price: item.price.price,
                    oldPrice: item.oldPrice.price
                }

                return <CartItem {...props} />
            })}
        </div>
    )
}

export default CartList
