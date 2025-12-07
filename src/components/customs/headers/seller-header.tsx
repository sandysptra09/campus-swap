import React from 'react'

import { Card, CardBody, Avatar, Button, Chip } from '@heroui/react';
import { Star, ShieldCheck } from 'lucide-react';

export default function SellerHeader() {

    const seller = {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        verified: true,
        rating: 4.8,
        reviews: 24,
        joined_at: '2025',
        total_listings: 18
    };

    return (
        <Card shadow='sm' radius='lg' className='border border-default-200'>
            <CardBody className='p-6 md:p-8'>
                <div className='flex flex-col md:flex-row justify-between gap-6'>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                        <Avatar
                            src={seller.avatar}
                            name={seller.name}
                            className='w-24 h-24 md:w-28 md:h-28'
                        />
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h2 className='text-xl md:text-2xl font-bold text-foreground'>
                                    {seller.name}
                                </h2>
                                {seller.verified && (
                                    <Chip
                                        size='sm'
                                        color='success'
                                        variant='flat'
                                        startContent={<ShieldCheck className='w-4 h-4' />}
                                    >
                                        Campus Verified
                                    </Chip>
                                )}
                            </div>
                            <div className='flex items-center gap-1 text-foreground'>
                                <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                <span className='font-medium'>{seller.rating}</span>
                                <span className='text-muted-foreground text-sm'>
                                    ({seller.reviews} reviews)
                                </span>
                            </div>
                            <p className='text-sm md:text-base font-semibold text-foreground'>
                                Joined: {seller.joined_at} • {seller.total_listings} listings
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-row md:flex-col gap-3 self-center md:self-start'>
                        <Button
                            size='md'
                            radius='lg'
                            variant='bordered'
                            color='primary'
                            className='w-full text-sm font-semibold'
                        >
                            Message Seller
                        </Button>
                        <Button
                            radius='lg'
                            variant='solid'
                            className='w-full text-sm font-semibold'
                        >
                            View Reviews
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
