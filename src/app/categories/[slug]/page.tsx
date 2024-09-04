import React from 'react'
import { fetchCategory } from '@/entities/Category/api/fetchCategory'
import { useRouter } from 'next/navigation'
import Wrapper from '@/shared/UI/Wrapper'
import CategoryWidget from '../../../entities/Category/UI/CategoryWidget'
import { fetchProperties } from '@/entities/Category/api/fetchProperties'
import Subcategories from '@/widgets/Subcategories/UI'

const Category = async ({ params }: { params: { slug: string } }) => {
    const { result: category, total, depth, breadcrumbs } = await fetchCategory(params.slug)

    if (!category) {
        return <div>No category</div>
    }

    const properties = await fetchProperties(category.id)

    if (!properties) {
        return <div>No properties</div>
    }

    if (depth === 0) {
        return (
            <Wrapper>
                <Subcategories categories={category.children} />
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <CategoryWidget
                category={category}
                properties={properties}
                depth={depth}
                breadcrumbs={breadcrumbs}
                total={total}
            />
        </Wrapper>
    )
}

export default Category
