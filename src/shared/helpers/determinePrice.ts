import { IPrice, PriceName } from '@/entities/Price/model/types'

export const determinePrice = (prices: IPrice[], base: PriceName): IPrice => {
    const priorityList = [
        base,
        `${base} USD` as PriceName,
        PriceName.UNAUTHORIZED,
        PriceName.USD_UNAUTHORIZED
    ]

    for (const priority of priorityList) {
        const foundPrice = prices.find((price) => price.name === priority)

        if (foundPrice) {
            return foundPrice
        }
    }

    return prices[0]
}
