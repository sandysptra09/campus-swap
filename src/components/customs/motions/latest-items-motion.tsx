'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import ProductLatestCard from '../cards/product-latest';
import { Product } from '@/types/product';
import { Spinner } from '@heroui/react';

export default function LatestItemsMotion() {

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await fetch('/api/items');
                if (res.ok) {
                    const data = await res.json();

                    const limitedItems = data.items.slice(0, 8);
                    setItems(limitedItems);
                }
            } catch (error) {
                console.error('Failed to fetch latest items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    useLayoutEffect(() => {
        if (containerRef.current && items.length > 0) {
            setScrollWidth(containerRef.current.scrollWidth - containerRef.current.clientWidth);
        }
    }, [items]);

    if (loading) return <div className='p-10 flex justify-center'><Spinner /></div>;
    if (items.length === 0) return null;

    return (
        <div className='relative overflow-hidden w-full'>
            <motion.div
                ref={containerRef}
                className='flex gap-6 p-2'
                initial={{ x: 0 }}
                animate={{ x: scrollWidth > 0 ? -scrollWidth : 0 }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: items.length * 3,
                    ease: 'linear',
                }}
            >
                {items.map((item) => (
                    <div key={item.id} className='min-w-[280px] max-w-[280px]'>
                        <ProductLatestCard item={item} />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
