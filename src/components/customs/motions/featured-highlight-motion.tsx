'use client';

import React, { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';
import FeaturedHighlightCard from '../cards/featured-highlight-card';

export default function FeaturedHighlightMotion() {

    const baseVelocity = 60;
    const items = [1, 2, 3, 4, 5];

    const ref = useRef<HTMLDivElement>(null);

    useAnimationFrame((t, delta) => {
        if (!ref.current) return;

        const move = (baseVelocity * delta) / 1000;

        ref.current.scrollLeft += move;

        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
            ref.current.scrollLeft = 0;
        }
    });

    return (
        <div
            ref={ref}
            className='w-full overflow-hidden'
        >
            <div
                className='inline-flex gap-4 md:gap-6 whitespace-nowrap'
            >
                {[...items, ...items].map((item, i) => (
                    <FeaturedHighlightCard key={i} />
                ))}
            </div>
        </div>
    );
}
