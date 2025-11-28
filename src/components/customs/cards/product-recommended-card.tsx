import React from 'react'

import { Star } from 'lucide-react'
import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { Product } from '@/types/product'

export default function ProductRecommendedCard({
    product_name,
    product_category,
    product_point_value,
    product_image_url,
}: Product) {
    return (
        <Card
            shadow='sm'
            radius='lg'
            className=''
        >
            <CardBody className='overflow-visible p-0 relative'>
                <Chip
                    variant='solid'
                    className='bg-[#46B85F] absolute top-4 left-3 z-20 px-3 py-1 text-white font-medium'
                    startContent={<Star size={14} fill='#fff' />}
                >
                    Recommended
                </Chip>
                <Image
                    isZoomed
                    src={product_image_url}
                    alt={product_name}
                    width='100%'
                    className='w-full object-cover h-[250px]'
                />
            </CardBody>
            <CardFooter className='p-8 flex flex-col gap-2 text-left items-start'>
                <div className='mb-2'>
                    <h3 className='text-xl font-semibold'>{product_name}</h3>
                    <p className='text-sm md:text-base text-muted-foreground'>{product_category}</p>
                </div>
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <h4 className='text-xl md:text-2xl text-primary font-bold'>
                        {product_point_value}
                        <span className='text-base md:text-xl font-medium text-muted-foreground ml-1'>
                            pts
                        </span>
                    </h4>
                    <Button
                        radius='md'
                        className='bg-primary text-white text-sm font-semibold'
                    >
                        Exchange
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
