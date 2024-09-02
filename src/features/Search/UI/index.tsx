import React from 'react'
import Input from '@/shared/UI/Input'
import styles from './styles.module.scss'
import SearchIcon from '@mui/icons-material/Search'

const Search = () => {
    return (
        <div className={styles.wrapper}>
            <Input placeholder='Поиск' />
            <button className={styles.button}>
                <SearchIcon />
            </button>
        </div>
    )
}

export default Search
