import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import Tabs, { ITab, TabsProps } from '@/shared/UI/Tabs'

const TabsContainer = (props: TabsProps) => {
    return (
        <div className={classNames(styles.container, { [styles.isDropped]: props.isDropped })}>
            <div className={styles.tape}>
                <Tabs {...props} />
            </div>
        </div>
    )
}

export default TabsContainer
