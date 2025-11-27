import React from 'react';

import { Card } from '@heroui/react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function WelcomeHeader() {

    const userName = 'Sanchie Mikhailovna';
    const currentPoints = 1200;
    const pointIncrement = 150;

    return (
        <div className='w-full bg-gradient-to-r from-[#4ca771] to-[#46B85F] rounded-2xl p-6 md:p-10
             flex flex-col md:flex-row justify-between items-start md:items-center text-white relative overflow-hidden'
        >
            <div className='space-y-2 md:space-y-3 z-10'>
                <div className='flex items-center gap-2 text-sm md:text-base font-semibold'>
                    <Sparkles size={24} />
                    <span>Your daily summary!</span>
                </div>

                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
                    Welcome back, {userName}!
                </h1>

                <p className='text-sm md:text-base opacity-90'>
                    Let's trade your items and earn points!
                </p>
            </div>

            <Card
                shadow='lg'
                radius='lg'
                className='items-center mt-6 md:mt-0 bg-white shadow-lg rounded-xl 
                    p-5 w-full md:w-[260px] lg:w-[300px] z-10'
            >
                <p className='text-sm md:text-base font-medium text-muted-foreground mb-2'>Current Points</p>

                <p className='text-3xl md:text-4xl font-bold text-primary'>
                    {currentPoints.toLocaleString()}{' '}
                    <span className='text-base text-foreground'>pts</span>
                </p>

                <div className='flex items-center gap-2 mt-3 text-sm text-[#46B85F]'>
                    <ArrowUp size={20} />
                    <span className='text-sm md:text-base'>+{pointIncrement} pts this week</span>
                </div>
            </Card>
        </div>
    );
}
