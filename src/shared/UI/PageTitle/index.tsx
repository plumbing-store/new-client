import React, { ReactNode } from 'react'

import styles from './styles.module.scss'

const PageTitle = ({ children }: { children: ReactNode }) => {
    return <h1 className={styles.heading}>{children}</h1>
}

export default PageTitle
