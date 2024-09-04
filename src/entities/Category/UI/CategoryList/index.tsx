import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import classNames from 'classnames'
import ExpandMore from '@/shared/UI/ExpandMore'

const CategoryList = () => {
    const { category, depth } = useCategoryStore()
    const [isHidden, setIsHidden] = useState(true)

    if (!category || !category.children || depth === 2) return null

    const toggleHidden = () => {
        setIsHidden(!isHidden)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h4 className={styles.heading}>Категории</h4>
                <div className={styles.expandMoreWrapper}>
                    <ExpandMore isExpanded={isHidden} onClick={() => toggleHidden()} />
                </div>
            </div>
            <div
                className={classNames(styles.links, {
                    [styles.hidden]: isHidden
                })}
            >
                {category.children.map((child, index) => (
                    <div key={index} className={styles.item}>
                        <Link className={styles.link} href={`/categories/${child.slug}`}>
                            {child.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
