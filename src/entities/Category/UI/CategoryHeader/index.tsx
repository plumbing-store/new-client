import React from 'react'
import styles from './styles.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { useCategoryStore } from '@/entities/Category/model/store'

const CategoryHeader = () => {
    const { sortOptions, setSortOptions } = useCategoryStore()

    const handleSortChange = (name: string, ascending: boolean) => {
        setSortOptions({ name, value: ascending })
    }

    return (
        <div className={styles.header}>
            <div className={styles.part}>
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('price', true)}
                >
                    <ArrowUpwardIcon
                        className={
                            sortOptions.name === 'price' && sortOptions.value ? styles.active : ''
                        }
                    />
                </button>
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('price', false)}
                >
                    <ArrowDownwardIcon
                        className={
                            sortOptions.name === 'price' && !sortOptions.value ? styles.active : ''
                        }
                    />
                </button>
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('name', true)}
                >
                    <SortByAlphaIcon
                        className={
                            sortOptions.name === 'name' && sortOptions.value ? styles.active : ''
                        }
                    />
                </button>
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('name', false)}
                >
                    <SortByAlphaIcon
                        className={`${styles.inactive} ${sortOptions.name === 'name' && !sortOptions.value ? styles.active : ''}`}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </button>
            </div>
        </div>
    )
}

export default CategoryHeader
