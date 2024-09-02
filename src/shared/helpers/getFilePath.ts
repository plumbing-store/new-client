export const getFilePath = (id: string) => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${id}`
}
