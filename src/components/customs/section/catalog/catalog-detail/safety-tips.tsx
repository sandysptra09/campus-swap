'use client';

import React from 'react'

import { ShieldCheck, Handshake, Package, MessageCircle, AlertTriangle, Lock } from 'lucide-react';
import { Card, CardBody } from '@heroui/react';

export default function SafetyTipsSection() {

    const tips = [
        {
            icon: <ShieldCheck className='w-12 h-12 text-primary' />,
            title: 'Inspect the item before confirming',
            desc: "Ensure that the condition of the item matches the description before pressing the ‘Confirm Received’ button. New points will be deducted after you confirm."
        },
        {
            icon: <Handshake className='w-12 h-12 text-primary' />,
            title: 'Meet in safe public campus areas',
            desc: 'Make transactions in busy areas of the campus such as the faculty lobby, library, cafeteria, or student center.'
        },
        {
            icon: <Package className='w-12 h-12 text-primary' />,
            title: 'Verify item authenticity & condition',
            desc: "Check the functionality, completeness, and condition of the item. Don't hesitate to cancel the transaction if anything seems suspicious."
        },
        {
            icon: <MessageCircle className='w-12 h-12 text-primary' />,
            title: 'Use the in-app chat for communication',
            desc: 'Use Campusswap chat to maintain security and facilitate tracking in case of problems.'
        },
        {
            icon: <Lock className='w-12 h-12 text-primary' />,
            title: 'Protect your personal information',
            desc: 'Do not share your home address, identification number, or other sensitive data.'
        },
        {
            icon: <AlertTriangle className='w-12 h-12 text-primary' />,
            title: 'Report suspicious behavior',
            desc: 'Report suspicious users or listings so that the campus team can take further action.'
        },
    ];

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-6'>
            <h2 className='text-xl md:text-2xl font-semibold text-foreground mb-4'>
                Safety Tips
            </h2>
            <p className='text-sm md:text-base text-muted-foreground mb-6'>
                Ensure that your experience exchanging items is safe and convenient by following these important tips.
            </p>
            <div className='grid gap-4 md:grid-cols-2'>
                {tips.map((tip, index) => (
                    <Card key={index} shadow='sm' radius='lg'>
                        <CardBody className='flex gap-4 p-8 items-start'>
                            {tip.icon}
                            <div>
                                <h4 className='font-semibold text-foreground text-justify text-base md:text-lg'>
                                    {tip.title}
                                </h4>
                                <p className='text-sm text-muted-foreground mt-1 text-justify'>
                                    {tip.desc}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    )
}
