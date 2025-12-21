'use client';

import React, { useState, useEffect } from 'react'

import { useDisclosure } from '@heroui/react';
import FilterMobileButton from '@/components/customs/buttons/filter-mobile-button';
import FilterMobileModal from '@/components/customs/modals/filter-mobile-modal';
import BrowseItemsSection from '@/components/customs/section/catalog/browse-items';
import FiltersSection from '@/components/customs/section/catalog/filters';
import ProductAllCard from '@/components/customs/cards/product-all-card';
import FilterItemsSelect from '@/components/customs/selects/filter-items-select';
import ProductAllPagination from '@/components/customs/paginations/product-all-pagination';
import { Product } from '@/types/product';

export default function CatalogPage() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await fetch('/api/items');
                if (res.ok) {
                    const data = await res.json();
                    setItems(data.items);
                }
            } catch (error) {
                console.error('Failed to fetch catalog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalog();
    }, []);

    return (
        <main className='w-full min-h-screen'>
            <BrowseItemsSection />
            <div className='lg:hidden max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mt-2 mb-4 flex justify-center'>
                <FilterMobileButton onOpen={onOpen} />
            </div>
            <FilterMobileModal isOpen={isOpen} onOpenChange={onOpenChange} />

            <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10 flex gap-10'>
                <aside className='hidden lg:block w-64 shrink-0'>
                    <FiltersSection />
                </aside>
                <div className='flex-1'>
                    <div className='flex items-center justify-between mb-4'>
                        <span className='text-sm text-muted-foreground'>
                            Showing {items.length} results
                        </span>
                        <div className='w-40'>
                            <FilterItemsSelect />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4'>
                        {items.map((item) => (
                            <ProductAllCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                    <div className=''>
                        <ProductAllPagination />
                    </div>
                </div>

            </section>

        </main>
    )
}
