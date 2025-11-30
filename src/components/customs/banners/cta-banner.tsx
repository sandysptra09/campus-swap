import React from 'react'

import Link from 'next/link'
import { Button } from '@heroui/react'

export default function CtaBanner() {
    return (
        <div className='w-full bg-gradient-to-r from-[#4ca771] to-[#46B85F] rounded-2xl 
             p-6 md:p-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-2'>
            <div className='text-white max-w-2xl mb-3 md:mb-0'>
                <h1 className='mb-2 text-2xl md:text-3xl lg:text-4xl font-bold'>
                    Start Your Sustainable Trading Journey Today!
                </h1>
                <p className='text-base md:text-lg opacity-90'>
                    Exchange items, earn points, and grow together with the community.
                </p>
            </div>
            <div className='flex flex-col gap-4 md:gap-6 w-full md:w-auto max-w-[200px]'>
                <Button
                    as={Link}
                    href='/'
                    size='lg'
                    className='bg-white text-foreground font-semibold'
                >
                    Get Started
                </Button>
                <Button
                    as={Link}
                    href='/catalog'
                    size='lg'
                    className='bg-foreground text-white font-semibold'
                >
                    Explore Catalog
                </Button>
            </div>
        </div>
    )
}
