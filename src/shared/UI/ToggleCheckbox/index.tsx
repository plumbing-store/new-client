import React from 'react'
import styles from './styles.module.scss'

interface Props {
    value: boolean
    setValue: (value: boolean) => void
    message?: string
}

const ToggleCheckbox = ({ value, setValue, message }: Props) => {
    return (
        <label className={styles.label} onClick={(event) => event.stopPropagation()}>
            <input
                type='checkbox'
                checked={value}
                onChange={(event) => {
                    setValue(event.target.checked)
                }}
            />
            {message && <span>{message}</span>}
        </label>
    )
}

export default ToggleCheckbox
