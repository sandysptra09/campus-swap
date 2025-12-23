import React from 'react'

import { Card, CardBody, Avatar, Button, Chip } from '@heroui/react';
import { Star, ShieldCheck } from 'lucide-react';

import { SellerData } from '@/app/(user)/seller/[id]/page';

interface Props {
    seller: SellerData;
}

export default function SellerHeader({ seller }: Props) {
    return (
        <Card shadow='sm' radius='lg' className='border border-default-200'>
            <CardBody className='p-6 md:p-8'>
                <div className='flex flex-col md:flex-row justify-between gap-6'>
                    <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                        <Avatar
                            src={seller.avatarUrl || 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'}
                            name={seller.fullname}
                            className='w-24 h-24 md:w-28 md:h-28'
                        />
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h2 className='text-xl md:text-2xl font-bold text-foreground'>
                                    {seller.fullname}
                                </h2>
                                <Chip size='sm' color='success' variant='flat' startContent={<ShieldCheck className='w-3 h-3' />}>
                                    Verified Student
                                </Chip>
                            </div>
                            <div className='flex items-center gap-1 text-foreground'>
                                <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                <span className='font-medium'>5.0</span>
                                <span className='text-muted-foreground text-sm'>
                                    (0 reviews)
                                </span>
                            </div>
                            <p className='text-sm md:text-base font-semibold text-foreground'>
                                Joined: {seller.joinedAt}
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
