'use client';

import React from 'react'

import BrowseItemsSection from '@/components/customs/section/catalog/browse-items';
import FiltersSection from '@/components/customs/section/catalog/filters';

export default function CatalogPage() {
    return (
        <main className='w-full min-h-screen'>
            <BrowseItemsSection />

            <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10 flex gap-10'>
                <aside className='hidden lg:block w-64 shrink-0'>
                    <FiltersSection />
                </aside>

            </section>
        </main>
    )
}
