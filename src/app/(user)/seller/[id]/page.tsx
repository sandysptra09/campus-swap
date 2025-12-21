'use client';

import React, { useState, useEffect } from 'react'

import { useParams } from 'next/navigation';
import { Spinner } from '@heroui/react';
import ProfileSummarySection from '@/components/customs/section/seller-detail/profile-summary';
import SellerCredibilitySection from '@/components/customs/section/seller-detail/seller-credibility';
import SellerListingsSection from '@/components/customs/section/seller-detail/seller-listings';
import { Product } from '@/types/product';

export interface SellerData {
    id: string;
    fullname: string;
    avatarUrl: string | null;
    joinedAt: string;
    items: Product[];
}

export default function SellerDetailPage() {

    const params = useParams();
    const id = params?.id as string;

    const [seller, setSeller] = useState<SellerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const res = await fetch(`/api/items?sellerId=${id}`);
                if (res.ok) {
                    const data = await res.json();
                    const items = data.items;

                    if (items.length > 0) {
                        setSeller({
                            id: items[0].owner.id,
                            fullname: items[0].owner.fullname,
                            avatarUrl: items[0].owner.avatarUrl,
                            joinedAt: '2025',
                            items: items
                        });
                    } else {
                        setSeller({
                            id: id,
                            fullname: 'Seller',
                            avatarUrl: null,
                            joinedAt: '2025',
                            items: []
                        });
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchSeller();
    }, [id]);

    if (loading) return <div className='h-screen flex justify-center items-center'><Spinner /></div>;
    if (!seller) return <div className='text-center py-20'>Seller not found</div>;

    return (
        <main className='w-full min-h-screen'>
            <ProfileSummarySection seller={seller} />
            <SellerCredibilitySection />
            <SellerListingsSection items={seller.items} />
        </main>
    )
}
