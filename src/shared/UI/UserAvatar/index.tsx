import React from 'react'
import styles from './styles.module.scss'
import PlaceholderImage from '@/shared/UI/PlaceholderImage'

const UserAvatar = () => {
    return (
        <div className={styles.wrapper}>
            <PlaceholderImage icon fontSize={24} />
        </div>
    )
}

export default UserAvatar
