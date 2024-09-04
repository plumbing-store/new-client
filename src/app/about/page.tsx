import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import styles from './styles.module.scss'
import PageTitle from '@/shared/UI/PageTitle'

const Page = () => {
    return (
        <Wrapper>
            <div className={styles.content}>
                <PageTitle>Компания «Сантех-Проф»</PageTitle>
                <div className={styles.list}>
                    <p>
                        Компания «Сантех-Проф» успешно работает на рынке уже более 10 лет. Мы
                        нацелены на долгосрочные и взаимовыгодные партнерские отношения с клиентами
                        и поставщиками, основанные на добросовестном выполнении всех условий
                        договора, взаимном доверии и поддержке.
                    </p>
                    <p>
                        В нашем ассортименте более 25 000 товаров, включая бытовую и инженерную
                        сантехнику, электрику, ручной инструмент и электроинструмент.
                    </p>
                    <p>
                        Компания «Сантех-Проф» является официальным дилером большинства известных
                        марок. В основном это европейские бренды с производством в разных странах
                        мира, включая Китай. При производстве товаров используются инновационные
                        технологии и строгий контроль качества, что обеспечивает высокое качество
                        продукции по конкурентным ценам. Прямые договоры с производителями позволяют
                        нам предлагать выгодные цены и обеспечивать гарантийное обслуживание.
                    </p>
                    <p>
                        Мы предлагаем как модные новинки, так и проверенную временем классику,
                        европейское качество или доступные решения – у нас найдется все, что вам
                        нужно. Подробное описание товаров и рекомендации наших менеджеров делают
                        выбор простым и понятным. Мы гордимся своей командой профессионалов,
                        обладающих высоким уровнем знаний и опыта в сфере сантехники и инструмента.
                        Наши сотрудники всегда готовы помочь вам подобрать подходящие товары и
                        решить любые вопросы, связанные с их установкой и использованием.
                    </p>
                    <p>
                        Если вы ищете надежного партнера для сотрудничества в сфере сантехники и
                        инструмента, обратитесь к нам. Мы гарантируем высокое качество товаров,
                        профессиональное обслуживание и надежность в сотрудничестве.
                    </p>
                    <p>С уважением, ваш «Сантех-Проф».</p>
                </div>
            </div>
        </Wrapper>
    )
}

export default Page