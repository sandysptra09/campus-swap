'use client';

import React, { useState, useEffect } from 'react'

import { Tabs, Tab, Pagination } from '@heroui/react';
import TransactionsBuyerTable from '@/components/customs/tables/transactions-buyer-table';
import TransactionsSellerTable from '@/components/customs/tables/transactions-seller-table';
import { useAuth } from '@/context/AuthContext';

export default function DashboardTransactionsPage() {
    const { user } = useAuth();

    const [buyerData, setBuyerData] = useState([]);
    const [sellerData, setSellerData] = useState([]);

    const [loadingBuyer, setLoadingBuyer] = useState(true);
    const [loadingSeller, setLoadingSeller] = useState(true);

    useEffect(() => {
        if (!user) return;
        fetch('/api/transactions/me?role=buyer')
            .then(res => res.json())
            .then(data => {
                setBuyerData(data.transactions || []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingBuyer(false));
    }, [user]);

    useEffect(() => {
        if (!user) return;
        fetch('/api/transactions/me?role=seller')
            .then(res => res.json())
            .then(data => {
                setSellerData(data.transactions || []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingSeller(false));
    }, [user]);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Transactions</h1>
                <p className='text-muted-foreground text-sm'>Manage all transactions you made on CampusSwap.</p>
            </div>
            <Tabs
                aria-label='Transactions Tabs'
                radius='lg'
                color='primary'
                variant='bordered'
                className='max-w-full'
            >
                <Tab key='buyer' title='Purchases (Buyer)'>
                    <div>
                        <TransactionsBuyerTable transactions={buyerData} loading={loadingBuyer} />
                        <div className='flex justify-center mt-8'>
                            <Pagination
                                total={5}
                                initialPage={1}
                                showControls
                                color='primary'
                            />
                        </div>
                    </div>
                </Tab>

                <Tab key='seller' title='Sales (Seller)'>
                    <div>
                        <TransactionsSellerTable transactions={sellerData} loading={loadingSeller} />
                        <div className='flex justify-center mt-8'>
                            <Pagination
                                total={5}
                                initialPage={1}
                                showControls
                                color='primary'
                            />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
