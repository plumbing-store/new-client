'use client'

import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const CartButton = () => {
    const router = useRouter()

    return (
        <button className={styles.button} onClick={() => router.push('/profile')}>
            <ShoppingCartIcon style={{ fontSize: 26 }} />
        </button>
    )
}

export default CartButton
