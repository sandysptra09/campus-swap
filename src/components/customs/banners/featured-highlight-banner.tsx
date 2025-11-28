import React from 'react'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@heroui/react'
import FeaturedHighlightMotion from '../motions/featured-highlight-motion'

export default function FeaturedHighlightBanner() {
    return (
        <div className='w-full bg-gradient-to-r from-[#4ca771] to-[#46B85F] rounded-2xl p-6 md:p-10 relative overflow-hidden'>
            <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8'>
                <div className='flex-1 text-white'>
                    <div className='flex items-center gap-2 text-white/80 text-sm md:text-base font-semibold mb-2'>
                        <TrendingUp size={24} />
                        <span>Weekly Highlight</span>
                    </div>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4'>
                        Top Trending <br /> Items
                    </h1>
                    <p className='text-white/90 text-base md:text-lg max-w-md mb-6'>
                        Discover the most popular items this week
                    </p>
                    <Button
                        radius='md'
                        className='bg-white text-primary text-sm md:text-base font-semibold hover:bg-gray-100 transition-all'
                        endContent={<ArrowRight size={18} />}
                    >
                        Lihat lebih banyak
                    </Button>
                </div>
                <div className='flex-1 max-w-sm md:max-w-md lg:max-w-lg'>
                    <FeaturedHighlightMotion />
                </div>
            </div>
        </div>
    )
}
