'use client';

import React from 'react'

import UserEditItemForm from '@/components/customs/forms/user-edit-item-form';

export default function EditItemPage() {
    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-2xl font-semibold mb-1'>Edit Item</h1>
                <p className='text-muted-foreground text-sm'>Edit an existing item on CampusSwap.</p>
            </div>
            <UserEditItemForm />
        </div>
    )
}
