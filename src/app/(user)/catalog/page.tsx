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
import { Spinner } from '@heroui/react';

export default function CatalogPage() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [allItems, setAllItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedCondition, setSelectedCondition] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [sortBy, setSortBy] = useState<string>('newest');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredItems.slice(start, start + itemsPerPage);
    }, [filteredItems, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                    {loading ? (
                        <div className='flex justify-center py-20'><Spinner size='lg' /></div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4'>
                                {paginatedItems.map((item) => (
                                    <ProductAllCard
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                                {paginatedItems.length === 0 && (
                                    <div className='col-span-full text-center py-10 text-gray-500'>
                                        No items found matching your filters.
                                    </div>
                                )}
                            </div>

                            {filteredItems.length > itemsPerPage && (
                                <div className=''>
                                    <ProductAllPagination
                                        total={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

            </section>

        </main>
    )
}
