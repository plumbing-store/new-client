'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { useNavbarStore } from '@/widgets/Navbar/model/store'
import { useScreenSizeStore } from '@/shared/store/screenSize'
import { Roles } from '@/shared/enums/roles'
import { logOut } from '@/shared/helpers/logout'
import { Language } from '@/shared/types/languages'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { useCategoriesStore } from '@/entities/Category/model/store'

interface IItem {
    name: Record<Language, string>
    href?: string
    roles?: string[]
    onClick?: () => void
}

const Navbar = () => {
    const { language } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()

    const { categories } = useCategoriesStore()
    const { isNavbarHidden, setIsNavbarHidden } = useNavbarStore()
    const { screenSize } = useScreenSizeStore()

    const navRef = useRef<HTMLDivElement>(null)

    const transition = {
        x: { duration: 0.25 },
        opacity: { duration: 0.25 },
        maxWidth: { duration: 0.25 }
    }

    const variants = {
        hidden: {
            x: '-100%',
            opacity: 0,
            transition
        },
        visible: {
            x: '0',
            opacity: 1,
            transition
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            navRef.current &&
            !navRef.current.contains(event.target as Node) &&
            !(event.target instanceof HTMLButtonElement) &&
            !(event.target instanceof Element && event.target.closest('button'))
        ) {
            setIsNavbarHidden(true)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <motion.div
            ref={navRef}
            className={styles.wrapper}
            animate={isNavbarHidden && screenSize < 1600 ? 'hidden' : 'visible'}
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.head}>
                {/*<h3>*/}
                {/*    Сантехпр<span>💧</span>ф*/}
                {/*</h3>*/}
                <Image
                    className={styles.logo}
                    src='/images/vector/default-logo-3.svg'
                    alt='Сантехпр💧ф'
                    width={200}
                    height={100}
                />
            </div>
            <nav className={styles.navbar}>
                <div className={styles.top}>{/* Logo or any top content */}</div>
                <div className={styles.items}>
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            className={styles.link}
                            href={`/categories/${category.slug}`}
                        >
                            <span>{category.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </motion.div>
    )
}

export default Navbar
