'use client'

import React from 'react'
import styles from './styles.module.scss'
import CartInfo from '@/entities/Cart/UI/CartInfo'
import CartList from '@/entities/Cart/UI/CartList'
import PageTitle from '@/shared/UI/PageTitle'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import Plug from '@/shared/UI/Plug'

const CartWidget = () => {
    const { account } = useAuthStore()

    return (
        <div className={styles.wrapper}>
            <PageTitle>Корзина</PageTitle>
            {account && account.cart.data.length ? (
                <div className={styles.content}>
                    <CartInfo />
                    <CartList />
                </div>
            ) : (
                <Plug>Здесь пока ничего нет</Plug>
            )}
        </div>
    )
}

export default CartWidget
