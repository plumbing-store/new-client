import React, { useState, useRef, useEffect, Dispatch, RefObject } from 'react'
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

        if (
            popoverRef.current &&
            !popoverRef.current.contains(target) &&
            !(target instanceof HTMLButtonElement) &&
            !(target instanceof Element && target.closest('button'))
        ) {
            setIsHidden(true)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className={classNames(styles.popover, { [styles.hidden]: isHidden })} ref={popoverRef}>
            {options.map((option) => (
                <button
                    key={option.value}
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
