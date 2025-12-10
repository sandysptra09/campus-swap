'use client';

import React from 'react'

import { Button, Image } from '@heroui/react';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';

export default function ViewItemPage() {

    const item = {
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        shortDescription: 'Premium wireless headphones with noise cancelling.',
        description:
            'These high-quality wireless headphones provide an immersive listening experience with noise cancellation...',
        category: 'Electronics',
        condition: 'Like New',
        points: 1200,
        imageUrl: 'https://dummyimage.com/600x600/ddd/000',
        status: 'Active',
    };

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-2xl font-semibold'>{item.name}</h1>
                <p className='text-muted-foreground text-sm'>View detailed information about your item.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-6 md:gap-4'>
                <div className='w-full md:w-3/5'>
                    <Image
                        radius='lg'
                        isZoomed
                        src={item.imageUrl}
                        alt={item.name}
                        className='w-full h-80 object-cover'
                    />
                </div>
                <div className='w-full md:2/5 flex flex-col'>
                    <h5 className='text-lg font-medium text-muted-foreground'>
                        {item.category}
                    </h5>
                    <h3 className='text-xl text-foreground font-bold'>
                        {item.name}
                    </h3>
                    <p className='mt-1 font-normal text-base text-muted-foreground w-full'>
                        {item.shortDescription}
                    </p>
                    <h4 className='mt-1 text-muted-foreground text-base'>
                        Product Condition: <span className='text-foreground font-bold'>{item.condition}</span>
                    </h4>
                    <h4 className='mt-1 text-muted-foreground text-base'>
                        Posted on: <span className='text-foreground font-bold'>December 3, 2025</span>
                    </h4>
                    <h2 className='mt-1 text-2xl text-primary font-bold'>
                        {item.points}
                        <span className='text-lg font-medium text-foreground ml-1'>
                            pts
                        </span>
                    </h2>
                </div>
            </div>
            <div>
                <h3 className='font-semibold text-lg'>Product Description</h3>
                <p className='text-base text-muted-foreground leading-relaxed'>
                    {item.description}
                </p>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <Button
                    startContent={<Trash size={16} />}
                    color='danger'
                    className='w-full'
                >
                    Delete Item
                </Button>
                <Button
                    as={Link}
                    href={`/user/dashboard/my-items/edit/${item.slug}`}
                    startContent={<Pencil size={16} />}
                    className='bg-primary text-white w-full'
                >
                    Edit Item
                </Button>
            </div>
        </div>
    )
}
