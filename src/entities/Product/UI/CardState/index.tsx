import React from 'react'
import styles from './styles.module.scss'
import { IProduct } from '@/entities/Product/model/types'
import Image from 'next/image'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { PriceName } from '@/entities/Price/model/types'
import { getPricingDetails } from '@/shared/helpers/getPricingDetails'
import PurchaseForm from '@/entities/Product/UI/PurchaseForm'
import { formatPrice } from '@/shared/helpers/formatPrice'

interface Props extends IProduct {}

const CardState = (props: Props) => {
    const { prices, image, name, sku } = props

    const pricingDetails = getPricingDetails(prices, PriceName.BASE_10)

    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                {image && (
                    <Image
                        className={styles.image}
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                    />
                )}
                <div className={styles.meta}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.sku}>{sku}</p>
                </div>
            </div>
            <div className={styles.cell}>
                <div className={styles.quantity}>В наличии</div>
            </div>
            <div className={styles.cell}>
                <div className={styles.price}>
                    <div className={styles.current}>
                        {formatPrice(pricingDetails.currentPrice)} ₽
                    </div>
                    {pricingDetails.basePrice && (
                        <div className={styles.base}>{formatPrice(pricingDetails.basePrice)}</div>
                    )}
                </div>
            </div>
            <PurchaseForm product={props} />
        </div>
    )
}

export default CardState
