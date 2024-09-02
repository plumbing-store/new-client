'use client'

import React from 'react'
import styles from './styles.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavbarStore } from '@/widgets/Navbar/model/store'

const MenuButton = () => {
    const { isNavbarHidden, setIsNavbarHidden } = useNavbarStore()

    return (
        <button
            className={styles.button}
            onClick={() => setIsNavbarHidden((prevState) => !prevState)}
        >
            {isNavbarHidden ? <MenuIcon /> : <CloseIcon />}
        </button>
    )
}

export default MenuButton
