import React from 'react'
import styles from './styles.module.scss'
import { IOrder } from '@/entities/Order/model/types'
import { formatDate } from '@/shared/helpers/formatDate'
import ProductCard from '@/entities/Product/UI/ProductCard'
import { DisplayState } from '@/entities/Product/model/types'
import { useOrdersStore } from '@/entities/Order/model/store'

const Order = () => {
    const { order, setSection } = useOrdersStore()

    if (!order) {
        return
    }

    const { id, createdAt, products } = order

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={() => setSection('orders')}>
                К списку заказов
            </button>
            <div className={styles.top}>
                <h2>Заказ № {id}</h2>
                <p>от {formatDate(createdAt)}</p>
            </div>
            <div className={styles.products}>
                {products.map((product) => {
                    return <ProductCard isStatic state={DisplayState.Card} {...product} />
                })}
            </div>
        </div>
    )
}

export default Order
