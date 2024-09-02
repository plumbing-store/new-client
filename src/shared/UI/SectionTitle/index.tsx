import React, { ReactNode } from 'react'

import styles from './styles.module.scss'

const SectionTitle = ({ children }: { children: ReactNode }) => {
    return <h3 className={styles.heading}>{children}</h3>
}

export default SectionTitle
