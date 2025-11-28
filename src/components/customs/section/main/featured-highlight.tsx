'use client';

import React from 'react'

import FeaturedHighlightBanner from '../../banners/featured-highlight-banner';

export default function FeaturedHighlightSection() {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-10'>
            <FeaturedHighlightBanner />
        </section>
    )
}
