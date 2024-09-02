import React from 'react'
import styles from '@/shared/styles/pages/Login.module.scss'
import LoginForm from '@/features/Authentication/UI/LoginForm'
import Layout from '@/shared/UI/Layout'

const Page = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <LoginForm />
            </div>
        </Layout>
    )
}

export default Page
