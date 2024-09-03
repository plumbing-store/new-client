import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { IProperty, useCategoryStore } from '@/entities/Category/model/store'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelectedProperties from '@/entities/Category/UI/SelectedProperties/UI'
import Button from '@/shared/UI/Button'
import classNames from 'classnames'
import { generateFilter, updateProducts } from '@/entities/Category/model/helpers'
import { quantity } from '@/entities/Category/model/constants'

const CategoryFilter = () => {
    const {
        category,
        setCategory,
        properties,
        selectedProperties,
        setSelectedProperties,
        setTotal
    } = useCategoryStore()
    const [openProperty, setOpenProperty] = useState<number | null>(null)

    useEffect(() => {
        setSelectedProperties([])
    }, [properties])

    const toggleProperty = (id: number) => {
        setOpenProperty((prev) => (prev === id ? null : id))
    }

    const handleValueClick = (property: IProperty, value: string) => {
        setSelectedProperties((prevState) => {
            const index = prevState.findIndex((item) => item.name === property.name)

            if (index !== -1) {
                return prevState.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            value
                        }
                    }
                    return item
                })
            } else {
                return [...prevState, { name: property.name, value }]
            }
        })

        setOpenProperty(null)
    }

    const applyFilter = async () => {
        const filter = generateFilter(selectedProperties)

        await updateProducts(setTotal, setCategory, category, 0, filter)
    }

    const resetFilter = async () => {
        setSelectedProperties([])

        await updateProducts(setTotal, setCategory, category, 0)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.properties}>
                {properties.map((property) => {
                    const selectedValue = selectedProperties.find(
                        (item) => item.name === property.name
                    )?.value

                    const propertyName = selectedValue
                        ? `${property.name} (${selectedValue})`
                        : property.name

                    return (
                        <div className={styles.property} key={property.id}>
                            <div
                                className={styles.header}
                                onClick={() => toggleProperty(property.id)}
                            >
                                <p className={styles.name}>{propertyName}</p>
                                <ExpandMoreIcon
                                    className={`${styles.icon} ${openProperty === property.id ? styles.open : ''}`}
                                />
                            </div>
                            <ul
                                className={classNames(styles.list, {
                                    [styles.hidden]: openProperty !== property.id
                                })}
                            >
                                {property.values.map((value, index) => (
                                    <li
                                        key={index}
                                        className={styles.value}
                                        onClick={() => handleValueClick(property, value)}
                                    >
                                        {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => applyFilter()}>Применить</Button>
                <Button onClick={() => resetFilter()}>Сбросить</Button>
            </div>
        </div>
    )
}

export default CategoryFilter
