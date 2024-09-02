export const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))

    if (match) {
        return decodeURIComponent(match[2])
    }

    return null
}
