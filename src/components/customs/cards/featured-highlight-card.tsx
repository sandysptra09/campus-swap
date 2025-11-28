import React from 'react'

import { Card, Image } from '@heroui/react'

export default function FeaturedHighlightCard() {
    return (
        <Card
            shadow='none'
            className='aspect-square w-28 md:w-28 lg:w-32 bg-white/20 rounded-xl backdrop-blur-sm border-transparent shadow-none'>
            <Image
                src='https://dummyimage.com/128x128/ffffff/000000'
                alt='Featured Highlight'
                width={128}
                height={128}
                className='w-full h-full object-cover rounded-xl'
            />
        </Card>
    )
}
