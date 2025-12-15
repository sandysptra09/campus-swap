'use client';

import React from 'react'

import ChangePasswordForm from '@/components/customs/forms/change-password-form';
import {
    Tabs,
    Tab,
} from '@heroui/react';

export default function DashboardSettingsPage() {

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl font-semibold'>Settings</h1>
                <p className='text-muted-foreground text-sm'>Manage your account settings.</p>
            </div>
            <div className='flex w-full flex-col'>
                <Tabs
                    aria-label='Settings Tabs'
                    isVertical
                    color='primary'
                    variant='bordered'
                    className='max-w-full'
                >
                    <Tab key='security' title='Security'>
                        <ChangePasswordForm />
                    </Tab>
                    <Tab key='notifications' title='Notifications'>

                    </Tab>
                </Tabs>
            </div>

        </div>
    )
}
