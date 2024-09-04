import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'
import Link from 'next/link'

const Page = () => {
    return (
        <Wrapper>
            <div className={styles.content}>
                <PageTitle>Рекламации</PageTitle>
                <div className={styles.list}>
                    <p>
                        В случае обнаружения брака или несоответствия между количеством отгруженного
                        товара и количеством товара, указанного в накладной, рекомендуем заполнить{' '}
                        <Link href='/path-to-complaint-form'>бланк претензии</Link>, приложить фото
                        брака и направить документы на электронную почту:{' '}
                        <Link href='mailto:info@santeh-prof.ru'>info@santeh-prof.ru</Link>.
                    </p>
                    <p>Ответ по рекламации предоставляется в течение 3 рабочих дней.</p>
                    <p>
                        Если товар надлежащего качества не подошел вам по каким-либо причинам, вы
                        можете отказаться от него до подписания документов о приемке всего заказа.
                    </p>
                    <p>
                        Вы также можете отказаться от товара в течение 3 дней после подписания
                        документов, не считая дня его покупки. В этом случае необходимо, чтобы:
                    </p>
                    <ul>
                        <li>
                            Товар не эксплуатировался, были сохранены его потребительские свойства,
                            товарный вид, упаковка, пломбы, ярлыки, а также товарный/кассовый чек и
                            документация.
                        </li>
                        <li>
                            Товар был надлежащего качества (исправен, не имел вмятин, трещин,
                            царапин, сколов и других механических повреждений, за исключением
                            скрытых производственных дефектов).
                        </li>
                    </ul>
                    <p>
                        По вопросам, связанным с оформлением рекламаций, обращайтесь по телефону или
                        по e-mail:{' '}
                        <Link href='mailto:info@santeh-prof.ru'>info@santeh-prof.ru</Link>.
                    </p>
                </div>
            </div>
        </Wrapper>
    )
}

export default Page