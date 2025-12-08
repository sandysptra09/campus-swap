import React from 'react'

import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function ProductYourLatestCard({
    product_name,
    product_category,
    product_status,
    product_point_value,
    product_image_url,
}: Product) {
    return (
        <Card
            shadow='none'
            className=''
        >
            <CardBody className='overflow-visible p-0'>
                <Image
                    isZoomed
                    src={product_image_url}
                    alt={product_name}
                    width='100%'
                    className='w-full border border-default-200 rounded-2xl object-cover h-[150px] md:h-[250px]'
                />
            </CardBody>
            <CardFooter className='flex flex-col gap-2 text-left items-start'>
                <div className=''>
                    <Chip
                        size='sm'
                        variant='solid'
                        className='capitalize px-3 py-1 text-foreground font-medium mb-1'
                    >
                        {product_status}
                    </Chip>
                    <h3 className='text-lg font-semibold'>
                        {product_name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        2 days ago
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
