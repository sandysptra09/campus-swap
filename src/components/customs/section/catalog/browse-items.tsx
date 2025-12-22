'use client';

import React from 'react'

import InputCatalogSearch from '../../searchs/input-catalog-search';
import QuickCategoriesCatalogButton from '../../buttons/quick-categories-catalog-button';

interface Props {
    onSearch: (query: string) => void;
    onCategorySelect: (category: string) => void;
}

export default function BrowseItemsSection({ onSearch, onCategorySelect }: Props) {
    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-10'>
            <div className='mx-auto text-center px-6'>
                <h1 className='text-3xl md:text-4xl text-foreground font-bold mb-3'>
                    Browse <span className='text-primary'>
                        CampusSwap
                    </span> Items
                </h1>
                <p className='text-muted-foreground text-base'>
                    Find items to swap, borrow, or buy from trusted students.
                </p>
                <div className='max-w-2xl mx-auto mt-6'>
                    <InputCatalogSearch onSearch={onSearch} />
                </div>
                <QuickCategoriesCatalogButton onSelectCategory={onCategorySelect} />
            </div>
        </section>
    )
}
