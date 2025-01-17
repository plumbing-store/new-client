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
import classNames from 'classnames'

interface Props extends IProduct {
    isStatic?: boolean
}

const CardState = ({ isStatic = false, ...props }: Props) => {
    const { prices, image, name, sku, vendorSku } = props

    const { account } = useAuthStore()

    const base = account ? account.priceName : PriceName.UNAUTHORIZED

    if (prices.length === 0) {
        return
    }

    const pricingDetails = getPricingDetails(prices, base)

    return (
        <div className={classNames(styles.wrapper, { [styles.static]: isStatic })}>
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
                {!isStatic && <div className={styles.quantity}>В наличии</div>}
            </div>
            <div className={styles.cell}>
                <Prices {...pricingDetails} />
            </div>
            <div className={styles.purchaseFormWrapper}>
                <PurchaseForm product={props} />
            </div>
        </div>
    )
}

export default CardState
