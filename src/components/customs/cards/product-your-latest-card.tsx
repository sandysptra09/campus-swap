import React from 'react'

import { Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface DashboardItemProps {
    item: {
        id: string;
        title: string;
        slug: string;
        imageUrl: string | null;
        pointValue: number;
        status: string;
        verificationStatus: string;
        createdAt: string;
        category: {
            name: string;
        };
    };
}

export default function ProductYourLatestCard({ item }: DashboardItemProps) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED':
                return <Chip size='sm' className='bg-green-100 text-green-600'>Approved</Chip>
            case 'REJECTED':
                return <Chip size='sm' className='bg-red-100 text-red-600'>Rejected</Chip>
            default:
                return <Chip size='sm' className='bg-yellow-100 text-yellow-600'>Pending</Chip>
        }
    };

    const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }).replace('about ', '');

    return (
        <Card
            shadow='none'
            className=''
            isPressable
            as={Link}
            href={`/user/dashboard/my-items/${item.slug}`}
        >
            <CardBody className='overflow-visible p-0'>
                <Image
                    isZoomed
                    src={item.imageUrl || 'https://placehold.co/300x300?text=No+Image'}
                    alt={item.title}
                    width='100%'
                    className='w-full border border-default-200 rounded-2xl object-cover h-[150px] md:h-[250px]'
                />
            </CardBody>
            <CardFooter className='flex flex-col gap-2 text-left items-start'>
                <div className=''>
                    {getStatusColor(item.status)}
                    <h3 className='text-base font-semibold'>
                        {item.title}
                    </h3>
                    <p className='text-xs text-muted-foreground'>
                        {timeAgo}
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
