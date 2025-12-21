import React from 'react'

import Link from 'next/link'
import { Card, Image } from '@heroui/react'
import { Product } from '@/types/product'

interface Props {
    item: Product;
}
export default function FeaturedHighlightCard({ item }: Props) {
    return (
        <Card
            shadow='none'
            isPressable
            as={Link}
            href={`/catalog/${item.slug}`}
            className='aspect-square w-28 md:w-28 lg:w-32 bg-white/20 rounded-xl backdrop-blur-sm border-transparent shadow-none'>
            <Image
                src={item.imageUrl || 'https://dummyimage.com/128x128/ffffff/000000'}
                alt={item.title}
                width={128}
                height={128}
                className='w-full h-full object-cover rounded-xl'
            />
        </Card>
    )
}
