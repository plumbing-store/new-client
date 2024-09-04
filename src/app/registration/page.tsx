import React from 'react'
import Layout from '@/shared/UI/Layout'
import styles from './styles.module.scss'
import RegistrationForm from '@/features/Authentication/UI/RegistrationForm'

const Page = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <RegistrationForm />
            </div>
        </Layout>
    )
}

export default Page
