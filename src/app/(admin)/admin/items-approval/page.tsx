'use client';

import React, { useState, useEffect } from 'react'

import { Tab, Tabs, Pagination, addToast } from '@heroui/react';
import ItemsApprovalTable, { PendingItem } from '@/components/customs/tables/admin/items-approval-table';
import ItemVerificationModal from '@/components/customs/modals/admin/item-verification-modal';

export default function ItemsApprovalPage() {

    const [data, setData] = useState<PendingItem[]>([])
    const [loading, setLoading] = useState(true)

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<PendingItem | null>(null)

    const fetchPendingItems = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/items/pending')
            if (!res.ok) throw new Error('Failed to fetch')
            const json = await res.json()
            setData(json)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPendingItems()
    }, [])

    const handleApprove = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/items/${id}/approve`, {
                method: 'PATCH'
            })
            if (!res.ok) {
                const err = await res.json()
                addToast({
                    title: 'Approval Failed',
                    description: err.message,
                    color: 'danger'
                })
                return
            }

            addToast({
                title: 'Item Approved',
                description: 'Item is now live in the catalog.',
                color: 'success',
            });
            setData(prev => prev.filter(item => item.id !== id));
            setModalOpen(false);

        } catch (error) {
            console.error(error)
            addToast({
                title: 'Error',
                description: 'Something went wrong',
                color: 'danger'
            })
        }
    }

    const handleReject = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/items/${id}/reject`, {
                method: 'PATCH'
            })
            if (!res.ok) {
                const err = await res.json()
                addToast({
                    title: 'Rejection Failed',
                    description: err.message,
                    color: 'danger'
                })
                return
            }

            addToast({
                title: 'Item Rejected',
                description: 'Item has been rejected.',
                color: 'warning',
                radius: 'lg'
            });

            setData(prev => prev.filter(item => item.id !== id));
            setModalOpen(false);
        } catch (error) {
            console.error(error)
            addToast({
                title: 'Error',
                description: 'Something went wrong',
                color: 'danger'
            })
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Items Approval</h1>
                <p className='text-muted-foreground text-sm'>Approve or reject items on CampusSwap.</p>
            </div>

            <Tabs
                aria-label='Admin Items Approval Tabs'
                radius='lg'
                color='primary'
                variant='bordered'
                className='max-w-full'
            >
                <Tab key='pending' title='Pending Items'>
                    <div>
                        <ItemsApprovalTable
                            data={data}
                            loading={loading}
                            onVerify={(item) => {
                                setSelectedItem(item)
                                setModalOpen(true)
                            }}
                        />

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

                <Tab key='all' title='All Items'>
                    <div>

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

            <ItemVerificationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                item={selectedItem}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    )
}
