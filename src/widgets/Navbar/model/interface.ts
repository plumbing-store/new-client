interface IItem {
    id: number
    icon: string
    name: string
    href?: string
    onClick?: () => void
}

export default IItem
