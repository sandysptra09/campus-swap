'use client';

import React, { useState, useEffect, useMemo } from 'react'

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

    const [allItems, setAllItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [sortBy, setSortBy] = useState<string>('newest');

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await fetch('/api/items');
                if (res.ok) {
                    const data = await res.json();
                    setAllItems(data.items);
                }
            } catch (error) {
                console.error('Failed to fetch catalog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalog();
    }, []);

    const filteredItems = useMemo(() => {
        let result = [...allItems];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.category.name.toLowerCase().includes(query)
            );
        }

        if (selectedCategory.length > 0) {
            result = result.filter(item => selectedCategory.includes(item.category.name));
        }

        if (selectedCondition) {
            result = result.filter(item => item.condition === selectedCondition);
        }

        result = result.filter(item => item.pointValue >= priceRange[0] && item.pointValue <= priceRange[1]);

        if (sortBy === 'newest') {
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'price_low') {
            result.sort((a, b) => a.pointValue - b.pointValue);
        } else if (sortBy === 'price_high') {
            result.sort((a, b) => b.pointValue - a.pointValue);
        }

        return result;
    }, [allItems, searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);

    return (
        <main className='w-full min-h-screen'>
            <BrowseItemsSection onSearch={setSearchQuery}
                onCategorySelect={(category) => {
                    setSelectedCategory([category]);
                }} />
            <div className='lg:hidden max-w-6xl mx-auto px-6 md:px-12 lg:px-20 mt-2 mb-4 flex justify-center'>
                <FilterMobileButton onOpen={onOpen} />
            </div>
            <FilterMobileModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                filters={{ selectedCategory, selectedCondition, priceRange, sortBy }}
                setFilters={{ setSelectedCategory, setSelectedCondition, setPriceRange, setSortBy }}
            />

            <section className='max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-10 flex gap-10'>
                <aside className='hidden lg:block w-64 shrink-0'>
                    <FiltersSection
                        filters={{ selectedCategory, selectedCondition, priceRange, sortBy }}
                        setFilters={{ setSelectedCategory, setSelectedCondition, setPriceRange, setSortBy }}
                        onReset={() => {
                            setSelectedCategory([]);
                            setSelectedCondition('');
                            setPriceRange([0, 5000]);
                            setSortBy('newest');
                        }}

                    />
                </aside>
                <div className='flex-1'>
                    <div className='flex items-center justify-between mb-4'>
                        <span className='text-sm text-muted-foreground'>
                            Showing {filteredItems.length} results
                        </span>
                        <div className='w-40'>
                            <FilterItemsSelect value={sortBy} onChange={setSortBy} />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4'>
                        {filteredItems.map((item) => (
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
