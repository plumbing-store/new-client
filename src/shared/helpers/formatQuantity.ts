export const formatQuantity = (value: string): string => {
    let formattedValue = value.replace(/[^\d]/g, '')

    formattedValue = formattedValue.replace(/^0+(?=\d)/, '')

    return formattedValue
}
