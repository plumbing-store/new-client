export const formatPrice = (value: number): string => {
    const raw = String(value).replace(/\s+/g, '')

    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
