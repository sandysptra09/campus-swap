'use client';

import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Activity, ArrowDownLeft, ArrowUpRight, Heart, Package, Repeat, Star } from 'lucide-react'
import ProductYourLatestCard from '@/components/customs/cards/product-your-latest-card';
import { Spinner, Button } from '@heroui/react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';


export default function DashboardOverviewPage() {

    const { user } = useAuth();

    const [latestItems, setLatestItems] = useState<any[]>([]);
    const [recentActivities, setRecentActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        itemsPosted: 0,
        itemsExchanged: 0,
        wishlistCount: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // 1. Fetch My Items (Barang yang diposting)
                const itemsRes = await fetch('/api/items/my');
                const itemsData = itemsRes.ok ? await itemsRes.json() : [];

                // 2. Fetch Transactions (Buyer & Seller)
                const [buyerRes, sellerRes] = await Promise.all([
                    fetch('/api/transactions/me?role=buyer'),
                    fetch('/api/transactions/me?role=seller')
                ]);

                const buyerData = buyerRes.ok ? (await buyerRes.json()).transactions : [];
                const sellerData = sellerRes.ok ? (await sellerRes.json()).transactions : [];

                const totalPosted = itemsData.length;

                const totalExchanged = [...buyerData, ...sellerData].filter((t: any) => t.status === 'COMPLETED').length;

                setStats({
                    itemsPosted: totalPosted,
                    itemsExchanged: totalExchanged,
                    wishlistCount: 0
                });

                setLatestItems(itemsData.slice(0, 4));

                const activities = [
                    ...itemsData.map((item: any) => ({
                        type: 'POST',
                        title: `Posted new item: ${item.title}`,
                        date: new Date(item.createdAt),
                        icon: <Package className='h-5 w-5 mt-1 text-blue-600' />
                    })),
                    ...buyerData.map((tx: any) => ({
                        type: 'BUY',
                        title: `Requested item: ${tx.item.title}`,
                        date: new Date(tx.createdAt),
                        icon: <ArrowUpRight className='h-5 w-5 mt-1 text-orange-500' />
                    })),
                    ...sellerData.map((tx: any) => ({
                        type: 'SELL',
                        title: `Incoming request for: ${tx.item.title}`,
                        date: new Date(tx.createdAt),
                        icon: <ArrowDownLeft className='h-5 w-5 mt-1 text-green-500' />
                    }))
                ];

                const sortedActivities = activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
                setRecentActivities(sortedActivities);

            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchDashboardData();
    }, [user]);

    if (loading) {
        return <div className='flex justify-center items-center h-64'><Spinner size='lg' label="Loading dashboard..." /></div>
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-4'>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Points Balance</CardTitle>
                        <Star className='h-7 w-7 text-yellow-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{user?.points || 0}</p>
                        <p className='text-xs text-muted-foreground'>Cuurent Balance</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Posted</CardTitle>
                        <Package className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{stats.itemsPosted}</p>
                        <p className='text-xs text-muted-foreground'>Total listed items</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Items Exchanged</CardTitle>
                        <Repeat className='h-7 w-7 text-green-600' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{stats.itemsExchanged}</p>
                        <p className='text-xs text-muted-foreground'>Successful exchanges</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Wishlist Items</CardTitle>
                        <Heart className='h-7 w-7 text-pink-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold'>0</p>
                        <p className='text-xs text-muted-foreground'>Total wishlist items</p>
                    </CardContent>
                </Card>
            </div>
            <Card className='shadow-sm border-default-200'>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    {recentActivities.length > 0 ? (
                        recentActivities.map((activity, index) => (
                            <div key={index} className='flex items-start gap-4'>
                                <div className="p-2 bg-gray-100 rounded-full shrink-0">
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-gray-900'>{activity.title}</p>
                                    <p className='text-xs text-muted-foreground'>
                                        {formatDistanceToNow(activity.date, { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 text-sm py-4">
                            No recent activities. Start swapping!
                        </div>
                    )}
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
