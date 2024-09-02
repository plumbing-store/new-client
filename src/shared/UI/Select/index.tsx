import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IOption {
    name: string
    value: any
}

interface Props {
    options: IOption[]
    label?: string
    value?: any
    isValid?: boolean
    isOptional?: boolean
    onChange?: (value: any) => void
}

const Select = ({ label, options, value, isOptional, isValid = true, onChange }: Props) => {
    const [selectedOption, setSelectedOption] = useState<IOption>(
        value ? options.find((option) => option.value === value) || options[0] : options[0]
    )

    const [isHidden, setIsHidden] = useState(true)

    const selectRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option: IOption) => {
        setSelectedOption(option)
        setIsHidden(true)
        if (onChange) {
            onChange(option.value)
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsHidden(true)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setSelectedOption(
            value ? options.find((option) => option.value === value) || options[0] : options[0]
        )
    }, [value])

    return (
        <div
            ref={selectRef}
            className={classNames(styles.selectContainer, { [styles.active]: !isHidden })}
        >
            {label && (
                <label className={classNames(styles.label, { [styles.invalid]: !isValid })}>
                    {label}
                </label>
            )}
            <div
                className={classNames(styles.select, { [styles.invalid]: !isValid })}
                onClick={() => setIsHidden(!isHidden)}
            >
                <span>{selectedOption.name}</span>
                <ExpandMoreIcon className={styles.icon} />
            </div>
            {!isHidden && (
                <ul className={styles.options}>
                    {isOptional && (
                        <li
                            key='none'
                            className={styles.option}
                            onClick={() => handleSelect({ name: 'Ничего не выбрано', value: null })}
                        >
                            Ничего не выбрано
                        </li>
                    )}
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select
