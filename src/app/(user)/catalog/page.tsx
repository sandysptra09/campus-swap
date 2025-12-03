'use client';

import React from 'react'

import { useDisclosure } from '@heroui/react';
import FilterMobileButton from '@/components/customs/buttons/filter-mobile-button';
import FilterMobileModal from '@/components/customs/modals/filter-mobile-modal';
import BrowseItemsSection from '@/components/customs/section/catalog/browse-items';
import FiltersSection from '@/components/customs/section/catalog/filters';
import ProductAllCard from '@/components/customs/cards/product-all-card';
import FilterItemsSelect from '@/components/customs/selects/filter-items-select';

export default function CatalogPage() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <main className="w-full min-h-screen">
            <BrowseItemsSection />
            <div className="lg:hidden max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mt-2 mb-4 flex justify-center">
                <FilterMobileButton onOpen={onOpen} />
            </div>
            <FilterMobileModal isOpen={isOpen} onOpenChange={onOpenChange} />

            <section className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10 flex gap-10">
                <aside className="hidden lg:block w-64 shrink-0">
                    <FiltersSection />
                </aside>
                <div className="flex-1">
                    <div className='flex items-center justify-between mb-4'>
                        <span className="text-sm text-muted-foreground">
                            Showing 120 results
                        </span>
                        <div className='w-40'>
                            <FilterItemsSelect />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                        {[...Array(9)].map((_, i) => (
                            <ProductAllCard
                                key={i}
                                product_id="1"
                                product_user_id="1"
                                product_name="Product Name"
                                product_description="Desc"
                                product_category="Category"
                                product_condition="new"
                                product_status="active"
                                product_point_value={300}
                                product_image_url="https://dummyimage.com/300x300/ffffff/000000"
                                product_created_at="2025-12-03"
                            />
                        ))}
                    </div>
                </div>

            </section>

        </main>
    )
}
