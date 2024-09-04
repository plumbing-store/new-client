import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import CartWidget from '@/entities/Cart/UI/CartWidget'
import AuthGuardProvider from '@/app/providers/AuthGuardProvider'

const Cart = () => {
    return (
        <Wrapper>
            <AuthGuardProvider>
                <CartWidget />
            </AuthGuardProvider>
        </Wrapper>
    )
}

export default Cart
