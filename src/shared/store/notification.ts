import { create } from 'zustand'

export enum NotificationStatus {
    Danger = 'danger',
    Success = 'success',
    Info = 'info'
}

interface IState {
    type: NotificationStatus | null
    message: string | null
    showNotification: (type: NotificationStatus, message: string) => void
    hideNotification: () => void
}

export const useNotificationStore = create<IState>((set) => ({
    type: null,
    message: null,
    showNotification: (type, message) => {
        set({ type, message })
    },
    hideNotification: () => set({ type: null, message: null })
}))
