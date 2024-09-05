import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { IProperty, useCategoryStore } from '@/entities/Category/model/store'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelectedProperties from '@/entities/Category/UI/SelectedProperties/UI'
import Button from '@/shared/UI/Button'
import classNames from 'classnames'
import { generateFilter, updateProducts } from '@/entities/Category/model/helpers'
import { quantity } from '@/entities/Category/model/constants'
import ToggleCheckbox from '@/shared/UI/ToggleCheckbox'
import ExpandMore from '@/shared/UI/ExpandMore'

const CategoryFilter = () => {
    const {
        category,
        setCategory,
        properties,
        selectedProperties,
        setSelectedProperties,
        setTotal,
        setPage,
        sortOptions,
        setSortOptions,
        isAutoLoadDisabled,
        setIsAutoLoadDisabled
    } = useCategoryStore()
    const [openProperty, setOpenProperty] = useState<number | null>(null)
    const [searchTerms, setSearchTerms] = useState<{ [key: number]: string }>({}) // Для поиска по каждому свойству

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
                            values: item.values.includes(value)
                                ? item.values.filter((v) => v !== value)
                                : [...item.values, value]
                        }
                    }
                    return item
                })
            } else {
                return [...prevState, { id: property.id, name: property.name, values: [value] }]
            }
        })
    }

    const applyFilter = async () => {
        setPage(1)

        await updateProducts()
    }

    const resetFilter = async () => {
        setSelectedProperties([])
        setPage(1)
        setSortOptions({ sort: 'price', sortInverse: true })

        await updateProducts()
    }

    const handleSearchChange = (propertyId: number, searchTerm: string) => {
        setSearchTerms((prevState) => ({
            ...prevState,
            [propertyId]: searchTerm
        }))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h3 className={styles.heading}>Фильтр</h3>
                <div className={styles.properties}>
                    {properties.map((property) => {
                        const selectedValues = selectedProperties.find(
                            (item) => item.name === property.name
                        )?.values

                        const propertyName =
                            selectedValues && selectedValues.length > 0
                                ? `${property.name} (${selectedValues.join(', ')})`
                                : property.name

                        const searchTerm = searchTerms[property.id] || ''

                        // Фильтрация значений свойства на основе поискового запроса
                        const filteredValues = property.values.filter((value) =>
                            value.toLowerCase().includes(searchTerm.toLowerCase())
                        )

                        return (
                            <div key={property.id} className={styles.property}>
                                <div
                                    className={styles.header}
                                    onClick={() => toggleProperty(property.id)}
                                >
                                    <p className={styles.name}>{property.name}</p>
                                    <ExpandMore isExpanded={openProperty === property.id} />
                                </div>
                                <div
                                    className={classNames(styles.searchWrapper, {
                                        [styles.hidden]: openProperty !== property.id
                                    })}
                                >
                                    {/* Поле поиска */}
                                    <ul
                                        className={classNames(styles.list, {
                                            [styles.hidden]: openProperty !== property.id
                                        })}
                                    >
                                        <li>
                                            <input
                                                type='text'
                                                className={styles.searchInput}
                                                placeholder={`Поиск по (${property.name})`}
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    handleSearchChange(property.id, e.target.value)
                                                }
                                            />
                                        </li>
                                        {filteredValues.map((value, index) => {
                                            const isActive = selectedProperties.some(
                                                (item) =>
                                                    item.name === property.name &&
                                                    item.values.includes(value)
                                            )

                                            return (
                                                <li
                                                    key={index}
                                                    className={classNames(styles.value, {
                                                        [styles.active]: isActive
                                                    })}
                                                    onClick={() =>
                                                        handleValueClick(property, value)
                                                    }
                                                >
                                                    {isActive ? '✓' : ''} {value}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.buttons}>
                <Button onClick={() => applyFilter()}>Применить</Button>
                <Button onClick={() => resetFilter()}>Сбросить</Button>
            </div>
            <div className={styles.draw}>
                <ToggleCheckbox
                    message='Отключить автоматическую загрузку'
                    value={isAutoLoadDisabled}
                    setValue={setIsAutoLoadDisabled}
                />
            </div>
        </div>
    )
}

export default CategoryFilter
