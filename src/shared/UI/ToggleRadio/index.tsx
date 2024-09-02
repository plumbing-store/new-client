import React from 'react'
import styles from './styles.module.scss'

interface Props {
    name: string
    message: string
    value: boolean
    setValue: (value: boolean) => void
}

const ToggleRadio = ({ name, message, value, setValue }: Props) => {
    return (
        <label className={styles.label}>
            <input
                type='radio'
                name={name}
                checked={value}
                onChange={(event) => setValue(event.target.checked)}
            />
            <span>{message}</span>
        </label>
    )
}

export default ToggleRadio
