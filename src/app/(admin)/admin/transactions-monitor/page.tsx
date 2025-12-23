'use client';

import React, { useState, useEffect } from 'react'

import TransactionsMonitorTable from '@/components/customs/tables/admin/transactions-monitor-table';
import { Input, Select, SelectItem, Pagination } from '@heroui/react';
import { Search } from 'lucide-react';

export default function TransactionsMonitorPage() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = '/api/admin/transactions';
                if (statusFilter !== 'all') {

                    url += `?status=${statusFilter.toUpperCase()}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                setTransactions(data.transactions || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [statusFilter]);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Transactions Monitor</h1>
                <p className='text-muted-foreground text-sm'>Monitor and manage user  transactions on CampusSwap.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-3 md:items-center'>
                <Input
                    startContent={<Search className='w-4 h-4 text-default-500' />}
                    placeholder='Search...'
                    className='max-w-2xl'
                />
                <Select
                    size='sm'
                    radius='lg'
                    label='Status'
                    selectedKeys={[statusFilter]}
                    onChange={(e) => setStatusFilter(e.target.value || 'all')}
                    className='w-full md:w-40'>
                    <SelectItem key='all'>All</SelectItem>
                    <SelectItem key='pending'>Pending</SelectItem>
                    <SelectItem key='completed'>Completed</SelectItem>
                    <SelectItem key='canceled'>Canceled</SelectItem>
                </Select>
                <Select
                    size='sm'
                    radius='lg'
                    label='Sort By'
                    defaultSelectedKeys={['newest']}
                    className='w-full md:w-44'>
                    <SelectItem key='newest'>Newest</SelectItem>
                    <SelectItem key='oldest'>Oldest</SelectItem>
                </Select>
            </div>
            <TransactionsMonitorTable
                transactions={transactions}
                loading={loading}
            />
        </div>
    )
}