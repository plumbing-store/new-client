import { NotificationStatus, useNotificationStore } from '@/shared/store/notification'

export const notify = (type: NotificationStatus, message: string) => {
    const { showNotification } = useNotificationStore.getState()

    showNotification(type, message)
}
