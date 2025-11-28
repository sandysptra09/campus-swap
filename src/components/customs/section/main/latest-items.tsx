'use client';

import React from 'react'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LatestItemsMotion from '../../motions/latest-items-motion';

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
                <LatestItemsMotion />
            </div>
        </section>
    )
}
