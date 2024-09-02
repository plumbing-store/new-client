'use client'

import React, { useEffect, useState } from 'react'

import styles from './styles.module.scss'
import Providers from '@/app/providers'
import Loading from '@/shared/UI/Loading'
import Layout from '@/shared/UI/Layout'
import Navbar from '@/widgets/Navbar/UI'
import Header from '@/shared/UI/Header'
import AuthProvider from '@/app/providers/AuthProvider'
import StoreProvider from '@/app/providers/StoreProvider'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Layout>
            <AuthProvider>
                <StoreProvider>
                    <div className={styles.wrapper}>
                        <Navbar />
                        <div className={styles.content}>
                            <Header />
                            <main className={styles.main}>{children}</main>
                        </div>
                    </div>
                </StoreProvider>
            </AuthProvider>
        </Layout>
    )
}

export default Wrapper
