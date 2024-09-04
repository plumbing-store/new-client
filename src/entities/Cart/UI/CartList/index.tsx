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
        <div className={styles.wrapper}>
            <div className={styles.panel}>
                <div className={styles.cell}>Изображение, название и артикул</div>
                <div className={styles.cell}>Количество</div>
                <div className={styles.cell}>Цена (штучно и всего)</div>
            </div>
            <div className={styles.list}>
                {items.map((item, index) => {
                    const props = {
                        ...item,
                        priceId: item.price.id,
                        price: item.price.price,
                        oldPrice: item.oldPrice.price
                    }

                    return <CartItem key={index} {...props} />
                })}
            </div>
        </div>
    )
}

export default CartList
