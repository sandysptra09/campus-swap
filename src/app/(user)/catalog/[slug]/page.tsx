'use client';

import React, { useState, useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation';
import ProductInformationSection from '@/components/customs/section/catalog/catalog-detail/product-information';
import ProductDescriptionSection from '@/components/customs/section/catalog/catalog-detail/product-description';
import SellerInformationSection from '@/components/customs/section/catalog/catalog-detail/seller-information';
import SafetyTipsSection from '@/components/customs/section/catalog/catalog-detail/safety-tips';
import MoreFromSellerSection from '@/components/customs/section/catalog/catalog-detail/more-from-seller';
import { Spinner } from '@heroui/react';

import { DetailedProduct } from '@/types/product';

export default function CatalogDetailPage() {

    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [item, setItem] = useState<DetailedProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchItemDetail = async () => {
            try {
                const res = await fetch(`/api/items/view/${slug}`);

                if (res.status === 404) {
                    router.push('/not-found');
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setItem(data);
                }
            } catch (error) {
                console.error('Error fetching detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetail();
    }, [slug, router]);

    if (loading) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <Spinner size='lg' label='Loading item details...' color='primary' />
            </div>
        );
    }

    if (!item) return null;

    return (
        <main className='w-full min-h-screen'>
            <ProductInformationSection item={item} />
            <ProductDescriptionSection description={item.description || ''} />
            <SellerInformationSection owner={item.owner} />
            <SafetyTipsSection />
            <MoreFromSellerSection
                ownerId={item.owner.id}
                currentItemId={item.id}
            />
        </main>
    )
}
