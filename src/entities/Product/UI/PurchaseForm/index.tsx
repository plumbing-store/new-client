import React, { useState, useRef } from 'react'

import styles from './styles.module.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { IProduct } from '@/entities/Product/model/types'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { useRouter } from 'next/navigation'
import { notify } from '@/shared/helpers/notify'
import { NotificationStatus } from '@/shared/store/notification'
import { updateCart } from '@/entities/Cart/api/updateCart'
import { formatQuantity } from '@/shared/helpers/formatQuantity'

interface Props {
    product: IProduct
}

const PurchaseForm = ({ product }: Props) => {
    const { account, setAccount } = useAuthStore()

    const router = useRouter()

    const [quantity, setQuantity] = useState<number>(0)
    const maxQuantity = 500
    const addIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const removeIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleAdd = () => {
        if (quantity < maxQuantity) {
            setQuantity((prev) => prev + 1)
        }
    }

    const handleRemove = () => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1)
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(formatQuantity(event.target.value))

        console.log(value)

        if (!isNaN(value) && value >= 0 && value <= maxQuantity) {
            setQuantity(value)
        }
    }

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

        console.log(price, account.priceName)

        const cart = await updateCart(account.cart.id, product.id, price.id, quantity)

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

    const startAdd = () => {
        handleAdd()

        addIntervalRef.current = setInterval(handleAdd, 200)
    }

    const stopAdd = () => {
        if (addIntervalRef.current) {
            clearInterval(addIntervalRef.current)

            addIntervalRef.current = null
        }
    }

    const startRemove = () => {
        handleRemove()

        removeIntervalRef.current = setInterval(handleRemove, 200)
    }

    const stopRemove = () => {
        if (removeIntervalRef.current) {
            clearInterval(removeIntervalRef.current)
            removeIntervalRef.current = null
        }
    }

    const onClick = () => {
        handleAddToCart()
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddToCart()
        }
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={onClick}>
                <ShoppingCartIcon style={{ fontSize: 24 }} />
            </button>
            <div className={styles.meta}>
                <div
                    className={styles.circle}
                    onMouseDown={startRemove}
                    onMouseUp={stopRemove}
                    onMouseLeave={stopRemove}
                >
                    <RemoveIcon style={{ fontSize: 20 }} />
                </div>
                <input
                    className={styles.input}
                    type='number'
                    value={quantity}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    placeholder='0'
                    min={0}
                    max={maxQuantity}
                />
                <div
                    className={styles.circle}
                    onMouseDown={startAdd}
                    onMouseUp={stopAdd}
                    onMouseLeave={stopAdd}
                >
                    <AddIcon style={{ fontSize: 20 }} />
                </div>
            </div>
        </div>
    )
}

export default PurchaseForm
