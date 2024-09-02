import { IProduct } from '@/entities/Product/model/types'

export interface ICategory {
    id: number
    name: string
    externalId: number
    slug: string
    parentId: number | null
    isActive: number
    image: string | null
    deletedAt: string | null
    createdAt: string
    updatedAt: string
    parent: ICategory | null
    children: ICategory[]
    products: IProduct[]
}
