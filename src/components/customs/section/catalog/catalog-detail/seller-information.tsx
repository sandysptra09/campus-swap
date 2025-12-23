'use client';

import React from 'react'

import Link from 'next/link';
import { Card, CardBody, Avatar, Divider, Button } from '@heroui/react';
import ChatSellerButton from '@/components/customs/buttons/chat-seller-button';

interface SellerProps {
    owner: {
        id: string;
        fullname: string;
        avatarUrl: string | null;
    };
}

export default function SellerInformationSection({ owner }: SellerProps) {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-6'>
            <h2 className='text-xl md:text-2xl font-semibold mb-4 text-foreground'>
                Seller Information
            </h2>
            <Card shadow='sm' radius='lg' className='p-4'>
                <CardBody className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar
                            src={owner.avatarUrl || 'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'}
                            className='w-16 h-16'
                        />

                        <div className='flex flex-col'>
                            <h3 className='text-lg md:text-xl font-semibold text-foreground'>
                                {owner.fullname}
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                S1 Rekaysa Perangkat Lunak
                            </p>
                            <p className='text-xs mt-1 text-muted-foreground'>
                                Joined: <span className='text-foreground font-medium'>Okt 2025</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between text-sm'>
                        <span className='text-muted-foreground'>Total Listings</span>
                        <span className='text-foreground font-semibold'>12 items</span>
                    </div>
                    <Divider />
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
                        <div className='w-full'>
                            <ChatSellerButton sellerId={owner.id} />
                        </div>
                        <Button
                            as={Link}
                            href={`/seller/${owner.id}`}
                            color='default'
                            variant='solid'
                            radius='lg'
                            className='font-semibold text-sm'
                        >
                            See All Items
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </section>
    )
}
