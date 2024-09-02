import type { Metadata } from 'next'
import '@/shared/styles/common/index.scss'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: 'Сантехпроф',
    description: 'Santehprof site — продажа сантехнических средств в Москве и Московской области'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const modeCookie = cookies().get('mode')
    const mode = modeCookie ? modeCookie.value : 'light'

    return (
        <html lang='en' data-mode='light'>
            <head>
                <link rel='icon' href='/images/icons/favicon.ico' />
            </head>
            <body>{children}</body>
        </html>
    )
}
