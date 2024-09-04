import React, { useEffect, useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import styles from './styles.module.scss'
import classNames from 'classnames'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        const scrollTop = window.pageYOffset
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        // Если мы проскроллили вниз на 300px и не в самом низу страницы, то показываем кнопку
        if (scrollTop + windowHeight < documentHeight - 1 && scrollTop > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div className={classNames(styles.scrollToTop, { [styles.hidden]: !isVisible })}>
            <div className={styles.customCircle} onClick={scrollToTop}>
                <ArrowUpwardIcon className={styles.arrowIcon} />
            </div>
        </div>
    )
}

export default ScrollToTop
