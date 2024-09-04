import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

const Page = () => {
    const partners = [
        '/images/vector/Frap.svg',
        '/images/vector/Rehau.svg',
        '/images/vector/Vieir.svg',
        '/images/raster/Gappo.webp',
        '/images/raster/VertexTools.webp',
        '/images/raster/Ganzer.jpg',
        '/images/raster/Gebo.jpg',
        '/images/raster/Bugatti.png',
        '/images/raster/Ledeme.png',
        '/images/raster/Politek.png',
        '/images/raster/Aquabright.png',
        '/images/raster/Tim.png',
        '/images/raster/Legrand.gif',
        '/images/raster/Hansen.gif'
    ]

    return (
        <Wrapper>
            <div className={styles.content}>
                <PageTitle>Партнёры</PageTitle>
                <div className={styles.list}>
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className={classNames(styles.section, {
                                [styles.some]: partner === '/images/raster/Gebo.jpg'
                            })}
                        >
                            <Image
                                className={styles.image}
                                src={partner}
                                alt={partner}
                                height={100}
                                width={100}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

export default Page
