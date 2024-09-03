import React from 'react'
import CartButton from '@/features/Cart/UI/CartButton'
import styles from './styles.module.scss'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { formatPrice } from '@/shared/helpers/formatPrice'

const CartSummary = () => {
    const { account } = useAuthStore()

    const total = account
        ? account.cart.data.reduce((acc, item) => {
              return acc + Math.round(item.total)
          }, 0)
        : 0

    return (
        <div className={styles.wrapper}>
            <CartButton />
            <div className={styles.total}>{formatPrice(total)} ₽</div>
        </div>
    )
}

export default CartSummary
