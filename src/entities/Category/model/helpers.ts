import { fetchProducts } from '@/entities/Product/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import { ICategory } from '@/entities/Category/model/types'
import { useCategoryStore } from '@/entities/Category/model/store'

export const generateFilter = (selectedProperties: Record<string, string>[]) => {
    return selectedProperties.reduce((acc, property) => {
        acc[property.name] = property.value
        return acc
    }, {})
}

export const updateProducts = async () => {
    const { page, category, setCategory, sortOptions, setTotal, selectedProperties } =
        useCategoryStore.getState()

    const filter = generateFilter(selectedProperties)

    const skip = (page - 1) * quantity

    const data = await fetchProducts(
        category.id,
        quantity,
        skip,
        filter,
        sortOptions.sort,
        sortOptions.sortInverse
    )

    if (!data) return

    setTotal(data.total)

    setCategory((prevState) => {
        return {
            ...prevState,
            products: data.products
        }
    })
}
