'use client'

import React, { useRef } from 'react'
import styles from './styles.module.scss'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { formatQuantity } from '@/shared/helpers/formatQuantity'

interface Props {
    quantity: number
    onChange: (quantity: number, withButtons?: boolean) => void
    maxQuantity: number
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const QuantitySelector = ({ quantity, onChange, maxQuantity, onKeyDown }: Props) => {
    const addIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const removeIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleAdd = () => {
        if (quantity < maxQuantity) {
            onChange(quantity + 1, true)
        }
    }

    const handleRemove = () => {
        if (quantity > 0) {
            onChange(quantity - 1, true)
        }

        if (quantity === 0) {
            onChange(0, true)
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (!isNaN(value) && value >= 0 && value <= maxQuantity) {
            onChange(value)
        }
    }

    const startAdd = () => {
        handleAdd()
        addIntervalRef.current = setInterval(handleAdd, 200)
    }

    const stopAdd = () => {
        if (addIntervalRef.current) {
            clearInterval(addIntervalRef.current)
            addIntervalRef.current = null
        }
    }

    const startRemove = () => {
        handleRemove()
        removeIntervalRef.current = setInterval(handleRemove, 200)
    }

    const stopRemove = () => {
        if (removeIntervalRef.current) {
            clearInterval(removeIntervalRef.current)
            removeIntervalRef.current = null
        }
    }

    return (
        <div className={styles.meta}>
            <div
                className={styles.circle}
                onMouseDown={startRemove}
                onMouseUp={stopRemove}
                onMouseLeave={stopRemove}
            >
                <RemoveIcon style={{ fontSize: 20 }} />
            </div>
            <input
                className={styles.input}
                type='number'
                value={formatQuantity(String(quantity))}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                placeholder='0'
                min={0}
                max={maxQuantity}
            />
            <div
                className={styles.circle}
                onMouseDown={startAdd}
                onMouseUp={stopAdd}
                onMouseLeave={stopAdd}
            >
                <AddIcon style={{ fontSize: 20 }} />
            </div>
        </div>
    )
}

export default QuantitySelector
