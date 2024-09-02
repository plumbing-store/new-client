import React from 'react'
import { fetchCategory } from '@/entities/Category/api/fetchCategory'
import { useRouter } from 'next/navigation'
import Wrapper from '@/shared/UI/Wrapper'
import CategoryWidget from '../../../entities/Category/UI/CategoryWidget'

const Category = async ({ params }: { params: { slug: string } }) => {
    const data = await fetchCategory(params.slug)

    if (!data) {
        return
    }

    if (data.depth === 0) {
        return <div>Subcategory list</div>
    }

    return (
        <Wrapper>
            <CategoryWidget {...data} />
        </Wrapper>
    )
}

export default Category
