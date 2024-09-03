import React from 'react'
import { IProduct } from '@/entities/Product/model/types'
import Image from 'next/image'
import styles from './styles.module.scss'
import { formatPrice } from '@/shared/helpers/formatPrice'
import PurchaseForm from '@/entities/Product/UI/PurchaseForm'
import { IPrice } from '@/entities/Price/model/types'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteProduct } from '@/entities/Cart/api/deleteProduct'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import Prices from '@/shared/UI/Prices/UI'

interface Props {
    quantity: number
    priceId: number
    price: number
    oldPrice: number
    total: number
    product: IProduct
}

const CartItem = ({ product, priceId, price, oldPrice, quantity, total }: Props) => {
    const { account, setAccount } = useAuthStore()

    if (!account) {
        return
    }

    const pricingDetails = {
        price: {
            currentPrice: price,
            basePrice: oldPrice
        },
        total: {
            currentPrice: total,
            basePrice: oldPrice * quantity
        }
    }

    const hasDiscount = oldPrice && oldPrice > price

    const onRemove = async () => {
        const cart = await deleteProduct(account.cart.id, {
            productId: product.id,
            priceId
        })

        if (!cart) {
            return
        }

        setAccount((prevState) => {
            if (prevState === null) {
                throw new Error('Account should not be null')
            }

            console.log(prevState.cart)

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    data: prevState.cart.data.filter((item: any) => item.product.id !== product.id)
                }
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                {product.image && (
                    <Image
                        className={styles.image}
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                    />
                )}
                <div className={styles.meta}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.sku}>{product.sku}</p>
                </div>
            </div>
            <div className={styles.cell}>
                <div className={styles.quantity}>{quantity}</div>
            </div>
            <div className={styles.cells}>
                <div className={styles.cell}>
                    <Prices {...pricingDetails.price} />
                </div>
                <div className={styles.cell}>
                    <Prices {...pricingDetails.total} />
                </div>
            </div>
            <button className={styles.deleteButton} onClick={onRemove}>
                <DeleteIcon />
            </button>
        </div>
    )
}

export default CartItem
