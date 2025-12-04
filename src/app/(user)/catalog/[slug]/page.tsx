'use client';

import React from 'react'

import ProductInformationSection from '@/components/customs/section/catalog/catalog-detail/product-information';
import ProductDescriptionSection from '@/components/customs/section/catalog/catalog-detail/product-description';

export default function CatalogDetailPage() {
    return (
        <main className='w-full min-h-screen'>
            <ProductInformationSection />
            <ProductDescriptionSection />
        </main>
    )
}
