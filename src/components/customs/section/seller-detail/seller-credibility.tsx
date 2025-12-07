'use client';

import React from 'react'

import { Card, CardBody } from '@heroui/react';
import { CheckCircle, Clock, BadgeCheck, Repeat } from 'lucide-react';

export default function SellerCredibilitySection() {

    const credibility = {
        success_rate: '92%',
        response_time: 'Replies within 3 hours',
        verified_student: true,
        completed_exchange: 34
    };

    const items = [
        {
            icon: <CheckCircle className='w-6 h-6 text-success' />,
            label: 'Success Rate',
            value: credibility.success_rate
        },
        {
            icon: <Clock className='w-6 h-6 text-primary' />,
            label: 'Response Time',
            value: credibility.response_time
        },
        {
            icon: (
                <BadgeCheck
                    className={`w-6 h-6 ${credibility.verified_student ? 'text-success' : 'text-default-500'
                        }`}
                />
            ),
            label: 'Verified Student',
            value: credibility.verified_student ? 'Verified' : 'Not Verified'
        },
        {
            icon: <Repeat className='w-6 h-6 text-warning' />,
            label: 'Exchanges Completed',
            value: credibility.completed_exchange
        }
    ];

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-4'>
            <h3 className='text-xl md:text-2xl font-semibold mb-4 text-foreground'>Seller Credibility</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {items.map((item, idx) => (
                    <Card
                        key={idx}
                        shadow='sm'
                        radius='lg'
                        className='border border-default-200'
                    >
                        <CardBody className='py-5 flex flex-col items-center text-center gap-2'>
                            {item.icon}
                            <p className='text-sm text-muted-foreground'>{item.label}</p>
                            <p className='text-base font-semibold text-foreground'>{item.value}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    )
}
