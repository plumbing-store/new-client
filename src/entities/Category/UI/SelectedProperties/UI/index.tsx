import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'

const SelectedProperties = () => {
    const { selectedProperties } = useCategoryStore()

    return (
        <div className={styles.wrapper}>
            {selectedProperties.map((property, index) => (
                <div key={index} className={styles.property}>
                    <p className={styles.name}>{property.name}</p>
                    <p className={styles.value}>{property.values.join(', ')}</p>
                </div>
            ))}
        </div>
    )
}

export default SelectedProperties
