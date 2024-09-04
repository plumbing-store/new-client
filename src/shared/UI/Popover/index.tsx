import React, { useState, useRef, useEffect, Dispatch } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface IOption {
    name: string
    value: any
}

interface Props {
    isHidden: boolean
    options: IOption[]
    setIsHidden: Dispatch<boolean>
    onClick: (value: any) => void
}

const Popover = ({ options, isHidden, setIsHidden, onClick }: Props) => {
    const popoverRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        console.log('Clicked target:', target)

        if (popoverRef.current && !popoverRef.current.contains(target)) {
            console.log('Click outside detected')
            setIsHidden(true)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true) // capture phase

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div className={classNames(styles.popover, { [styles.hidden]: isHidden })} ref={popoverRef}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={styles.option}
                    onClick={() => {
                        setIsHidden(true)
                        onClick(option.value)
                    }}
                >
                    {option.name}
                </button>
            ))}
        </div>
    )
}

export default Popover
