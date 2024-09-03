import { IPrice } from '@/entities/Price/model/types'

interface IProperty {
    name: string
    value: string
}

export interface IBreadcrumb {
    name: string
    slug: string
}

export interface IProduct {
    id: number
    name: string
    externalId: number
    slug: string
    description: string
    image: string | null
    quantity: number
    sku: string
    vendorSku: string | null
    vendor: string
    set: any | null
    createdAt: string
    updatedAt: string
    breadcrumbs: IBreadcrumb[]
    properties: IProperty[]
    prices: IPrice[]
}

export enum DisplayState {
    Grid = 'grid',
    List = 'list',
    Card = 'сard'
}
