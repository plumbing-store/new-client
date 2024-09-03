import { fetchProducts } from '@/entities/Product/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import { ICategory } from '@/entities/Category/model/types'

export const generateFilter = (selectedProperties: Record<string, string>[]) => {
    return selectedProperties.reduce((acc, property) => {
        acc[property.name] = property.value
        return acc
    }, {})
}

export const updateProducts = async (
    setTotal: (total: number) => void,
    setCategory: (value: ICategory | ((prevState: ICategory) => ICategory)) => void,
    category: any,
    skip: number = 0,
    filter: Record<string, string> = {}
) => {
    const data = await fetchProducts(category.id, quantity, skip, filter)

    if (!data) return

    setTotal(data.total)

    setCategory((prevState) => {
        return {
            ...prevState,
            products: data.products
        }
    })
}
