'use client';

import React from 'react'

import { Pagination } from '@heroui/react';
import WishlistTable from '@/components/customs/tables/wishlist-table';

export default function DashboardWishlistPage() {

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Wishlist</h1>
                <p className='text-muted-foreground text-sm'>Manage all items you wishlisted on CampusSwap.</p>
            </div>
            <WishlistTable />
            <div className='flex justify-center mt-4'>
                <Pagination
                    total={5}
                    initialPage={1}
                    showControls
                    color='primary'
                />
            </div>
        </div>
    )
}
