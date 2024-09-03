export const formatQuantity = (value: string): string => {
    let formattedValue = value.replace(/^0+(?=\d)/, '')

    if (formattedValue.startsWith('-')) {
        formattedValue = formattedValue.replace('-', '')
    }

    return formattedValue
}
