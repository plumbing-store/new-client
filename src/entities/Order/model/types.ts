import { IProduct } from '@/entities/Product/model/types'

export enum OrderStatus {
    New = 'Новый',
    InProgress = 'В процессе',
    Completed = 'Завершен',
    Canceled = 'Отменен'
}

export interface IOrder {
    id: number
    companyId: number
    name: string
    email: string
    phone: string
    address: string
    comment: string | null
    status: OrderStatus
    createdAt: string
    updatedAt: string
    products: IProduct[]
}
