export interface IPrice {
    id: number
    productId: number
    oneSPrice: number
    price: number
    createdAt: string
    updatedAt: string
    name: PriceName
}

export enum PriceName {
    UNAUTHORIZED = 'нерег',
    USD_UNAUTHORIZED = 'нерег USD',

    BASE_5 = 'База 5',
    USD_BASE_5 = 'База 5 USD',

    BASE_10 = 'База 10',
    USD_BASE_10 = 'База 10 USD',

    BASE_15 = 'База 15',
    USD_BASE_15 = 'База 15 USD',

    BASE_20 = 'База 20',
    USD_BASE_20 = 'База 20 USD',

    BASE_30 = 'База 30',
    USD_BASE_30 = 'База 30 USD'
}
