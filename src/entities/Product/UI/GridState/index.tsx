import React from 'react'
import styles from './styles.module.scss'
import { IProduct } from '@/entities/Product/model/types'
import Image from 'next/image'
import { determinePrice } from '@/shared/helpers/determinePrice'
import { PriceName } from '@/entities/Price/model/types'
import { getPricingDetails } from '@/shared/helpers/getPricingDetails'
import PurchaseForm from '@/entities/Product/UI/PurchaseForm'
import { formatPrice } from '@/shared/helpers/formatPrice'
import { useAuthStore } from '@/features/Authentication/model/useAuthStore'
import Prices from '@/shared/UI/Prices/UI'

interface Props extends IProduct {}

const GridState = (props: Props) => {
    const { prices, image, name, sku } = props

    const { account } = useAuthStore()

    const base = account ? account.priceName : PriceName.UNAUTHORIZED

    if (prices.length === 0) {
        console.log(props)

        return
    }

    const pricingDetails = getPricingDetails(prices, base)

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
                    <p className={styles.sku}>{sku}</p>
                    <h3 className={styles.name}>{name}</h3>
                </div>
            </div>
            <div className={styles.cell}>
                <div className={styles.quantity}>В наличии</div>
                <Prices {...pricingDetails} />
            </div>
            <PurchaseForm product={props} />
        </div>
    )
}

export default GridState
