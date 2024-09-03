import React, { useRef } from 'react'
import styles from './styles.module.scss'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

interface Props {
    quantity: number
    setQuantity: (quantity: number) => void
    maxQuantity: number
}

const QuantitySelector = ({ quantity, setQuantity, maxQuantity }: Props) => {
    const addIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const removeIntervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleAdd = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleRemove = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (!isNaN(value) && value >= 0 && value <= maxQuantity) {
            setQuantity(value)
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
                value={quantity}
                onChange={onInputChange}
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
