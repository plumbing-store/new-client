'use client'

import React from 'react'
import styles from './styles.module.scss'
import CartInfo from '@/entities/Cart/UI/CartInfo'
import CartList from '@/entities/Cart/UI/CartList'
import PageTitle from '@/shared/UI/PageTitle'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import Plug from '@/shared/UI/Plug'
import Button from '@/shared/UI/Button'
import { createOrder } from '@/entities/Order/api/createOrder'

const CartWidget = () => {
    const { account, setAccount } = useAuthStore()

    return (
        <div className={styles.wrapper}>
            <PageTitle>Корзина</PageTitle>
            {account && account.cart.data.length ? (
                <div className={styles.content}>
                    <div className={styles.side}>
                        <CartInfo />
                    </div>
                    <CartList />
                </div>
            ) : (
                <Plug>Здесь пока ничего нет</Plug>
            )}
        </div>
    )
}

export default CartWidget
