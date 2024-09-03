'use client'

import React, { useState } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'

import ModeToggleButton from '@/features/Mode/UI/ModeToggleButton'
import ProfileButton from '@/features/Profile/UI/ProfileButton'
import MenuButton from '@/features/Menu/UI/MenuButton'
import Popover from '@/shared/UI/Popover'
import { useLanguage } from '@/app/providers/LanguageProvider'
import Search from '@/features/Search/UI'
import HeaderNav from '@/widgets/HeaderNav/UI'
import HeaderContacts from '@/widgets/HeaderContacts/UI'
import CartButton from '../../../features/Cart/UI/CartButton'
import CartSummary from '@/entities/Cart/UI/CartSummary'

const Header = () => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <HeaderNav />

                <div className={styles.part}>
                    <Search />

                    <div className={classNames(styles.desktop, styles.meta)}>
                        <HeaderContacts />

                        <div className={styles.buttons}>
                            <ProfileButton />
                            <CartSummary />
                        </div>
                    </div>
                    <div className={styles.menuButtonWrapper}>
                        <MenuButton />
                    </div>
                </div>
            </header>
            <div className={styles.mobile}>
                <HeaderContacts />
            </div>
        </div>
    )
}

export default Header
