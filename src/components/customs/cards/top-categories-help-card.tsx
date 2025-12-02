import React from 'react'

import Link from 'next/link';
import { Card, CardBody } from '@heroui/react'

const categories = [
    {
        title: 'Account & Security',
        desc: 'Manage password, login methods, and security settings.',
        path: '/'
    },
    {
        title: 'Buying & Selling',
        desc: 'Learn how to buy and sell items effectively on CampusSwap.',
        path: '/'
    },
    {
        title: 'Payments',
        desc: 'Payment methods, errors, billing, and refunds.',
        path: '/'
    },
    {
        title: 'Messaging Support',
        desc: 'Chat, notifications, and communication features.',
        path: '/'
    },
    {
        title: 'Technical Issues',
        desc: 'Fix common app issues, bugs, and errors.',
        path: '/'
    },
    {
        title: 'Verification & Trust',
        desc: 'Verify your student identity and increase account trust.',
        path: '/'
    },
];

export default function TopCategoriesHelpCard() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6'>
            {categories.map((item) => (
                <Card
                    key={item.title}
                    shadow='none'
                    as={Link}
                    href={item.path}
                    className='p-4 border border-default-200 rounded-2xl hover:shadow-md transition cursor-pointer'
                >
                    <CardBody>
                        <h3 className='text-lg text-foreground font-semibold mb-1'>{item.title}</h3>
                        <p className='text-sm text-muted-foreground'>{item.desc}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
