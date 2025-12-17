'use client';

import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation';
import UserEditItemForm from '@/components/customs/forms/user-edit-item-form';

export default function EditItemPage() {

    const { id } = useParams<{ id: string }>()
    const [item, setItem] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        async function fetchItem() {
            try {
                const res = await fetch(`/api/items/${id}`)
                if (!res.ok) throw new Error('Failed to fetch item')
                const data = await res.json()
                setItem(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchItem()
    }, [id])

    if (loading) return <p>Loading...</p>
    if (!item) return <p>Item not found</p>

    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-2xl font-semibold mb-1'>Edit Item</h1>
                <p className='text-muted-foreground text-sm'>Edit an existing item on CampusSwap.</p>
            </div>
            <UserEditItemForm item={item} />
        </div>
    )
}
