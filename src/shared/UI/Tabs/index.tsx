'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

export interface ITab {
    name: string
    value?: any
}

export interface TabsProps {
    tabs: ITab[]
    value?: any
    isDropped?: boolean
    onChange?: (value: any) => void
}

const Tabs = ({ tabs, value, onChange }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(
        value ? tabs.findIndex((tab) => tab.value === value) : 0
    )

    const handleTabClick = (index: number) => {
        if (onChange) {
            onChange(tabs[index].value)
        }

        setActiveTab(index)
    }

    return (
        <div className={styles.list}>
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={classNames(styles.tab, { [styles.active]: index === activeTab })}
                    onClick={() => handleTabClick(index)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    )
}

export default Tabs
