'use client';

import React, { useEffect, useState } from 'react'

import MoreFromSellerCarousel from '@/components/customs/carousels/more-from-seller-carousel';
import { Product } from '@/types/product';

interface Props {
    ownerId: string;
    currentItemId: string;
}

export default function MoreFromSellerSection({ ownerId, currentItemId }: Props) {

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoreItems = async () => {
            if (!ownerId) return;
            try {
                const res = await fetch(`/api/items?sellerId=${ownerId}`);
                if (res.ok) {
                    const data = await res.json();

                    const filtered = data.items.filter((i: Product) => i.id !== currentItemId);
                    setItems(filtered);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMoreItems();
    }, [ownerId, currentItemId]);

    if (!loading && items.length === 0) return null;

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-6'>
            <h2 className='text-xl md:text-2xl font-semibold text-foreground mb-4'>
                More from Seller
            </h2>
            <p className='text-sm md:text-base text-muted-foreground mb-6'>
                Check out more items from this seller
            </p>
            <MoreFromSellerCarousel products={items} />
        </section>
    )
}
