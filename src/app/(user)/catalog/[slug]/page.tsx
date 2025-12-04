'use client';

import React from 'react'

import ProductInformationSection from '@/components/customs/section/catalog/catalog-detail/product-information';
import ProductDescriptionSection from '@/components/customs/section/catalog/catalog-detail/product-description';
import SellerInformationSection from '@/components/customs/section/catalog/catalog-detail/seller-information';
import SafetyTipsSection from '@/components/customs/section/catalog/catalog-detail/safety-tips';

export default function CatalogDetailPage() {
    return (
        <main className='w-full min-h-screen'>
            <ProductInformationSection />
            <ProductDescriptionSection />
            <SellerInformationSection />
            <SafetyTipsSection />
        </main>
    )
}
