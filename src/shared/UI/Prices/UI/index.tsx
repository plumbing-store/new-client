import React from 'react'
import styles from './styles.module.scss'
import { formatPrice } from '@/shared/helpers/formatPrice'
import { PricingDetails } from '@/shared/helpers/getPricingDetails'
import classNames from 'classnames'

interface Props extends PricingDetails {
    isBase?: boolean
}

const Prices = ({ currentPrice, basePrice, isBase = false }: Props) => {
    return (
        <div className={classNames(styles.price, { [styles.isBase]: isBase })}>
            <div className={styles.current}>{formatPrice(currentPrice)} ₽</div>
            {basePrice && <div className={styles.base}>{formatPrice(basePrice)}</div>}
        </div>
    )
}

export default Prices
