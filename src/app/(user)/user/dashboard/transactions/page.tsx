'use client';

import React from 'react'

import { Tabs, Tab, Pagination } from '@heroui/react';
import TransactionsBuyerTable from '@/components/customs/tables/transactions-buyer-table';
import TransactionsSellerTable from '@/components/customs/tables/transactions-seller-table';

export default function DashboardTransactionsPage() {
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
                <Tab key='buyer' title='As Buyer'>
                    <div>
                        <TransactionsBuyerTable />
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

                <Tab key='seller' title='As Seller'>
                    <div>
                        <TransactionsSellerTable />
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
