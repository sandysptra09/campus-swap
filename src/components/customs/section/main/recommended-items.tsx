'use client';

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductRecommendedCard from '../../cards/product-recommended-card';
import { Product } from '@/types/product';
import { Spinner } from '@heroui/react';

export default function RecommendedItemsSection() {

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                const res = await fetch('/api/items?limit=6');
                if (res.ok) {
                    const data = await res.json();
                    setItems(data.items.slice(0, 6));
                }
            } catch (error) {
                console.error('Failed to fetch recommended items', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, []);

    if (loading) return <div className='py-20 flex justify-center'><Spinner /></div>;

    if (items.length === 0) return null;

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0'>
                    <div className='text-left flex flex-col gap-2'>
                        <h2 className='text-2xl md:text-3xl font-bold'>
                            Recommended Items
                        </h2>
                        <p className='text-base md:text-lg text-muted-foreground font-medium'>
                            Handpicked items based on your interests
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
                    {items.map((item) => (
                        <ProductRecommendedCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
