import React, { useState } from 'react'
import styles from './styles.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { useCategoryStore } from '@/entities/Category/model/store'
import { generateFilter, updateProducts } from '@/entities/Category/model/helpers'
import classNames from 'classnames'

const CategoryHeader = () => {
    const {
        setPage,
        setTotal,
        category,
        setCategory,
        sortOptions,
        setSortOptions,
        selectedProperties
    } = useCategoryStore()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSortChange = async (sort: 'name' | 'price', sortInverse: boolean) => {
        setSortOptions({ sort, sortInverse })
        setPage(1)

        setIsLoading(true)

        await updateProducts()

        setIsLoading(false)
    }

    return (
        <div className={styles.header}>
            <div className={styles.part}>
                <button
                    disabled={isLoading}
                    className={styles.sortButton}
                    onClick={() => handleSortChange('price', true)}
                >
                    <ArrowUpwardIcon
                        className={classNames({
                            [styles.active]: sortOptions.sort === 'price' && sortOptions.sortInverse
                        })}
                    />
                </button>
                <button
                    disabled={isLoading}
                    className={styles.sortButton}
                    onClick={() => handleSortChange('price', false)}
                >
                    <ArrowDownwardIcon
                        className={classNames({
                            [styles.active]:
                                sortOptions.sort === 'price' && !sortOptions.sortInverse
                        })}
                    />
                </button>
                <button
                    disabled={isLoading}
                    className={styles.sortButton}
                    onClick={() => handleSortChange('name', true)}
                >
                    <SortByAlphaIcon
                        className={classNames({
                            [styles.active]: sortOptions.sort === 'name' && sortOptions.sortInverse
                        })}
                    />
                </button>
                <button
                    disabled={isLoading}
                    className={styles.sortButton}
                    onClick={() => handleSortChange('name', false)}
                >
                    <SortByAlphaIcon
                        className={classNames(styles.inactive, {
                            [styles.active]: sortOptions.sort === 'name' && !sortOptions.sortInverse
                        })}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </button>
            </div>
        </div>
    )
}

export default CategoryHeader
