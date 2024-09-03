import React from 'react'
import styles from './styles.module.scss'
import { useCategoryStore } from '@/entities/Category/model/store'
import Link from 'next/link'
import classNames from 'classnames'
import Breadcrumbs from '@/shared/UI/Breadcrumbs'

const CategoryBreadcrumbs = () => {
    const { breadcrumbs } = useCategoryStore()

    return <Breadcrumbs breadcrumbs={breadcrumbs} />
}

export default CategoryBreadcrumbs
