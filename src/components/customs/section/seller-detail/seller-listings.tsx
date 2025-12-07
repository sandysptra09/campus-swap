'use client';

import React, { useState } from 'react';

import { Select, SelectItem, Button } from '@heroui/react';
import ProductMoreFromSellerCard from '../../cards/product-more-from-seller-card';

export default function SellerListingsSection() {

    const productList = [...Array(12)].map((_, i) => ({
        id: i + 1,
        name: 'Sample Product ' + (i + 1),
        description: 'Product description',
        category: 'Category',
        condition: 'new',
        status: 'active',
        point: 200 + i * 10,
        image: 'https://dummyimage.com/600x600/ffffff/000000',
        user_id: '1',
        created_at: '2025-01-01'
    }));

    const [page, setPage] = useState(1);
    const pageSize = 8;
    const totalPages = Math.ceil(productList.length / pageSize);

    const paginatedItems = productList.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const sortOptions = [
        { key: 'newest', label: 'Newest' },
        { key: 'lowest_point', label: 'Lowest Point' },
        { key: 'popular', label: 'Most Popular' }
    ];

    return (
        <section className='max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12'>
            <div className='flex justify-between items-center mb-5'>
                <h3 className='text-xl md:text-2xl font-semibold text-foreground'>
                    Items from this seller
                </h3>
                <Select
                    label='Sort by'
                    size='sm'
                    className='w-40'
                    defaultSelectedKeys={['newest']}
                >
                    {sortOptions.map((opt) => (
                        <SelectItem key={opt.key}>{opt.label}</SelectItem>
                    ))}
                </Select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {paginatedItems.map((product) => (
                    <ProductMoreFromSellerCard
                        key={product.id}
                        product_id={String(product.id)}
                        product_user_id={product.user_id}
                        product_name={product.name}
                        product_description={product.description}
                        product_category={product.category}
                        product_condition={product.condition}
                        product_status={product.status}
                        product_point_value={product.point}
                        product_image_url={product.image}
                        product_created_at={product.created_at}
                    />
                ))}
            </div>
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
        </section>
    );
}
