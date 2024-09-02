import { IPrice, PriceName } from '@/entities/Price/model/types'
import { determinePrice } from '@/shared/helpers/determinePrice'

interface PricingDetails {
    currentPrice: number | null
    basePrice: number | null
}

export const getPricingDetails = (prices: IPrice[], base: PriceName | null): PricingDetails => {
    const basePrice = determinePrice(prices, PriceName.UNAUTHORIZED).price

    if (!base) {
        return {
            currentPrice: basePrice,
            basePrice: null
        }
    }

    const currentPrice = determinePrice(prices, base).price

    return {
        currentPrice,
        basePrice
    }
}
