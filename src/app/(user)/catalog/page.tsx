'use client';

import React from 'react'

import BrowseItemsSection from '@/components/customs/section/catalog/browse-items';
import FiltersSection from '@/components/customs/section/catalog/filters';
import ProductAllCard from '@/components/customs/cards/product-all-card';

export default function CatalogPage() {
    return (
        <main className='w-full min-h-screen'>
            <BrowseItemsSection />

            <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10 flex gap-10'>
                <aside className='hidden lg:block w-64 shrink-0'>
                    <FiltersSection />
                </aside>
                <div className='flex-1'>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4'>
                        {[...Array(9)].map((_, i) => (
                            <ProductAllCard
                                key={i}
                                product_id='1'
                                product_user_id='1'
                                product_name='Product Name'
                                product_description='Desc'
                                product_category='Category'
                                product_condition='new'
                                product_status='active'
                                product_point_value={300}
                                product_image_url='https://app.requestly.io/delay/3000/https://dummyimage.com/300x300/ffffff/000000'
                                product_created_at='2025-12-03'
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
