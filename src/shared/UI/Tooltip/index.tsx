import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

interface Props {
    text: string
    children: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: React.FC<Props> = ({ text, position = 'top', children }) => {
    const [visible, setVisible] = useState(false)

    const handleMouseEnter = () => {
        setVisible(true)
    }

    const handleMouseLeave = () => {
        setVisible(false)
    }

    return (
        <div
            className={styles.tooltipContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div
                className={classNames(styles.tooltip, styles[position], {
                    [styles.visible]: visible
                })}
            >
                {text}
            </div>
        </div>
    )
}

export default Tooltip
