'use client';

import React from 'react'

import MoreFromSellerCarousel from '@/components/customs/carousels/more-from-seller-carousel';

export default function MoreFromSellerSection() {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-6'>
            <h2 className='text-xl md:text-2xl font-semibold text-foreground mb-4'>
                More from Seller
            </h2>
            <p className='text-sm md:text-base text-muted-foreground mb-6'>
                Check out more items from this seller
            </p>
            <MoreFromSellerCarousel />
        </section>
    )
}
