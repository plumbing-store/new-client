import { fetchProducts } from '@/entities/Product/api/fetchProducts'
import { quantity } from '@/entities/Category/model/constants'
import { ICategory } from '@/entities/Category/model/types'
import { IProperty, useCategoryStore } from '@/entities/Category/model/store'

export const generateFilter = (selectedProperties: IProperty[]) => {
    return selectedProperties.reduce(
        (acc, property) => {
            acc[property.name] = property.values.join(';')
            return acc
        },
        {} as Record<string, string>
    )
}

export const updateProducts = async () => {
    const { page, category, setCategory, sortOptions, setTotal, selectedProperties, setHistory } =
        useCategoryStore.getState()

    const filter = generateFilter(selectedProperties)

    const skip = (page - 1) * quantity

    const params: any = {
        quantity,
        skip,
        ...sortOptions
    }

    console.log(filter)

    if (Object.keys(filter).length > 0 && Object.values(filter).every((value) => value !== '')) {
        params['filter'] = filter
    }

    const data = await fetchProducts(category.id, params)

    if (!data) return

    setTotal(data.total)

    setCategory((prevState) => {
        return {
            ...prevState,
            products: data.products
        }
    })

    setHistory((prevState) => {
        const index = prevState.findIndex((item) => item.categoryId === category.id)

        const newItem = {
            categoryId: category.id,
            page,
            selectedProperties,
            sortOptions
        }

        if (index === -1) {
            return [...prevState, newItem]
        }

        prevState[index] = newItem

        return [...prevState]
    })
}
