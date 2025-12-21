import React, { useRef } from 'react'

import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/shadcn/ui/carousel'
import ProductMoreFromSellerCard from '../cards/product-more-from-seller-card'
import { Product } from '@/types/product'

interface Props {
    products: Product[];
}

export default function MoreFromSellerCarousel({ products }: Props) {

    const autoplay = useRef(
        Autoplay({
            delay: 2500,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
        })
    );

    return (
        <div className='w-full'>
            <Carousel
                opts={{
                    align: 'start',
                    loop: products.length > 4,
                }}
                plugins={[autoplay.current]}
                className='w-full'
            >
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className='basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
                        >
                            <ProductMoreFromSellerCard item={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
