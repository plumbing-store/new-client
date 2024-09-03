import React from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import Link from 'next/link'
import classNames from 'classnames'
import { IBreadcrumb } from '@/entities/Product/model/types'

interface Props {
    breadcrumbs: IBreadcrumb[]
}

const Breadcrumbs = ({ breadcrumbs }: Props) => {
    return (
        <div className={styles.breadcrumbs}>
            {breadcrumbs.map(({ name, slug }, index) => {
                const isLast = index === breadcrumbs.length - 1

                console.log(slug)

                return (
                    <React.Fragment key={slug}>
                        <Link
                            className={classNames(styles.link, { [styles.active]: isLast })}
                            href={`/categories/${slug}`}
                        >
                            {name}
                        </Link>
                        {!isLast && <span className={styles.separator}>/</span>}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default Breadcrumbs
