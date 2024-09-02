import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

interface Props {
    children: ReactNode
}

const Plug = ({ children }: Props) => {
    return <h3 className={styles.heading}>{children}</h3>
}

export default Plug
