'use client';

import React, { useState } from 'react';

import { Select, SelectItem, Button } from '@heroui/react';
import ProductAllCard from '@/components/customs/cards/product-all-card';
import { Product } from '@/types/product';

interface Props {
    items: Product[];
}

export default function SellerListingsSection({ items }: Props) {

    const [page, setPage] = useState(1);
    const pageSize = 8;
    const totalPages = Math.ceil(items.length / pageSize);

    const paginatedItems = items.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    if (items.length === 0) {
        return (
            <section className='max-w-6xl mx-auto px-6 py-12 text-center'>
                <h3 className='text-xl font-semibold mb-2'>No Items Yet</h3>
                <p className='text-muted-foreground'>This seller hasn't listed any items.</p>
            </section>
        )
    }

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12'>
            <div className='flex justify-between items-center mb-5'>
                <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
                    Items from Items from {items[0].owner.fullname.split(' ')[0]}
                </h3>
                <Select
                    label='Sort by'
                    size='sm'
                    className='w-40'
                    defaultSelectedKeys={['newest']}
                >
                    <SelectItem key='newest'>Newest</SelectItem>
                </Select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {paginatedItems.map((product) => (
                    <ProductAllCard key={product.id} item={product} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className='flex justify-center gap-4 mt-8'>
                    <Button
                        disabled={page === 1}
                        onPress={() => setPage(page - 1)}
                        variant='solid'
                        className={page === 1 ? 'bg-default text-muted-foreground' : 'bg-foreground text-white'}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={page === totalPages}
                        onPress={() => setPage(page + 1)}
                        variant='solid'
                        className={page === totalPages ? 'bg-default text-muted-foreground' : 'bg-foreground text-white'}
                    >
                        Next
                    </Button>
                </div>
            )}
        </section>
    );
}
