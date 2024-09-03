import React, { useState } from 'react'
import styles from './styles.module.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { IProduct } from '@/entities/Product/model/types'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useRouter } from 'next/navigation'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'
import { updateCart } from '@/entities/Cart/api/updateCart'
import classNames from 'classnames'
import QuantitySelector from '@/shared/UI/QuantitySelector/UI'

interface Props {
    product: IProduct
}

const PurchaseForm = ({ product }: Props) => {
    const { account, setAccount } = useAuthStore()
    const router = useRouter()
    const [quantity, setQuantity] = useState<number>(0)
    const maxQuantity = 500

    const handleAddToCart = async () => {
        if (!quantity) {
            notify(NotificationStatus.Danger, 'Количество не выбрано')
            return
        }

        if (!account) {
            router.push('/login')
            return
        }

        const price = determinePrice(product.prices, account.priceName)
        const cart = await updateCart(account.cart.id, {
            productId: product.id,
            priceId: price.id,
            quantity
        })

        if (!cart) {
            notify(NotificationStatus.Danger, 'Не удалось добавить в корзину')
            return
        }

        setAccount((prevState) => {
            if (prevState === null) {
                throw new Error('Account should not be null')
            }
            return {
                ...prevState,
                cart
            }
        })

        setQuantity(0)
    }

    return (
        <div className={classNames(styles.wrapper, 'noLink')}>
            <button className={styles.button} onClick={handleAddToCart}>
                <ShoppingCartIcon style={{ fontSize: 24 }} />
            </button>
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxQuantity={maxQuantity}
            />
        </div>
    )
}

export default PurchaseForm
