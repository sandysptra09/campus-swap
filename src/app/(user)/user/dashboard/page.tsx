'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Activity, Heart, Package, Repeat, Star } from 'lucide-react'
import ProductYourLatestCard from '@/components/customs/cards/product-your-latest-card';
import { Spinner, Button } from '@heroui/react';
import Link from 'next/link';

export default function DashboardOverviewPage() {

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                const res = await fetch('/api/items/my');
                if (res.ok) {
                    const data = await res.json();
                    setItems(data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard items', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, []);

    const latestItems = items.slice(0, 4);

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-4'>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Points Balance</CardTitle>
                        <Star className='h-7 w-7 text-yellow-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>1,250</p>
                        <p className='text-xs text-muted-foreground'>+120 this week</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Posted</CardTitle>
                        <Package className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{items.length}</p>
                        <p className='text-xs text-muted-foreground'>Total listed items</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Exchanged</CardTitle>
                        <Repeat className='h-7 w-7 text-green-600' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>9</p>
                        <p className='text-xs text-muted-foreground'>+1 this month</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Wishlist Items</CardTitle>
                        <Heart className='h-7 w-7 text-pink-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold'>34</p>
                        <p className='text-xs text-muted-foreground'>3 new this week</p>
                    </CardContent>
                </Card>
            </div>
            <Card className='shadow-sm border-default-200'>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-start gap-3'>
                        <Activity className='h-5 w-5 mt-1 text-primary' />
                        <div>
                            <p className='text-sm font-medium'>You exchanged an item</p>
                            <p className='text-xs text-muted-foreground'>2 hours ago</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3'>
                        <Package className='h-5 w-5 mt-1 text-blue-600' />
                        <div>
                            <p className='text-sm font-medium'>You posted a new item</p>
                            <p className='text-xs text-muted-foreground'>Yesterday</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3'>
                        <Heart className='h-5 w-5 mt-1 text-pink-500' />
                        <div>
                            <p className='text-sm font-medium'>You added “Bluetooth Speaker” to Wishlist</p>
                            <p className='text-xs text-muted-foreground'>3 days ago</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='flex flex-col gap-3'>
                <h2 className='text-lg font-semibold'>Your Latest Items</h2>
                {loading ? (
                    <div className='flex justify-center py-10'><Spinner /></div>
                ) : latestItems.length > 0 ? (
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {latestItems.map((item) => (
                            <ProductYourLatestCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-10 border border-dashed border-default-300 rounded-lg'>
                        <p className='text-muted-foreground'>You haven't posted any items yet.</p>
                        <Button
                            as={Link}
                            href='/user/dashboard/add-item'
                            className='mt-2'
                            color='primary'
                            size='sm'
                        >
                            Post Item
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
