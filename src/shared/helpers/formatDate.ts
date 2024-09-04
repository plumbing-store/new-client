export const formatDate = (string: string) => {
    const date = new Date(string)

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long'
    }

    const formattedDate = date.toLocaleDateString('ru-RU', options)

    return formattedDate
}
