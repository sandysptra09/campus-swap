import React from 'react'

import { Clock } from 'lucide-react'
import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { Product } from '@/types/product'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns';

interface Props {
    item: Product;
}

export default function ProductLatestCard({ item }: Props) {

    const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).replace('about ', '');

    return (
        <Card
            shadow='none'
            radius='lg'
            className=''
        >
            <CardBody className='overflow-visible p-0 relative'>
                <Chip
                    variant='solid'
                    className='bg-white absolute top-4 left-3 z-20 px-3 py-1 text-muted-foreground font-medium'
                    startContent={<Clock size={14} className='text-primary' />}
                >
                    {timeAgo}
                </Chip>
                <Image
                    isZoomed
                    src={item.imageUrl || 'https://placehold.co/400x300?text=No+Image'}
                    alt={item.title}
                    width='100%'
                    className='w-full object-cover h-[250px]'
                />
            </CardBody>
            <CardFooter className='p-8 flex flex-col gap-2 text-left items-start'>
                <div className='mb-2'>
                    <h3 className='text-xl font-semibold'>{item.title}</h3>
                    <p className='text-sm md:text-base text-muted-foreground'>{item.category.name}</p>
                </div>
                <div className='flex flex-row gap-4 justify-between w-full'>
                    <h4 className='text-xl md:text-2xl text-primary font-bold'>
                        {item.pointValue}
                        <span className='text-base md:text-xl font-medium text-muted-foreground ml-1'>
                            pts
                        </span>
                    </h4>
                    <Button
                        as={Link}
                        href={`/catalog/${item.slug}`}
                        radius='md'
                        className='bg-foreground text-white text-sm font-semibold'
                    >
                        View Detail
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
