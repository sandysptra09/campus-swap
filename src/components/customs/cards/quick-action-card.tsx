import React from 'react'

import Link from 'next/link';
import { Upload, ShoppingBag, Repeat } from "lucide-react";
import { Card } from '@heroui/react';

export default function QuickActionCard() {

    const actions = [
        {
            icon: Upload,
            title: 'Upload Item',
            description: 'List your items for exchange',
            path: '/'
        },
        {
            icon: ShoppingBag,
            title: 'Browse Catalog',
            description: 'Explore available items',
            path: '/catalog'
        },
        {
            icon: Repeat,
            title: 'Exchange Points',
            description: 'Redeem your points',
            path: '/'
        }
    ]

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 mb-1'>
                <h2 className='text-2xl md:text-3xl font-bold'>Start Trading</h2>
                <p className='text-base md:text-lg text-muted-foreground font-medium'>Choose an action to start trading</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <Card
                            key={index}
                            as={Link}
                            href={action.path}
                            isPressable
                            className='
                                group p-6 rounded-2xl flex flex-col gap-1 items-center text-center
                                transition-all bg-white shadow-sm cursor-pointer border border-gray-300 
                                md:items-start md:text-left hover:shadow-xl hover:-translate-y-1 
                                hover:bg-primary hover:border-transparent'
                        >
                            <div
                                className='
                                    w-12 h-12 rounded-xl 
                                    bg-gray-100 flex items-center justify-center 
                                    transition-all
                                    group-hover:bg-green-200/40'
                            >
                                <Icon
                                    className='
                                        text-primary transition-all 
                                        group-hover:text-white'
                                    size={26}
                                />
                            </div>
                            <h3
                                className='
                                    mt-3 text-xl font-bold transition-all
                                    group-hover:text-white'
                            >
                                {action.title}
                            </h3>
                            <p
                                className='
                                    text-muted-foreground text-sm md:text-base transition-all
                                    group-hover:text-white/80'
                            >
                                {action.description}
                            </p>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
