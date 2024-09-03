'use client'

import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'

const Cart = () => {
    const { account } = useAuthStore()

    if (!account) return

    return (
        <Wrapper>
            <div></div>
        </Wrapper>
    )
}

export default Cart
