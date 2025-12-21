'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useAnimationFrame } from 'framer-motion';
import FeaturedHighlightCard from '../cards/featured-highlight-card';
import { Product } from '@/types/product';
import { Spinner } from '@heroui/react';

export default function FeaturedHighlightMotion() {

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const baseVelocity = 60;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await fetch('/api/items');
                if (res.ok) {
                    const data = await res.json();

                    const topFeatured = data.items.slice(0, 10);
                    setItems(topFeatured);
                }
            } catch (error) {
                console.error('Failed to fetch featured items', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    useAnimationFrame((t, delta) => {
        if (!ref.current) return;

        const move = (baseVelocity * delta) / 1000;

        ref.current.scrollLeft += move;

        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
            ref.current.scrollLeft = 0;
        }
    });

    if (loading) return <div className='flex items-center justify-center h-32'><Spinner color='white' /></div>;

    if (items.length === 0) return null;

    return (
        <div
            ref={ref}
            className='w-full overflow-hidden'
        >
            <div
                className='inline-flex gap-4 md:gap-6 whitespace-nowrap'
            >
                {[...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
                    <div key={`${item.id}-${i}`} className='shrink-0'>
                        <FeaturedHighlightCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
