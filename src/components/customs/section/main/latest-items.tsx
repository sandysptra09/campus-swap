'use client';

import React from 'react'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductLatestCard from '../../cards/product-latest';

export default function LatestItemsSection() {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0'>
                    <div className='text-left flex flex-col gap-2'>
                        <h2 className='text-2xl md:text-3xl font-bold'>
                            Latest Items
                        </h2>
                        <p className='text-base md:text-lg text-muted-foreground font-medium'>
                            Fresh listings from the community
                        </p>
                        <Link
                            href='/catalog'
                            className='md:hidden inline-flex items-center gap-1 text-primary font-semibold text-base mt-1'
                        >
                            View All <ArrowRight size={18} />
                        </Link>
                    </div>
                    <Link
                        href='/catalog'
                        className='hidden md:flex items-center gap-1 text-lg text-primary font-semibold hover:underline'
                    >
                        View All <ArrowRight size={20} />
                    </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[...Array(6)].map((_, i) => (
                        <ProductLatestCard
                            key={i}
                            product_id='1'
                            product_user_id='1'
                            product_name='Product Name'
                            product_description='Desc'
                            product_category='Category'
                            product_condition='new'
                            product_status='active'
                            product_point_value={280}
                            product_image_url='https://app.requestly.io/delay/3000/https://dummyimage.com/300x300/ffffff/000000'
                            product_created_at='2025-01-01'
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
