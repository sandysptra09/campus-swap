'use client';

import React from 'react'

import Link from 'next/link';
import { Button, Input, Select, SelectItem, Pagination } from '@heroui/react';
import { Upload, Search } from 'lucide-react';
import MyItemsTable from '@/components/customs/tables/my-items-table';

export default function DashboardMyItemsPage() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold'>My Items</h1>
                    <p className='text-muted-foreground text-sm'>Manage all items you posted on CampusSwap.</p>
                </div>
                <Button
                    as={Link}
                    href='/user/dashboard/my-items/upload-item'
                    color='primary'
                    startContent={<Upload className='w-4 h-4' />}
                    className='font-semibold'
                >
                    Upload Item
                </Button>
            </div>
            <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                <Input
                    startContent={<Search className='w-4 h-4 text-default-500' />}
                    placeholder='Search items...'
                    className='max-w-2xl'
                />
                <Select
                    size='sm'
                    radius='lg'
                    label='Status'
                    className='w-full md:w-40'>
                    <SelectItem key='all'>All</SelectItem>
                    <SelectItem key='approved'>Approved</SelectItem>
                    <SelectItem key='pending'>Pending</SelectItem>
                    <SelectItem key='rejected'>Rejected</SelectItem>
                </Select>
                <Select
                    size='sm'
                    radius='lg'
                    label='Sort By'
                    className='w-full md:w-44'>
                    <SelectItem key='newest'>Newest</SelectItem>
                    <SelectItem key='oldest'>Oldest</SelectItem>
                    <SelectItem key='views'>Most Views</SelectItem>
                    <SelectItem key='wishlist'>Most Wishlist</SelectItem>
                </Select>
            </div>
            <MyItemsTable />
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
