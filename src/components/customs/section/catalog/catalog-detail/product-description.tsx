'use client';

import React from 'react'

interface Props {
    description: string;
}

export default function ProductDescriptionSection({ description }: Props) {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-2 md:py-4'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2 text-foreground'>
                Product Description
            </h2>
            <p className='whitespace-pre-line text-muted-foreground leading-relaxed text-sm md:text-base'>
                {description ? description : "No description provided by the seller."}
            </p>
        </section>
    )
}
