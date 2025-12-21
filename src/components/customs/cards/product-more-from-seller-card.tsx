import React from 'react'

import { Star } from 'lucide-react'
import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import Link from 'next/link'
import { Product } from '@/types/product'

interface Props {
    item: Product;
}

export default function ProductMoreFromSellerCard({ item }: Props) {
    return (
        <Card
            shadow='none'
            className=''
            isPressable
            as={Link}
            href={`/catalog/${item.slug}`}
        >
            <CardBody className='overflow-visible p-0 relative'>
                <Chip
                    variant='solid'
                    className='bg-[#46B85F] absolute top-4 left-3 capitalize z-20 px-3 py-1 text-white font-medium'
                    startContent={<Star size={14} fill='#fff' />}
                >
                    {item.condition.toLowerCase()}
                </Chip>
                <Image
                    isZoomed
                    src={item.imageUrl || 'https://dummyimage.com/300x300/ffffff/000000'}
                    alt={item.title}
                    width='100%'
                    className='w-full border border-default-200 rounded-2xl object-cover h-[250px]'
                />
            </CardBody>
            <CardFooter className='flex flex-col gap-2 text-left items-start'>
                <div className=''>
                    <p className='text-sm text-muted-foreground'>{item.category.name}</p>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    <h6 className='test-sm font-normal'>Posted by: Product Owner</h6>
                </div>
                <div className='flex flex-col gap-2 justify-between w-full'>
                    <h4 className='text-lg md:text-xl text-primary font-bold'>
                        {item.pointValue}
                        <span className='text-sm md:text-base font-medium text-muted-foreground ml-1'>
                            pts
                        </span>
                    </h4>
                </div>
            </CardFooter>
        </Card>
    )
}
