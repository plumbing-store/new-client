import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { useCategoryStore } from '@/entities/Category/model/store'
import { generateFilter, updateProducts } from '@/entities/Category/model/helpers'
import classNames from 'classnames'
import GridIcon from '@/shared/UI/Icons/GridIcon'
import ListCheck from '@/shared/UI/Icons/ListCheck'
import ListIndefinite from '@/shared/UI/Icons/ListIndefinite'
import { DisplayState } from '@/entities/Product/model/types'
import Tooltip from '@/shared/UI/Tooltip'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

const CategoryHeader = () => {
    const [, setStoredDisplayState] = useLocalStorage<string | null>('displayState', null)

    const { displayState, setDisplayState, setPage, sortOptions, setSortOptions } =
        useCategoryStore()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSortChange = async (sort: 'name' | 'price', sortInverse: boolean) => {
        setSortOptions({ sort, sortInverse })
        setPage(1)

        setIsLoading(true)

        await updateProducts()

        setIsLoading(false)
    }

    const handleClick = (displayState: DisplayState) => {
        setDisplayState(displayState)
    }

    useEffect(() => {
        if (displayState) {
            setStoredDisplayState(displayState)
        }
    }, [displayState])

    const buttonsConfig = [
        {
            icon: <GridIcon />,
            value: 'Вид каталога: сетка',
            displayState: DisplayState.Grid
        },
        {
            icon: <ListCheck />,
            value: 'Вид каталога: линия',
            displayState: DisplayState.List
        },
        {
            icon: <ListIndefinite />,
            value: 'Вид каталога: таблица',
            displayState: DisplayState.Card
        }
    ]

    return (
        <div className={styles.header}>
            <div className={styles.part}>
                {buttonsConfig.map(({ icon, value, displayState: state }, index) => {
                    return (
                        <Tooltip text={value}>
                            <button
                                key={index}
                                className={classNames(styles.button, {
                                    [styles.active]: state === displayState
                                })}
                                onClick={() => handleClick(state)}
                            >
                                {icon}
                            </button>
                        </Tooltip>
                    )
                })}
            </div>
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
