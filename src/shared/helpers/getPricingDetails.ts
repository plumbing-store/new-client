import { IPrice, PriceName } from '@/entities/Price/model/types'
import { determinePrice } from '@/shared/helpers/determinePrice'

interface PricingDetails {
    currentPrice: number | null
    basePrice: number | null
}

export const getPricingDetails = (
    prices: IPrice[],
    base: PriceName = PriceName.UNAUTHORIZED
): PricingDetails => {
    const basePrice = determinePrice(prices, PriceName.UNAUTHORIZED).price
    const currentPrice = determinePrice(prices, base).price

    if (basePrice === currentPrice) {
        return {
            currentPrice,
            basePrice: null
        }
    }

    return {
        currentPrice,
        basePrice
    }
}
