'use client'

import React from 'react'
import { IProduct } from '@/entities/Product/model/types'
import styles from './styles.module.scss'
import Image from 'next/image'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import { PriceName } from '@/entities/Price/model/types'
import { getPricingDetails } from '@/shared/helpers/getPricingDetails'
import Prices from '@/shared/UI/Prices/UI'
import PurchaseForm from '@/entities/Product/UI/PurchaseForm'
import Breadcrumbs from '@/shared/UI/Breadcrumbs'

interface Props {
    product: IProduct
}

const ProductWidget = ({ product }: Props) => {
    const { name, image, prices } = product

    const { account } = useAuthStore()

    const base = account ? account.priceName : PriceName.UNAUTHORIZED

    const pricingDetails = getPricingDetails(prices, base)

    return (
        <div className={styles.wrapper}>
            <Breadcrumbs breadcrumbs={product.breadcrumbs} />
            <div className={styles.panel}>
                {image && (
                    <Image
                        className={styles.image}
                        src={image}
                        alt={name}
                        width={500}
                        height={500}
                    />
                )}
                <div className={styles.content}>
                    <div className={styles.top}>
                        <h1 className={styles.heading}>{name}</h1>
                        <Prices {...pricingDetails} isBase />
                        <div className={styles.properties}>
                            {product.properties.map((property, index) => {
                                return (
                                    <div key={index} className={styles.property}>
                                        <span className={styles.name}>{property.name}</span>
                                        <span className={styles.value}>{property.value}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <PurchaseForm product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductWidget
