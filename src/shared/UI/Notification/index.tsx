import { useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { useNotificationStore } from '@/shared/store/notification'

const Notification = () => {
    const { type, message, hideNotification } = useNotificationStore()

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (type && message) {
            timeout = setTimeout(() => {
                hideNotification()
            }, 5000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [type, message])

    if (!type || !message) return null

    return (
        <div
            className={classNames(styles.notification, styles[type])}
            role='alert'
            onClick={() => hideNotification()}
        >
            {message}
        </div>
    )
}

export default Notification
