export const Roles = {
    Admin: process.env.NEXT_PUBLIC_ADMIN_ROLE || 'admin'
} as const

export type Role = (typeof Roles)[keyof typeof Roles]
