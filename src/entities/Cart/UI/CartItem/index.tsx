import React from 'react'
import { IProduct } from '@/entities/Product/model/types'
import Image from 'next/image'
import styles from './styles.module.scss'
import { deleteProduct } from '@/entities/Cart/api/deleteProduct'
import { updateCart } from '@/entities/Cart/api/updateCart'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import Prices from '@/shared/UI/Prices/UI'
import DeleteIcon from '@mui/icons-material/Delete'
import QuantitySelector from '@/shared/UI/QuantitySelector/UI'

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
    const maxQuantity = 999

    if (!account) {
        return null
    }

    const pricingDetails = {
        price: {
            currentPrice: price,
            basePrice: oldPrice
        },
        total: {
            currentPrice: price * quantity,
            basePrice: oldPrice * quantity
        }
    }

    const onRemove = async () => {
        const cart = await deleteProduct(account.cart.id, { productId: product.id, priceId })

        if (!cart) {
            return
        }

        setAccount((prevState) => {
            if (prevState === null) {
                throw new Error('Account should not be null')
            }

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    data: prevState.cart.data.filter((item: any) => item.product.id !== product.id)
                }
            }
        })
    }

    const updateQuantity = async (newQuantity: number, withButtons: boolean = false) => {
        setAccount((prevState) => {
            if (prevState === null) {
                throw new Error('Account should not be null')
            }

            if (withButtons && newQuantity === 0) {
                return {
                    ...prevState,
                    cart: {
                        ...prevState.cart,
                        data: prevState.cart.data.filter(
                            (item: any) => item.product.id !== product.id
                        )
                    }
                }
            }

            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    data: prevState.cart.data.map((item: any) => {
                        if (item.product.id === product.id) {
                            return {
                                ...item,
                                quantity: newQuantity
                            }
                        }
                        return item
                    })
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
            <QuantitySelector
                quantity={quantity}
                onChange={updateQuantity}
                maxQuantity={maxQuantity}
            />
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
