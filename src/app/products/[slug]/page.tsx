import React from 'react'
import Wrapper from '@/shared/UI/Wrapper'
import ProductWidget from '@/entities/Product/UI/ProductWidget'
import { fetchProduct } from '@/entities/Product/api/fetchProduct'

const Product = async ({ params }: { params: { slug: string } }) => {
    const data = await fetchProduct(params.slug)

    if (!data) {
        return
    }

    return (
        <Wrapper>
            <ProductWidget {...data} />
        </Wrapper>
    )
}

export default Product
