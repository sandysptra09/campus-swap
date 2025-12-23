'use client';

import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Package, Repeat, PackageCheck, UserCog } from 'lucide-react'
import Link from 'next/link';
import { Button, Spinner } from '@heroui/react';
import ItemsApprovalTable, { PendingItem } from '@/components/customs/tables/admin/items-approval-table';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const router = useRouter();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalItems: 0,
        pendingItems: 0,
        totalTransactions: 0
    });

    const [pendingItemsList, setPendingItemsList] = useState<PendingItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const statsRes = await fetch('/api/admin/stats');
                if (statsRes.ok) setStats(await statsRes.json());

                const pendingRes = await fetch('/api/admin/items/pending');
                if (pendingRes.ok) {
                    const items = await pendingRes.json();
                    setPendingItemsList(items.slice(0, 5));
                }
            } catch (error) {
                console.error('Failed to fetch admin stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleVerifyRedirect = () => {
        router.push('/admin/items-approval');
    };

    if (loading) {
        return <div className='flex justify-center py-20'><Spinner size='lg' label='Loading Dashboard...' /></div>;
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-4'>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Users</CardTitle>
                        <UserCog className='h-7 w-7 text-yellow-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{stats.totalUsers}</p>
                        <p className='text-xs text-muted-foreground'>Registered accounts</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Items</CardTitle>
                        <Package className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>{stats.totalItems}</p>
                        <p className='text-xs text-muted-foreground'>Items in database</p>
                    </CardContent>
                </Card>
                <Link href='/admin/items-approval'>
                    <Card
                        className='shadow-sm border-default-200'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2'>
                            <CardTitle className='text-base font-medium'>Pending Items Approval</CardTitle>
                            <PackageCheck className='h-7 w-7 text-primary' />
                        </CardHeader>
                        <CardContent>
                            <p className='text-4xl font-bold text-foreground'>{stats.pendingItems}</p>
                            <p className='text-xs text-muted-foreground'>Needs verification!</p>
                        </CardContent>
                    </Card></Link>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Transactions</CardTitle>
                        <Repeat className='h-7 w-7 text-pink-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold'>{stats.totalTransactions}</p>
                        <p className='text-xs text-muted-foreground'>All time exchanges</p>
                    </CardContent>
                </Card>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>Latest Items Pending Approval</h2>
                    <Button
                        as={Link}
                        href='/admin/items-approval'
                        size='sm'
                        variant='light'
                        color='primary'
                    >
                        View All
                    </Button>
                </div>

                <ItemsApprovalTable
                    data={pendingItemsList}
                    loading={loading}
                    onVerify={handleVerifyRedirect}
                />
            </div>
        </div>
    )
}
