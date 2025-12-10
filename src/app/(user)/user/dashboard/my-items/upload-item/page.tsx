'use client';

import React from 'react'

import UserUploadItemForm from '@/components/customs/forms/user-upload-item-form';

export default function UploadItemPage() {
    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='text-2xl font-semibold mb-1'>Upload Item</h1>
                <p className='text-muted-foreground text-sm'>Add a new item to CampusSwap.</p>
            </div>
            <UserUploadItemForm />
        </div>
    )
}
