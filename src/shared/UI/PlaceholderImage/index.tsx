import React from 'react'
import styles from './styles.module.scss'
import { CameraAlt } from '@mui/icons-material'

interface Props {
    icon?: boolean
    fontSize?: number
    alt?: string
}

const PlaceholderImage = ({ icon, fontSize = 16, alt = 'Изображения нет' }: Props) => {
    const props: { [key: string]: any } = {
        className: styles.placeholder
    }

    if (!icon) {
        props.style = { fontSize }
    }

    return <div {...props}>{icon ? <CameraAlt style={{ fontSize }} /> : <p>{alt}</p>}</div>
}

export default PlaceholderImage
