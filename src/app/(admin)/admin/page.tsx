'use client';

import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Package, Repeat, PackageCheck, UserCog } from 'lucide-react'
import UserManageTable from '@/components/customs/tables/admin/user-manage-table';
import TransactionsMonitorPage from './transactions-monitor/page';

export default function AdminDashboardPage() {
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid gap-4 md:grid-cols-4'>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Users</CardTitle>
                        <UserCog className='h-7 w-7 text-yellow-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>1,250</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Items</CardTitle>
                        <Package className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>18</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Pending Items Approval</CardTitle>
                        <PackageCheck className='h-7 w-7 text-primary' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold text-foreground'>9</p>
                        <p className='text-xs text-muted-foreground'>+1 this month</p>
                    </CardContent>
                </Card>
                <Card className='shadow-sm border-default-200'>
                    <CardHeader className='flex flex-row items-center justify-between pb-2'>
                        <CardTitle className='text-base font-medium'>Total Transactions</CardTitle>
                        <Repeat className='h-7 w-7 text-pink-500' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-4xl font-bold'>34</p>
                        <p className='text-xs text-muted-foreground'>3 new this week</p>
                    </CardContent>
                </Card>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}
