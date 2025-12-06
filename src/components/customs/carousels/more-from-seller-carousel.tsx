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

export default function MoreFromSellerCarousel() {

    const autoplay = useRef(
        Autoplay({
            delay: 2500,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
        })
    );

    const products = [...Array(8)].map((_, i) => ({
        id: i + 1,
        name: 'Product Name',
        description: 'Desc',
        category: 'Category',
        condition: 'new',
        status: 'active',
        point: 300,
        image: 'https://dummyimage.com/300x300/ffffff/000000',
        user_id: '1',
        created_at: '2025-01-01'
    }));

    return (
        <div className='w-full'>
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
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
                            <ProductMoreFromSellerCard
                                product_id={String(product.id)}
                                product_user_id={product.user_id}
                                product_name={product.name}
                                product_description={product.description}
                                product_category={product.category}
                                product_condition={product.condition}
                                product_status={product.status}
                                product_point_value={product.point}
                                product_image_url={product.image}
                                product_created_at={product.created_at}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
