import React, { useState } from 'react'
import styles from './styles.module.scss'
import Popover from '@/shared/UI/Popover'
import { useRouter } from 'next/navigation'

const HeaderNav = () => {
    const [isHidden, setIsHidden] = useState(true)
    const [activePopover, setActivePopover] = useState<number | null>(null)

    const router = useRouter()

    const links = [
        {
            name: 'Главная',
            href: '/'
        },
        {
            name: 'О компании',
            options: [
                {
                    name: 'О компании',
                    value: '/about'
                },
                {
                    name: 'Преимущества',
                    value: '/advantages'
                }
            ]
        },
        {
            name: 'Полезное',
            options: [
                {
                    name: 'Партнёры',
                    value: '/partners'
                },
                {
                    name: 'Рекламации',
                    value: '/ad'
                },
                {
                    name: 'Как оформить заказ',
                    value: '/how'
                }
            ]
        },
        {
            name: 'Доставка и оплата',
            href: '/delivery'
        }
    ]

    const onOptionClick = (value: string) => {
        setActivePopover(null)

        router.push(value)

        setIsHidden(true)
    }

    const setIsPopoverHidden = (isHidden: boolean) => {
        if (isHidden) {
            setActivePopover(null)
        }
    }

    return (
        <div className={styles.nav}>
            {links.map((link, index) => (
                <div key={index} className={styles.linkWrapper}>
                    {link.href ? (
                        <a href={link.href} className={styles.link}>
                            {link.name}
                        </a>
                    ) : (
                        <div className={styles.popoverWrapper}>
                            <button
                                className={styles.link}
                                onClick={() =>
                                    setActivePopover(activePopover === index ? null : index)
                                }
                            >
                                {link.name}
                            </button>
                            {activePopover === index && (
                                <Popover
                                    options={link.options || []}
                                    isHidden={activePopover !== index}
                                    setIsHidden={setIsPopoverHidden}
                                    onClick={onOptionClick}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default HeaderNav
